import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  rowGap: 32,
});

export const LayoutLeaderboard = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  //gridTemplateRows: "625px",
  rowGap: 32,
  columnGap: 128,
});
