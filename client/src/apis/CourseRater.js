import axios from 'axios';

export default axios.create({
    baseURL: "https://course-rater-project.herokuapp.com/api/courses"
})