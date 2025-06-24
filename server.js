const next = require("next");
const http = require("http");

const app = next({ dev: false });
const handle = app.getRequestHandler();

console.log("Server starting...");
app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        handle(req, res);
      })
      .listen(process.env.PORT || 3000, () => {
        console.log("Server listening on port", process.env.PORT || 3000);
      });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
