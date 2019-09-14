import { MongoRestOrmServer } from '.';

const port = 3000;

new MongoRestOrmServer().startServer({ port });
