import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { DB, Game, Player, Result } from "../types";

type Context = {
  players: Player[];
  playersById: { [key: string]: Player };
  allPlayers: string[];
  selectedPlayers: string[];
  setSelectedPlayers: (players: string[]) => void;
  allResults: boolean;
  setAllResults: (val: boolean) => void;
  games: Game[];
  gamesById: { [key: string]: Game };
  results: Result[];
  insertResult: (result: Result) => void;
  insertGame: (game: Game) => void;
};

const AppContext = createContext<Context>({
  players: [],
  playersById: {},
  allPlayers: [],
  selectedPlayers: [],
  setSelectedPlayers: () => {},
  allResults: false,
  setAllResults: () => {},
  games: [],
  gamesById: {},
  results: [],
  insertResult: () => {},
  insertGame: () => {},
});

const AppProvider = ({ children }: PropsWithChildren) => {
  const [db, setDB] = useState<DB>();

  // Clean this up...not sure I need this ignore boolean.
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

  const players = useMemo(
    () =>
      (db?.player.filter(({ id }) => id !== "tie") ?? []).sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    [db?.player]
  );

  const playersById = useMemo(
    () =>
      (db?.player ?? []).reduce<{ [key: string]: Player }>((byId, player) => {
        byId[player.id] = player;
        return byId;
      }, {}),
    [db?.player]
  );

  const games = useMemo(
    () =>
      db?.game.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      }) ?? [],
    [db?.game]
  );

  const gamesById = useMemo(
    () =>
      (db?.game ?? []).reduce<{ [key: string]: Game }>((byId, game) => {
        byId[game.id] = game;
        return byId;
      }, {}),
    [db?.game]
  );

  const results = useMemo(() => db?.results ?? [], [db?.results]);

  const insertResult = useCallback(
    (result: Result): void =>
      db &&
      setDB({
        ...db,
        results: [...db.results, result],
      }),
    [db]
  );

  const insertGame = useCallback(
    (game: Game): void =>
      db &&
      setDB({
        ...db,
        game: [...db.game, game],
      }),
    [db]
  );

  const allPlayers = useMemo(() => players.map(({ id }) => id), [players]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [allResults, setAllResults] = useState(false);

  // Initialize selected players once the DB is ready.
  // FIXME: This breaks if all players get unselected. This and some other things like allPlayers should only ever get set once.
  useMemo(() => {
    if (players && selectedPlayers.length === 0)
      setSelectedPlayers(players.map(({ id }) => id));
  }, [players, selectedPlayers.length]);

  const context = useMemo(() => {
    return {
      players,
      playersById,
      allPlayers,
      selectedPlayers,
      setSelectedPlayers,
      allResults,
      setAllResults,
      games,
      gamesById,
      results,
      insertResult,
      insertGame,
    };
  }, [
    allPlayers,
    allResults,
    games,
    gamesById,
    insertGame,
    insertResult,
    players,
    playersById,
    results,
    selectedPlayers,
  ]);

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
