import { BackgroundBar, ForegroundBar, Layout } from "./ProgressBar.styles";

export type ProgressBarProps = {
  percentage: number;
  color: string;
};

export const ProgressBar = ({ percentage, color }: ProgressBarProps) => (
  <Layout>
    <BackgroundBar css={{ backgroundColor: color }} />
    <ForegroundBar
      css={{
        width: `${percentage * 100}%`,
        backgroundColor: color,
      }}
    />
  </Layout>
);
