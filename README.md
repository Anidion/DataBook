# DataBook Development Guide

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
CREATE TABLE db;
```

After setting up the backend and validating it's connecting fine, try run 
```bash
cd backend/
yarn drizzle-kit studio
```
to open a web-based DB viewer and confirm the schema was migrated correctly.

If you want a more standard tool, follow these instructions to setup DBeaver: [StackOverflow](https://stackoverflow.com/questions/61749304/connection-between-dbeaver-mysql)


## First-time Set Up

```bash
cd DataBook/
# install pre-commit packages
yarn

cd backend/
# install packages
yarn
# migrate DB. You must have the MySQL DB server running
yarn migrate

cd ../frontend
# install packages
yarn
```

## Running Dev Environment

```bash
cd backend/
yarn dev
```

You can also use the VSCode Node.js debugger by hitting `F5` when `app.js` is focused.

```bash
cd frontend/
yarn dev
```

## Editing the DB Schema

Don't edit the DB directly, we should use Drizzle-Kit Migrations.

Modify `backend/db/schema.js` to add/edit columns, using this to guide you: [Drizzle ORM - Schema Declaration](https://orm.drizzle.team/docs/sql-schema-declaration)


## Drizzle-Kit Studio

You can view the DB directly using Drizzle Studio, which also lets you test schemas with Drizzle syntax instead of just SQL like you would in DBeaver.

Start it by running

```bash
drizzle-kit studio
```

## Querying the Database

Read the [Drizzle Docs](https://orm.drizzle.team/docs/select).

Note, we need to use `schema.table` which is not specified by the docs.
```javascript
  const result = await db.select().from(schema.user);
```

