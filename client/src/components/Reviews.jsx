import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarRating from './StarRating';

const Reviews = ({reviews}) => {
    return (
        <div style = {{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {reviews.map((review) => {
                return(
                    <Card key = {review.id} style = {{flexBasis: "423px", margin: "10px"}}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {review.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                <StarRating rating = {review.rating} />
                            </Typography>
                            <Typography variant="body2" component="p">
                                {review.review}
                            </Typography>
                        </CardContent>
                    </Card>
            )})}
        </div>
    )
};

export default Reviews;
