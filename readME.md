# Voltz Tools API

# Group Tools

Group of all tools-related resources.

## All Tools [/tools]

### Retrieve all Tools [GET]

- Response 200 (application/json)

  ```js
  [
    {
  	id: 1,
  	title: "Notion",
  	link: "https://notion.so",
  	description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
  	tags: [
  		"organization",
  		"planning",
  		"collaboration",
  		"writing",
  		"calendar"
  	]
    },
    {
  	id: 2,
  	title: "json-server",
  	link: "https://github.com/typicode/json-server",
  	description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding chars"
  	tags: [
  		"api",
  		"json",
  		"schema",
  		"node",
  		"github",
  		"rest"
  	]
    },
    {
  	id: 3,
  	title: "fastify",
  	link: "https://www.fastify.io/",
  	description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports       HTTP2.",
  	tags: [
  		"web",
  		"framework",
  		"node",
  		"http2",
  		"https",
  		"localhost"
  	]
    }
  ]
  ```

## One Tool [/tools/{id}]

- Parameters

  - id: 1 (number) - An unique identifier of the message.

### Retrieve a Tool [GET]

- Response 200 (application/json)

  ```js
  [
    {
      id: 1,
      title: 'Notion',
      link: 'https://notion.so',
      description:
        'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
      tags: [
        'organization',
        'planning',
        'collaboration',
        'writing',
        'calendar',
      ],
    },
  ];
  ```

- Response 404 (application/json)

  ```js
  'Essa ferramenta não existe';
  ```

# Group User

Group of all user-related resources.

### Create an Account [POST]

- Attributes (object)

  - name: string
  - email: string
  - password: string

- Request (application/json)

- Response 201 (application/json)

  ```js
  201;
  ```

- Response 409 (application/json)

  ```js
  'Esse email já está sendo usado';
  ```

### Login [POST]

- Attributes (object)

  - email: string
  - password: string

- Request (application/json)

- Response 200 (application/json)

  ```js
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDUwMjk5MTQsImV4cCI6MTY0NTExNjMxNH0.4ZAJypnPLZ3f4Z3raWUvWQZVlCu8ADIstkIweeN9Gxo';
  }
  ```

- Response 401 (application/json)

  ```js
  'Senha incorreta';
  ```

Response 404 (application/json)

```js
'Não existe nenhum usuário com este email';
```
