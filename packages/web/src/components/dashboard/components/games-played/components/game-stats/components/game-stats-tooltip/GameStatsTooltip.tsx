import { format } from "date-fns";
import { useAppContext } from "../../../../../../../../context/AppContext";
import {
  Background,
  Layout,
  Small,
  Title,
  Wave,
  WinNum,
} from "./GameStatsTooltip.styles";
import { TooltipProps } from "recharts";

export const GameStatsTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  const { playersById } = useAppContext();

  console.log(payload);
  if (active && payload && payload[0].name) {
    const winner = payload[0].name;

    return (
      <Background>
        <Wave viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="playerGradient">
              <stop
                key={winner}
                stopColor={playersById[winner].color}
                // offset={0}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#playerGradient)"
            d="M0,128L60,112C120,96,240,64,360,53.3C480,43,600,53,720,90.7C840,128,960,192,1080,202.7C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Wave>

        <Layout>
          <div>
            <Title>{playersById[winner].name}</Title>
            <Small>{format(label, "MMMM do, yyyy")}</Small>
          </div>
          <div>
            <WinNum>Win #{payload[0].value}</WinNum>
          </div>
        </Layout>
      </Background>
    );
  }
};
