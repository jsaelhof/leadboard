import { VariantProps } from "@stitches/react";
import { useAppContext } from "../../../../context/AppContext";
import { Count, Layout, PlayerName } from "./Leaderboard.styles";
import Icon from "@mdi/react";
import {
  mdiController,
  mdiGuitarElectric,
  mdiHeart,
  mdiTeddyBear,
  mdiTie,
} from "@mdi/js";

type PlayerIdVariant = VariantProps<typeof PlayerName>["playerId"];

export type LeaderboardProps = {
  leaderboard: [string, number][];
};

const icons: { [key: string]: string } = {
  jason: mdiGuitarElectric,
  lisa: mdiHeart,
  cole: mdiController,
  ashlyn: mdiTeddyBear,
  tie: mdiTie,
};

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  console.log(leaderboard);
  const { playersById } = useAppContext();

  return (
    <div>
      <h3>Leaderboard</h3>
      <Layout>
        {leaderboard.map(([playerId, count]) =>
          playerId === "tie" && count === 0 ? null : (
            <div key={playerId}>
              <PlayerName playerId={playerId as PlayerIdVariant}>
                <Icon
                  path={icons[playerId]}
                  size={1.5}
                  style={{ opacity: 0.4 }}
                />
                <div>
                  {playerId === "tie" ? "Tie" : playersById[playerId].name}
                </div>
                <Count>{count}</Count>
              </PlayerName>
            </div>
          )
        )}
      </Layout>
    </div>
  );
};
