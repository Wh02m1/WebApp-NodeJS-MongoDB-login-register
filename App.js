// App.js

var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose")
const User = require("./model/User");
const Product  = require("./model/Products");
const tickets  = require("./model/ticket");


var app = express();


mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.set('view engine', 'ejs');


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("login");
});
app.get("/ContactUS", function (req, res) {
	res.render("contact_us");
});
app.get("/Cart", function (req, res) {
	res.render("Cart");
});
app.get("/About", function (req, res) {
	res.render("About");
});
app.get("/Home", function (req, res) {
	res.render("home");
});
app.get("/checkout", function (req, res) {
	res.render("checkout");
});

app.get("/productss", function (req, res) {
	res.render("products");
});


// Handling user signup
app.post("/register", async (req, res) => {
	try {
	  const emailExists = await User.findOne({ email: req.body.email });
	  if (emailExists) {
	  return res.status(409).send("Email already exists");
	  }
	
	  const user = await User.create({
	  username: req.body.username,
	  email: req.body.email,
	  password: req.body.password
	  });
	
	  const username = user.username;
	  return res.status(200).render("main", { username });
	} catch (error) {
	  console.error("Error during user registration", error);
	  return res.status(500).send("Failed to register user");
	}
	});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});
let loggedInUser;
let user;
//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		 user = await User.findOne({ email: req.body.email });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
        const username = user.username;
		if (result) {
			loggedInUser = user;
			res.render("main",{ username });

		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});
// Delete user by email
app.delete("/users/:email", async function(req, res) {
	try {
	  const email = req.params.email;
  
	  // Find the user by email and remove it from the database
	  await User.findOneAndRemove({ email: email });
  
	  res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: "Server error" });
	}
  });
  
  
app.get("/manage", function (req, res) {
	const Email = user.email;
	res.render("manage",{ Email });
});

// Define the PUT route for updating user email
app.put('/userss/:oldEmail/:newEmail', async (req, res) => {
	try {
	  const { oldEmail, newEmail } = req.params;
  
	  // Find the user by old email and update the email field with the new email
	  const user = await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail });
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  res.status(200).json({ message: 'User email updated successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Server error' });
	}
  });
  
  
  
  



//Handling user logout
app.get("/logout", function (req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
             res.redirect('/');
            });
        });


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

  

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).render("products",{ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


		 
// create new ticket
app.post('/tickets', async (req, res) => {
	try {
	  const { name, email, message } = req.body;
	  const newTicket = new tickets({ name, email, message });
	  const savedTicket = await newTicket.save();
	  console.log("New record was successfully added!");
	  res.status(200).send("New record was successfully added!");
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Server error' });
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});


