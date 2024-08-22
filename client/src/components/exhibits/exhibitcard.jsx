import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Collapse, CardHeader,Container, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import InstallationCard from '../installations/installationcard';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import ReviewCard from '../reviews/reviewcard';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ExhibitCard({exhibit}) {
const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
  setExpanded(!expanded);
};
  
  return (
    <Container>
      <Box sx={{ color: '#262129', bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Card sx={{  width: '500px', margin: 'auto' }} elevation={3} spacing={3}>
          <CardContent sx={{borderRadius: 0, color: '#262129',}} elevation={3} xs={4} >
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {exhibit.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
            Located in {exhibit.location}
            </Typography><br/>
          <CardActionArea>
            <CardMedia
                  sx={{borderColor: 'primary', borderRadius: 0}}
                  component="img"
                  height="200"
                  image={exhibit.exhibit_img}
                  alt= "featured exhibit"
                />
             </CardActionArea>
          </CardContent>
            <Typography variant="body2" color="text.secondary" textAlign="center">
            Click to learn more!
            </Typography>
          <CardActions disableSpacing>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
        <ExpandMoreIcon />
        </ExpandMore>
          </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent elevation={3}>
          <Typography variant="body2" color="text.primary" textAlign="center">
          Trending Exhibits:
          </Typography>
        <Grid container spacing={1}>
          {exhibit.installations.map((installation) => (
          <Grid item xs={12} md={6} key={installation.id}>
          <InstallationCard key={installation.id} installation={installation} />
        </Grid>))}
        </Grid>
        </CardContent>
        </Collapse>
      </Card>  
    </Box>
        <Typography variant="body2" color="#ffffff" textAlign="center" padding="5px">
        What Today's Guests Are Saying About "{exhibit.name}"
        </Typography>
          {exhibit.reviews.map(review =>  <Card key={review.id} margin="auto" spacing={2} sx={{ bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:"5px"}}><ReviewCard key={ exhibit.id } review={review} /></Card>)}
        </Container>);
}

export default ExhibitCard