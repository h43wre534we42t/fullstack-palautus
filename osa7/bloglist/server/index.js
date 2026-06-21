const app = require('./app')
const express = require('express')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const path = require('path')

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong', time: new Date().toISOString() })
})

// serve the built Vite frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})