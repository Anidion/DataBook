# DataBook

## A CPSC 471 Project

### Authors

- Ben Schmidt
- Ohiomah Imohi
- Haris Ahmad

# Development Guide

## Basic Set Up

Install [nvm](https://github.com/nvm-sh/nvm), then run `nvm install 20.11.1` to install Node v20.11.1.

Run `corepack enable` to enable `yarn` in your shell. [More information on corepack](https://yarnpkg.com/corepack)

Now you can use `yarn` in the next steps.

## Database Set Up

Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/). Install it with the standard options.

```bash
mysql_secure_installation
```
Choose at most `LOW` for password validation

Set any password for `root`

Everything else can be answered `Y`

Now the default security setup is done

Next we need to create the user for the db

```bash
sudo mysql -u root -p
```

```sql
CREATE USER 'databook'@'localhost' IDENTIFIED BY 'cpsc4711';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'databook'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```
Now we create the database
```sql
CREATE DATABASE db;
```

## First-time Set Up

Install packages
```bash
cd DataBook/
yarn

cd backend/
yarn

cd ../frontend
yarn
```

## Running Dev Environment

Running the backend will also run the migrations on the database you set up earlier
```bash
cd backend/
yarn dev
```
You can also use the VSCode Node.js debugger by hitting `F5` when `app.js` is focused.


```bash
cd frontend/
yarn dev
```

The frontend will be accessed on `localhost:3000`

The backend will be accessed on `localhost:3001` if needed

## Database Import

We have provided sample data to load into the database once the first migration has run. This will let you test out features like the library which requires books and authors to be populated.

Inside the `/sampleData` directory, you will find a .csv file for each table.

Using a tool like DBeaver, you can import the data directly into your local database.

## Dev Instructions

## Editing the DB Schema

Don't edit the DB directly, we should use Drizzle-Kit Migrations.

Modify `backend/db/schema.js` to add/edit columns, using this to guide you: [Drizzle ORM - Schema Declaration](https://orm.drizzle.team/docs/sql-schema-declaration)


## Drizzle-Kit Studio

You can view the DB directly using Drizzle Studio, which also lets you test schemas with Drizzle syntax instead of just SQL like you would in DBeaver.

Start it by running

```bash
yarn drizzle-kit studio
```

## Querying the Database

Read the [Drizzle Docs](https://orm.drizzle.team/docs/select).

Note, we need to use `schema.table`
```javascript
  const result = await db.select().from(schema.user);
```

