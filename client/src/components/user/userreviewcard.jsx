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
import Container from '@mui/material/Container';
import theme from '../../theme';

function UserReviewCard({review}) {
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
    <div>
      <Container>
    <Grid item xs={4} maxWidth="300">
    <Card >
      <CardActionArea>
      <CardMedia component="img" height="200" image={review.exhibit.exhibit_img} alt= "featured review"/>
      </CardActionArea>
        <CardContent>
          {EditMode ? (
            <div>
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
              <Button color="primary" variant="contained" type="submit">
              Submit
              </Button>
          </form>
          </div>
          ) : <div>
          <Typography gutterBottom variant="h5" component="div">
              {review.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.body}
                </Typography>
                <div sx={{'padding':5}}>
          <Button color="info" variant="contained" fullWidth type="submit" onClick={editHandler} style={{ margin: '1px' }} >
                  Edit
          </Button>
          </div>
          <div padding={5} spacing={1}>
          <Button color="error" variant="contained" fullWidth type="submit" onClick={deleteHandler} style={{ margin: '1px' }}>
                  Delete
          </Button> 
          </div>
          </div> }
        </CardContent>
    </Card>
    </Grid>
    </Container>
    </div>
  );
}

export default UserReviewCard