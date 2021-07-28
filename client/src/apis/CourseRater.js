import axios from 'axios';

export default axios.create({
    baseURL: "http://course-rater-project/api/courses"
})