import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardActionArea } from '@mui/material';
import { ReviewContext } from '../../context/ReviewContext';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';


const EditReviewForm = ({review}) => {
  const {editReview} = useContext(ReviewContext)
  const [EditMode, setEditMode] = useState(false)
  const reviewTitle = review.title
  const reviewBody = review.body
  const review_user = review.user_id 
  const review_exhibit = review.exhibit_id 
  const review_id = review.id


const initialValues = {
  "title": reviewTitle,
  "body": reviewBody,
  "user_id": review_user,
  "exhibit_id": review_exhibit,
  "id": review_id
}

const validationSchema = yup.object({
  title: yup
    .string('Enter review title')
    .required('Review title is required'),
  body: yup
    .string('Enter your review')
    .required('Review is required')
    .min(15, 'review should be of minimum 15 characters')
});

const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
        editReview(values)
  
    }
})

  return (
          <form onSubmit={formik.handleSubmit}>
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
          </form>
  );
}

export default EditReviewForm