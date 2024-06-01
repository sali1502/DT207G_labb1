/* Install-script labb 1, DT207G. Åsa Lindskog, sali1502@student.miun.se */

const sqlite3 = require("sqlite3").verbose();

// Skapa databas
const db = new sqlite3.Database("./db/courses.db");

// Skapa tabell (id, coursecode, coursename, syllabus, progression)
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses;");
    db.run(`
    CREATE TABLE courses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL
    );
`);
});

db.close();