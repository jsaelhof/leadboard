import { useCallback, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { GameLayout, Layout, ShortcutButton } from "./ResultShortcuts.styles";

export type ResultShortcutsProps = {
  gameIds: string[];
  playerIds: string[];
};

export const ResultShortcuts = ({
  gameIds,
  playerIds,
}: ResultShortcutsProps) => {
  const { games, playersById, insertResult, selectedPlayers } = useAppContext();

  // const [game, setGame] = useState(games[0].id);
  // const [winner, setWinner] = useState(selectedPlayers[0]);
  const [busy, setBusy] = useState(false);

  const onAddResult = useCallback(
    async (game: string, winner: string) => {
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
    },
    [insertResult, selectedPlayers]
  );

  return (
    <Layout>
      {games
        .filter(({ id }) => gameIds.includes(id))
        .map(({ id, name }) => (
          <GameLayout>
            <div id={id}>{name}</div>
            {playerIds.map((playerId) => (
              <ShortcutButton
                id={playerId}
                onClick={() => onAddResult(id, playerId)}
                disabled={busy}
                css={{ backgroundColor: playersById[playerId].color }}
              >
                {playersById[playerId].name}
              </ShortcutButton>
            ))}
          </GameLayout>
        ))}
    </Layout>
  );
};
