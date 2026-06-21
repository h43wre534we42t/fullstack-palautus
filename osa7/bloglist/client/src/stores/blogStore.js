import { create } from 'zustand'
import blogService from '../services/blogs'
import useNotificationStore from './notificationStore'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      set(() => ({ blogs: sortedBlogs }))
    },
    createBlog: async (blog) => {
      try {
        const newBlog = await blogService.create(blog)
        set((state) => ({ blogs: [...state.blogs, newBlog] }))
        useNotificationStore.getState().actions.setNotification({
          text: `added blog ${newBlog.title} by ${newBlog.author}`,
          type: 'success',
        })
      } catch {
        useNotificationStore.getState().actions.setNotification({
          text: 'did not create blog',
          type: 'failure',
        })
      }
    },
    likeBlog: async (blog, id) => {
      const updatedBlog = await blogService.like(
        { ...blog, likes: blog.likes + 1 },
        id,
      )
      set((state) => ({
        blogs: state.blogs.map((a) => (a.id === id ? updatedBlog : a)),
      }))
      set((state) => ({
        blogs: state.blogs.toSorted((a, b) => b.likes - a.likes),
      }))
    },
    removeBlog: async (id) => {
      await blogService.remove(id)
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }))
      useNotificationStore.getState().actions.setNotification({
        text: 'successfully removed blog',
        type: 'success',
      })
    },
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)
