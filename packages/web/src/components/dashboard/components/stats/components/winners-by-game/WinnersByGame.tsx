import { ResponsiveBar } from "@nivo/bar";
import BarComponent from "./components/bar-component/BarComponent";
import Tooltip from "./components/tooltip/Tooltip";
import { ChartTitle } from "../../Stats.styles";
import { useMemo } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { Result } from "../../../../../../types";

export type WinnersByGameProps = {
  results: Result[];
};

const WinnersByGame = ({ results }: WinnersByGameProps) => {
  const { gamesById } = useAppContext();

  const winnerByGame = useMemo(
    () =>
      results.reduce<{
        [key: string]: {
          plays: number;
          winningPlayers: { [key: string]: number };
        };
      }>((acc, { game, winner, players }) => {
        if (!acc[game])
          acc[game] = {
            plays: 0,
            winningPlayers: players.reduce<{ [key: string]: number }>(
              (counts, playerId) => {
                counts[playerId] = 0;
                return counts;
              },
              { tie: 0 }
            ),
          };

        acc[game].plays++;
        acc[game].winningPlayers[winner]++;
        return acc;
      }, {}),
    [results]
  );

  console.log(winnerByGame);

  const chartData = useMemo(
    () =>
      Object.entries(winnerByGame)
        .map(([gameId, { plays, winningPlayers }]) => {
          const { wins, winners } = Object.entries(winningPlayers).reduce<{
            wins: number;
            winners: string[];
          }>(
            (acc, [playerId, wins]) => {
              if (wins > acc.wins) {
                acc.wins = wins;
                acc.winners = [playerId];
              } else if (wins > 0 && wins === acc.wins) {
                acc.winners.push(playerId);
              }
              return acc;
            },
            {
              wins: 0,
              winners: [],
            }
          );

          return {
            gameId,
            plays,
            wins,
            winner: winners.join(","),
            ...winningPlayers,
          };
        })
        .sort((a, b) => a.plays - b.plays),
    [winnerByGame]
  );

  return (
    <div>
      <ChartTitle>Winners by Game</ChartTitle>
      <div style={{ height: chartData.length * 36 }}>
        <ResponsiveBar
          data={chartData}
          animate={false}
          indexBy="gameId"
          keys={["plays"]}
          padding={0}
          layout="horizontal"
          enableGridY={false}
          enableGridX={false}
          borderRadius={4}
          label={({ indexValue, data }) =>
            `${gamesById[indexValue].name} (${data.winner})`
          }
          tooltip={Tooltip}
          barComponent={BarComponent}
        />
      </div>
    </div>
  );
};

export default WinnersByGame;
