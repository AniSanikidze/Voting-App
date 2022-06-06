# Voting App

Simple voting app enables the user to add, vote, delete and get a result of the poll. The application is built using NodeJS framework - ExpressJS for implementing REST API and Svelte for building client-side application. The application is responsive.

## .env Configuration

The backend of the application is dependent of the MySQL database credentials that shoudl be provided in .env file.

.env file should be added in the backend folder with the following variables:

```
LIMIT = 100

HOST="localhost"

USER="user"

DATABASE="voting_app"

PASSWORD="password"
```
The variable values are provided as examples.

The user needs to provide an already existing database were tables can be created.
## Usage

```bash
cd voting-app
npm install
```
...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```
## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```