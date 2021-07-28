import React, { useContext, useState } from 'react';
import CourseRater from '../apis/CourseRater';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { CoursesContext } from '../context/CoursesContext';

const AddCourse = () => {
    const {addCourses} = useContext(CoursesContext);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [instructor, setInstructor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await CourseRater.post('/', {
                name,
                subject,
                instructor
            });
            addCourses(response.data.data.course);
            console.log(response);
        } catch (err) {}
    };
    return (
        <Container style = {{marginTop: "70px", marginBottom: "70px"}}>
            <form noValidate autoComplete="off">
                <TextField 
                    id="standard-basic" 
                    label="Course" 
                    style = {{marginLeft: "70px", marginRight: "70px"}} 
                    value = {name} 
                    onChange = {e => setName(e.target.value)}
                />
                <TextField 
                    id="standard-basic" 
                    label="Subject" 
                    style = {{marginLeft: "70px", marginRight: "70px"}}
                    value = {subject} 
                    onChange = {e => setSubject(e.target.value)}
                />
                <TextField 
                    id="standard-basic" 
                    label="Instructor" 
                    style = {{marginLeft: "70px", marginRight: "70px"}}
                    value = {instructor} 
                    onChange = {e => setInstructor(e.target.value)}
                />
                <Button 
                    disabled={!name || !subject || !instructor}
                    variant="contained" 
                    color="primary" 
                    style = {{marginLeft: "70px", marginRight: "70px"}}
                    type = "submit"
                    onClick = {handleSubmit}
                >
                    Add
                </Button>
            </form>
        </Container>
    )
};

export default AddCourse;
