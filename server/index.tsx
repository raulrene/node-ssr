import React from 'react'
import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import compression from 'compression'
import { renderToString } from 'react-dom/server'

import { getJSON } from './utils/helpers'
import Banner from './renderer/Banner.tsx'

dotenvConfig()

const APP_PORT = process.env.APP_PORT || 3001

const app = express()
app.use(express.json())
app.use(compression())

app.get('/:hash', async (req: any, res: any) => {
  try {
    const jsonData = await getJSON(req.params.hash)
    const html = renderToString(<Banner bannerData={jsonData.banner} />)

    res.set('Content-Type', 'text/html')
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
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

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`)
})
