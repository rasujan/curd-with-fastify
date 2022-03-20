import Fastify from "fastify";
import * as swagger from "fastify-swagger";
import { itemsRoute } from "./routes/index.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: "/api-doc",
  swagger: {
    info: { title: "fastify-api" },
  },
  externalDocs: {
    url: "https://swagger.io",
    description: "Find more info here",
  },
  host: "localhost",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
});

fastify.register(itemsRoute);

const PORT = 5001;

const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.swagger();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
