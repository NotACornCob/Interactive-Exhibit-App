import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function InstallationCard({installation}) {
    return (
        <Card sx={{ maxWidth: 600, elevation: 1 }}>
          <CardActionArea elevation={1}>
            <CardMedia
              component="img"
              height="400"
              image={installation.image_url}
              alt= "featured installation"
            />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {installation.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {installation.description}
              </Typography>
            </CardContent>
        </Card>
      );
    }

export default InstallationCard