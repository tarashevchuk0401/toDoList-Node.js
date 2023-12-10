const express = require('express');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const TaskController = require("../controllers/task-controller")

router.post('', checkAuth, TaskController.addTask );
router.get('', checkAuth, TaskController.getAllTasks);
router.get('/:id', checkAuth, TaskController.getById);
router.put('', checkAuth, TaskController.updateTask);
router.delete('/:id', checkAuth, TaskController.delete);

module.exports = router;
