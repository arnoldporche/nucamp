const MongoClient = require("mongodb").MongoClient;
//const assert = require("assert").strict;
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";
/*
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null);

  console.log("Connected correctly to server");

  const db = client.db(dbname);

  db.dropCollection("campsites", (err, result) => {
    console.log("Dropped Collection: ", result);

    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "Test" },
      "campsites",
      result => {
        console.log("Insert Document:", result.ops);

        dboper.findDocuments(db, "campsites", docs => {
          console.log("Found Documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites",
            result => {
              console.log("Updated Document Count:", result.result.nModified);

              dboper.findDocuments(db, "campsites", docs => {
                console.log("Found  Documents:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  result => {
                    console.log("Deleted Document Count:", result.deletedCount);

                    client.close();
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
*/
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log("Connected correctly to server");
    const db = client.db(dbname);

    dboper
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "Test" },
        "campsites"
      )
      .then(result => {
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db, "campsites");
      })
      .then(docs => {
        console.log("Found Documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "Updated Test" },
          "campsites"
        );
      })
      .then(result => {
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "campsites");
      })
      .then(docs => {
        console.log("Found Updated Documents:\n", docs);

        return db.dropCollection("campsites");
      })
      .then(result => {
        console.log("Dropped Collection:", result);

        return client.close();
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
