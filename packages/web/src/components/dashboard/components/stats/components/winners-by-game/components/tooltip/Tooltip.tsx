import { BarTooltipProps } from "@nivo/bar";
import { useAppContext } from "../../../../../../../../context/AppContext";
import {
  Background,
  Layout,
  Pct,
  Small,
  Title,
  Wave,
  WinnerName,
} from "./Tooltip.styles";

export type TooltipProps = BarTooltipProps<{
  gameId: string;
  plays: number;
  wins: number;
  winner: string;
}>;

const Tooltip = ({
  indexValue,
  data: { wins, plays, ...data },
}: TooltipProps) => {
  const { gamesById, playersById } = useAppContext();

  const winner = data.winner.split(",");

  return (
    <Background>
      <Wave viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="playerGradient">
            {winner.reverse().map((playerId, i) => (
              <stop
                key={playerId}
                stopColor={playersById[playerId].color}
                offset={`${i === 0 ? "0" : (100 / (winner.length - 1)) * i}%`}
              />
            ))}
          </linearGradient>
        </defs>
        <path
          fill="url(#playerGradient)"
          d="M0,128L60,112C120,96,240,64,360,53.3C480,43,600,53,720,90.7C840,128,960,192,1080,202.7C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Wave>

      <Layout>
        <div>
          <Title>{gamesById[indexValue].name}</Title>
          <Small>{`${plays} game${plays === 1 ? "" : "s"} played`}</Small>
        </div>
        <div>
          <WinnerName>
            {winner.map((playerId) => playersById[playerId].name).join(" | ")}
          </WinnerName>
          <Pct>{Math.round((wins / plays) * 100)}%</Pct>
        </div>
      </Layout>
    </Background>
  );
};

export default Tooltip;
