// const express = require("express")
// const hbs = require("hbs")
// const path = require("path")


// const app = express()

// app.set("view engine", "hbs")
// app.use(express.static("public"))

// hbs.registerPartials(path.join(__dirname, "views/partials"))

// app.get("", (req, res) => {
//    res.render("index")
// })

// app.get("/about", (req, res) => {
//    res.render("about")
// })
// app.get("/contact", (req, res) => {
//    res.render("contact")
// })
// app.get("/feature", (req, res) => {
//    res.render("feature")
// })
// app.get("/project", (req, res) => {
//    res.render("project")
// })
// app.get("/service", (req, res) => {
//    res.render("service")
// })
// app.get("/team", (req, res) => {
//    res.render("team")
// })
// app.get("/testimonial", (req, res) => {
//    res.render("testimonial")
// })
// app.get("*", (req, res) => {
//    res.render("404")
// })

// app.listen(8000, () => console.log("server is running at http://localhost:8000"))



const express = require("express")
const hbs = require("hbs")
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

const app = express()
const encoder = bodyParser.urlencoded()

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   tls: true,
   auth: {
      user: "py1181216@gmail.com",
      pass: "xoeutkpxscssctcc"
   }
})

app.set("view engine", "hbs")
app.use(express.static("public"))

hbs.registerPartials(path.join(__dirname, "views/partials"))

app.get("", (req, res) => {
   res.render("index")
})

app.get("/about", (req, res) => {
   res.render("about")
})

app.get("/service", (req, res) => {
   res.render("service")
})


app.get("/contact", (req, res) => {
   res.render("contact", { show: false })
})

app.post("/contact", encoder, (req, res) => {
   let mailOptions = {
      from: "py1181216@gmail.com",
      to: req.body.email,
      subject: "Confirmation : Industro",
      text: `
                Hello ${req.body.name}
                Your Query Received!!!
                Our Team Will Contact You Soon!!!
                Team Industro
            `
   }
   transporter.sendMail(mailOptions, (error) => {
      console.log(error)
   })

   mailOptions = {
      from: "py1181216@gmail.com",
      to: "py1181216@gmail.com",
      subject: "Query Received : Industro",
      html: `
                <h3>One Query Received</h3>
                <p>Followings are the Details</p>
                <table border="2px" cellpadding="10px">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${req.body.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${req.body.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${req.body.phone}</td>
                        </tr>
                        <tr>
                            <th>Subect</th>
                            <td>${req.body.subject}</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td>${req.body.message}</td>
                        </tr>
                    </tbody>
                </table>
            `
   }
   transporter.sendMail(mailOptions, (error) => {
      console.log(error)
   })
   res.render("contact", { show: true })
})

app.get("/project", (req, res) => {
   res.render("project")
})

app.get("/feature", (req, res) => {
   res.render("feature")
})

app.get("/team", (req, res) => {
   res.render("team")
})

app.get("/testimonial", (req, res) => {
   res.render("testimonial")
})


app.get("/*", (req, res) => {
   res.render("404")
})


app.listen(8000, () => console.log("Server is Running at http://localhost:8000"))