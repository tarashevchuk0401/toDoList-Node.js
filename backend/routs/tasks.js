const express = require('express');
const Task = require('../models/task.model');
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");


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
        if (isValid) {
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

router.post(
    "",
    checkAuth,
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        const task = new Task({
            description: req.body.description,
            isDone: req.body.isDone,
            creator: req.userData.userId
        });
        task.save();
        res.status(201).json({
            message: 'Task added',

        })
    })

router.get(
    '',
    checkAuth,
    (req, res, next) => {
        Task.find({creator: req.userData.userId})
            .then(documents => {
                res.status(200).json({
                    message: 'Task fetched successfuly',
                    tasks: documents,
                })
            });
    });

router.get(
    '/:id',
    checkAuth,
    (req, res, next) => {
    Task.findById(req.params.id)
        .then(task => {
            res.status(200).json({
                message: 'Task fetched successfuly',
                task: task,
            })
        })
})

router.put(
    '', 
    checkAuth,
    (req, res, next) => {
    Task.updateOne({ _id: req.body.id }, req.body)
        .then(task => {
            res.status(200).json({
                message: 'Task updated successfuly',
            })
        })

})

router.delete(
    '/:id',
    checkAuth,
    (req, res, next) => {
    Task.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ message: "Post deleted!" });
    });
})

module.exports = router;
