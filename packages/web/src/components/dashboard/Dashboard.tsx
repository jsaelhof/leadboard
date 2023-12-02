import { useEffect, useMemo, useState } from "react";
import { Result } from "../../types";
import { GamesPlayed } from "./components/games-played/GamesPlayed";
import { Leaderboard } from "./components/leaderboard/Leaderboard";
import { SelectPlayers } from "./components/select-players/SelectPlayers";
import { useAppContext } from "../../context/AppContext";
import { AddResult } from "./components/add-result/AddResult";
import { AddGame } from "./components/add-game/AddGame";
import { Layout } from "./Dashboard.styles";

export const Dashboard = () => {
  const { players, results } = useAppContext();

  const allPlayers = useMemo(() => players.map(({ id }) => id), [players]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [allResults, setAllResults] = useState(false);

  // Initialize selected players but we have to wait for the app context to have loaded the data.
  useEffect(() => {
    setSelectedPlayers(players.map(({ id }) => id));
  }, [players]);

  const { counts, games } = useMemo(
    () =>
      results.reduce<{
        counts: { [key: string]: number };
        games: Result[];
      }>(
        (acc, result) => {
          if (allResults) {
            acc.counts[result.winner]++;
            acc.games.push(result);
          } else if (
            result.players.length === selectedPlayers.length &&
            selectedPlayers.sort().join(",") === result.players.sort().join(",")
          ) {
            acc.counts[result.winner]++;
            acc.games.push(result);
          }
          return acc;
        },
        {
          counts: (allResults ? allPlayers : selectedPlayers).reduce<{
            [key: string]: number;
          }>((acc, id) => {
            acc[id] = 0;
            return acc;
          }, {}),
          games: [],
        }
      ),
    [allPlayers, allResults, results, selectedPlayers]
  );

  console.log(games);

  const leaderboard = useMemo(
    () =>
      Object.entries(counts).sort(([, a], [, b]) => {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      }),
    [counts]
  );

  if (players.length === 0) return null;

  return (
    <div>
      <SelectPlayers
        allResults={allResults}
        onAllResultsChanged={setAllResults}
        players={players}
        selectedPlayers={selectedPlayers}
        onSelectPlayers={setSelectedPlayers}
      />
      <Layout>
        {leaderboard.length >= 2 ? (
          <>
            {!allResults && <AddResult selectedPlayers={selectedPlayers} />}
            {!allResults && <AddGame />}
            <Leaderboard leaderboard={leaderboard} />
            <GamesPlayed results={games} />
          </>
        ) : (
          <div>Please choose at least two players</div>
        )}
      </Layout>
    </div>
  );
};
