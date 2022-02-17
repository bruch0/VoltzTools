# Voltz Tools 🛠️

</br>

## About ❔

Voltz Tools is a company focused API to share usefull tools for the employees

</br>

## Features

- [x] Get all the tools
- [x] Get a tool by it's unique id
- [x] Sign in in the API
- [x] Log in the API and receive a token valid for 24 hours
- [x] Create a new tool (token needed)
- [x] Delete a tool (token needed)
- [x] Get all the logs (token needed)
- [x] Get all the logs from an user by it's unique id (token needed)
- [x] All the actions (Create and Delete) are registered in the logs

</br>

## Required technologies

- Node (16.14.0)

  - <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt" target="_blank">Click here if you need to install Node (follow option 1)</a>
  - To change Node version run "nvm use 16.14.0"

- Postgres
  - <a href="https://www.hostinger.com.br/tutoriais/instalar-postgresql-ubuntu" target="_blank">Click here if you need to install Postgres (first two commands)</a>

</br>

## How to run

### Clone this repository

```bash
git clone https://github.com/bruch0/VoltzTools.git
```

### Access the project folder on cmd/terminal

```bash
cd VoltzTools
```

### Open it in your favotire IDE

```bash
code .
```

### Write your PosgreSQL password in the appSetup file, line 7

```bash
POSTGRESQLPASSWORD=your_password_goes_here

If you white it incorrectly, the tests will fail and some features will not work
```

### Run the setup

```bash
bash ./appSetup
```

The command above will create the databases, install dependencies, run tests and coverage
<br>
After that, the app will start at localhost:3000
