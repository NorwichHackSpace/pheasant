//Components
import LocationGeoCard, { LocationOpenSkyCard  } from "../Locations/LocationCard";
import CallCard, { CallCardTest } from "../CallCard/CallCard";
import nearestHosp, { demoHospitals } from "../CallCard/nearestHosp";
import styles from "./styles";

/* 
 * These 'default's are only used on first load, or when the user clicks the 'reset layout' button.
 */

export default {
    Props: {
    	      cols: { lg: 3, md: 3, sm: 1, xs: 1, xxs: 1 },
	      rowHeight: 260, //Was 300?
	      draggableHandle: ".grid-drag-handle",
    },
    Layouts: {    

			"lg": [
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 0,
					"i": "1",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 1,
					"i": "2",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 1,
					"y": 1,
					"i": "3",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 1,
					"y": 0,
					"i": "4",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 2,
					"y": 0,
					"i": "5",
					"moved": false,
					"static": false
				}
			],
			"xxs": [
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 0,
					"i": "1",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 1,
					"i": "2",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 4,
					"i": "3",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 3,
					"i": "4",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 6,
					"i": "5",
					"moved": false,
					"static": false
				}
			],
			"xs": [
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 0,
					"i": "1",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 1,
					"i": "2",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 2,
					"i": "3",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 3,
					"i": "4",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 5,
					"i": "5",
					"moved": false,
					"static": false
				}
			],
			"sm": [
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 0,
					"i": "1",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 1,
					"i": "2",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 4,
					"i": "3",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 3,
					"i": "4",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 6,
					"i": "5",
					"moved": false,
					"static": false
				}
			],
			"md": [
				{
					"w": 1,
					"h": 1,
					"x": 0,
					"y": 0,
					"i": "1",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 0,
					"y": 1,
					"i": "2",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 1,
					"y": 1,
					"i": "3",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 1,
					"x": 1,
					"y": 0,
					"i": "4",
					"moved": false,
					"static": false
				},
				{
					"w": 1,
					"h": 2,
					"x": 2,
					"y": 0,
					"i": "5",
					"moved": false,
					"static": false
				}
			]
	
		},	
    Cards: [ 
    { card: LocationGeoCard, options: { isDragable: true, isCloseable: false, } },
	{ card: nearestHosp, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } }, 
	{ card: demoHospitals, props: { title:"Nearest Hospital (Aircraft)", style:{styles} }, options: { isDragable: true, isCloseable: true, } },
	{ card: LocationOpenSkyCard, props: {title:"Aircraft Location", icao24:"", style:{styles} } },
	{ card: CallCardTest, props: { style:{styles} }, options: { isDragable: true, isCloseable: true, } },
	],
};
