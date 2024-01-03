# WEEK 4.3 - MONGO DEEP DIVE

`UNDERSTANDING CRUD, MONGOOSE AND BUILDING AN END-TO-END AUTHENTICATED APP`

`What is a Database?`

- It is a place where data is stored persistently, meanwhile servers are transient.
- Servers autoscale.

`Examples of data stored in databases (LinkedIn)`

1. User Data
2. Users Posts
3. Users Connection Relationships
4. Messages

`To get data from the database`

1. Get me my feed (GET Request)
2. Does auth checks (Express | Backend checks if a user is valid)
3. Gives back all posts for the user (Database)

`Question:`

1. Why don't we let the user hit the database directly?
2. What extra does the HTTP server provide exactly?

`Answer:`

1. Databases were created using protocols that browsers don't understand.
2. Databases don't have granular access as a first-class citizen, very hard to do user-specific access in them.
3. There are some databases (firebase) that let you get rid of the HTTP server and try their best to provide granular access.

## CRUD

`Databases usually allow access to 4 primitives`

1. CREATE DATA
2. READ DATA
3. UPDATE DATA
4. DELETE DATA

```text
Let's see the API for the Mongoose library.
Eventually, we'll be using `prisma` (which is the industry standard way of doing this)
In Mongoose first, you have to define the schema.
This sounds counter-intuitive since MongoDB is schemaless.

- That is true, but the mongoose makes you define schema for things like autocompletion / validating data before it goes in the DB to make sure you're doing things right.
- Schemaless DBs can be very dangerous, using schemas in mongo makes it slightly less dangerous.
```

```js
User.findOne({
  username: String,
});
```

## DEFINING A SCHEMA

```js
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  price: 5999,
});
```

`3 Jargons to know in Databases`

1. Cluster

   - A collection of databases that is managed by a single instance of a running database server.

2. Database

   - A Database is a collection of tables.

3. Table

   - Within a database, a structured format organizing data into rows and columns.
