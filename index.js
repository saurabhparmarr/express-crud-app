// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import morgan from "morgan";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();   // ✅ sabse pehle

// const publicPath = join(__dirname, "public");
// const pagesPath = join(__dirname, "pages");

// app.use(express.static(publicPath));
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(join(pagesPath, "home.html"));
// });

// app.get("/login", (req, res) => {
//   res.sendFile(join(pagesPath, "login.html"));
// });

// app.post("/submit", (req, res) => {
//   res.sendFile(join(pagesPath, "submit.html"));
// });

// app.use((req, res) => {
//   res.status(404).sendFile(join(pagesPath, "404.html"));
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });


// MVC ARCHITECTURE
// import express from "express";
// import { handleUser } from "./controller/usercontroller.js";

// const app = express();
// app.set('view engine','ejs')
// app.get('/users',handleUser
// )

// app.listen(3000);









// DYNAMIC ROUTES
// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//     const users = ['b','o','l','j']
//     let data = `<ul>`
//     for (let i = 0; i < users.length; i++) {
//         data +=`<li> <a href='${users[i]}'>${users[i]}</a></li>`}
//     console.log(users)
//   res.send(data);
// });

// app.get("/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID: ${userId}`);       })
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });





// Get user by ID

// import express from "express";
// import userData from "./pages/user.json" with { type: "json" };

// const app = express();


// app.get("/", (req, res) => {
//   res.json(userData);
// });


// app.get("/user/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const user = userData.find((u) => u.id === id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// });


// app.get("/user/name/:name", (req, res) => {
//   const name = req.params.name.toLowerCase();

//   const users = userData.filter(
//     (u) => u.name.toLowerCase().includes(name)
//   );

//   if (users.length === 0) {
//     return res.status(404).json({ message: "No users found" });
//   }

//   res.json(users);
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });


// import express from "express";
// import { MongoClient } from "mongodb";
// const dbName = "students";
// const url = "mongodb://localhost:27017";

// const client = new MongoClient("mongodb://localhost:27017");



// const app = express();
// app.set('view engine','ejs')
 
// app.get("/", async (req, res) => {
//    await client.connect();
//   const db = client.db(dbName);
//   const schoolsCollection = db.collection("students");
//   const user = await schoolsCollection.find({}).toArray();
 
//   res.render('user',{user})


// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });


// import express from "express";
// import { MongoClient } from "mongodb";
// const url = "mongodb://localhost:27017";
// const client = new MongoClient("mongodb://localhost:27017");
// const dbName = 'foodstack'
// let db; 

// const app = express();
// app.set('view engine','ejs')
// client.connect().then((connection)=>{
//    db = connection.db(dbName)
// })
// app.get("/api", async (req, res) => {
   
 
//   const schoolsCollection = db.collection("products");
//   const user = await schoolsCollection.find({}).toArray();    
//   res.send(user);
// });

// app.get("/" , async (req,resp)=>{
//   const schoolsCollection = db.collection("products");
//   const user = await schoolsCollection.find({}).toArray();    
//   resp.render('user', {user});
// })

// app.get("/add",(req,resp)=>{
//   resp.send(`<form action="/save" method="post">
//   <input type="text" name="name" placeholder="Enter Name"/>
//   <input type="number" name="age" placeholder="Enter Age"/>
//   <button type="submit">Submit</button>
// </form>`)
// })
// app.use(express.urlencoded({extended:true}))

// app.post("/save",async (req,resp)=>{
  
//   const schoolsCollection = db.collection("products");
//   const user = await schoolsCollection.insertOne(req.body);    
//   resp.redirect('/')

// })
// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// }
// );




import express from "express";

import path from "path"
import { fileURLToPath } from "url";
import userModel from "./model/user.js";

const app = express()
app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"public")))


app.get("/" , (req,res)=>{
  res.render("user2")
})

app.get("/read", async (req, res) => {
  
  let  users = await userModel.find(); 
  res.render("read", { users }); 
});


app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.create({ name, email, image });
  res.redirect("/read");
});




app.get("/delete/:id" , async  (req,res)=>{
  
  let  users = await userModel.findOneAndDelete({_id: req.params.id}); 


  res.redirect("/read")
})

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.render("user2", { user }); // send user to template
});
app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
  res.redirect("/read");
});



app.listen(3000 , ()=>{
  console.log("Server is running on http://localhost:3000");
})
