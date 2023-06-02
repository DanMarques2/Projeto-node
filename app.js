const express = require("express");
const PORT = 3000
const app = express();

app.get("/users", (request, response) => {
  return response.send("hello node");
});

app.listen(PORT, () => console.log(`port: ${PORT}`));
