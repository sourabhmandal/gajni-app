const express = require('express')
const router = express.Router()

//list of all friends
router.get('/', function (req, res) {
    res.send('todos List')
})

//add a new friend
router.post('/', function (req, res) {
    res
})

//update a friend
router.put('/:id', function (req, res) {
    res.send(`update todo ${req.params.id}`)
})

//remove a friend
router.delete('/:id', function (req, res) {
    res.send(`delete todo ${req.params.id}`)
})

module.exports = router