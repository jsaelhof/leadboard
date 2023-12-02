import { Player } from "../../../../types";
import {
  Layout,
  PlayersLayout,
  SwitchLayout,
  SwitchRoot,
  SwitchThumb,
} from "./SelectPlayers.styles";

export type SelectPlayersProps = {
  allResults: boolean;
  onAllResultsChanged: (allResults: boolean) => void;
  players: Player[];
  selectedPlayers: string[];
  onSelectPlayers: (selectedPlayers: string[]) => void;
};

export const SelectPlayers = ({
  allResults,
  onAllResultsChanged,
  players,
  selectedPlayers,
  onSelectPlayers,
}: SelectPlayersProps) => {
  return (
    <Layout>
      <SwitchLayout>
        <div>Group Leaderboards</div>
        <SwitchRoot
          id="all"
          checked={allResults}
          onCheckedChange={onAllResultsChanged}
        >
          <SwitchThumb />
        </SwitchRoot>
        <div>All-time Leaderboard</div>
      </SwitchLayout>

      <PlayersLayout>
        {players.map(({ id, name }) => (
          <div
            key={id}
            style={{
              pointerEvents: allResults ? "none" : "auto",
              opacity: allResults ? 0.25 : 1,
            }}
          >
            <input
              type="checkbox"
              id={id}
              name={id}
              value={id}
              checked={selectedPlayers.includes(id)}
              onChange={({ target: { checked, value } }) =>
                onSelectPlayers(
                  checked
                    ? [...selectedPlayers, value]
                    : [...selectedPlayers].filter(
                        (playerId) => playerId !== value
                      )
                )
              }
            />
            <label htmlFor={id}> {name}</label>
          </div>
        ))}
      </PlayersLayout>
    </Layout>
  );
};
