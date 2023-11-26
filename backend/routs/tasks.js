const express = require('express');
const Task = require('../models/task.model');
const multer = require('multer');


const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid){
            error = null;
        }
        cb(error, "backend/image");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
    const task = new Task({
        description: req.body.description,
        isDone: req.body.isDone,
    });
    console.log(task);
    task.save();
    res.status(201).json({
        message: 'Task added',

    })
})

router.get('', (req, res, next) => {
    Task.find()
        .then(documents => {
            res.status(200).json({
                message: 'Task fetched successfuly',
                tasks: documents,
            })
        });
});

router.get('/:id', (req, res, next)=> {
    console.log(req.params.id);
    Task.findById(req.params.id)
    .then(task => {
        res.status(200).json({
            message: 'Task fetched successfuly',
            task: task,
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Task.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
})

module.exports = router;
