const HOST =
    process.env.REACT_APP_NODE_ENV === 'DEV'
        ? 'http://localhost:4000'
        : process.env.REACT_APP_NODE_ENV === 'PROD'
          ? process.env.REACT_APP_API_URL
          : (console.error('Unknown mode:', process.env.MODE), null)

const HOMEPAGE =
    process.env.REACT_APP_NODE_ENV === 'DEV'
        ? 'http://localhost:3000'
        : process.env.REACT_APP_NODE_ENV === 'PROD'
          ? 'https://pipelines.lol'
          : (console.error('Unknown mode:', process.env.MODE), null)

export { HOMEPAGE, HOST }
