import { Fragment, useState } from "react";
import { Result } from "../../../../types";
import { useAppContext } from "../../../../context/AppContext";
import { format, isSameDay, isThisYear, parseISO, subHours } from "date-fns";
import {
  ColumnHeader,
  GameDate,
  Layout,
  ListLayout,
  PlayerChip,
  PlayerName,
} from "./GamesPlayed.styles";
import { GameStats } from "./components/game-stats/GameStats";

export type GamesPlayedProps = {
  results: Result[];
};

export const GamesPlayed = ({ results }: GamesPlayedProps) => {
  const { gamesById, playersById } = useAppContext();
  const [currentGame, setCurrentGame] = useState<string>();

  return (
    <div>
      <h3>Games Played</h3>

      <Layout>
        <ListLayout>
          <ColumnHeader>Date</ColumnHeader>
          <ColumnHeader>Game</ColumnHeader>
          <ColumnHeader>Winner</ColumnHeader>

          {[...results]
            .reverse()
            .map(({ id, game, winner, ...rest }, i, arr) => {
              const date = parseISO(rest.date);
              const prevDate = i > 0 ? parseISO(arr[i - 1].date) : date;

              return (
                <Fragment key={id}>
                  <GameDate>
                    {i === 0 || !isSameDay(date, prevDate)
                      ? format(
                          subHours(date, 6),
                          isThisYear(date) ? "MMM dd" : "MMM dd, yyyy"
                        )
                      : null}
                  </GameDate>
                  <div
                    onMouseOver={() => setCurrentGame(game)}
                    onMouseLeave={() => setCurrentGame(undefined)}
                  >
                    {gamesById[game].name}
                  </div>
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
        </ListLayout>

        <GameStats game={currentGame} />
      </Layout>
    </div>
  );
};
