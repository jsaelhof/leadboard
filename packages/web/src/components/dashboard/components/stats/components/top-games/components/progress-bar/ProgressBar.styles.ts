import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  gridTemplateAreas: "'progress'",
  borderRadius: 10,
  overflow: "hidden",
  width: "100%",
  height: 4,
});

export const BackgroundBar = styled("div", {
  gridArea: "progress",
  height: 4,
  opacity: 0.2,
});

export const ForegroundBar = styled("div", {
  gridArea: "progress",
  height: 4,
});
