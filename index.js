const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const create = async (event, context) => {
    const body = JSON.parse(event.body);

    await dynamo
        .put({
            TableName: "Product",
            Item: {
                id: body.id,
                price: body.price,
                name: body.name
            }
        })
        .promise();

    return `Put item ${body.id}`;
}

const update = async (event, context) => {
    const body = JSON.parse(event.body);

    await dynamo
        .update({
            TableName: "Product",
            Key: {
                id: event.pathParameters.id
            },
            UpdateExpression: 'set price = :r',
            ExpressionAttributeValues: {
                ':r': body.price,
            },
        })
        .promise();

    return `Put item ${event.pathParameters.id}`;
}

const destroy = async (event, context) => {
    console.log(event.pathParameters.id)

    await dynamo
        .delete({
            TableName: "Product",
            Key: {
                id: event.pathParameters.id
            }
        })
        .promise();

    return `Deleted item ${event.pathParameters.id}`;
}

const findById = (event, context) => {
    return dynamo
        .get({
            TableName: "Product",
            Key: {
                id: event.pathParameters.id
            }
        })
        .promise();
}

const findAll = (event, context) => {
    return dynamo.scan({ TableName: "Product" }).promise();
}

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;

    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case "POST /items": body = await create(event, context); break;
            case "PUT /items/{id}": body = await update(event, context); break;
            case "DELETE /items/{id}": body = await destroy(event, context); break;
            case "GET /items/{id}": body = await findById(event, context); break;
            case "GET /items": body = await findAll(event, context); break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = JSON.stringify(err, null, 2);
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};
