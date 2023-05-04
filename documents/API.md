# Routes

## POST /auth/register

Creates a new user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Haddad",
  "role": 0,
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is successfully created, the server will respond with a status code of 201 and a JSON object representing the new user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "role": 0,
  "email": "adhamhaddad.dev@gmail.com"
}
```

## POST /auth/login

Authenticate user.

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "email": "adhamhaddad.dev@gmail.com",
  "password": "secret-password"
}
```

### Response

If the user is exists and authenticated successfully, the server will respond with a status code of 200 and a JSON object representing the authenticated user:

```json
{
  "user": {
    "id": 1,
    "first_name": "Adham",
    "last_name": "Haddad",
    "role": 0,
    "created_at": "",
    "updated_at": null,
    "deleted_at": null
  },
  "accessToken": "<Access-Token>",
  "refreshToken": "<Refresh-Token>"
}
```

## POST /auth/auth-me

Refresh the access and refresh tokens.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the refresh token is exists in redis and valid, the server will respond with a status code of 200 and a JSON object representing a new tokens:

```json
{
  "accessToken": "<Access-Token>"
}
```

<hr />

## GET /users/:id

Get a user by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is exists, the server will respond with a status code of 200 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Haddad",
  "email": "adhamhaddad.dev@gmail.com",
  "role": 0,
  "created_at": "",
  "updated_at": null,
  "deleted_at": null
}
```

## PATCH /users/:id

Update a user by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "first_name": "Adham",
  "last_name": "Ashraf"
}
```

### Response

If the user is exists and updated, the server will respond with a status code of 204 and a JSON object representing the received user:

```json
{
  "id": 1,
  "first_name": "Adham",
  "last_name": "Ashraf"
}
```

<hr />

## POST /emails

Create a new email.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
  "user_id": 1,
  "email": "adham@gmail.com"
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the created email:

```json
{
  "id": 2,
  "email": "adham@gmail.com",
  "is_default": false,
  "is_verified": false,
  "user_id": 1
}
```

## GET /emails/:user_id

Get the user emails by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is valid, the server will respond with a status code of 200 and a JSON object representing the fetched emails:

```json
[
    {
        "id": 1,
        "email": "adham@gmail.com",
        "is_default": false,
        "is_verified": false,
        "user_id": 1
    },
    {
        "id": 2,
        "email": "adham@gmail.com",
        "is_default": false,
        "is_verified": false,
        "user_id": 1
    }
]
```

<hr />

## POST /phones

Create a new phone.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "user_id": 1,
    "phone": "12345678910"
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the created order:

```json
{
  "id": 1,
  "phone": "12345678910",
  "is_default": false,
  "is_verified": false,
  "user_id": 1
}
```

## GET /phones/:user_id

Get the user phones by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the updated order:

```json
[
    {
        "id": 1,
        "phone": "12345678910",
        "is_default": false,
        "is_verified": false,
        "user_id": 1
    }
]
```

<hr />

## POST /user-addresses

Create a new user address.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "user_id": 1,
    "city": "cairo",
    "postal_code": "02",
    "address1": "address-1",
    "address2": "address-2"
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the created address:

```json
{
    "id": 1,
    "city": "cairo",
    "postal_code": "02",
    "address1": "address-1",
    "address2": "address-2",
    "user_id": 1
}
```

## GET /user-addresses/:user_id

Get the user addresses by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the user-addresses array:

```json
[
    {
        "id": 1,
        "city": "cairo",
        "postal_code": "02",
        "address1": "address-1",
        "address2": "address-2",
        "user_id": 1
    }
]
```

<hr />

## POST /categories

Create a new category.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Electronics",
    "slug": "electronics",
    "icon_url": "icon_url",
    "user_id": 1
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the created category:

```json
{
    "id": 1,
    "name": "Electronics",
    "slug": "electronics",
    "icon_url": "icon_url",
    "user_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
}
```

## GET /categories/all/:user_id

Get the user categories by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the user categories array:

```json
[
    {
        "id": 1,
        "name": "Electronics",
        "slug": "electronics",
        "icon_url": "icon_url",
        "user_id": 1,
        "created_at": "TIMESTAMP",
        "updated_at": null,
        "deleted_at": null
    }
]
```

## PATCH /categories/:id

Update category by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Electronics",
    "slug": "electronics",
    "icon_url": "icon_url"
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the updated category:

```json
{
    "id": 1,
    "name": "Electronics",
    "slug": "electronics",
    "icon_url": "icon_url",
    "user_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": "TIMESTAMP",
    "deleted_at": null
}
```

## DELETE /categories/:id

Delete category by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "user_id": 1
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the deleted category:

```json
{
    "id": 1
}
```

<hr />

## POST /sub-categories

Create a new sub-category.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Computers & Tablets",
    "slug": "computers-tablets",
    "category_id": 1
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the sub-category:

```json
{
    "id": 1,
    "name": "Computers & Tablets",
    "slug": "computers-tablets",
    "category_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
}
```

## GET /sub-categories/all/:category_id

Get the sub-categories by category id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is a biker and valid, the server will respond with a status code of 201 and a JSON object representing the sub-category array:

```json
[
    {
        "id": 1,
        "name": "Computers & Tablets",
        "slug": "computers-tablets",
        "category_id": 1,
        "created_at": "TIMESTAMP",
        "updated_at": null,
        "deleted_at": null
    }
]
```

## PATCH /sub-categories/:id

Update the sub category by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Computers & Tablets",
    "slug": "computers-and-tablets"
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the updated sub category:

```json
{
    "id": 1,
    "name": "Computers & Tablets",
    "slug": "computers-and-tablets",
    "category_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": "TIMESTAMP",
    "deleted_at": null
}
```

## DELETE /sub-categories/:id

Delete the sub category by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "category_id": 1,
    "user_id": 1
}
```

### Response

If the user and category are valid, the server will respond with a status code of 200 and a JSON object representing the deleted sub category id:

```json
{
    "id": 1
}
```

<hr />

## POST /products

Create a new products.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Laptop Lenovo",
    "slug": "lenovo-labs",
    "product_desc": "product description",
    "sub_category_id": 1
}
```

### Response

If the sub-category is valid, the server will respond with a status code of 201 and a JSON object representing the product:

```json
{
    "id": 1,
    "name": "Laptop Lenovo",
    "slug": "lenovo-labs",
    "product_desc": "product description",
    "sub_category_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
}
```

## GET /products/:sub_category_id

Get products by sub_category_ id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the sub category is valid, the server will respond with a status code of 200 and a JSON object representing the sub-category products array:

```json
[
    {
        "id": 1,
        "name": "Laptop Lenovo",
        "slug": "lenovo-labs",
        "product_desc": "product description",
        "sub_category_id": 1,
        "created_at": "TIMESTAMP",
        "updated_at": null,
        "deleted_at": null
    }
]
```

## PATCH /products/:id

Update the product by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "name": "Laptop Lenovo",
    "slug": "lenovo-labs",
    "product_desc": "new product description"
}
```

### Response

If the user is valid, the server will respond with a status code of 201 and a JSON object representing the updated product:

```json
{
    "id": 1,
    "name": "Laptop Lenovo",
    "slug": "lenovo-labs",
    "product_desc": "new product description",
    "sub_category_id": 1,
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
}
```

## DELETE /products/:id

Delete the product by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "sub_category_id": 1,
    "category_id": 1,
    "user_id": 1
}
```

### Response

If the user and category are valid, the server will respond with a status code of 200 and a JSON object representing the deleted product id:

```json
{
    "id": 1
}
```

<hr />

## POST /orders

Create a new order.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "user_id": 1,
    "items_id": 1
}
```

### Response

If the order is valid, the server will respond with a status code of 201 and a JSON object representing the order:

```json
{
    "id": 1,
    "user_id": 1,
    "items_id": 1,
    "order_status": "PENDING",
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
}
```

## GET /orders/:user_id

Get orders by user id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Response

If the user is valid, the server will respond with a status code of 200 and a JSON object representing the user orders array:

```json
[
    {
    "id": 1,
    "user_id": 1,
    "items_id": 1,
    "order_status": "PENDING",
    "created_at": "TIMESTAMP",
    "updated_at": null,
    "deleted_at": null
    }
]
```

## DELETE /orders/:id

Delete the order by id.

### Request Headers

The request headers should have the following properties:

```json
"headers": {
    "Authorization": "Bearer <Access-Token>",
    "X-Refresh-Token": "Bearer <Refresh-Token>"
}
```

### Request Body

The request body should be a JSON object with the following properties:

```json
{
    "user_id": 1
}
```

### Response

If the user is valid, the server will respond with a status code of 200 and a JSON object representing the deleted order id:

```json
{
    "id": 1
}
```
