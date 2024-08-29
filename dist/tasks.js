"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let tasks = [];
router.post('/', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    tasks.push(task);
    res.status(201).send({
        "status": 201,
        "message": "Done",
        "data": {
            "details": task,
            "totalCount": tasks.length
        }
    });
});
router.get('/', (req, res) => {
    // res.json(tasks);
    res.status(201).send({
        "details": tasks,
        "totalCount": tasks.length
    });
});
router.get('/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
    }
    else {
        // res.json(task);
        res.status(201).send({
            "details": task,
        });
    }
});
router.put('/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send('Task not found');
    }
    else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;
        res.json(task);
    }
});
router.delete('/:id', (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Task not found');
    }
    else {
        tasks.splice(index, 1);
        res.status(204).send({
            "status": 204,
            "message": "Done",
        });
    }
});
exports.default = router;
