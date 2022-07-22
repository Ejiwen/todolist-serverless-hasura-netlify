const { query } = require('./util/hasura');

exports.handler = async (event) => {
    const { id, task } = JSON.parse(event.body);

    const result = await query({
        query: `
        mutation ($id: String = "", $task: String = "") {
            update_tasks_by_pk(pk_columns: {id: $id}, _set: {task: $task}) {
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