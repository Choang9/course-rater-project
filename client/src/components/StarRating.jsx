import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const StarRating = ({rating}) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<StarIcon key = {i}/>);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) { 
            stars.push(<StarHalfIcon key = {i}/>);
        } else {
            stars.push(<StarBorderIcon key = {i}/>);
        }
    }
    return (
        <>
         {stars}   
        </>
    )
};

export default StarRating;
