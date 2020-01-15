
var mongojs = require("mongojs");
var handlebars =  require("handlebars");
var axios = require("axios");
var app = express();
//scaping
var cheerio = require("cheerio");
// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];
//express
var express = require("express");