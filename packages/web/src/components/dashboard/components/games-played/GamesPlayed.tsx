import { Fragment } from "react";
import { Result } from "../../../../types";
import { useAppContext } from "../../../../context/AppContext";
import { format, isSameDay, parseISO, subHours } from "date-fns";
import {
  ColumnHeader,
  GameDate,
  Layout,
  PlayerChip,
  PlayerName,
} from "./GamesPlayed.styles";

export type GamesPlayedProps = {
  results: Result[];
};

export const GamesPlayed = ({ results }: GamesPlayedProps) => {
  const { gamesById, playersById } = useAppContext();

  return (
    <div>
      <h3>Games Played</h3>

      <Layout>
        <ColumnHeader>Date</ColumnHeader>
        <ColumnHeader>Game</ColumnHeader>
        <ColumnHeader>Winner</ColumnHeader>

        {[...results].reverse().map(({ id, game, winner, ...rest }, i, arr) => {
          const date = parseISO(rest.date);
          const prevDate = i > 0 ? parseISO(arr[i - 1].date) : date;

          return (
            <Fragment key={id}>
              <GameDate>
                {i === 0 || !isSameDay(date, prevDate)
                  ? format(subHours(date, 6), "MMM dd")
                  : null}
              </GameDate>
              <div>{gamesById[game].name}</div>
              <PlayerName>
                <PlayerChip
                  css={{
                    backgroundColor: playersById[winner].color,
                  }}
                />
                {playersById[winner].name}
              </PlayerName>
            </Fragment>
          );
        })}
      </Layout>
    </div>
  );
};
