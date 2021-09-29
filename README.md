# dio-aws-practice

## Calling the lambda

### Fetching all items

```sh
curl https://w3cor3yjo3.execute-api.us-east-1.amazonaws.com/items | json_pp
```

### Fetching one item

```sh
curl https://w3cor3yjo3.execute-api.us-east-1.amazonaws.com/items/prod01 | json_pp
```

### Creating an item

```sh
curl https://w3cor3yjo3.execute-api.us-east-1.amazonaws.com/items \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ "id": "prod01", "price": 29.99, "name": "Keyboard" }'
```

### Updating an item

```sh
curl https://w3cor3yjo3.execute-api.us-east-1.amazonaws.com/items/prod01 \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '{ "price": 39.99 }'
```

### Deleting an item

```sh
curl https://w3cor3yjo3.execute-api.us-east-1.amazonaws.com/items/prod01 -X DELETE
```
