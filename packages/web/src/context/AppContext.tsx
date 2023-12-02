import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { DB, Game, Player, Result } from "../types";

type Context = {
  players: Player[];
  playersById: { [key: string]: Player };
  games: Game[];
  gamesById: { [key: string]: Game };
  results: Result[];
  insertResult: (result: Result) => void;
  insertGame: (game: Game) => void;
};

const AppContext = createContext<Context>({
  players: [],
  playersById: {},
  games: [],
  gamesById: {},
  results: [],
  insertResult: () => {},
  insertGame: () => {},
});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [db, setDB] = useState<DB>();

  useEffect(() => {
    let ignore = false;
    fetch(`http://localhost:6001/db`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status} loading DB data`);
        }
        return response.json();
      })
      .then((data: DB) => {
        if (!ignore) setDB(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const context = useMemo(() => {
    return {
      players: (db?.player ?? []).sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
      playersById: (db?.player ?? []).reduce<{ [key: string]: Player }>(
        (byId, player) => {
          byId[player.id] = player;
          return byId;
        },
        {}
      ),
      games:
        db?.game.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          return 0;
        }) ?? [],
      gamesById: (db?.game ?? []).reduce<{ [key: string]: Game }>(
        (byId, game) => {
          byId[game.id] = game;
          return byId;
        },
        {}
      ),
      results: db?.results ?? [],
      insertResult: (result: Result): void =>
        db &&
        setDB({
          ...db,
          results: [...db.results, result],
        }),
      insertGame: (game: Game): void =>
        db &&
        setDB({
          ...db,
          game: [...db.game, game],
        }),
    };
  }, [db]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = React.useContext<Context>(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppContext, AppProvider, useAppContext };
