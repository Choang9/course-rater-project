import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseRater from '../apis/CourseRater';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { CoursesContext } from '../context/CoursesContext';

const CourseDetail = () => {
    const { id } = useParams();
    const { selectedCourse, setSelectedCourse} = useContext(CoursesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CourseRater.get(`/${id}`);
                setSelectedCourse(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            {selectedCourse && (
            <>
            <h1 style = {{textAlign: "center", fontSize: "50px"}}>{selectedCourse.course.name}</h1>
            <div style = {{textAlign: "center"}}>
                <StarRating rating = {selectedCourse.course.average_rating} />
                <span>
                    {selectedCourse.course.count ? `(${selectedCourse.course.count})` : "(0)"}
                </span>
            </div>
                <div style = {{marginTop: "20px"}}>
                    <Reviews reviews = {selectedCourse.reviews} />
                </div>
                <AddReview />
            </>
            )}
        </div>
    );
};

export default CourseDetail;
