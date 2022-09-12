const express = require("express");
const { route } = require("express/lib/application");

const bodyParser = require('body-parser')

const app = express();
const port = 3000;
const today = new Date();

const globalFirstName = " ";
const globalLastName = " ";


app.get("/", (req, res) => {
  console.log("default route");
  res.send("Ben Piñon\n" + today);
});

app.get("/save-user-info", (req, res) => {
  console.log("user-info");
  
  globalFirstName = req.query.firstName
  globalLastName = req.query.lastName
  res.send("User Info:  " + globalFirstName + " " + globalLastName);
});

app.get("/show-user-info", (req, res) => {
  console.log("default route");
  res.send("User Info:  " + globalFirstName + " " + globalLastName);
});


const favoriteMovieList = [
  {
    title: "Star Wars",
    starRating: 5,
    isRecommended: true,
    created: new Date(),
    lastModified: new Date()
  }, 
  {
    title:"Black Hawk Down",
    starRating: 5,
    isRecommended: true,
    created: new Date(),
    lastModified: new Date()
  }];


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



// parse application/json
app.use(bodyParser.json())


//*****Data transfer via server*****//

//Post or Add New
app.post("/new-movie", (req, res) => {

	console.log("POST to /new-movie")

	
	console.log("req.body ", req.body)


	const newMovie = {
		title: "",
		starRating: 0,
		isRecommended: false,
		createdAt: new Date(),
		lastModified: new Date()
	}
	
	if (req.body.title === undefined) {
		// Should trigger when req.body.title is undefined
		console.log("title is not defined")
		res.json({
			success: false,
			message: "title is a required field"
		})
		return;
	} else {
		console.log("title is defined")
		newMovie.title = req.body.title
	}

	if (req.body.starRating === undefined) {
		// Should trigger when req.body.starRating is undefined
		console.log("starRating is not defined")
		res.json({
			success: false,
			message: "starRating is a required field"
		})
		return;
	} else {
		console.log("starRating is defined")
		newMovie.starRating = req.body.starRating
	}

	if (req.body.isRecommended === undefined) {
		// Should trigger when req.body.isRecommended is undefined
		console.log("isRecommended is not defined")
		res.json({
			success: false,
			message: "isRecommended is a required field"
		})
		return;
	} else {
		console.log("isRecommended is defined")
		newMovie.isRecommended = req.body.isRecommended
	}

	console.log("newMovie ", newMovie)
	
	favoriteMovieList.push(newMovie)

	
	res.json({
		success: true
	})
})

//Get or Read
app.get("/all-movies", (req, res) => {

	console.log("GET to /all-movies")

	
})

app.get("/single-movie/:titleToFind", (req, res) => {
	const titleToFind = req.params.titleToFind

	const foundMovieIndex = favoriteMovieList.findIndex((movie)=>{

		if (movie.title === titleToFind) {
			console.log("Movie Titles Match!")
			return true
		} else {
			console.log("Movie Titles Do Not Match")
			return false
		}
	})

	const foundMovie = favoriteMovieList[foundMovieIndex];

	res.json(foundMovie)
})

// Update or Modify existing data

app.put("/update-movie/:titleToUpdate", (req, res) => {

	console.log("PUT to /update-movie")

	console.log("req params ", req.params)

	const titleToUpdate = req.params.titleToUpdate

	
	const originalMovieIndex = favoriteMovieList.findIndex((movie)=>{
		console.log("movie ", movie)
		console.log("titleToUpdate ", req.params.titleToUpdate)
		console.log("condition ", movie.title === req.params.titleToUpdate)

		if (movie.title === req.params.titleToUpdate) {
			console.log("Movie Titles Match!")
			return true
		} else {
			console.log("Movie Titles Do Not Match")
			return false
		}
	})

	console.log("originalMovieIndex ", originalMovieIndex)

	const originalMovie = favoriteMovieList[originalMovieIndex];

	console.log("originalMovie ", originalMovie)

	const updatedMovie = {
		title: originalMovie.title,
		starRating: originalMovie.starRating,
		isRecommended: originalMovie.isRecommended,
		createdAt: originalMovie.createdAt,
		lastModified: new Date()
	}

	console.log("updatedMovie Before Update ", updatedMovie)

	if (req.body.title !== undefined) {
		updatedMovie.title = req.body.title
	}

	if (req.body.starRating !== undefined) {
		updatedMovie.starRating = req.body.starRating
	}

	if (req.body.isRecommended !== undefined) {
		updatedMovie.isRecommended = req.body.isRecommended
	}

	console.log("updatedMovie After Update ", updatedMovie)

	// Overwrite the value of favoriteMovieList at indexOfMovie with newTitle
	// favoriteMovieList[indexOfMovie] = newTitle
	favoriteMovieList[originalMovieIndex] = updatedMovie;

	console.log("favoriteMovieList after ", favoriteMovieList)

	res.json({
		success: true
	})
})

// Delete

app.delete("/delete-movie/:titleToDelete", (req, res)=>{

	console.log("DELETE to /delete-movie")

	const indexOfMovie = favoriteMovieList.findIndex((movie)=>{

		console.log(movie.title + " === " + req.params.titleToDelete)

		if (movie.title === req.params.titleToDelete) {
			console.log("Movie Titles Match!")
			return true
		} else {
			console.log("Movie Titles Do Not Match")
			return false
		}
	})
	console.log(indexOfMovie)

	if (indexOfMovie < 0) {
		res.json({
			hasBeenDeleted: false
		})
		return;
	}

	console.log("Before Delete ", favoriteMovieList)

	favoriteMovieList.splice(indexOfMovie, 1)
	console.log("After Delete ", favoriteMovieList)

	res.json({
		hasBeenDeleted: true
	})
})

// // /*
// // HTTP Rules (Hypertext Transfer Protocol)
// // 1.




// // */
// // app.post("/new-movie", (req, res) =>)