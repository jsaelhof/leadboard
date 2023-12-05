import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { Label, Layout, Select } from "./AddResult.styles";
import { Button } from "../../../button/Button";

export type AddResultProps = {
  selectedPlayers: string[];
};

export const AddResult = ({ selectedPlayers }: AddResultProps) => {
  const { games, playersById, insertResult } = useAppContext();

  const [game, setGame] = useState(games[0].id);
  const [winner, setWinner] = useState(selectedPlayers[0]);
  const [busy, setBusy] = useState(false);

  // If the currently set winner is not in the new list of winners, then the previously set winner value is invalid for the new group of players. Reset it.
  useEffect(() => {
    if (winner !== "tie" && !selectedPlayers.includes(winner)) {
      setWinner(selectedPlayers[0]);
    }
  }, [selectedPlayers, winner]);

  const onAddResult = useCallback(async () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 3000);

    const response = await fetch("http://localhost:6001/result", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game,
        winner,
        date: new Date().toISOString(),
        players: selectedPlayers,
      }),
    });

    if (response.ok) {
      const json = await response.json();
      insertResult(json);
    }
  }, [game, insertResult, selectedPlayers, winner]);

  return (
    <div>
      <h3>Record Winner</h3>
      <Layout>
        <div>
          <Label htmlFor="selectGame">Game</Label>
          <br />
          <Select
            id="selectGame"
            value={game}
            onChange={({ target }) => setGame(target.value)}
          >
            {games.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="winner">Winner</Label>
          <br />
          <Select
            id="winner"
            value={winner}
            onChange={({ target }) => setWinner(target.value)}
          >
            {selectedPlayers.map((id) => (
              <option key={id} value={id}>
                {playersById[id].name}
              </option>
            ))}
            <option value="tie">Tie</option>
          </Select>
        </div>

        <Button onClick={onAddResult} disabled={busy}>
          Add Winner
        </Button>
      </Layout>
    </div>
  );
};
