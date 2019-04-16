const express = require("express");
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/scema1')

const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true

}))

PORT =process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`you are listeninig to port ${PORT}`);
})
