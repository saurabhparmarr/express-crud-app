
import express from "express";

import path from "path";
import { fileURLToPath } from "url";
import userModel from "./model/user.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("user2");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.render("user2", { user });
});
app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });

  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
