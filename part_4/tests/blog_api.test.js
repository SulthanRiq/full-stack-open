const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlog[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlog[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('check the identifier property', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body._id
    assert.strictEqual(id, undefined)
})

test('blog saved correctly', async () => {
    const newBlog = {
        "title": "JavaScript is easy",
        "author": "Sulthan Ariq",
        "url": "http://localhost:2004",
        "likes": 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, helper.initialBlog.length + 1)
})

test('a likes of blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdated = { ...blogsAtStart[0] }
    blogToUpdated.likes++

    await api
        .put(`/api/blogs/${blogToUpdated.id}`)
        .send(blogToUpdated)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdated.id
    )

    assert.deepStrictEqual(updatedBlog, blogToUpdated)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})