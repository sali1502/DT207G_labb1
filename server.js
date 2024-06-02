/* DT207G, labb 1. Åsa Lindskog, sali1502@student.miun.se */

const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

// Anslut till databasen
const db = new sqlite3.Database("./db/courses.db");

// Inställningar
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.get("/", (req, res) => {
    // Läs ut befintlig data från databasen
    db.all("SELECT * FROM courses;",
        (err, rows) => {
            if (err) {
                console.error(err.message);
            }

            res.render("index", {
                title: "Startsida",
                error: "",
                rows: rows
            });

        });
});

app.get("/addcourse", (req, res) => {
    res.render("addcourse", {
        error: "",
    });
});

// Skapa nytt inlägg
app.post("/addcourse", (req, res) => {
    let coursecode = req.body.coursecode;
    let coursename = req.body.coursename;
    let progression = req.body.progression;
    let syllabus = req.body.syllabus;
    let error = "";

    // Kontrollera input
    if (coursecode !== "" && coursename !== "" && progression !== "" && syllabus !== "") {

        // Korrekt - Lagra i db
        const stmt = db.prepare("INSERT INTO courses(coursecode, coursename, progression, syllabus)VALUES(?,?,?,?);");
        stmt.run(coursecode, coursename, progression, syllabus);
        stmt.finalize();
    } else {
        error = "Du måste fylla i alla fält i formuläret!";
    }

    res.render("addcourse", {
        error: error
    });
});

app.get("/changecourse", (req, res) => {
    res.render("changecourse");
});

app.get("/about", (req, res) => {
    res.render("about", {
    });
});

app.get("/delete/:id", (req, res) => {
    let id = req.params.id;

    // Radera inlägg
    db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
        if (err) {
            console.error(err.message);
        }
        // Redirect till startsidan
        res.redirect("/");
    });
});

// Starta applikationen
app.listen(port, () => {
    console.log("server started on port " + port);
});