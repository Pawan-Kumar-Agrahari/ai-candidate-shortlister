const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db.json');

// Ensure db.json exists with initial schema
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ candidates: [], shortlists: [] }, null, 2));
}

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { candidates: [], shortlists: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function decorateDoc(doc) {
  if (!doc) return null;
  return {
    ...doc,
    toObject: function() {
      const copy = { ...this };
      delete copy.toObject;
      return copy;
    }
  };
}

class MockModel {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async find() {
    const db = readDb();
    const rawItems = db[this.collectionName] || [];
    const items = rawItems.map(decorateDoc);
    
    // Attach mongoose-like chaining methods directly to the array
    items.sort = function(sortObj) {
      return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };
    items.populate = function() {
      return items;
    };
    
    return items;
  }

  async findById(id) {
    const db = readDb();
    const items = db[this.collectionName] || [];
    const found = items.find(item => item._id === id);
    return decorateDoc(found);
  }

  async create(data) {
    const db = readDb();
    if (!db[this.collectionName]) db[this.collectionName] = [];
    
    const newItem = {
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    db[this.collectionName].push(newItem);
    writeDb(db);
    return decorateDoc(newItem);
  }

  async insertMany(arr) {
    const db = readDb();
    if (!db[this.collectionName]) db[this.collectionName] = [];
    
    const newItems = arr.map(data => ({
      _id: Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    db[this.collectionName].push(...newItems);
    writeDb(db);
    return newItems.map(decorateDoc);
  }

  async findByIdAndUpdate(id, updateData, options) {
    const db = readDb();
    const items = db[this.collectionName] || [];
    const idx = items.findIndex(item => item._id === id);
    if (idx === -1) return null;
    
    items[idx] = {
      ...items[idx],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    writeDb(db);
    return decorateDoc(items[idx]);
  }

  async findByIdAndDelete(id) {
    const db = readDb();
    const items = db[this.collectionName] || [];
    const idx = items.findIndex(item => item._id === id);
    if (idx === -1) return null;
    
    const deleted = items.splice(idx, 1)[0];
    writeDb(db);
    return decorateDoc(deleted);
  }

  async deleteMany(query) {
    const db = readDb();
    db[this.collectionName] = [];
    writeDb(db);
    return { deletedCount: 0 };
  }
}

module.exports = {
  connect: async () => {
    console.log('Using Local JSON File Database (db.json)');
    return true;
  },
  model: (name) => {
    const collectionName = name.toLowerCase() + 's';
    return new MockModel(collectionName);
  },
  Schema: class Schema {
    constructor() {}
  }
};
