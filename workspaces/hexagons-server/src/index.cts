import * as express from "express";

const app = express();

app.use(express.static("workspaces/hexagons-server/public"));

const server = app.listen(7700, () => {
  console.log("Listening on", server.address());
});
