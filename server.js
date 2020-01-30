
var mongojs = require("mongojs");
var handlebars =  require("handlebars");
var axios = require("axios");
var app = express();
var cheerio = require("cheerio");
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var express = require("express");


let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));
se
mongoose.connect("mongodb://heroku_0x0wl2kv:l4dt8qkicrnc9mdfjobo8vd0k3@ds127034.mlab.com:27034/heroku_0x0wl2kv");
var db = mongoose.connection;

db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});


db.once("open", function() {
	console.log("Mongoose connection successful.");
});


app.get("/", function(req, res) {
  
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
     
      res.render("index", {articles: doc});
    }
  });
});

/
app.get("/scrape", function(req, res) {
	
	request("http://freep.com", function(error, response, html) {
		
		var $ = cheerio.load(html);
		
		$("article h3").each(function(i, element) {
			
			var result = {};

			
			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");

			
			var entry = new Article(result);

		
			entry.save(function(err, doc) {
			
				if (err) {
					console.log(err);
				}
				
				else {
					console.log(doc);
				}
			});
		});
	});
	
	res.redirect("/");
});


app.get("/articles", function(req, res) {

	
	Article.find({}, function(error, doc) {
		
		if (error) {
			console.log(error);
		}
		
		else {
			res.json(doc);
		}
	});
});


app.get("/articles/:id", function(req, res) {
	
	Article.findOne({ "_id": req.params.id })

	.populate("note")
	
	.exec(function(error, doc) {
		
		if (error) {
			console.log(error);
		}
		
		else {
			res.json(doc);
		}
	});
});


app.post("/articles/:id", function(req, res) {

	var newNote = new Note(req.body);

	newNote.save(function(error, doc) {
		
		if (error) {
			console.log(error);
		}
	
		else {
			
			Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
			
			.exec(function(err, doc) {
			
				if (err) {
					console.log(err);
				}
				else {
					
					res.send(doc);
				}
			});
		}
	});
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log("App running on port 3000.");
});