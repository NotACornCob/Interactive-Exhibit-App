import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function ArtistCard({artist}) {

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {artist.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ArtistCard