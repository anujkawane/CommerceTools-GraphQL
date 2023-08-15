const { createClient } = require('@commercetools/sdk-client')
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
const { createApiBuilderFromCtpClient } = require("@commercetools/typescript-sdk");
  
const fetch = require('node-fetch')
require('dotenv').config()

console.log('Getting started with commercetools Typescript SDK and GraphQL API');

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
})


// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
    host: CTP_API_URL,
    fetch,
})

// Create a client using authMiddleware and httpMiddleware
const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
})

// Create a API root from API builder of commercetools platform client
const apiRoot = createApiBuilderFromCtpClient(client)

// New customer data
const createCustomerMutationVariable = {
    "newCustomer": {
      "email": "anujkawanet@gmail.com",
      "password": "12345678",
      "firstName": "Anuj", 
      "lastName": "Kawane"
    }
  };

// mutation to create new customer
const createCustomerMutation = `
    mutation createCustomer ($newCustomer: CustomerSignUpDraft!) {
        customerSignUp (draft: $newCustomer) {
            customer {
                id
            }
        }
    }
`;

// GraphQL query to get Customer `email` and `firstName`
const getCustomerByIdQuery = `
    query ($id: String) {
        customer (id: $id) {
          email
          firstName
        }
    }
`;

// Create a new customer and return customer id
const createNewCustomer = async () => {
    const result  = await apiRoot.withProjectKey({projectKey}).graphql().post({
        body : {
            query: createCustomerMutation,
            variables: createCustomerMutationVariable,
        }
    }).execute()

    console.log("In Create New Customer -----", JSON.stringify(result));

    return result.body.data.customerSignUp.customer.id;
}



// console.log("NEW CU---", createNewCustomer)


// Get customer's email and firstName by customer id
const getCustomerById = async (customerId) => {

    try{
        const result = await apiRoot.withProjectKey({projectKey}).graphql().post({
            body: {
                query: getCustomerByIdQuery,
                variables: {
                    id: customerId
                }
            }
        })
        .execute();
    
        console.log("result getCustomerId ", JSON.stringify(result));

        return result;

    }catch(e){
        console.log(e);
    }
   
}

async function main() {
    try {
        const newCustomerId = await createNewCustomer();
        const newlyCreatedCustomer = await getCustomerById(newCustomerId);
        
        console.log(JSON.stringify(newlyCreatedCustomer)); // Final result
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();

