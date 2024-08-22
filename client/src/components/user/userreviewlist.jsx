import React from 'react';
import { ReviewContext } from '../../context/ReviewContext'
import { useContext } from 'react'
import ReviewCard from '../reviews/reviewcard'
import { useCookies } from 'react-cookie';
import UserReviewCard from './userreviewcard';


function UserReviewList() {
    const {reviews} = useContext(ReviewContext)
    const [cookies] = useCookies(['session_id']);
    const UserReviewCards = reviews.filter(review => review.user_id === cookies.session_id)
    .map(filteredReview => <UserReviewCard key={filteredReview.id} review={filteredReview} />)
    return (
    <div>{UserReviewCards}</div>
    )
}
    


export default UserReviewList;