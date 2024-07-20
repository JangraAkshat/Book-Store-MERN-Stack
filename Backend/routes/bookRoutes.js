const Book = require('../models/bookModel.js')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.post('/', async(req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        })

        const savedBook = await book.save()
        res.status(201).send(savedBook)
        
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})


router.get('/', async(req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})


router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id)

        if(!book) {
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).json(book)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})


router.put('/:id', async(req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        
        const id = req.params.id
        const result = await Book.findByIdAndUpdate(id, req.body)

        if(!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})


router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await Book.findByIdAndDelete(id)

        if(!result) {
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book deleted successfully'})

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})


module.exports = router
