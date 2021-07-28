import React, {useState, createContext} from 'react';

export const CoursesContext = createContext();

export const CoursesContextProvider = (props) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const addCourses = (course) => {
        setCourses([...courses, course])
    };
    return (
        <CoursesContext.Provider value = {{courses, setCourses, addCourses, selectedCourse, setSelectedCourse}}>
            {props.children}
        </CoursesContext.Provider>
    )
};