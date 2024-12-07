import { useMemo } from "react";
import { Result } from "../../types";
import { GamesPlayed } from "./components/games-played/GamesPlayed";
import { Leaderboard } from "./components/leaderboard/Leaderboard";
import { SelectPlayers } from "./components/select-players/SelectPlayers";
import { useAppContext } from "../../context/AppContext";
import { AddResult } from "./components/add-result/AddResult";
import { AddGame } from "./components/add-game/AddGame";
import { Layout, LayoutLeaderboard } from "./Dashboard.styles";
import Stats from "./components/stats/Stats";
import { ResultShortcuts } from "./components/result-shortcuts/ResultShortcuts";

export const Dashboard = () => {
  const { players, results, allPlayers, selectedPlayers, allResults } =
    useAppContext();

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
          }>(
            (acc, id) => {
              acc[id] = 0;
              return acc;
            },
            {
              tie: 0,
            }
          ),
          games: [],
        }
      ),
    [allPlayers, allResults, results, selectedPlayers]
  );

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
      <SelectPlayers />

      {/* FIXME: This config of player combinations and the games to set as a shortcut for each should be externalized. */}
      {!allResults &&
        selectedPlayers.length === 2 &&
        selectedPlayers.includes("jason") &&
        selectedPlayers.includes("cole") && (
          <ResultShortcuts
            gameIds={["spacebase", "sevenwondersduel"]}
            playerIds={["jason", "cole"]}
          />
        )}

      {selectedPlayers.length >= 2 ? (
        <Layout>
          {!allResults && (
            <div>
              <AddResult />
              <AddGame />
            </div>
          )}

          <LayoutLeaderboard>
            <Leaderboard leaderboard={leaderboard} gamesPlayed={games.length} />
            <GamesPlayed results={games} />
          </LayoutLeaderboard>

          <div>
            <Stats results={games} />
          </div>
        </Layout>
      ) : (
        <div>Please choose at least two players</div>
      )}
    </div>
  );
};
