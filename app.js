const express = require("express");
const cors = require("cors")
const path = require("path")
const dotenv = require("dotenv");
const userRouter = require("./src/routes/routers")
const postRouter = require("./src/routes/postRouters")
const cookieParser = require("cookie-parser")
const Blogpost = require("./src/models/post")
const User = require("./src/models/user")
const bodyParser = require("body-parser")
dotenv.config({
  path:'./config.env'
})

const app = express()
module.exports = app;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ // to parse the data in urlencoded form
    extended:true
}))
app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser())
app.use(cors())

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use('',userRouter)
app.use('',postRouter)




app.get("/",async(req,res)=>{
  try {
    const blogs = await Blogpost.aggregate([
       {
         $addFields: {
           createdAtDate: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
         },
       },
     ]);
 
    let idList = []
    let tempUserList = []
    for (let i=0 ;i<blogs.length;i++){
       selectedId = blogs[i].user.toString()
       const userInfo = await User.findById(selectedId)
       tempUserList.push(userInfo.name)
       blogs[i]['username'] = tempUserList[i]
     }
   
    res.render("index",{
       allPost:blogs,
 
    })
 
    
   } catch (error) {
     console.log("Profile loading error")
     res.render("index",{
        allPost:blogs,
     })
    
 }
 })
 


