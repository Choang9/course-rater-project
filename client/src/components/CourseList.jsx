import React, {useContext, useEffect} from 'react';
import CourseRater from '../apis/CourseRater';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { CoursesContext } from '../context/CoursesContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const CourseList = (props) => {
    console.log(props)
    const {courses, setCourses} = useContext(CoursesContext);
    console.log(courses);
    let history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CourseRater.get("/");
                setCourses(response.data.data.courses);
            } catch (err) {}    
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await CourseRater.delete(`/${id}`);
            setCourses(courses.filter(course => {
                return course.id !== id
            }));
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleUpdate = async (id) => {
        history.push(`/courses/${id}/update`)
    };

    const handleCourseSelect = (id) => {
        history.push(`/courses/${id}`)
    }

    const renderRating = (course) => {
        if (!course.count) {
            return <span>0 reviews</span>
        }
        return (
            <>
                <StarRating rating = {course.average_rating} />
                <span>({course.count})</span>
            </>
        )
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Course</TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Instructor</TableCell>
                <TableCell align="center">Ratings</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses && courses.map((course) => (
                <TableRow key={course.id}>
                    <TableCell component="th" scope="row">
                        {course.name}
                    </TableCell>
                    <TableCell align="center">{course.subject}</TableCell>
                    <TableCell align="center">{course.instructor}</TableCell>
                    <TableCell align="center">{renderRating(course)}</TableCell>
                    <TableCell align="center">
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick = {() => handleCourseSelect(course.id)}
                            >
                            Leave a Review
                        </Button>
                    </TableCell>
                    <TableCell align="center">
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick = {() => handleUpdate(course.id)}
                            >
                            Update
                        </Button>
                    </TableCell>
                    <TableCell align="center">
                    {!course.count && (<Button 
                            variant="contained" 
                            color="secondary"
                            onClick = {() => handleDelete(course.id)}
                            >
                            Delete
                        </Button>)}
                        
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CourseList;
