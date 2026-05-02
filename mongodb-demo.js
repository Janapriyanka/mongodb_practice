const db = db.getSiblingDB('studentDB');
print('DROP students/books if exist');
db.students.drop();
db.books.drop();

print('1) insertOne student');
db.students.insertOne({name:'Ayesha', age:22, course:'MERN Stack', status:'enrolled'});

print('2) insertMany students');
db.students.insertMany([
  {name:'Rohan', age:24, course:'MERN Stack', status:'enrolled'},
  {name:'Mina', age:21, course:'Data Science', status:'completed'},
  {name:'Sara', age:23, course:'MERN Stack', status:'in progress'}
]);

print('3) find all students');
printjson(db.students.find().toArray());

print('4) find MERN Stack students');
printjson(db.students.find({course:'MERN Stack'}).toArray());

print('5) updateOne Ayesha to completed');
db.students.updateOne({name:'Ayesha'}, {$set:{status:'completed'}});
printjson(db.students.find({name:'Ayesha'}).toArray());

print('6) updateMany MERN Stack students to completed');
db.students.updateMany({course:'MERN Stack'}, {$set:{status:'completed'}});
printjson(db.students.find({course:'MERN Stack'}).toArray());

print('7) deleteOne Rohan');
db.students.deleteOne({name:'Rohan'});
printjson(db.students.find().toArray());

print('8) deleteMany all students');
db.students.deleteMany({});
printjson(db.students.find().toArray());

print('9) query operator $gt age > 22');
printjson(db.students.find({age:{$gt:22}}).toArray());

print('9b) query operator $lt age < 23');
printjson(db.students.find({age:{$lt:23}}).toArray());

print('9c) query operator $in course MERN Stack or Data Science');
printjson(db.students.find({course:{$in:['MERN Stack','Data Science']}}).toArray());

print('9d) query operator $and MERN Stack and completed');
printjson(db.students.find({$and:[{course:'MERN Stack'},{status:'completed'}]}).toArray());

print('9e) query operator $or completed or age < 22');
printjson(db.students.find({$or:[{status:'completed'},{age:{$lt:22}}]}).toArray());

print('9f) query operator $exists status');
printjson(db.students.find({status:{$exists:true}}).toArray());

print('10) library use case: insert books');
db.books.insertMany([
  {title:'JavaScript Essentials', author:'Nina Patel', category:'Programming', copiesAvailable:4, status:'available'},
  {title:'MongoDB in Action', author:'Ravi Kumar', category:'Database', copiesAvailable:0, status:'checked out'},
  {title:'Web Design Basics', author:'Maya Singh', category:'Design', copiesAvailable:2, status:'available'}
]);

print('11) find available books');
printjson(db.books.find({status:'available'}).toArray());

print('12) find books in Programming or Database');
printjson(db.books.find({category:{$in:['Programming','Database']}}).toArray());

print('13) find books with copiesAvailable > 0');
printjson(db.books.find({copiesAvailable:{$gt:0}}).toArray());

print('14) update book availability');
db.books.updateOne({title:'JavaScript Essentials'}, {$set:{copiesAvailable:3,status:'available'}});
printjson(db.books.find({title:'JavaScript Essentials'}).toArray());

print('15) final book list');
printjson(db.books.find().toArray());
