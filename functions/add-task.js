const { query } = require('./util/hasura');

exports.handler = async (event) => {
    const { id, task } = JSON.parse(event.body);
    console.log(event.body);
    const result = await query({
        query: `
            mutation ($task: String = "", $id: String = "") {
            insert_tasks_one(object: {id: $id, task: $task}) {
              id
              task
            }
          }
    `,
        variables: { id, task },
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};