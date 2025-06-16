import taskData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(200);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      archived: false,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData };
      return { ...tasks[index] };
    }
    throw new Error('Task not found');
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }
    throw new Error('Task not found');
  },

  async getByCategory(category) {
    await delay(200);
    return tasks.filter(t => t.category === category && !t.archived);
  },

  async getArchived() {
    await delay(200);
    return tasks.filter(t => t.archived);
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return tasks.filter(t => 
      !t.archived && 
      (t.title.toLowerCase().includes(searchTerm) || 
       t.category.toLowerCase().includes(searchTerm))
    );
  },

  async toggleComplete(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index].completed = !tasks[index].completed;
      return { ...tasks[index] };
    }
    throw new Error('Task not found');
  },

  async archive(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index].archived = true;
      return { ...tasks[index] };
    }
    throw new Error('Task not found');
  },

  async restore(id) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index].archived = false;
      tasks[index].completed = false;
      return { ...tasks[index] };
    }
    throw new Error('Task not found');
  }
};

export default taskService;