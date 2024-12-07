import React from "react";
import {
  Layout,
  PlayersLayout,
  SwitchLayout,
  SwitchRoot,
  SwitchThumb,
} from "./SelectPlayers.styles";
import { useAppContext } from "../../../../context/AppContext";

export const SelectPlayers = React.memo(() => {
  const {
    players,
    selectedPlayers,
    setSelectedPlayers,
    allResults,
    setAllResults,
  } = useAppContext();

  return (
    <Layout>
      <SwitchLayout>
        <div>Group Leaderboards</div>
        <SwitchRoot
          id="all"
          checked={allResults}
          onCheckedChange={setAllResults}
        >
          <SwitchThumb />
        </SwitchRoot>
        <div>All-time Leaderboard</div>
      </SwitchLayout>

      {!allResults && (
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
                  (checked || (!checked && selectedPlayers.length > 2)) &&
                  setSelectedPlayers(
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
      )}
    </Layout>
  );
});
