const { query } = require('./util/hasura');

exports.handler = async (event) => {
    const { id } = JSON.parse(event.body);

    const result = await query({
        query: `
        mutation ($id: String = "") {
            delete_tasks_by_pk(id: $id) {
              id
            }
          }
    `,
        variables: { id },
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};