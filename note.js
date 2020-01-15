// Require mongoose
var mongoose = require("mongoose");

// Create a schema class
var Schema = mongoose.Schema;

// note schema
var NoteSchema = new Schema({

	title: {
		type: String
    },

	body: {
		type: String
	}
});


// Create the Note model with the NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;