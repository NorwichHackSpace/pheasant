import { red, blue, lightBlue, yellow, green } from "@material-ui/core/colors";

export const EAAAcolors = {
	primary: {
		yellow: "#ffc600", //mid
		red: "#DD042D", //darkish
		coolgrey: "#646469", //Slightly darker than secondary
	},
	secondary: {
		coolgrey: "#ABAAAA", //Slight lighter than primary
		darkgrey: "#464749", //Darkest all the greys
		blue: "#8BD1EA", //light
	}

}

export const themePalette = {
  //What seems to be the correct formatting...
  EAAA: {
    type: "light", //A little misgiving. The main collor of yellow is light, but he secondary red is dark.
    primary: { 
    	main: EAAAcolors.primary.yellow, //You only need to specify the main here, the light and dark are calculated
    	contrastText: "black",
    }, 
    secondary: { 
    	main: EAAAcolors.primary.red, 
    	contrastText: "white",
    },
    background: { paper: EAAAcolors.secondary.coolgrey, default: EAAAcolors.primary.coolgrey },
    contrastText: "black",
    logos: {
      wideImage: "url(/logos/logo-hoz-eaaa.png)",
    },
  },
  
  //Old formatting...
  Light: {
    type: "light",
    primary: { 
    	main: EAAAcolors.primary.yellow, 
    	contrastText: "white",
    }, 
    secondary: { 
    	main: EAAAcolors.primary.red, 
    	contrastText: "white",
    },
    background: { paper: "rgb(255, 255, 255)", default: "rgb(244, 244, 244)"},
    contrastText: "white",
    logos: {
      wideImage: "url(/logos/logo-hoz-eaaa.png)",
    },
  },
  Dark: {
    type: "dark",
    primary: { 
    	main: "rgb(33, 33, 33)", 
    	contrastText: "white",
    }, 
    secondary: { 
    	main: EAAAcolors.primary.yellow, 
    	contrastText: "white",
    },
    background: { paper: "rgb(66, 66, 66)", default: "rgb(51, 51, 51)" },
    contrastText: "white",
    logos: {
      wideImage: "url(/logos/logo-hoz-eaaa.png)",
    },
  },
  Contrast: {
    type: "dark",
    primary: { 
    	main: "rgb(0, 0, 0)", 
    	contrastText: "white",
    }, 
    secondary: { 
    	main: "rgb(224, 224, 224)", 
    	contrastText: "white",
    },
    background: { paper: "rgb(0, 0, 0)", default: "rgb(33, 33, 33)" },
    contrastText: "white",
    logos: {
      wideImage: "url(/logos/logo-hoz-eaaa-whiten.png)",
    },
  },
};

const makePalette = (type) => {
  const { contrastText, ...rest } = themePalette[type];
  return {
    //Be safe with a default theme of basil, crane, pinky, rally, reply; then overwrite it below...
    //TODO: We can add even more here... https://material-ui.com/customization/default-theme/?expand-path=$.palette
    contrastText,
    contrastThreshold: 2,
    border: "#DFE3E8",
    divider: "#DFE3E8",
    common: {
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
    
    ...rest    //Overwrite with theme here...
  };
};

export default makePalette;
