
var mongojs = require("mongojs");
var handlebars =  require("handlebars");
var axios = require("axios");
var app = express();
var cheerio = require("cheerio");
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var express = require("express");