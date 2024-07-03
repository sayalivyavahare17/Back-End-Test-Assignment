const express = require('express');
const app = express();
const port = 3000; 

app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Task Manager API! Use /tasks to manage tasks.');
});

// GET /tasks - Retrieve a list of all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === parseInt(taskId));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  const newTask = { id: tasks.length + 1, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;
  let task = tasks.find(task => task.id === parseInt(taskId));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.title = title;
  task.description = description;
  res.status(200).json(task);
});

// DELETE /tasks/:id - Delete task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
