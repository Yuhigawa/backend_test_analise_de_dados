import "reflect-metadata";

import express from 'express';
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import { buildSchemaSync } from 'type-graphql'; 
import { DataResolver } from './src/data.resolver';
const app = express();

const schema = 
        buildSchemaSync({
          resolvers: [DataResolver],
          emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        });

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000, () => {
    console.log('<🚀> Server up an running at http://localhost:4000');
    console.log('<🚀> GraphQL API at http://localhost:4000/graphql');
});