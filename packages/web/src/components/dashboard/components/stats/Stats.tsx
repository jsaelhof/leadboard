import { Result } from "../../../../types";
import { Layout } from "./Stats.styles";
import TopGames from "./components/top-games/TopGames";
import WinnersByGame from "./components/winners-by-game/WinnersByGame";

export type StatsProps = {
  results: Result[];
};

const Stats = ({ results }: StatsProps) => {
  return (
    <div>
      <h3>Stats</h3>
      <Layout>
        <TopGames results={results} />
        <WinnersByGame results={results} />
      </Layout>
    </div>
  );
};

export default Stats;
