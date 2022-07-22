const { URL } = require('url');
const fetch = require('node-fetch');
const { query } = require('./util/hasura')

exports.handler = async () => {
    const { tasks } = await query({
        query: `query {
            tasks {
              id
              task
            }
          }`
    })

    return {
        statusCode: 200,
        body: JSON.stringify(tasks),
    };

}