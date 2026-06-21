import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import useNotificationStore from './notificationStore'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        set(() => ({ user: user }))
        blogService.setToken(user.token)
      }
    },
    handleLogin: async (username, password) => {
      try {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        blogService.setToken(user.token)
        set(() => ({ user: user }))
        useNotificationStore.getState().actions.setNotification({
          text: `logged in as ${user.name}`,
          type: 'success',
        })
      } catch {
        useNotificationStore.getState().actions.setNotification({
          text: 'failed login',
          type: 'failure',
        })
      }
    },
    handleLogout: async () => {
      window.localStorage.removeItem('loggedBloglistUser')
      blogService.setToken(null)
      set(() => ({ user: null }))
      useNotificationStore.getState().actions.setNotification({
        text: 'logged out',
        type: 'success',
      })
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
