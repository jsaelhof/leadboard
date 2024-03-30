import { useAppContext } from "../../../../context/AppContext";
import { Chart, Count, Layout, PlayerName } from "./Leaderboard.styles";
import Icon from "@mdi/react";
import {
  mdiController,
  mdiGuitarElectric,
  mdiHeart,
  mdiTeddyBear,
  mdiTie,
} from "@mdi/js";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";

export type LeaderboardProps = {
  leaderboard: [string, number][];
  gamesPlayed: number;
};

const icons: { [key: string]: string } = {
  jason: mdiGuitarElectric,
  lisa: mdiHeart,
  cole: mdiController,
  ashlyn: mdiTeddyBear,
  tie: mdiTie,
};

export const Leaderboard = ({ leaderboard, gamesPlayed }: LeaderboardProps) => {
  const { playersById } = useAppContext();

  return (
    <div>
      <h3>Leaderboard</h3>
      <Layout>
        {leaderboard.map(([playerId, count]) =>
          playerId === "tie" && count === 0 ? null : (
            <div key={playerId}>
              <PlayerName
                css={{
                  backgroundColor: playersById[playerId].color,
                }}
              >
                <Icon
                  path={icons[playerId]}
                  size={1.5}
                  style={{ opacity: 0.4 }}
                />
                <div>{playersById[playerId].name}</div>
                <Count>{count}</Count>
              </PlayerName>
            </div>
          )
        )}

        {gamesPlayed > 0 && (
          <Chart>
            <ResponsivePie
              data={leaderboard.map(([playerId, count]) => ({
                id: playerId,
                label: playersById[playerId].name,
                value: count,
                color: playersById[playerId].color,
              }))}
              colors={{ datum: "data.color" }}
              animate={false}
              innerRadius={0.5}
              arcLabelsSkipAngle={15}
              arcLabelsTextColor="black"
              arcLabelsComponent={({ datum, style }) => (
                // Have to use an animate.g to apply the style to position the labels even though I've disabled animation on the chart because the labels act weird when animating.
                <animated.g transform={style.transform}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {`${((datum.value / gamesPlayed) * 100).toFixed(0)}%`}
                  </text>
                </animated.g>
              )}
              valueFormat={(value) =>
                `${((value / gamesPlayed) * 100).toFixed(0)}%`
              }
              enableArcLinkLabels={false}
              sortByValue={true}
              padAngle={1}
              cornerRadius={4}
            />
          </Chart>
        )}
      </Layout>
    </div>
  );
};
