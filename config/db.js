const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://admin:2QOaqJ89z2osMKWC@beeswaxyyc.akpmr7v.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Holds db object to access the database
let dbConnection;

module.exports = {
    // Function that sets the connection to the database
    connectToServer: function(callback) {
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