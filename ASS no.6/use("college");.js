use("college");

db.students.insertOne({
    name: "sarthak",
    age: 20,
    branch:"B.tech",
});

db.students.insertOne({
    name:"ritesh",
    age: 21,
    branch:"m.tech",
});

db.students.insertOne({
    name:"bhavesh",
    age: 21,
    branch:"m.tech",
});

db.students.insertOne({
    name:"kunal",
    age: 21,
    branch:"m.tech",
});

db.students.updateOne({
    name:"sarthak"},
    {$set: {age:33}}
);



db.students.deleteOne({
    name:"kunal"
});

db.students.find();