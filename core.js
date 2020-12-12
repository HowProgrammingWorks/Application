export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(name, fn) {
    const event = this.events.get(name);
    if (event) event.add(fn);
    else this.events.set(name, new Set([fn]));
  }

  emit(name, ...args) {
    const event = this.events.get(name);
    if (!event) return;
    for (const fn of event.values()) {
      fn(...args);
    }
  }

  remove(name, fn) {
    const event = this.events.get(name);
    if (!event) return;
    if (event.has(fn)) {
      event.delete(fn);
      return;
    }
  }

  clear(name) {
    if (name) this.events.delete(name);
    else this.events.clear();
  }
}

const applications = {};

export class Application extends EventEmitter {
  constructor(moduleName, applicationName, config) {
    super();
    this.name = applicationName;
    this.module = moduleName;
    this.config = config;
  }

  static async create(moduleName, applicationName, options = {}) {
    const module = await import(`./${moduleName}/application.js`);
    const config = await import(`./${moduleName}/config.js`);
    const opt = Object.assign({}, config.default, options);
    const Module = module.default;
    const instance = new Module(moduleName, applicationName, opt);
    applications[applicationName] = instance;
    return instance;
  }
}
