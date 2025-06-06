import React from 'react'
import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import compression from 'compression'
import { renderToString } from 'react-dom/server'

import { getJSON } from './utils/helpers'
import Banner from './renderer/Banner'

dotenvConfig()

const PORT = process.env.PORT || 3001

const app = express()
app.use(express.json())
app.use(compression())

app.get('/', (req, res) => {
  res.send(
    'Hello from the test Node SSR app. Type in a /slug to render the banner'
  )
})

// No-content handler for favicon s.t. it doesn't end up in the /:hash route
app.get('/favicon.ico', (req, res) => {
  res.status(204).end()
})

app.get('/:hash', async (req: any, res: any) => {
  try {
    const jsonData = await getJSON(req.params.hash)
    const html = renderToString(<Banner bannerData={jsonData.banner} />)

    res.set('Content-Type', 'text/html')
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&amp;family=Passion%20One:wght@400">
        <title>Node SSR Test</title>
        <style>
          body { margin: 0; font-family: sans-serif; }
          .banner { position: relative; overflow: hidden; }
          .layer { position: absolute; }
        </style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      </html>
    `)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
