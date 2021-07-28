import axios from 'axios';

export default axios.create({
    baseURL:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3006/api/courses"
            : "https://course-rater-project.herokuapp.com/api/courses",
    timeout: 5000,
})