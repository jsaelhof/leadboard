import { styled } from "@stitches/react";

export const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "max-content max-content auto",
  columnGap: 32,
  rowGap: 8,
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
  width: 16,
  height: 16,
  borderRadius: "50%",
  boxShadow: "inset 0 0 1.5px rgba(0,0,0,0.5)",

  variants: {
    playerId: {
      jason: {
        backgroundColor: "Orange",
      },
      lisa: {
        backgroundColor: "CornflowerBlue",
      },
      cole: {
        backgroundColor: "Red",
      },
      ashlyn: {
        backgroundColor: "Pink",
      },
      tie: {
        backgroundColor: "LightGray",
      },
    },
  },
});
