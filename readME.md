# Voltz Tools API

## Documentation 🧾

### Get all the tools

```
GET /tools
```

#### Possible response status

```bash
- 200: Everything is ok
```

<br>

### Get tool by id

```
GET /tools/:toolId
```

#### Possible response status

```bash
- 200: Everything is ok
- 404: Tool not found, the id is invalid
```
