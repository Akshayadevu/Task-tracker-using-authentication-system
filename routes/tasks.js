const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/authmiddleware");

router.post("/", auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Task deleted");
});

module.exports = router;
