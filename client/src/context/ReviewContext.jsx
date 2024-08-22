import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client";

const ReviewContext = createContext([])

function ReviewProvider({children}) {
    const [reviews, setReviews] = useState([])
    const [cookies] = useCookies(['username']);
    var socket = io.connect('http://localhost:5555',{transports: ['websocket'], upgrade: false});

    const notify = (values) => toast(cookies.username + '' + ' has submitted a review!', {
        theme:"dark"
      })

    useEffect(() => {
        const loadReviews = async () => {
            const resp = await fetch("/api/reviews")
            const data = await resp.json()
            setReviews(data)
        }

        loadReviews()
    }, [])

    async function addReview(ReviewValues) {
        const resp = await fetch("/api/reviews", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ReviewValues)
        })
    const review = await resp.json()
    console.log(review)
    setReviews([...reviews, review])
}

async function editReview(review) {
    const resp = await fetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
const updatedReview = await resp.json()
console.log(updatedReview)
const index = reviews.findIndex((r) => r.id === updatedReview.id)
const updatedReviews = [...reviews]
updatedReviews[index] = updatedReview
setReviews(updatedReviews)
}

async function removeReview(id) {
    const resp = await fetch(`http://127.0.0.1:5555/api/reviews/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      const updatedReviews = reviews.filter(
        (review) => review.id !== id
      );
      setReviews(updatedReviews);
    } else {
      console.log("Failed to delete installation with id:", id);
    }
  }

    return <ReviewContext.Provider value={{reviews, addReview, editReview, removeReview}}>{children}</ReviewContext.Provider>
}

export { ReviewContext, ReviewProvider }