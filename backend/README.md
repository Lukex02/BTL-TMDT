## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Schema

### Login
Use "username" or "email"
```bash
{
  "username": "john_doe", # "email": "john@example.com",
  "password": "123456"
}
```
### Signup
```bash
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "customer"
}
```
### User
Needs to be managing session and refresh token manually using the endpoint `/auth/refresh`.

When doing authentication (/login, /register, /refresh, /me)
```bash
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "seller",
  "avatarUrl": "https://example.com/avatar/jane.jpg",
  "session": {
    "accessToken": "abcxyz",
    "refreshToken": "123abc",
    "expiresIn": 3600,
    "expiresAt": 1774457693
  }
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T08:00:00.000Z"
}
```

When doing user management (/user)
```bash
{
  "id": "2964de3d-1202-4131-8f47-1b6c14e150aa",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "customer",
  "avatarUrl": "https://example.com/avatar/jane.jpg",
  "address": "123 Main St",
  "phone": "1234567890",
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T08:00:00.000Z"
}
```
### Product
```bash
{
  "id": 101,
  "seller": {
    "id": 1,
    "username": "john_doe",
    "avatarUrl": "https://example.com/avatar/jane.jpg"
  }
  "name": "AMD Ryzen 5 5600X",
  "description": "6-core CPU, 12 threads, 3.7GHz base clock",
  "category": {
    "id": 1,
    "name": "CPU"
    "description": "CPU"
  },
  "price": 220.0,
  "stock": 15,
  "status": "active",
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T08:00:00.000Z",
  "attributes": [
    {
      "attributeName": "Socket",
      "attributeValue": "AM4"
    },
    {
      "attributeName": "Cores",
      "attributeValue": "6"
    },
    {
      "attributeName": "Threads",
      "attributeValue": "12"
    },
    {
      "attributeName": "Base Clock",
      "attributeValue": "3.7GHz"
    }
  ],
  "images": [
    {
      "url": "https://example.com/images/ryzen5600x.jpg",
      "isMain": true,
      "createdAt": "2026-03-20T08:00:00.000Z"
    }
  ]
}
```
### Order
```bash
{
  "id": 5001,
  "user": {
    "id": 1,
    "username": "john_doe",
    "avatarUrl": "https://example.com/avatar/jane.jpg"
  }
  "totalAmount": 440.0,
  "status": "paid",
  "createdAt": "2026-03-21T10:00:00.000Z",
  "updatedAt": "2026-03-21T10:05:00.000Z",
  "items": [
    {
      "id": 1,
      "product": {
        "id": 101,
        "seller": {
          "id": 1,
          "username": "john_doe",
          "avatarUrl": "https://example.com/avatar/jane.jpg"
        }
        "name": "AMD Ryzen 5 5600X",
        "description": "6-core CPU, 12 threads, 3.7GHz base clock",
        "category": ["CPU"],
        "price": 220.0,
        "stock": 15,
        "status": "active",
        "createdAt": "2026-03-20T08:00:00.000Z",
        "updatedAt": "2026-03-20T08:00:00.000Z",
        "attributes": [
          {
            "attributeName": "Socket",
            "attributeValue": "AM4"
          },
          {
            "attributeName": "Cores",
            "attributeValue": "6"
          },
          {
            "attributeName": "Threads",
            "attributeValue": "12"
          },
          {
            "attributeName": "Base Clock",
            "attributeValue": "3.7GHz"
          }
        ],
        "images": [
          {
            "url": "https://example.com/images/ryzen5600x.jpg",
            "isMain": true,
            "createdAt": "2026-03-20T08:00:00.000Z"
          }
        ]
      }
      "quantity": 2,
      "unitPrice": 220.0
    }
  ]
}
```
### Payment
```bash
{
  "id": 9001,
  "orderId": 5001,
  "amount": 440.0,
  "method": "credit_card",
  "status": "completed",
  "paidAt": "2026-03-21T10:03:00.000Z"
}
```
### Review
```bash
{
  "id": 3001,
  "user": {
    "id": 2,
    "username": "jane_doe",
    "avatarUrl": "https://example.com/avatar/jane.jpg"
  },
  "rating": 5,
  "comment": "Hiệu năng rất tốt",
  "createdAt": "2026-03-22T12:00:00.000Z"
}
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
