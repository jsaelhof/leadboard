import { useCallback, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { Label, Layout } from "./AddGame.styles";
import { Button } from "../../../button/Button";

export const AddGame = () => {
  const { insertGame } = useAppContext();
  const [gameId, setGameId] = useState<string | undefined>();
  const [gameName, setGameName] = useState<string | undefined>();

  const onAddGame = useCallback(async () => {
    if (gameId && gameName) {
      const response = await fetch("http://localhost:6001/addgame", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId,
          gameName,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        insertGame(json);
        setGameId(undefined);
        setGameName(undefined);
      }
    }
  }, [gameId, gameName, insertGame]);

  return (
    <div>
      <h3>Add New Game</h3>
      <Layout>
        <div>
          <Label htmlFor="newGame">Game Id</Label>
          <br />
          <input
            id="newGame"
            value={gameId ?? ""}
            onChange={({ target }) => {
              setGameId(
                target.value.trim().length ? target.value.trim() : undefined
              );
            }}
            style={{ width: 193 }}
          />
        </div>

        <div>
          <Label htmlFor="newGame">Name</Label>
          <br />
          <input
            id="name"
            value={gameName ?? ""}
            onChange={({ target }) => {
              setGameName(
                target.value.trim().length ? target.value : undefined
              );
            }}
            style={{ width: 193 }}
          />
        </div>

        <Button onClick={onAddGame} disabled={!gameId || !gameName}>
          Add Game
        </Button>
      </Layout>
    </div>
  );
};
