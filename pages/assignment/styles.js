export const styles = (theme) => ({

	signature: {
		'text-align': 'center',
		top: '10%',
		left: '10%',
	},

	signcanvas: {
		width: '80%',
		'max-height': '100px',
		aspectRatio: 6 / 2,
		margin: '0 auto 20px',
		'background-color': '#fff',
		border: '1px solid grey',
	},

	sigPad: {
		width: '100%',
		height: '100%',
	},

	sigImage: {
		'background-size': '40% auto',
		width: '200px',
		aspectRatio: 6 / 2,
		'background-color': '#fff',
		margin: '20px',
	},
	
	checkitems: {
		width: '100%',
		border: '1px solid grey',
		'background-color': theme.palette.background.default,
		padding: '0 15px',
	},

	root: {
		margin: '40px auto 15px',
		padding: '0 0 15px 0',
		width: '90%',

	},
	title: { 
		flex: 1,
		'padding': '15px 25px 0', 
	},
});
