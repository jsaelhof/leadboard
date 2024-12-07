import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
});

export const Player = styled("div", {
  display: "flex",
  columnGap: 8,
  alignItems: "center",
});

export const PlayerChip = styled("div", {
  width: 10,
  height: 10,
  borderRadius: "50%",
  boxShadow: "inset 0 0 1.5px rgba(0,0,0,0.5)",
});

export const GameList = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content auto",
  columnGap: 8,
  rowGap: 8,
  marginTop: 4,
  marginLeft: 18,
  fontSize: "0.75em",
});

export const GameListProgress = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content auto",
  columnGap: 8,
  alignItems: "center",
});
