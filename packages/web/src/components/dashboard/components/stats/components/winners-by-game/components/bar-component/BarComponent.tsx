import { createElement, MouseEvent, useCallback, useMemo } from "react";
import { useTooltip } from "@nivo/tooltip";
import { BarItemProps } from "@nivo/bar";
import { useAppContext } from "../../../../../../../../context/AppContext";

export type BarComponentProps = BarItemProps<{
  gameId: string;
  plays: number;
  wins: number;
  winner: string;
}>;

export const BarComponent = ({
  tooltip,
  bar: { data, ...bar },
  onMouseEnter,
  onMouseLeave,
  isInteractive,
}: BarComponentProps) => {
  const { x, y, width, height } = bar;

  const {
    indexValue,
    // gameId, wins, winner are not used but need to be destructured out of barData so that the rest param is only the individual players.
    // This is a side-effect of the fact that barData can only take string/number values, not an array.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: { gameId, plays, wins, winner, ...barData },
  } = data;

  const winners: { [key: string]: number } = barData;

  const { gamesById, playersById } = useAppContext();

  const { showTooltipFromEvent, hideTooltip } = useTooltip();

  const renderTooltip = useMemo(
    () => () => createElement(tooltip, { ...bar, ...data }),
    [tooltip, bar, data]
  );

  const handleTooltip = useCallback(
    (event: MouseEvent<SVGRectElement>) =>
      showTooltipFromEvent(renderTooltip(), event),
    [showTooltipFromEvent, renderTooltip]
  );
  const handleMouseEnter = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseEnter?.(data, event);
      showTooltipFromEvent(renderTooltip(), event);
    },
    [data, onMouseEnter, showTooltipFromEvent, renderTooltip]
  );
  const handleMouseLeave = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onMouseLeave?.(data, event);
      hideTooltip();
    },
    [data, hideTooltip, onMouseLeave]
  );

  return (
    <g
      onMouseEnter={isInteractive ? handleMouseEnter : undefined}
      onMouseMove={isInteractive ? handleTooltip : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
    >
      {/* This fills the area so the tooltip triggers in blank spaces within my bar design */}
      <rect x={x} y={y} width={width} height={height} fill="transparent" />

      {Object.entries(winners)
        .filter(([, wins]) => !!wins)
        .sort((a, b) => a[1] - b[1])
        .map(([playerId, wins], i, arr) => {
          const isFirst = i === 0;
          const isLast = i === arr.length - 1;
          const space = 3;
          const barHeight = 6;

          return (
            <rect
              key={playerId}
              rx={barHeight / 2}
              ry={barHeight / 2}
              x={
                x +
                (isFirst ? 0 : space) +
                width *
                  arr.reduce((acc, [, wins], j) => {
                    if (j < i) acc += wins / plays;
                    return acc;
                  }, 0)
              }
              y={y + (height - 16)}
              width={
                width * (wins / plays) - (isFirst || isLast ? space : space * 2)
              }
              height={barHeight}
              fill={playersById[playerId].color}
            />
          );
        })}
      <text y={y + 14} fill="black" fontSize={12}>
        {gamesById[indexValue].name}
      </text>
    </g>
  );
};

export default BarComponent;
