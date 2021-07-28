require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Get all courses
app.get("/api/courses", async (req, res) => {
    try {
        const results = await db.query("select * from courses left join (select course_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by course_id) reviews on courses.id = reviews.course_id;");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                courses: results.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a course
app.get("/api/courses/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const course = await db.query("select * from courses left join (select course_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by course_id) reviews on courses.id = reviews.course_id where id = $1", [req.params.id]);
        const reviews = await db.query("select * from reviews where course_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                course: course.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Create a course
app.post("/api/courses/", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query("INSERT INTO courses (name, subject, instructor) values ($1, $2, $3) returning *", [req.body.name, req.body.subject, req.body.instructor]);
        res.status(201).json({
            status: "success",
            data: {
                course: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Update a course
app.put("/api/courses/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE courses SET name = $1, subject = $2, instructor = $3 where id = $4 returning *", [req.body.name, req.body.subject, req.body.instructor, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                course: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
});

// Delete a course
app.delete("/api/courses/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM courses where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/courses/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (course_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});