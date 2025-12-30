const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

const result = listHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
	test('of array being blank', () => {
		assert.strictEqual(listHelper.totalLikes([]), 0)
	})

	test('of one having zero likes', () => {
		assert.strictEqual(listHelper.totalLikes([{"likes": 0}]), 0)
	})

  test('of one having many likes', () => {
		assert.strictEqual(listHelper.totalLikes([{"likes": 5}]), 5)
	})

	test('of many having one like', () => {
		assert.strictEqual(listHelper.totalLikes([{"likes": 1}, {"likes": 1}, {"likes": 1}, {"likes": 1}]), 4)
	})

	test('of many having many likes', () => {
		assert.strictEqual(listHelper.totalLikes([{"likes": 3}, {"likes": 5}, {"likes": 2}]), 10)
	})
})

describe('favoriteBlog', () => {
	const listWithOneBlog = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  }]

	const listOfBlogs = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  },
	{
    _id: "57890ertyupdgh",
    title: "Coffeeshop",
    author: "John",
    url: "thisblog.fi",
    likes: 12,
    __v: 0
  },
	{
    _id: "iob5erushwgy74680",
    title: "How to deal with zombies",
    author: "Claire Redfield",
    url: "umbrella.com",
    likes: 2429,
    __v: 0
  }]
	
	test('when list is empty, the most liked one is an empty blog', () => {
		const result = listHelper.favoriteBlog([])
		assert.deepStrictEqual(result, {})
	})

	test('when list only has one blog, the most liked blog is that one', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog)
		assert.deepStrictEqual(result, listWithOneBlog[0])
	})

	test("when list has many blogs, the favorite one is correct", () => {
		const result = listHelper.favoriteBlog(listOfBlogs)
		assert.deepStrictEqual(result, listOfBlogs[2])
	})
})

describe('mostLikes', () => {
	const listWithOneBlog = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  }]

	const listOfBlogs = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  },
	{
    _id: "57890ertyupdgh",
    title: "Coffeeshop",
    author: "John",
    url: "thisblog.fi",
    likes: 12,
    __v: 0
  },
	{
    _id: "iob5erushwgy74680",
    title: "How to deal with zombies",
    author: "Claire Redfield",
    url: "umbrella.com",
    likes: 2429,
    __v: 0
  },
	{
    _id: "ghbs03486j2t89345yj",
    title: "Coffee Beans",
    author: "John",
    url: "thisblog.fi",
    likes: 10000,
    __v: 0
  }]

	test("when list is empty ", () => {
		const result = listHelper.mostLikes([])
		assert.deepStrictEqual(result, {})
	})

	test("when list has one author their likes are displayed", () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		assert.deepStrictEqual(result, {author: "Gandalf", likes: 100})
	})

	test("when list has an author with multiple blogs, the likes are combined", () => {
		const result = listHelper.mostLikes(listOfBlogs)
		assert.deepStrictEqual(result, {author: "John", likes: 10012})
	})

})

describe('mostBlogs', () => {
	const listWithOneBlog = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  }]

	const listOfBlogs = [{
    _id: "fzal34Gwk21591506",
    title: "Magic",
    author: "Gandalf",
    url: "somewhere.com",
    likes: 100,
    __v: 0
  },
	{
    _id: "57890ertyupdgh",
    title: "Coffeeshop",
    author: "John",
    url: "thisblog.fi",
    likes: 12,
    __v: 0
  },
	{
    _id: "iob5erushwgy74680",
    title: "How to deal with zombies",
    author: "Claire Redfield",
    url: "umbrella.com",
    likes: 2429,
    __v: 0
  },
	{
    _id: "ghbs03486j2t89345yj",
    title: "Coffee Beans",
    author: "John",
    url: "thisblog.fi",
    likes: 10000,
    __v: 0
  }]

	test("when list is empty ", () => {
		const result = listHelper.mostBlogs([])
		assert.deepStrictEqual(result, {})
	})

	test("when list has one author their amount of blogs is displayed", () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		assert.deepStrictEqual(result, {author: "Gandalf", blogs: 1})
	})

	test("when list has an author with multiple blogs and most likes, the amoung of blogs is summed", () => {
		const result = listHelper.mostBlogs(listOfBlogs)
		assert.deepStrictEqual(result, {author: "John", blogs: 2})
	})

})