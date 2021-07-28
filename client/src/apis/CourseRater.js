import axios from 'axios';

export default axios.create({
    baseURL: "https://course-rater-project/api/courses"
})