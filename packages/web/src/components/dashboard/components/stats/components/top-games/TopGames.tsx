import { Fragment } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { Result } from "../../../../../../types";
import { ChartTitle } from "../../Stats.styles";
import {
  GameList,
  GameListProgress,
  Layout,
  Player,
  PlayerChip,
} from "./TopGames.styles";
import { ProgressBar } from "./components/progress-bar/ProgressBar";

type GameStats = {
  game: string;
  wins: number;
  plays: number;
  percentage: number;
};

export type BestGameProps = {
  results: Result[];
};

const TopGames = ({ results }: BestGameProps) => {
  const { gamesById, playersById, selectedPlayers } = useAppContext();

  const topGames = selectedPlayers.reduce<Record<string, GameStats[]>>(
    (topGames, playerId) => {
      const playersStatsByGame = results.reduce<Record<string, GameStats>>(
        (acc, { winner, game }) => {
          if (!acc[game])
            acc[game] = {
              game,
              wins: 0,
              plays: 0,
              percentage: 0,
            };

          playerId === winner && acc[game].wins++;
          acc[game].plays++;
          acc[game].percentage = acc[game].wins / acc[game].plays;
          return acc;
        },
        {}
      );

      topGames[playerId] = Object.values(playersStatsByGame)
        // Remove games with less than 5 plays. This is an arbitrary value right now but I'm trying to weed out cases
        // where the players best game is 100% because they won 1-of-1 or 3-of-4.
        // This does have the issue of filtering out all games!
        .filter(({ plays }) => plays >= 5)
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 10);

      return topGames;
    },
    {}
  );

  return (
    <div>
      <ChartTitle>Top Games</ChartTitle>

      <Layout>
        {Object.entries(topGames).map(([playerId, gameStats]) => (
          <div key={playerId}>
            <Player>
              <PlayerChip
                css={{
                  backgroundColor: playersById[playerId].color,
                }}
              />
              {playersById[playerId].name}
            </Player>

            <GameList>
              {gameStats.map(({ game, percentage }, i) => (
                <Fragment key={game}>
                  <div>{i + 1}.</div>
                  <div>
                    <div style={{ marginBottom: 2 }}>
                      {gamesById[game].name}
                    </div>
                    <GameListProgress>
                      <div>{(percentage * 100).toFixed(0)}%</div>
                      <ProgressBar
                        percentage={percentage}
                        color={playersById[playerId].color}
                      />
                    </GameListProgress>
                  </div>
                </Fragment>
              ))}
            </GameList>
          </div>
        ))}
      </Layout>
    </div>
  );
};

export default TopGames;
