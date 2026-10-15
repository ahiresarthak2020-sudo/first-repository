
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("collegeDB");
    const students = db.collection("students");

    // CREATE
    await students.updateOne(
      { name: "Amit" },
      { $set: { name: "Amit", age: 20, marks: 85 } },
      { upsert: true }
    );
    console.log("Student created or updated.");

    // READ
    console.log("All students:");
    console.log(await students.find({}).toArray());

    // UPDATE
    await students.updateOne(
      { name: "Amit" },
      { $set: { marks: 90 } }
    );
    console.log("Student marks updated.");

    // SEARCH
    console.log("Students scoring above 80:");
    console.log(
      await students.find({ marks: { $gt: 80 } }).toArray()
    );

    // SORT: highest marks first
    console.log("Students sorted by marks:");
    console.log(
      await students.find({}).sort({ marks: -1 }).toArray()
    );

    // DELETE: delete only the demo student named Amit
    await students.deleteOne({ name: "Amit" });
    console.log("Demo student deleted.");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main();