import { createMuiTheme } from "@material-ui/core";
import makePalette from "./palette";
import typography from "./typography";

function createTheme(theme) {
  const palette = makePalette(theme);

  return createMuiTheme(
//@see https://material-ui.com/customization/themes/#theme-configuration-variables
//@see https://material-ui.com/customization/globals/#default-props
{
	palette,
	typography,
	zIndex: {
		appBar: 1200,
		drawer: 1100,
	},
	props: { //Spec Mui parts to use theme parts a certain way
		MuiCard: {
			raised: false,
		},
		MuiButton: {
			variant: "contained",
			size: "small",
			color: "primary",
		},
		MuiButtonBase: {
			//disableRipple: true // No more ripple, on the whole application 💣!
		},
		MuiPopover: {
			elevation: 1, // Set default elevation to 1 for popovers.
		},
		MuiPaper: {
			color: "primary",
		},
	},
	overrides: { //This is for overriding accross all themes.
		MuiCard: {
			root: {
				'display': "flex",
				'flex-direction': 'column',
			},
		},
		MuiCardActions: {
			root: {
				'margin-top': 'auto',
			},
		},
		MuiPaper: {
			elevation0: {
				boxShadow: "0 0 14px 0 rgba(53,64,82,.05)", // Some CSS
			},
		},
		MuiTableCell: {
			root: {
				borderBottom: "1px solid rgba(224, 224, 224, .5)"
			},
		},
	},
});
}

export default createTheme;
