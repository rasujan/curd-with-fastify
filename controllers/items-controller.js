import pkg from "lodash";

import { createRequire } from "module"; // Bring in the ability to create the 'require' method

const require = createRequire(import.meta.url); // construct the require method
const items = require("../data.json"); // use the require method

const { find, uniqueId, remove } = pkg;

const getItems = async (request, reply) => {
  reply.send(items);
};

const getItem = async (request, reply) => {
  const { id } = request.params;
  const _item = find(items, { id });

  reply.send(_item);
};

const addItem = async (request, reply) => {
  const { name } = request.body;

  const item = {
    id: uniqueId("i"),
    name
  };

  // eslint-disable-next-line no-import-assign
  items.push(item);

  reply.code(201).send(item);
};

const deleteItem = async (request, reply) => {
  const { id } = request.params;

  remove(items, (n) => id === n.id);

  reply.send({ message: "Item deleted" });
};

const updateItem = async (request, reply) => {
  const { id } = request.params;
  const { name } = request.body;

  // eslint-disable-next-line no-const-assign
  items = items.map((item) => (id === item.id ? { id, name } : item));

  reply.send({ message: "Item updated" });
};

// eslint-disable-next-line object-curly-newline
export { getItem, getItems, addItem, deleteItem, updateItem };
