import { styled } from "@stitches/react";

export const Button = styled("button", {
  borderRadius: 999,
  fontSize: 14,
  border: "none",
  color: "White",
  background: "#424242",
  boxSizing: "border-box",
  lineHeight: "24px",
  padding: "4px 16px",
  width: "fit-content",
  cursor: "pointer",

  "&:hover": {
    background: "#626262",
  },

  "&:disabled": {
    background: "#C9C9C9",
    color: "#EEEEEE",
    boxShadow: "none",
  },
});
