import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';

function LeaderBoardItem({user}) {
  const notify = (user, points) => toast(user + ' ' + 'has gained' + ' ' + points + ' ' + 'points!', {
    theme:"dark"
  })

  
  return (
    <Container sx={{ bgcolor: '#262129', color: "#262129"}}>
        <Box sx={{ bgcolor: '#262129', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Grid container sx={{ bgcolor: '#262129', margin:"0px", padding:"0px"}} >
        <Card sx={{  width: '500px', margin: 'auto', padding: '5px' }} elevation={3} spacing={3}>
        <CardContent sx={{borderRadius: 50, color: '#262129',}} elevation={3} xs={4} >
        <Typography gutterBottom variant="h4" component="div" textAlign="center">
        {user.points} points
      </Typography>
        <Typography sx={{color: "#3959cf"}}gutterBottom variant="h5" component="div" textAlign="center">
        @{user.username}
        </Typography>
    </CardContent>
    </Card>
    </Grid>
    </Box>
    </Container>
  );
}

export default LeaderBoardItem