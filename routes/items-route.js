import {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem
} from "../controllers/items-controller.js";

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" }
  }
};

const getItemsOpt = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item
      }
    }
  },
  handler: getItems
};

const getItemOpt = {
  schema: {
    response: {
      200: Item
    }
  },
  handler: getItem
};

const postItemOpt = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        }
      }
    },
    response: {
      201: Item
    }
  },
  handler: addItem
};

const deleteItemOpt = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" }
        }
      }
    }
  },
  handler: deleteItem
};

const updateItemOpt = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string"
        }
      }
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" }
        }
      }
    }
  },
  handler: updateItem
};

const itemsRoute = (fastify, options, done) => {
  fastify.get("/items", getItemsOpt);

  fastify.get("/items/:id", getItemOpt);

  fastify.post("/items", postItemOpt);

  fastify.delete("/items/:id", deleteItemOpt);

  fastify.put("/items/:id", updateItemOpt);

  done();
};

export default itemsRoute;
