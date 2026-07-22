const mongoose = require('mongoose');
const express = require('express');
const app = express();

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
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

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Chatbot RAG Logic
const getKnowledgeBase = () => {
    try {
        const filePath = path.join(__dirname, 'website-data.txt');
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error("Error reading knowledge base file:", error);
        return "";
    }
};

const searchContext = (query) => {
    return getKnowledgeBase();
};

const genAI = new GoogleGenerativeAI(process.env.geminiApi);

const generateResponse = async (question, context) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
You are a helpful assistant for the Municipal Services Portal. 
Below is the content of our knowledge base. 
Answer the user's question based strictly and ONLY on this knowledge base content. 
If the answer cannot be found in the knowledge base, you must reply exactly with: "Information not found in the knowledge base."
Do not generate any information that is outside of this context.

--- KNOWLEDGE BASE ---
${context}
----------------------

User Question: ${question}
Answer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Error generating response from Gemini API:", error);
        return "I'm sorry, I am currently experiencing technical difficulties. Please try again later.";
    }
};

app.post('/api/chat', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ answer: "Please provide a question." });
        }
        const context = searchContext(question);
        const answer = await generateResponse(question, context);
        res.json({ answer });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        res.status(500).json({ answer: "Server error. Please try again later." });
    }
});



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








//mailersend setup
const mailerSendApiKey = process.env.mailtoken;

if (!mailerSendApiKey) {
    console.error("MailerSend API key is missing. Please set mailtoken in your .env file.");
}

const mailerSend = mailerSendApiKey ? new MailerSend({
    apiKey: mailerSendApiKey,
}) : null;


//mailersend api

app.post('/api/nodemail', async (req, res) => {

    console.log("mailersend api hit")
    const email = req.body.email
    const name = req.body.name
    console.log(email, "email from api")

    if (!mailerSend) {
        return res.status(500).send({ statuscode: 0, message: "MailerSend is not configured. Please set your mailtoken in .env." })
    }

    const sentFrom = new Sender(process.env.maileremail || "no-reply@yourdomain.com", "Municipal Services");
    const recipients = [
        new Recipient(email, name)
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Regarding your complaint")
        .setText("Thanks for contacting us, we have received your complaint and will get back to you soon")
        .setHtml(`
            <div style="margin:0;padding:0;background-color:#f4f7fb;">
              <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
                <div style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #d9e2f0;box-shadow:0 8px 24px rgba(15,23,42,0.08);">
                  <div style="background:linear-gradient(135deg,#0f172a,#1d4ed8);padding:24px 28px;color:#ffffff;">
                    <p style="margin:0;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#dbeafe;">Municipal Services Portal</p>
                    <h1 style="margin:12px 0 6px;font-size:26px;line-height:1.3;color:#ffffff;">Thanks for reaching out, ${name || 'Customer'}.</h1>
                    <p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;">We’ve received your complaint and our team is reviewing it now.</p>
                  </div>

                  <div style="padding:28px;">
                    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155;">
                      Your request has been logged successfully. We appreciate the details you shared and will work to resolve the issue as quickly as possible.
                    </p>

                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:18px 20px;margin:20px 0;">
                      <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#0f172a;">What happens next</p>
                      <ul style="margin:0;padding-left:20px;color:#475569;font-size:15px;line-height:1.8;">
                        <li>Our team will review your complaint.</li>
                        <li>We will update the status and communicate any next steps.</li>
                        <li>Once the issue is resolved, you’ll receive confirmation.</li>
                      </ul>
                    </div>

                    <p style="margin:18px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
                      If you need to add more information, please log in to your account and update the complaint details.
                    </p>
                  </div>

                  <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 28px;text-align:center;">
                    <p style="margin:0;font-size:13px;color:#64748b;">Municipal Services Portal • Trusted support for your community</p>
                  </div>
                </div>
              </div>
            </div>
        `);

    try {
        const result = await mailerSend.email.send(emailParams);
        console.log(result, "result from mailersend")
        res.send({ statuscode: 1, message: "Email sent Succesfully" })
    } catch (error) {
        const statusCode = error?.statusCode;
        const responseBody = error?.body;

        if (statusCode === 401) {
            console.error("MailerSend authentication failed. Check your mailtoken in .env.", {
                statusCode,
                body: responseBody,
            });
        } else {
            console.error("MailerSend error", {
                statusCode,
                body: responseBody,
            });
        }

        res.send({ statuscode: 0, message: "Error occurred while sending mail" })
    }

})





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
app.get("/api/workers", async (req, res) => {
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

    if (!find) {
        return res.send({ statuscode: 0, message: "User not found" })
    }

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
    Priority: String,
    Status: String,
    Assignedto: String,
    Messageadmin: String,
    Completedon: String
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
            Completedon: ""

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
app.get("/api/compget/:id", async (req, res) => {

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
app.get("/api/allcomp", async (req, res) => {
    const result = await Compmodel.find().sort({ "AddOn": -1 })
    if (result) {
        res.send({ statuscode: 1, compdata: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

//get detail of complaint
app.get("/api/detail/:id", async (req, res) => {
    const result = await Compmodel.findById({ _id: req.params.id })
    if (result) {
        res.send({ statuscode: 1, comp: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})


//assign to worker side comp
app.put("/api/compupdate/:id", async (req, res) => {
    const compup = await Compmodel.updateOne({ _id: req.params.id }, {
        $set: {
            Status: "Assigned to worker"
            , Messageadmin: req.body.message, Assignedto: req.body.assignedtoo, Priority: req.body.priority

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
app.put("/api/compupworker/:id", async (req, res) => {
    const compup = await Compmodel.updateOne({ _id: req.params.id }, {
        $set: {
            Status: "Assigned to worker"
            , Messageadmin: req.body.message, Status: req.body.status, Completedon: new Date()

        }
    })

    if (compup) {

        res.send({ statuscode: 1, newdata: compup })
    }
    else {
        res.send({ statuscode: 0 })
    }
})





//worker gets their work 
app.get("/api/compwork/:id", async (req, res) => {
    const findWork = await Compmodel.find({ Assignedto: req.params.id })
    if (findWork) {
        res.send({ statuscode: 1, comp: findWork })
    } else {
        res.send({ statuscode: 0 })
    }
})


// unassigned work
app.get("/api/notassign", async (req, res) => {
    const findwork = await Compmodel.find({ Assignedto: " " });
    if (findwork) {
        res.send({ statuscode: 1, data: findwork });
    } else {
        res.send({ statuscode: 0 });
    }
});

// processed work
app.get("/api/processed", async (req, res) => {
    const query = { Status: "Processed" };
    if (req.query.workerId) {
        query.Assignedto = req.query.workerId;
    }
    const findwork = await Compmodel.find(query);
    if (findwork) {
        res.send({ statuscode: 1, data: findwork });
    } else {
        res.send({ statuscode: 0 });
    }
});

//all assigned work 
app.get("/api/assignwork", async (req, res) => {
    const query = { Status: "Assigned to worker" };
    if (req.query.workerId) {
        query.Assignedto = req.query.workerId;
    }
    const findwork = await Compmodel.find(query);
    if (findwork) {
        res.send({ statuscode: 1, data: findwork });
    }
    else {
        res.send({ statuscode: 0 });
    }
})


//all completed work 
app.get("/api/completed", async (req, res) => {
    const query = { Status: "completed" };
    if (req.query.workerId) {
        query.Assignedto = req.query.workerId;
    }
    const findwork = await Compmodel.find(query);
    if (findwork) {
        res.send({ statuscode: 1, data: findwork });
    }
    else {
        res.send({ statuscode: 0 });
    }
})

//all reverted work
app.get("/api/reverted", async (req, res) => {
    const query = { Status: "Revert to admin" };
    if (req.query.workerId) {
        query.Assignedto = req.query.workerId;
    }
    const findwork = await Compmodel.find(query);
    if (findwork) {
        res.send({ statuscode: 1, data: findwork });
    }
    else {
        res.send({ statuscode: 0 });
    }
})