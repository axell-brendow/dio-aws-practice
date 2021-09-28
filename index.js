const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const create = async (event, context) => {
    const body = JSON.parse(event.body);

    await dynamo
        .put({
            TableName: "Products",
            Item: {
                id: body.id,
                price: body.price,
                name: body.name
            }
        })
        .promise();

    return `Put item ${body.id}`;
}

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;

    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "POST /items": body = create(event, context); break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};
