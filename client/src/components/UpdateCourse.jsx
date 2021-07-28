import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { CoursesContext } from '../context/CoursesContext';
import CourseRater from '../apis/CourseRater';

const UpdateCourse = (props) => {
    const { id } = useParams();
    let history = useHistory()
    const { courses } = useContext(CoursesContext);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [instructor, setInstructor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await CourseRater.get(`/${id}`)
            console.log(response.data.data);
            setName(response.data.data.course.name)
            setSubject(response.data.data.course.subject)
            setInstructor(response.data.data.course.instructor)
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedCourse = await CourseRater.put(`/${id}`, {
            name,
            subject,
            instructor
        });
        history.push('/');
    };

    return (
        <>
            <Container style = {{marginTop: "70px", marginBottom: "70px"}}>
                <form noValidate autoComplete="off">
                    <TextField 
                        id="standard-basic" 
                        label="Course" 
                        style = {{marginLeft: "70px", width: "80%"}} 
                        value = {name} 
                        onChange = {e => setName(e.target.value)}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Subject" 
                        style = {{marginLeft: "70px", marginTop: "20px", width: "80%"}}
                        value = {subject} 
                        onChange = {e => setSubject(e.target.value)}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Instructor" 
                        style = {{marginLeft: "70px", marginTop: "20px", width: "80%"}}
                        value = {instructor} 
                        onChange = {e => setInstructor(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style = {{marginLeft: "70px", marginTop: "20px"}}
                        type = "submit"
                        onClick = {handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </>
    )
};

export default UpdateCourse;
