const todo = require('../models/todo');
const responseUtil = require("../utils/responseUtils");

async function createTodo(req, res) {
    const {task} = req.body;
    try {
        await todo.create ({
            task: task
        });
        res.json(responseUtil.success({data: {}}));
    } catch(err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getTodo(req, res) {
    const {id} = req.params;
    try {
        // const result = await todo.findById(id);
        const result = await todo.findOne({
            _id: id
        })
        res.json(responseUtil.success({data: {result}}));
    }
    catch(err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getTodoList(req, res) {
    try {
        const results = await todo.find();
        res.json(responseUtil.success({data: {results}}));
    } catch(err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateTodo(req, res) {
    const {task, completed} = req.body;
    const {id} = req.params;
    try {
        // const result = await todo.findByIdAndUpdate(id, {
        //         task: task,
        //         completed: completed,
        //     })
        const result = await todo.findOneAndUpdate({
            _id: id
        }, {
            task: task,
            completed: completed,
        })
        res.json(responseUtil.success({data: {result}}));
    } catch(err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteTodo(req, res){
    const {id} = req.params;
    try {
        await todo.findOneAndDelete(id);
        res.json(responseUtil.success({data: {}}));
    } catch(err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createTodo,
    getTodo,
    getTodoList,
    updateTodo,
    deleteTodo
};
