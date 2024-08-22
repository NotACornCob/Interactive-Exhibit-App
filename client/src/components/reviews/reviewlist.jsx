import React from 'react';
import { ReviewContext } from '../../context/ReviewContext'
import { useContext } from 'react'
import ReviewCard from './reviewcard'
import { useCookies } from 'react-cookie';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';


function ReviewList() {
    const {reviews} = useContext(ReviewContext)
    const [cookies] = useCookies(['session_id']);
    const hasCookie = !!cookies.session_id;
    const ReviewCards = reviews.map(review => <ReviewCard key={ review.id } review={review} />)

    return (
        <Grid container spacing={1}>
        {ReviewCards}
        </Grid>
    )
}
    


export default ReviewList;