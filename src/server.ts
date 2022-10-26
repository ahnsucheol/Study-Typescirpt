import http from "http";
import { createApp } from "./app";

const app = createApp();

const server = http.createServer(app);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
