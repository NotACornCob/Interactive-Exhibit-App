import React, { useState, useContext } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    CardActions,
    Collapse,
    Grid,
    IconButton,
    Box,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstallationCard from '../installations/installationcard';
import ReviewCard from '../reviews/reviewcard';
import { SocketContext } from '../../context/SocketContext';
import { toast } from 'react-toastify';

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

function ExhibitCard({ exhibit }) {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const socket = useContext(SocketContext);

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setExpanded(!expanded);
    };

    // Listen for interaction updates
    React.useEffect(() => {
        if (socket) {
            socket.on('interact_data', (username) => {
                console.log('Interaction update received:', username);
                toast(`${username} gained points for interacting!`, {
                    theme: theme.palette.mode === 'dark' ? 'dark' : 'light'
                });
            });

            return () => {
                socket.off('interact_data');
            };
        }
    }, [socket, theme.palette.mode]);

    return (
        <Box sx={{ padding: '10px' }}>
            <Grid container spacing={2} sx={{ alignItems: 'start', justifyContent: 'center' }}>
                <Grid item xs={12} md={5}>
                    <Card 
                        sx={{ 
                            backgroundImage: 'none',
                            width: '100%',
                            backgroundColor: 'background.paper',
                            color: 'text.primary'
                        }} 
                        elevation={6}
                    >
                        <CardContent>
                            <Typography 
                                gutterBottom 
                                variant="h5" 
                                component="div" 
                                textAlign="center"
                                color="text.primary"
                            >
                                {exhibit.name}
                            </Typography>
                            <Typography textAlign="center" color="text.secondary">
                                Located in {exhibit.location}
                            </Typography>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={exhibit.exhibit_img}
                                    alt={exhibit.name}
                                    sx={{ borderRadius: 1, mt: 2 }}
                                />
                            </CardActionArea>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ ml: 1 }}
                            >
                                Click to see installations
                            </Typography>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography 
                                    variant="h6" 
                                    textAlign="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Featured Installations
                                </Typography>
                                <Grid container spacing={2}>
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
                    <Typography 
                        variant="h6" 
                        textAlign="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Recent Reviews
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

export default ExhibitCard;