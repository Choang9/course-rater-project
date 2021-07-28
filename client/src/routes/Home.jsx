import React from 'react';
import AddCourse from '../components/AddCourse';
import CourseList from '../components/CourseList';
import Header from '../components/Header';

const Home = () => {
    return (
        <div>
            <Header />
            <AddCourse />
            <CourseList />
        </div>
    )
};

export default Home;

