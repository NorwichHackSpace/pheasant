import { red, blue, lightBlue, yellow, green } from "@material-ui/core/colors";

const white = "#fff";
const black = "#000";

const themePalette = {
  Light: {
    type: "light",
    background: { paper: "rgb(255, 255, 255)", default: "rgb(245, 245, 245)" },
    custom: {
      primary: "#2992B6",
      secondary: "#20718E", //003E67 dark blue
      contrastText: white,
      backgroundImage: "url(/logos/logo-hoz-eaaa.png)",
    },
    contrastText: black,
  },
  Dark: {
    type: "dark",
    background: { paper: "rgb(66, 66, 66)", default: "rgb(51, 51, 51)" },
    custom: {
      primary: "rgb(33, 33, 33)",
      secondary: "rgb(55, 55, 55)",
      contrastText: white,
      backgroundImage: "url(/logos/logo-hoz-eaaa.png)",
    },
    contrastText: white,
  },
  Contrast: {
    type: "dark",
    background: { paper: "rgb(66, 66, 66)", default: "rgb(51, 51, 51)" },
    custom: {
      primary: "rgb(33, 33, 33)",
      secondary: "rgb(55, 55, 55)",
      contrastText: white,
      backgroundImage: "url(/logos/logo-hoz-eaaa.png)",
    },
    contrastText: white,
  },
};
// theme on of basil, crane, pinky, rally, reply
const makePalette = (type) => {
  const { contrastText, ...rest } = themePalette[type];
  return {
    ...rest,
    contrastText,
    contrastThreshold: 2,
    border: "#DFE3E8",
    divider: "#DFE3E8",
    common: {
      black,
      white,
      contrastText,
      commonBackground: "rgb(45, 45, 45)",
      neutral: "#E4E7EB",
      muted: "#9EA0A4",
    },
    primary: {
      light: "#7986cb",
      main: "rgba(41, 146, 182, 1)",
      dark: "#303f9f",
      contrastText,
    },
    secondary: {
      light: "#ff4081",
      main: "rgba(32, 113, 142, 1)",
      dark: "#c51162",
      contrastText: "#fff",
    },
    success: {
      light: "#E7F8E8",
      main: "#45CD64",
      dark: "#11892C",
      contrastText,
    },
    info: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      contrastText,
    },
    warning: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700],
      contrastText,
    },
    danger: {
      light: "#e57373",
      main: "rgba(207, 0, 21, 1)",
      dark: "#d32f2f",
      contrastText,
    },
  };
};

export default makePalette;