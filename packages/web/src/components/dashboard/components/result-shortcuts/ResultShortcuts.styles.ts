import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  columnGap: 24,
  gridAutoFlow: "column",
  width: "fit-content",
  margin: "0 auto",
});

export const GameLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  alignItems: "center",
  fontSize: "0.8em",
});

export const ShortcutButton = styled("button", {
  display: "block",
  width: "100px",
  padding: 8,
  borderRadius: 6,
  border: "1px solid #00000033",
  fontSize: "1.1em",

  "&:hover": {
    filter: "brightness(115%)",
  },
});
