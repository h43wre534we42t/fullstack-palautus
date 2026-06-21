const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    
    return blogs.reduce((mostLiked, blog) => mostLiked.likes >= blog.likes ? mostLiked : blog)

}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = _.groupBy(blogs, blog => blog.author)
    const authorAndBlogs = _.map(authors, (blogs, author) => ({
        author: author,
        blogs: blogs.length
    }))

    return _.maxBy(authorAndBlogs, author => author.blogs)
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authors = _.groupBy(blogs, blog => blog.author)
    const authorAndLikes = _.map(authors, (blogs, author) => ({
        author: author,
        likes: _.sumBy(blogs, blog => blog.likes)
    }))

    return _.maxBy(authorAndLikes, author => author.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}