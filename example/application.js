import { Application } from '../core.js';

export default class Example extends Application {
  constructor(...args) {
    super(...args);
    console.log('Example application loaded');
  }
}
