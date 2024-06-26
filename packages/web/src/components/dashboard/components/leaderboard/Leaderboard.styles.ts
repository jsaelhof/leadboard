import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const PlayerName = styled("div", {
  fontSize: 16,
  marginBottom: 8,
  padding: "8px 16px",
  borderRadius: 12,
  display: "grid",
  gridTemplateColumns: "32px 1fr 100px",
  gap: 16,
  alignItems: "center",
  boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
});

export const Count = styled("div", { fontSize: 32, textAlign: "right" });

export const Chart = styled("div", {
  height: 200,
  marginTop: 24,
});
