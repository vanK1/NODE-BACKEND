import e from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import {config} from "dotenv";
config()
import { get } from "http";
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js';
import cookieParser from "cookie-parser";

const app = e();
const port = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGODB_URL = process.env.MONGODB_URI
import cors from "cors";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
app.use(cookieParser());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(e.static("./box"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "box", "index.html"));
}); 

//API
// app.post("/register", forsignup);

// app.post('/create',(req,res)=>{
//     let {firstname,lastname,email,password,Gender,place,age} = req.body

//     let myTable = `

//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Gender</th>
//                 <th>Place</th>
//                 <th>Age</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${firstname}</td>
//                 <td>${lastname}</td>
//                 <td>${email}</td>
//                 <td>${password}</td>
//                 <td>${Gender}</td>
//                 <td>${place}</td>
//                 <td>${age}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })

// app.post('/create',(req,res)=>{
//     let myTable = `

//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${req.body.firstname}</td>
//                 <td>${req.body.lastname}</td>
//                 <td>${req.body.email}</td>
//                 <td>${req.body.password}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })

// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'box','about.html'))
// })


app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

app.listen(port, () => {
  console.log(`server is runninng on port : ${port}`);
  // console.log("server is running on port " + port)
});

