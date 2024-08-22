import {useEffect, useState, useContext} from 'react'
import { ReviewContext } from '../../context/ReviewContext'
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import io from "socket.io-client";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import UserReviewList from '../user/userreviewlist';
import { Box, Container, Card, CardContent, CardHeader } from '@mui/material';

const notify = (data) => toast(data + '' + ' has submitted a review!', {
  theme:"dark"
})

const validationSchema = yup.object({
  title: yup
    .string('Enter review title')
    .required('Review title is required'),
  body: yup
    .string('Enter your review')
    .required('Review is required')
    .min(15, 'review should be of minimum 15 characters')
});

const ReviewForm = () => {
const [exhibits, setExhibits] = useState([])
const {addReview} = useContext(ReviewContext)
const [cookies, setCookie] = useCookies();
const [buttonStatus, setButtonStatus] = useState(false);
const [socketInstance, setSocketInstance] = useState("");
const [loading, setLoading] = useState(true);




const initialValues = {
  "title": "",
  "body": "",
  "user_id": cookies.session_id,
  "exhibit_id": "1",
  "id": ""
}

const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
        addReview(values)
        setCookie('reviewer','confirmed')
    }
})

const handleClick = () => {
  if (buttonStatus === false) {
    setButtonStatus(true);
  } else {
    setButtonStatus(false);
  }
};

useEffect(() => {
  if (buttonStatus === true) {
    const socket = io("http://localhost:5555", {
      transports: ["websocket"],
      upgrade: false,
      autoconnect: false,
    });

    setSocketInstance(socket);
    

    socket.on("connect", () => {
     console.log('client connected')
     socket.emit('review')
    })

    socket.on("review_data", (data) => {
      console.log('data received')
      socket.broadcast(notify(data))
    })

    setLoading(false);

    socket.on("disconnect", (data) => {
      console.log(data);
    });

    return function cleanup() {
      console.log('test')
    };
  }}
, [buttonStatus]);




  useEffect(() => {
    const loadExhibits = async () => {
        const resp = await fetch("/api/exhibits")
        const data = await resp.json()
        setExhibits(data)
    }
    loadExhibits()
},[])

  const exhibitOptions = exhibits.map(exhibit => <option key={exhibit.id} value={exhibit.id}>{ exhibit.name }</option>)

  return (
      <Container >
        <Box sx={{ color: '#262129', bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px', height: '100vh'}}>
        <Card >
        <CardContent>
          <CardHeader title="Submit a Review" subheader="Tell us what you think & get your name on the leaderboard!" />
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="subtitle1" color="textSecondary">
          <label htmlFor="exhibit_id" >Exhibit: </label>
          </Typography>
          <select name="exhibit_id" id="exhibit_id" value={formik.values.exhibit_id} fullWidth onChange={formik.handleChange}>
          {exhibitOptions}
        </select>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Review Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="body"
          name="body"
          label="Review"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />
        <br/>
          <Button color="primary" variant="contained" fullWidth type="submit" onClick={handleClick}>
          Submit
          </Button>
      </form>
      </CardContent>
      {UserReviewList}
      </Card>
      </Box >
      </Container>
  );
};

export default ReviewForm