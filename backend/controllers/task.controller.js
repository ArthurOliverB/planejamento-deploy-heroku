const Task = require('../models/tasks.model')

exports.tasks = function (req, res) {
    Task.find(function (err, tasks) {
        res.send(tasks)
    })
}

exports.task = function (req, res) {

    Task.findById(req.params.id, function (err, task) {

        res.send(task)
    })
}

exports.saveTask = function (req, res) {
    const { body } = req
    // update
    if (req.params.id) {
        
        
        
        Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {
            useFindAndModify: false
        }, function (err, product) {
            if (err) return next(err);
            res.send('Task atualizada.');
        })

        
    } else {        
        const  name = req.body.name
        const  note = req.body.note
        const  prio = req.body.prio

        const t1 = new Task({
            name,
            note,
            prio
        })
        
        t1.save(function (err, t1) {
            if (err) console.error(err)
        })
        res.send(t1)
    }
}

exports.deleteTask = function (req, res) {
    const id = req.params.id
    const query = {id}
    
    Task.findByIdAndRemove(req.params.id, {useFindAndModify: false}, function (err) {
        if (err) return next(err);
        res.send('Sucesso!');
    })
}