const express = require("express");
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/scema')

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true

}))


app.listen(4000, () => {
  console.log("you are listeninig to port 4000");
})
