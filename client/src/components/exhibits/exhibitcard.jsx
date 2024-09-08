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
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiIconButton-root': {
    padding: 0,
  },
}));

function ExhibitCard({exhibit}) {
const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = (event) => {
  event.stopPropagation();
  setExpanded(!expanded);
};
  
  return (
    <Box sx={{padding: '10px' }}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch', justifyContent: 'center' }}>
            <Grid item xs={12} md={5}>
                <Card sx={{ backgroundImage: 'none', width: '100%' }} elevation={3}>
                    <CardContent sx={{ borderRadius: 0 }} elevation={3}>
                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                            {exhibit.name}
                        </Typography>
                        <Typography textAlign="center">
                            Located in {exhibit.location}
                        </Typography><br />
                        <CardActionArea>
                            <CardMedia
                                sx={{ borderColor: 'primary', borderRadius: 0 }}
                                component="img"
                                height="200"
                                image={exhibit.exhibit_img}
                                alt="featured exhibit"
                            />
                        </CardActionArea>
                    </CardContent>
                    <Typography textAlign="center">
                        Click to learn more!
                    </Typography>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            disableRipple
                            sx={{ backgroundColor: 'transparent' }}
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent elevation={3}>
                            <Typography variant="body2" textAlign="center">
                                Trending Exhibits:
                            </Typography>
                            <Grid container spacing={1}>
                                {exhibit.installations.map((installation) => (
                                    <Grid item xs={12} sm={6} key={installation.id}>
                                        <InstallationCard installation={installation} />
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="body2" textAlign="center" padding="15px">
                    What Today's Guests Are Saying About "{exhibit.name}"
                </Typography>
                <Grid container direction="column" spacing={2}>
                    {exhibit.reviews.map(review => (
                        <Grid item key={review.id}>
                            <ReviewCard review={review} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}

export default ExhibitCard