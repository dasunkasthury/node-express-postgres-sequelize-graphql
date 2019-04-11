const express = require("express");
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/scema1')

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true

}))


app.listen(4000, () => {
  console.log("you are listeninig to port 4000");
})
