import { VariantProps } from "@stitches/react";
import { useAppContext } from "../../../../context/AppContext";
import { Count, Layout, PlayerName } from "./Leaderboard.styles";
import Icon from "@mdi/react";
import {
  mdiController,
  mdiGuitarElectric,
  mdiHeart,
  mdiTeddyBear,
} from "@mdi/js";

type PlayerIdVariant = VariantProps<typeof PlayerName>["playerId"];

export type LeaderboardProps = {
  leaderboard: [string, number][];
};

const icons: { [key: PlayerIdVariant]: string } = {
  jason: mdiGuitarElectric,
  lisa: mdiHeart,
  cole: mdiController,
  ashlyn: mdiTeddyBear,
};

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  const { playersById } = useAppContext();

  return (
    <div>
      <h3>Leaderboard</h3>
      <Layout>
        {leaderboard.map(([playerId, count]) => (
          <div key={playerId}>
            <PlayerName playerId={playerId as PlayerIdVariant}>
              <Icon
                path={icons[playerId]}
                size={1.5}
                style={{ opacity: 0.4 }}
              />
              <div>{playersById[playerId].name}</div>
              <Count>{count}</Count>
            </PlayerName>
          </div>
        ))}
      </Layout>
    </div>
  );
};
