const express = require('express')
const router = express.Router()

// (TODO): CREATE CONTROLLERS
const taskController = require('../controllers/task.controller')
router.get('/', taskController.tasks)
router.get('/:id', taskController.task)
router.post('/', taskController.saveTask)
router.put('/:id', taskController.saveTask)
router.delete('/:id', taskController.deleteTask)
module.exports = router