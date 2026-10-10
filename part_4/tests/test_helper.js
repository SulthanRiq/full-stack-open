const Blog = require('../models/blog')

const initialBlog = [
    {
        "title": "Testing",
        "author": "Ada Novelace",
        "url": "http://localhost:1998",
        "likes": 2,
    },
    {
        "title": "Pragmatic Programmer",
        "author": "Dave Thomas",
        "url": "http://localhost:2000",
        "likes": 5,
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        "title": "willremovethissoon",
        "author": "John Doe",
        "url": "http://localhost:1945",
        "likes": 0,
    })

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlog, nonExistingId, blogsInDb
}