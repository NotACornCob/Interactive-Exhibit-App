import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function InstallationCard({installation}) {
    return (
      <div>
        <Card sx={{ maxWidth: 800, elevation: 1 }}>
          <CardActionArea elevation={1}>
            <CardMedia
              component="img"
              height="600"
              image={installation.image_url}
              alt= "featured installation"
            />
            </CardActionArea>
            <CardContent>
              <Typography variant="h4">
                {installation.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {installation.artist.name} */}
              </Typography>
              <Typography variant="body2">
              {installation.description}
              </Typography>
            </CardContent>
        </Card>
        <br/>
        </div>
      );
    }

export default InstallationCard