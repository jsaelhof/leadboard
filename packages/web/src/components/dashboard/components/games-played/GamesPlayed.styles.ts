import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content max-content auto",
  columnGap: 32,
  rowGap: 8,
  alignItems: "baseline",
  overflowY: "scroll",
  height: 560,
});

export const ColumnHeader = styled("div", {
  fontWeight: "bold",
  marginBottom: 8,
});

export const PlayerName = styled("div", {
  borderRadius: 20,
  width: 75,
  padding: 2,
  display: "flex",
  gap: 8,
  alignItems: "center",
});

export const PlayerChip = styled("div", {
  width: 10,
  height: 10,
  borderRadius: "50%",
  boxShadow: "inset 0 0 1.5px rgba(0,0,0,0.5)",
});

export const GameDate = styled("div", {
  fontSize: "0.75em",
  color: "#666",
});
