
var forcedUpdates = false;

/*
 * Requires (instead of includes for some reason)
 */
 
	const filesystem = require("fs"),
	    workingDirectory = './hospital_contacts';

	if (!filesystem.existsSync(workingDirectory)){
	    console.log('Making new working directory ', workingDirectory);
	    filesystem.mkdirSync(workingDirectory);
	}
	 
	dbstore = workingDirectory+'/hospitals.sqlite.db'; //Storing in a local file is handy for debugging...
	//dbstore = ":memory:";
	const sqlite = require('sqlite3').verbose(),
	      db = new sqlite.Database(dbstore , (err) => {   
	    	if (err) {
		    	console.error("SQLite database error - " + err.message );     		
		    	process.exit(1);
	    	}
	    	buildb(db); //Get database tables ready
	    	console.log("Connected to SQLite database (" + dbstore + ")")
	    	asyncWaiter();
	     }),
	     webclient = require('axios');
	     csv = require('csv-parser');
	     iconv = require('iconv-lite');


/*
 * Startup when ready
 */
let startup = { syncsToWaitFor: 1, syncsGot: 0, }
function asyncWaiter() {
	if (++startup.syncsGot < startup.syncsToWaitFor) { return } //Wait for everything to setup asyncy, in an syncy way.
		console.log("The table is laid!"); //This comes in rather handy for debugging.
	let nhsSrc = {
			headers: { },
			hostname: 'http://media.nhschoices.nhs.uk',
			path: '/data/foi/',
			file: { //Filenames can be found at -> https://www.nhs.uk/about-us/nhs-website-datasets/
				hospitals: 'Hospital.csv',
				gp: 'GPPractices.csv',
				gpTimes: 'GPOpeningTimes.csv'
			}
		} 
	let fileName = nhsSrc.file.hospitals //TODO: foreach (nhsSrc.file.*) etc...
	let URL = nhsSrc.hostname + nhsSrc.path;
	getCSV(URL, fileName)
	.then( () => { //Only when we have the file
		console.log("Lets eat some data!");
		parseCSV(fileName);
	})
	.catch( (error, filename) => { 
		if ( typeof error.response !== 'undefined' ) {
			console.log("Received error from server ", error.response.status , " for file ", filename);
		} else {
			console.log(error)  //This might be rather verbose... 
		} 
		process.exit(1); //TODO: When we are running foreach, we could maybe skip a file and do the rest?
	});
}


/*
 * Functions
 */
 
function parseCSV(fileName) {
	
	let Hospitals = [];

	filesystem.createReadStream(workingDirectory+'/'+fileName, {encoding: null})
	.pipe(iconv.decodeStream('iso88591', {stripBOM: true}))
	.pipe(iconv.encodeStream('utf8'))
	.pipe( csv({ separator: '¬' , strict: false , raw: false, }) )
	.on('data', function(data){ //One line [Hospital] at a time, as an object
	    try { 
		data = JSON.parse( JSON.stringify(data).replace(/�/g, "") ); //Some decoding issues, somewhere. :-(
		data = JSON.parse( JSON.stringify(data).replace(/Ã/g, "") );
		data = JSON.parse( JSON.stringify(data).replace(/ï/g, "") );
		
		//Fix missing county (TODO: Probs an API for this?)
		if (data.City=="Brighton" && !data.County) {data.County = "East Sussex"}; //Detail, man!
		if (data.City.includes("Newcastle") && !data.County) {data.County = "Tyne and Wear"}; 
		if (data.City.includes("Chelmsford") && !data.County) {data.County = "Essex"}; 
		if (data.City.includes("London") && !data.County) {data.County = "London"}; 
		if (data.City.includes("Darlington") && !data.County) {data.County = "County Durham"}; 
		if (data.City.includes("Bristol") && !data.County) {data.County = "Bristol"}; 
		//Remove counties outside our range
		invalidCounties = ['Devon','Somerset','Avon','Merseyside','Manchester','Tyne and Wear','Yorkshire','Dorset','Chester','Gloucestershire',
		                   'Derbyshire','Hampshire','Worcestershire','Shropshire','Cumbria','Northumberland','Cleveland',
		                   'Cornwall','Berkshire','Staffordshire','Isle of Wight','Humberside']
		if ( invalidCounties.some(counties => data.County.includes(counties) )) {
    			//console.log('Rejecting invalid county ', data.County);
    			return;
		}
		//Check it's an NHS Hospital and the given number is valid
		if ( data.Phone.startsWith(0) && !data.Phone.startsWith("000") && ( data.Sector == 'NHS Sector' ) ) {
			//The NHS addresses are a little messy... 
			let address = '';
			if (data.Address1) { address += data.Address1 };
			if (data.Address1 && data.Address2) { address += ", " + data.Address2 }
			else if (data.Address2) { address += data.Address2 }
			if (data.Address3) { address += ", " + data.Address3}
	
			//Remove the descriptions appended to some names.
			data.OrganisationName = data.OrganisationName.split(' -')[0]; 
				
			//Finally, make a nice object of just the bits we want
			let Hospital = {  "Hospital" : data.OrganisationName, 
				  	"Tel" : data.Phone, 
				  	"Address" : address,
				  	"City" : data.City,
				  	"County" : data.County,
				  	"Postcode" : data.Postcode,
				  	"Lat" : parseFloat(data.Latitude).toFixed(8),
				  	"Lon" : parseFloat(data.Longitude).toFixed(8),
				  };
			Hospitals.push(Hospital);
				
			/*
			//let dbFriendlyName = Hospital.Hospital.replace(/\'/g, "");
 			//dbFriendlyName.replace(/s'/g, ""); 
	 		//console.log("IN: ", Hospital.Hospital , "OUT: ", dbFriendlyName);
	 		//console.log(data.County);
			db.get(`SELECT loc_lat, loc_lon FROM 'hospitals' WHERE name='` + dbFriendlyName + `' ;` , //Check if this is a new hospital
				function(err, row) {
					if (err) { console.error("Database table lookup error: ", err); return;}
					if(!row) { //Hospital excists
						sql = `
							INSERT INTO 'hospitals' (name, loc_lat, loc_lon, address, city, county, postcode, tel)
							VALUES ('` + dbFriendlyName +`','`+ data.Latitude +`','`+ data.Longitude +`','`+ address + `','`+ data.City + `','`+ data.County + `','`+ data.Postcode + `','`+ data.Phone + `' ) ; 
						` ;
						//console.log(sql);
						//db.run(sql);
					} else {
						sql = `
							UPDATE 'hospitals' 
							SET loc_lat='` + data.Latitude + `', loc_lon='` + data.Longitude + `', address='` + address + `', city='` + data.City + `' county='` + data.County + `' postcode='` + data.Postcode + `' tel='` + data.Phone + `'
							WHERE name='` + data.OrganisationName + `' ; 
							` ;
						//console.log(sql);
						//db.run(sql);
					}
					
					
				}
			);
			*/
		}
		
	    }
	    catch(err) {
	    	console.log(err);
	    } 
	})
	.on('end',function(){
	 /*
	  * Just some revision notes...
	  * 
	  *filesystem.writeFileSync(workingDirectory+'/hospitals.eaaa.json', JSON.stringify(Hospitals))
	  *
	  *A handy method to append content to the end of a file is fs.appendFile() 
	  * (and its fs.appendFileSync() counterpart):
	  *
	 */
		try {
			//Make file
			filesystem.writeFile(workingDirectory+'/hospitals.eaaa.json', JSON.stringify(Hospitals) , (err) => {
				if (err) {
					console.error("Unable to write to file: ",err);
					return;
				}
				console.log("JSON file created!");
			})
		} catch (err) {
			console.error(err)
 		}
	});  
}
 
async function getCSV(URL, fileName) {
	URL = URL + fileName;	
	if (forcedUpdates || !filesystem.existsSync(workingDirectory+'/'+fileName)) { //Don't download again if we already have. Mostly a Dev thing.
		console.log("Fetching ", URL);
		const response = await webclient.get(URL).catch(error => { //Axios parses JSON responses by default!
			throw new Error( error , fileName );
		});
		filesystem.writeFileSync(workingDirectory+'/'+fileName, response.data)
		return console.log("Updated file ", fileName);
	} else { 
		return console.log("Using excisting " + fileName + " file." ) 
	};
}

function buildb (db) { 
	db.run(`
		CREATE TABLE IF NOT EXISTS 'hospitals' ( 
		name PRIMARY KEY, 
		loc_lat DEFAULT 0,  
		loc_lon DEFAULT 0, 
		address DEFAULT NULL,
		city DEFAULT NULL,
		county DEFAULT NULL,
		postcode DEFAULT NULL,  
		tel DEFAULT 0,
		table_constraints ) 
		WITHOUT ROWID;	
	` , (err) => { if(err) {console.error("Unable to build database: ", err);} } );
}


