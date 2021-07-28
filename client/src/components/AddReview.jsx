import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CourseRater from '../apis/CourseRater';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const AddReview = () => {
    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();
    
    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('Rating');

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await CourseRater.post(`/${id}/addReview`, {
                name, 
                review: reviewText,
                rating
            });
            history.push("/");
            history.push(location.pathname);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container style = {{marginTop: "70px", marginBottom: "70px", marginLeft: "0.1px"}}>
            <form noValidate autoComplete="off">
                <TextField
                    style = {{margin: "10px"}}
                    label="Name"
                    multiline
                    rowsMax={4}
                    variant="outlined"
                    value = {name} 
                    onChange = {e => setName(e.target.value)}
                />
                <TextField
                    style = {{margin: "10px", width: "550px"}}
                    label="Write a review"
                    multiline
                    rows={8}
                    variant="outlined"
                    value = {reviewText} 
                    onChange = {e => setReviewText(e.target.value)}
                />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
                    <Select
                        style = {{margin: "10px"}}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={rating}
                        onChange = {e => setRating(e.target.value)}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style = {{margin: "10px"}}
                    type = "submit"
                    onClick = {handleSubmitReview}
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
};

export default AddReview;
