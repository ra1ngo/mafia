import Root from './root';

new Root({
  CLIENT_PORT: Number(process.env.CLIENT_PORT || 8080),
  SERVER_PORT: Number(process.env.SERVER_PORT || 9080),
});
