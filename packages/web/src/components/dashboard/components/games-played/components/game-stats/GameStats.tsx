import { Label, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useAppContext } from "../../../../../../context/AppContext";
import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { GameStatsTooltip } from "./components/game-stats-tooltip/GameStatsTooltip";
import { extent } from "d3-array";

export type GameStatsProps = {
  game?: string;
};

export const GameStats = ({ game }: GameStatsProps) => {
  const { results, selectedPlayers, playersById, allResults } = useAppContext();

  const data = useMemo(() => {
    const counts: Record<string, number> = {};

    return results.reduce<{ date: number }[]>(
      (acc, { game: gameId, date, winner, players }) => {
        if (
          game === gameId &&
          (allResults ||
            (players.length === selectedPlayers.length &&
              players.every((player, i) => player === selectedPlayers[i])))
        ) {
          if (!counts[winner]) counts[winner] = 0;
          counts[winner]++;
          winner === "cole" && console.log(">>>> ", counts[winner]);

          acc.push({
            date: parseISO(date).getTime(),
            [winner]: counts[winner],
          });
        }
        return acc;
      },
      []
    );
  }, [allResults, game, results, selectedPlayers]);

  const [minDate, maxDate] = extent(data.map(({ date }) => date));

  // minDate !== undefined &&
  //   data.unshift({
  //     date: minDate,
  //     ...selectedPlayers.reduce<Record<string, number>>((acc, playerId) => {
  //       acc[playerId] = 0;
  //       return acc;
  //     }, {}),
  //   });

  return game ? (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 10, bottom: 24, right: 10 }}
    >
      <XAxis
        dataKey="date"
        type="category"
        allowDuplicatedCategory={false}
        scale="time"
        angle={90}
        tickMargin={26}
        tickFormatter={(value) => {
          return format(new Date(value), "MMM / dd");
        }}
        tick={{
          fontSize: 10,
        }}
      />

      <YAxis fontSize={10} allowDecimals={false}>
        <Label
          value="Wins"
          offset={0}
          position="center"
          angle={-90}
          dx={-12}
          fontSize={14}
        />
      </YAxis>

      {selectedPlayers.map((playerId) => (
        <Line
          type="stepAfter"
          key={playerId}
          dataKey={playerId}
          connectNulls
          dot={{ r: 3, stroke: "none", fill: playersById[playerId].color }}
          stroke={playersById[playerId].color}
          strokeWidth={2.5}
        />
      ))}

      <Tooltip
        content={<GameStatsTooltip />}
        // formatter={(value, name) => [value, playersById[name].name]}
        // labelFormatter={(value) => format(value, "MMMM do, yyyy")}
      />
    </LineChart>
  ) : (
    <div>Empty State</div>
  );
};
