import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import { CardActionArea } from '@mui/material';
import { ReviewContext } from '../../context/ReviewContext';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';

function ReviewCard({review}) {
  const {removeReview} = useContext(ReviewContext)
  const {editReview} = useContext(ReviewContext)
  const [EditMode, setEditMode] = useState(false)



function deleteHandler() {
  removeReview(review.id)
  }

function editHandler() {
    return setEditMode(true)
};

const initialValues = {
  "title": review.title,
  "body": review.body,
  "user_id": review.user_id,
  "exhibit_id": review.exhibit_id,
  "id": review.id
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
        console.log(values)
        editReview(values)
        setEditMode(false)
    }
})

  return (
    <Card sx={{
      backgroundImage: 'none',
      padding: '15px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
    elevation={3}>
      <Typography variant="body2" color="#2f4aef">
        @{review.user.username}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold', my: 1 }}>
        {review.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {review.body}
      </Typography>
    </Card>
  );
}

export default ReviewCard