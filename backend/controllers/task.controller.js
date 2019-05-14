const Task = require('../models/tasks.model')

exports.tasks = function (req, res) {
    Task.find(function (err, tasks) {
        res.send(tasks)
    })
}

exports.task = function (req, res) {

    Task.findById(req.params.id, function (err, task) {
        console.log(task);

        res.send(task)
    })
}

exports.saveTask = function (req, res) {
    const { body } = req
    // update
    if (req.params.id) {
        
        console.log(req.params.id);
        
        
        Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {
            useFindAndModify: false
        }, function (err, product) {
            if (err) return next(err);
            res.send('Task atualizada.');
        })

        // Task.findById(req.params.id, function(err, task) {
        //     if(err) console.error(err)
        //     task.name = req.body.name
        //     task.prio = req.body.prio
        //     task.save((err, task) => {
        //         if(err) console.error(err)
        //         res.send(task)
        //     })
        // })
    } else {
        const { name, prio } = body
        const t1 = new Task({
            name,
            prio
        })

        t1.save(function (err, t1) {
            if (err) console.err(er)
            console.log(t1.name)
            console.log(t1.prio)
        })
        res.send(t1)
    }
}

exports.deleteTask = function (req, res) {
    const id = req.params.id
    const query = {id}
    console.log(id);
    
    Task.findByIdAndRemove(req.params.id, {useFindAndModify: false}, function (err) {
        if (err) return next(err);
        res.send('Sucesso!');
    })
}