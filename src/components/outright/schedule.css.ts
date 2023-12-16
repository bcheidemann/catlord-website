import { style } from "@vanilla-extract/css";

export const streamItemsList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const streamItem = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "1rem",
  background:
    "linear-gradient(125deg,rgba(204,232,232,1) 0%,rgba(163,226,195,1) 100%)",
  borderRadius: "0.5rem",
  marginBottom: "1rem",
});

export const creatorName = style({
  margin: 0,
  marginBottom: "0.5rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
});

export const streamTime = style({
  margin: 0,
  marginBottom: "0.5rem",
  fontSize: "1rem",
  color: "#555",
});

export const streamLinkButton = style({
  display: "inline-block",
  padding: "0.5rem 1rem",
  background:
    "linear-gradient(125deg,rgba(164,212,212,1) 0%,rgba(133,206,165,1) 100%)",
  borderRadius: "0.5rem",
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "all 0.2s ease",
  cursor: "pointer",
  border: "2px solid #555",
  ":hover": {
    background:
      "linear-gradient(125deg,rgba(204,232,232,1) 0%,rgba(163,226,195,1) 100%)",
  },
});
