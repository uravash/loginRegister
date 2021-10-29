const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

//DB
mongoose
  .connect("mongodb://localhost:27017/loginregister", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfully");
  })
  .catch((e) => {
    console.log("Not Successfully");
  });

//routs
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login SuccessFully", user: user });
      } else {
        res.send({ message: "Password Did not Match" });
      }
    } else {
      res.send({ message: "User not Registred" });
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registerd . Please Login Now" });
        }
      });
    }
  });
});

//model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);

app.listen(9000, () => {
  console.log("POrt Running 9000");
});
