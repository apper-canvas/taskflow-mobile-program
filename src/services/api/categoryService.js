import categoryData from '../mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...categoryData];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.id === id);
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      id: Date.now().toString(),
      ...categoryData,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(300);
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...categoryData };
      return { ...categories[index] };
    }
    throw new Error('Category not found');
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories.splice(index, 1);
      return true;
    }
    throw new Error('Category not found');
  },

  async updateTaskCount(categoryName, count) {
    await delay(200);
    const index = categories.findIndex(c => c.name === categoryName);
    if (index !== -1) {
      categories[index].taskCount = count;
      return { ...categories[index] };
    }
    return null;
  }
};

export default categoryService;