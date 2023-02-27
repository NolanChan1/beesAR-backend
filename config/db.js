const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Holds db object to access the database
let dbConnection;

module.exports = {
  // Function that sets the connection to the database
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      // Sets the connection to the yycbeeswaxdb database
      dbConnection = db.db("yycbeeswaxdb");
      console.log("Successfully connected to MongoDB.");

      return;
    });
  },

  // Getter function to gain access to the database for CRUD operations
  getDb: function () {
    return dbConnection;
  },
};
