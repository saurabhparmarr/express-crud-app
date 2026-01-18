import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/testapp1"
)




const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  }
});

export default  mongoose.model("User", userSchema);




