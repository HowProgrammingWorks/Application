import { Application } from '/core.js';

(async () => {
  const app = await Application.create('example', 'example1', { par: 100 });
  console.log({ app });
})();
