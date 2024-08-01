import { useState, React, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { InstallationContext } from '../../context/InstallationContext'
import App from '../../App';

function InstallationCard({installation}) {
  const {removeInstallation} = useContext(InstallationContext)

  function deleteHandler() {
    removeInstallation(installation.id)
  }

function editHandler() {
  setInstallation(installation.id)
};

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
              <Typography variant="body2">
              {installation.description}
              </Typography>
              <Button color="primary" variant="contained" fullWidth type="submit"  href={`/Installation/${installation.id}`} onClick={editHandler} >
              Edit
              </Button>
              <Button color="secondary" variant="contained" fullWidth type="submit" onClick={deleteHandler}>
          Delete
        </Button>
            </CardContent>
        </Card>
        <br/>
        </div>
      );
    }

export default InstallationCard