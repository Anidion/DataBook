# DataBook Development Guide

## First-time Set Up

```bash
cd backend/
# install packages
yarn
# migrate DB. You must have the MySQL DB server running
yarn migrate
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

