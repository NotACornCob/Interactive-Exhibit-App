import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ArtistContext } from '../../context/ArtistContext'
import { useContext } from 'react'

export default function ArtistCard({artist}) {

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="String"
          height="140"
          alt= "featured artist"
        />
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