import { keyframes, style } from "@vanilla-extract/css";

export const fadeIn = keyframes({
  "0%": {
    transform: "translateY(80px) rotateX(-15deg);",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0) rotateX(0deg);",
    opacity: 1,
  },
});

export const fadeOut = keyframes({
  "0%": {
    transform: "translateY(0);",
    opacity: 1,
  },
  "100%": {
    transform: "translateY(80px);",
    opacity: 0,
  },
});

export const slideUp = keyframes({
  "0%": {
    transform: "translateY(100dvh)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0dvh)",
    opacity: 1,
  },
});

export const intro = {
  wrapper: style({
    height: "50dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100dvh",
    perspective: "1000px",
    gridArea: "content",
  }),
  container: style({
    margin: "auto",
    width: "fit-content",
    animationName: fadeIn,
    animationDuration: "1.5s",
    animationDelay: "1s",
    animationFillMode: "forwards",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    rowGap: "24px",
  }),
  h1: style({
    fontSize: "3rem",
    fontWeight: 800,
    margin: 0,
  }),
  accent: style({
    color: "var(--accent)",
  }),
  continue: style({
    border: "2px solid rgba(var(--accent-rgb), 12.5%)",
    borderRadius: "0.5rem",
    backgroundColor: "#151517",
    color: "rgba(var(--accent-rgb), 50%)",
    padding: "1rem 1.5rem",
    fontSize: "1.25rem",
    backgroundImage: `linear-gradient(
      45deg,
      transparent 20%,
      rgba(var(--accent-rgb), 25%) 50%,
      transparent 80%
    )`,
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "-150px",
    cursor: "pointer",
    transition: "border 0.2s ease-in-out, color 0.2s ease-in-out",
    ":hover": {
      transition:
        "background-position-x 0.2s linear, border 0.2s ease-in-out, color 0.2s ease-in-out",
      backgroundPositionX: "150px",
      border: "2px solid rgba(var(--accent-rgb), 25%)",
      color: "rgba(var(--accent-rgb), 100%)",
    },
  }),
};

export const content = {
  wrapper: style({
    gridArea: "content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100dvh",
    background: "rgba(255,255,255,12.5%)",
    color: "white",
    textAlign: "center",
    backdropFilter: "blur(22px)",
  }),
};

export const main = style({
  overflow: "hidden",
  display: "grid",
  gridTemplateAreas: '"content"',
  minHeight: "100dvh",
});
