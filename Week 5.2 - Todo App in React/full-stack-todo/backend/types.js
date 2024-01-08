const zod = require("zod");

const createTodo = zod.object({
  todoTitle: zod.string(),
  todoDescription: zod.string(),
});

const updateTodo = zod.object({
  todoId: zod.string(),
});

const userSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});

module.exports = {
  createTodo,
  updateTodo,
  userSchema,
};
