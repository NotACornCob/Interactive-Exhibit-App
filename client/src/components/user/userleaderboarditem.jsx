import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const ColoredTypography = styled(Typography)(({ theme }) => ({
  color: "#3959cf",
}));

function LeaderBoardItem({user}) {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px'}}>
        <Grid container sx={{ margin:"0px", padding:"0px"}} >
          <Card sx={{  width: '500px', margin: 'auto', padding: '5px' }} elevation={3}>
            <CardContent sx={{borderRadius: 50}} elevation={3}>
              <Typography >
                {user.points} points
              </Typography>
              <ColoredTypography 
                textAlign="center"
                component="div"
              >
                @{user.username}
              </ColoredTypography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
}

export default LeaderBoardItem;