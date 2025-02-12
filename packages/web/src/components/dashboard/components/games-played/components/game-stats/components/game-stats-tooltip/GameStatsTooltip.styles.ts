import { styled } from "@stitches/react";

export const Background = styled("div", {
  minWidth: 150,
  borderRadius: 8,
  backgroundColor: "white",
  border: "1px solid lightgrey",
  boxShadow:
    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
  overflow: "hidden",
  position: "relative",
});

export const Layout = styled("div", {
  display: "grid",
  rowGap: 16,
  padding: 16,
  paddingBottom: 24,
});

export const Title = styled("div", {
  fontWeight: "bold",
});

export const Small = styled("div", {
  fontSize: "0.75em",
  color: "#666",
});

export const WinNum = styled("div", {
  fontSize: "1.3em",
  fontWeight: "500",
  marginBottom: 12,
});

export const Wave = styled("svg", {
  transform: "scaleX(-1)",
  position: "absolute",
  bottom: 0,
  left: 0,
  zIndex: 0,
  filter:
    "drop-shadow(0px 0px 2px rgb(0,0,0,0.2)) drop-shadow(0px -2px 5px rgb(0,0,0,0.1))",
});
