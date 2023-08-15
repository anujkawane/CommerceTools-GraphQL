// const { createClient } = require('@commercetools/sdk-client')
// const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
// const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
// const { createApiBuilderFromCtpClient } = require("@commercetools/typescript-sdk");
  
// const fetch = require('node-fetch')
// require('dotenv').config()

// console.log('Getting started with commercetools Typescript SDK and GraphQL API');

// const { 
//     projectKey,
//     CTP_CLIENT_SECRET,
//     CTP_CLIENT_ID,
//     CTP_AUTH_URL,
//     CTP_API_URL,
//     CTP_SCOPES

// } = process.env;

// const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
//     host: CTP_AUTH_URL,
//     projectKey,
//     credentials: {
//         clientId: CTP_CLIENT_ID,
//         clientSecret: CTP_CLIENT_SECRET,
//     },
//     scopes: [CTP_SCOPES],
//     fetch,
// })


// // Create a httpMiddleware for the your project API URL
// const httpMiddleware = createHttpMiddleware({
//     host: CTP_API_URL,
//     fetch,
// })

// // Create a client using authMiddleware and httpMiddleware
// const client = createClient({
//     middlewares: [authMiddleware, httpMiddleware],
// })

// // Create a API root from API builder of commercetools platform client
// const apiRoot = createApiBuilderFromCtpClient(client)


// export default {
    
    
// }

const { createClient } = require('@commercetools/sdk-client');
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createApiBuilderFromCtpClient } = require('@commercetools/typescript-sdk');
const fetch = require('node-fetch');
require('dotenv').config();

const {
    projectKey,
    CTP_CLIENT_SECRET,
    CTP_CLIENT_ID,
    CTP_AUTH_URL,
    CTP_API_URL,
    CTP_SCOPES
} = process.env;

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: CTP_AUTH_URL,
    projectKey,
    credentials: {
        clientId: CTP_CLIENT_ID,
        clientSecret: CTP_CLIENT_SECRET,
    },
    scopes: [CTP_SCOPES],
    fetch,
});

const httpMiddleware = createHttpMiddleware({
    host: CTP_API_URL,
    fetch,
});

const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
});

const apiRoot = createApiBuilderFromCtpClient(client);

module.export =  {
    authMiddleware,
    httpMiddleware,
    client,
    apiRoot
};

