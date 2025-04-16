# node-ssr
This is a test app able to dynamically render HTML content using SSR

## Architecture
The app consists of a Node server layer that interacts with 3rd party APIs to read and parse dynamic JSON data.

It exposes a route that sends to the client the rendered dynamic HTML based on the above JSON structure.

The code is written in Typescript and makes use of Jest & React Testing Library for unit testing.

Existing environment variables can be found in `.env`.

### App structure
`index.ts` - main entry point for the app
`/renderer` - directory that holds renderers for all the different element types
`/utils` - directory that holds utilitary methods and types

### Architecture Summary:
- Server - Node, SSR, React, Typescript
- Authentication - n/a
- Database - n/a
- Caching - n/a

## Running the app

### Development
`npm install` - install dependencies

`npm run dev` - will start the server in watch mode

By default it starts on `localhost:3001` and can be tested by accessing a route like `http://localhost:3001/j2308jq`

### Production mode
`npm run build && npm start` - this will create a `/dist` directory and run the server from there

### Testing
Testing is done via Jest and React Testing Library. In order to run all tests execute:

`npm run test`
