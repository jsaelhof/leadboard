import { useAppContext } from "../../../../../../context/AppContext";
import { Result } from "../../../../../../types";
import { ChartTitle } from "../../Stats.styles";
import { GameList, Layout, Player, PlayerChip } from "./BestGame.styles";

export type BestGameProps = {
  results: Result[];
};

const BestGame = ({ results }: BestGameProps) => {
  const { gamesById, playersById, selectedPlayers } = useAppContext();

  const bestGames = selectedPlayers.reduce<{
    [key: string]: [number, string[]];
  }>((best, playerId) => {
    const gamesByWinCount = results.reduce<{ [key: string]: number }>(
      (acc, { winner, game }) => {
        if (playerId === winner) {
          if (!acc[game]) acc[game] = 0;
          acc[game]++;
        }
        return acc;
      },
      {}
    );

    const mostWins = Math.max(...Object.values(gamesByWinCount));

    best[playerId] = [
      mostWins,
      Object.entries(gamesByWinCount)
        .filter(([, wins]) => wins === mostWins)
        .map(([gameId]) => gameId),
    ];

    return best;
  }, {});

  return (
    <div>
      <ChartTitle>Best Game</ChartTitle>

      <Layout>
        {Object.entries(bestGames).map(([playerId, [wins, games]]) => (
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
              {games.map((gameId) => (
                <div key={gameId}>
                  {gamesById[gameId].name} - {wins} wins
                </div>
              ))}
            </GameList>
          </div>
        ))}
      </Layout>
    </div>
  );
};

export default BestGame;
