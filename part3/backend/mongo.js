const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://xkry:${password}@xkrycluster.skxch.mongodb.net/phonebook?retryWrites=true&w=majority&appName=XkryCluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phone", phoneSchema);

const phone = new Phone({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  console.log("phonebook:");
  Phone.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note.name, note.number);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length > 3) {
  phone.save().then((result) => {
    console.log("phone saved!");
    mongoose.connection.close();
  });
}
