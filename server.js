const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const multer = require("multer")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { body, validationResult } = require('express-validator')

app.use(helmet())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter)

const whitelist = ['http://localhost:3000', 'http://localhost:9000']; 
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

app.use(express.json())

require('dotenv').config();



const Port = process.env.React_app_port || 9000;

const key = process.env.Token_Key



app.listen(Port, () => {
    console.log("server is running on port 9000")
})

mongoose.connect(process.env.Mongoose_url)
    .then(() =>
        console.log("connected to mongodb")
    )
    .catch((err) =>
        console.log("error while connecting to db"))





// Middleware for JWT verification
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ statuscode: 0, message: "No token provided" });
    }

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(401).send({ statuscode: 3, message: "Token expired or invalid" });
        }
        req.userId = decoded.data;
        req.userRole = decoded.role;
        next();
    });
};

//register schema model and api
const registerSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Password: String,
    Isactive: Boolean,
    Role: String
}, { versionKey: false })

const Registermodel = mongoose.model("Signup", registerSchema)


app.post("/api/signup", [
    body('email').isEmail().normalizeEmail(),
    body('pass').isLength({ min: 5 }),
    body('name').trim().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const finduser = await Registermodel.findOne({ Email: req.body.email })

    if (finduser) {
        res.send({ statuscode: 2 })
    }
    else {
        const hash = bcrypt.hashSync(req.body.pass, 10)
        const result = new Registermodel({
            Name: req.body.name,
            Email: req.body.email,
            Password: hash,
            Isactive: true,
            Role: "user"
        })
        const user = await result.save()

        res.send({ statuscode: 1 })
    }
})


//find workers
app.get("/api/workers", verifyToken, async (req, res) => {
    const all = await Registermodel.find({ Isactive: true, Role: "worker" })

    if (all) {

        res.send({ statuscode: 1, worker: all })
        console.log(all)


    }
    else {
        res.send({ statuscode: 0 })
        console.log(all)
    }
})

//login api
app.post("/api/login", async (req, res) => {
   
    const find = await Registermodel.findOne({ Email: req.body.email })
    console.log(find)

    if (find.Isactive === true) {
        const hash = find.Password



        const user = {
            id: find._id,
            name: find.Name,


        }
        const role = { role: find.Role }

        const bypass = bcrypt.compareSync(req.body.pass, hash)

        if (bypass === true) {
            console.log("role is", role)
            let token = jwt.sign({ data: find._id, role: find.Role }, key, { expiresIn: "1h" })
            res.send({
                statuscode: 1, memberdata: user
                , authtoken: token, role: role
            })
        }
        else {
            res.send({ statuscode: 0 })
        }

    }
    else {
        res.send({ statuscode: 2 })
    }

})

//complaint schema model multer and api

let pic
const mystorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        pic = Date.now() + file.originalname
        cb(null, pic)
    }
})


const upload = multer({ storage: mystorage })


const Complaintschema = new mongoose.Schema({
    Userid: String,
    Name: String,
    Email: String,
    Phone: Number,
    Problem: String,
    Adress: String,
    Detail: String,
    Pic: String,
    AddOn: String,
    Status: String,
    Assignedto: String,
    Messageadmin: String,
      Completedon:String
}, { versionKey: false })


const Compmodel = mongoose.model("Complaints", Complaintschema)

//post complaint

app.post("/api/complaint", upload.single('pic'), async (req, res) => {
    if (!req.file) {
        res.send({ statuscode: 2 })
    }
    else {
        const record = new Compmodel({
            Userid: req.body.id,
            Name: req.body.name,
            Email: req.body.email,
            Phone: req.body.phone,
            Problem: req.body.problem,
            Adress: req.body.adress,
            Detail: req.body.msg,
            Pic: req.file.filename,
            AddOn: new Date,
            Status: "Processed",
            Assignedto: " ",
            Messageadmin: " ",
            Completedon:""

        })
        const result = await record.save()
        console.log(result)
        if (result) {
            res.send({ statuscode: 1 })
        }
        else {
            res.send({ statuscode: 0 })
        }
    }
})




//complaint  get with userid  api
app.get("/api/compget/:id", verifyToken, async (req, res) => {

    const result = await Compmodel.find({ Userid: req.params.id })

    if (result) {
        res.send({ statuscode: 1, compdata: result })
        console.log(result)
    }
    else {
        res.send({ statuscode: 0 })
    }
})


//get all complaints admin
app.get("/api/allcomp", verifyToken, async (req, res) => {
    const result = await Compmodel.find()
    if (result) {
        res.send({ statuscode: 1, compdata: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

//get detail of complaint
app.get("/api/detail/:id", verifyToken, async (req, res) => {
    const result = await Compmodel.findById({ _id: req.params.id })
    if (result) {
        res.send({ statuscode: 1, comp: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})


//assign to worker side comp
app.put("/api/compupdate/:id", verifyToken, async (req, res) => {
    const compup = await Compmodel.updateOne({ _id: req.params.id }, {
        $set: {
            Status: "Assigned to worker"
             ,Messageadmin:req.body.message,Assignedto:req.body.assignedtoo 

        }
    })
    if (compup) {
        console.log(compup)
        res.send({ statuscode: 1 })
    }
    else {
        res.send({ statuscode: 0 })
    }
})



// update by worker
app.put("/api/compupworker/:id", verifyToken, async (req, res) => {
    const compup = await Compmodel.updateOne({ _id: req.params.id }, {
        $set: {
            Status: "Assigned to worker"
             ,Messageadmin:req.body.message,Status:req.body.status ,Completedon:new Date()

        }
    })
  
    if (compup) {
      
        res.send({ statuscode: 1,newdata:compup })
    }
    else {
        res.send({ statuscode: 0 })
    }
})





//worker gets their work 
app.get("/api/compwork/:id", verifyToken, async(req,res)=>{
const findWork= await Compmodel.find({Assignedto:req.params.id})
if(findWork){
    res.send({statuscode:1,comp:findWork})
}else{
    res.send({statuscode:0})
}
})


//all assigned work 

app.get("/api/assignwork", verifyToken, async(req,res)=>{
    const findwork=await Compmodel.find({Status:"Assigned to worker"})
  
    if(findwork){
         
        res.send({statuscode:1,data:findwork})
    }
    else{
        res.send({statuscode:0})
    }
})


//all completed work 

app.get("/api/completed", verifyToken, async(req,res)=>{
    const findwork=await Compmodel.find({Status:"completed"})
  
    if(findwork){
         
        res.send({statuscode:1,data:findwork})
    }
    else{
        res.send({statuscode:0})
    }
})