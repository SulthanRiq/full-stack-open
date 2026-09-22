const dummy = (blogs) => {
    return blogs = 1
}

const totalLikes = (blogs) => {

    if (!blogs.length) {
        return 0
    }

    return blogs.reduce((acc, currentValue) => {
            return acc + currentValue.likes
    }, 0)
}

module.exports = {
    dummy,
    totalLikes,
}