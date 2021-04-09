const vehicle = [
	{
		title: 'Screenwash',
		desc: 'The screenwash is topped up.',
		resources: [ 
			{ desc: 'Screenwash Guide' , link: 'screenwash' }, 
			{ desc: 'Bug Removal' , link: 'debugging' }, 
		],
	},
	{
		title: 'Fuel',
		desc: 'Fuel gauge shows at least half a tank.',
		resources: [ 
			{ desc: 'Selecting the correct fuel grade' , link: 'fuelgrades' }, 
			{ desc: 'Dealing with a mis-fueling' , link: 'misfuel' },
		],
	},
	{
		title: 'Oil',
		desc: 'Remove oil dip stick. Wipe with cloth. Insert, remove, and check level is between min and max'
	},
	{
		title: 'Fluffy Dice',
		desc: 'Fluffy dice are displayed in windscreen.'
	},
	{
		title: 'Tires',
		desc: 'Inspect tires. If Helicopter has them you have the wrong vehicle.'
	},
];

const tea = [
	{
		title: 'Fill Kettle',
		desc: 'Use the cold tap to fill the kettle. Use the measurement on the side of kettle to only fill the required amount; It will boil faster and save energy.',
		resources: [ 
			{ desc: 'Kettle Manual' , link: 'kettle' }, 
		],
	},
	{
		title: 'Switch on Kettle',
		desc: 'Make sure kettle is plugged in to mains. Gently push down on switch.',
		resources: [ 
			{ desc: 'Use a mains socket' , link: 'socketting' }, 
			{ desc: 'Hot Water Handling' , link: 'hotwater' }, 
		],
	},
	{
		title: 'Wait for boiling water',
		desc: 'The kettle will click when boiled. You can also observe the kettle light going out, and the switch returning to the off position.',
		resources: [ 
			{ desc: 'Hot Water Handling' , link: 'hotwater' }, 
		],
	},
	{
		title: 'Add boiling water to cup',
		desc: 'We are assuming you put the tea bag in the cup. This is only an example so I did not add every single step. I would be wasting my own tea making time if I did.'
	},
	{
		title: 'Add Milk',
		desc: 'Always add the milk last. Doing it first is just wrong.'
	},
];

const exampleChecklists = [
	{ 'title': 'vehicle', 'desc': 'Vehicle Checks', 'checks': vehicle},
	{ 'title': 'tea', 'desc': 'Make the Tea', 'checks': tea},
];

export default exampleChecklists;

//
// My Jobs
// * All
// * Active
// * Scheduled
// My Flows
// * Air Traffic Control
// * Emergancy Changes
// * Issues Logbook
// * Logbook Adhoc
// Flows Not Done
//  ( Team issues, check on others )
// Flows Checkup
//  ( Show when check was done and by who )
