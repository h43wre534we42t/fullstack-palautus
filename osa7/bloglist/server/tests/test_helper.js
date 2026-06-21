const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
  "title": "testTitle1",
  "author": "testAuthor1",
  "url": "testURL1",
  "likes": 1,
  "userId": "59078925634789078" 
  },
  {
  "title": "testTitle2",
  "author": "testAuthor2",
  "url": "testURL2",
  "likes": 59,
  "userId": "95687234803745789"
  }
]

const initialUsers = [
  {
	"username": "Priscilla",
	"name": "John Dark Souls",
	"password": "12B3SE",
  },
  {
	"username": "Minsk",
	"name": "John Baldur",
	"password": "123"
  }
]

const testUser = {
	"username": "Hunter",
	"name": "John Bloodborne",
	"password": "Yharnam",
}

const testLogin = {
  "username": "Hunter",
  "password": "Yharnam"
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb,
  usersInDb, initialUsers,
  testLogin,
  testUser
}