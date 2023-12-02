import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
const cors = require("cors");
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/db", (req: Request, res: Response) => {
  res.sendFile(path.resolve("./db.json"));
});

app.post(
  "/result",
  (
    req: Request<
      never,
      never,
      { game: string; players: string[]; winner: string; date: string }
    >,
    res: Response
  ) => {
    console.log(req.body);

    const { game, players, date, winner } = req.body;

    if (
      game &&
      players &&
      date &&
      winner &&
      players.length >= 2 &&
      players.includes(winner)
    ) {
      const data = readFileSync("./db.json", "utf8");
      const json = JSON.parse(data);
      json.results = [
        ...json.results,
        {
          id: uuidv4(),
          players,
          winner,
          game,
          date,
        },
      ];

      writeFileSync("./db.json", JSON.stringify(json, null, 2), {
        encoding: "utf8",
      });

      res.send(JSON.stringify(req.body));
    } else {
      res.send(JSON.stringify({ error: "FAILED TO ADD RESULT" }));
    }
  }
);

app.post(
  "/addgame",
  (
    req: Request<never, never, { gameId: string; gameName: string }>,
    res: Response
  ) => {
    const { gameId, gameName } = req.body;

    const data = readFileSync("./db.json", "utf8");
    const json = JSON.parse(data);

    if (
      gameId &&
      gameName &&
      gameId.length &&
      gameName.length &&
      !json.game.find(({ id }: { id: string }) => id === gameId)
    ) {
      const newGame = {
        id: gameId,
        name: gameName,
      };

      json.game = [...json.game, newGame];

      writeFileSync("./db.json", JSON.stringify(json, null, 2), {
        encoding: "utf8",
      });

      res.send(JSON.stringify(newGame));
    } else {
      res.send(JSON.stringify({ error: "FAILED TO ADD GAME" }));
    }
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
