use("school");
db.students.insertMany([{
    name:"sarthak",
    age:21,
    city:"satana"},

   { name:"pranav",
    age:19,
    city:"kalwan",},

    { name:"kunal",
        age:22,
        city:"pimpalner",
    },
    {
        name:"nanu",
        age:30,
        city:"arai",
    },
   { name:"nayan",
    age:30,
    city:"arai"}
]);

db.students.find({age:{$gt:20}}); 