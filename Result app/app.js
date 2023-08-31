//express app
const express = require("express");
const app = express();
const sequelize = require('./Database/connection')
const cookieParser = require('cookie-parser');
const port = 3000;
const fs=require('fs')
require('./Database/connection');


app.use(cookieParser());

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//seeding
const seedQuery = fs.readFileSync("./seeders/seed.sql", {
encoding: "utf-8"
});
(async () => {
try {
await sequelize.query(seedQuery)
}
catch (error) {
if (error) {
  console.log(`User  already exists. Skipping...`);
} else {
  console.error(`Error seeding user :`, error);
}
}
})();

// Clear the cookie by setting an empty value and an expired date

app.get('/logout', (req, res) => {
res.clearCookie('uid');
res.redirect('/');
});


//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);


//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});