const express = require('express');
// database access using knex
const db = require('../data/db-config.js');
// view a list of posts
const router = express.Router();
router.get('/', (req, res) => {
    // select * from posts -- select gives back an array
    db.select('*').from('posts') // this will talk to db, it's async
        .then(posts => {
            res.status(200).json({ data: posts });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
});
router.get('/:id', (req, res) => {
    // select * from posts where id = req.params.id
    db('posts').where('id', '=', req.params.id)
        .then(posts => {
            res.status(200).json({ data: posts });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
});
router.post('/', (req, res) => {
    const postData = req.body;
    // validate the data, before calling the database,
    // if the data is valid (based on the factors of the api), then go to the database
    db('posts').insert(postData, 'id')
        .then(ids => {
            // returns an array with the id of the last record inserted (always from SQLite)
            res.status(201).json({ data: ids });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
});
// when using SQLite3, the .returning() warning can be ignored. 
router.put('/:id', (req, res) => {
    const changes = req.body;
    // validate the data before calling the database
    db('posts').where({ id: req.params.id }).update(changes)
        .then(count => {
            res.status(200).json({ data: count });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
});
router.delete('/:id', (req, res) => {
    db('posts').where({ id: req.params.id }).del()
        .then(count => {
            res.status(200).json({ data: count });
        })
        .catch(error => {
            res.status(500).json({ error: error.message })
        })
});
module.exports = router;