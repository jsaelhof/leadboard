import * as Switch from "@radix-ui/react-switch";
import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  width: "fit-content",
  margin: "32px auto",
});

export const SwitchLayout = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 16,
});

export const PlayersLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, max-content)",
  columnGap: 24,
});

export const SwitchRoot = styled(Switch.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "cornflowerblue",
  borderRadius: "9999px",
  position: "relative",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  '&[data-state="checked"]': { backgroundColor: "orange" },
});

export const SwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: "0 2px 2px black",
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});
