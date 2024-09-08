import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import { SocketContext } from '../../context/SocketContext.jsx';

function UserInstallationCard({installation}) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [cookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const [loading, setLoading] = useState(true);
  const user_id = cookies.session_id
  const socket = useContext(SocketContext);

  const notify = (data) => toast(data + '' + ' has gained 3 points!', {
    theme:"dark"
  })

  const handleClick = (value) => {
    setButtonStatus(!buttonStatus);
    setInstallationId(installation.id)
  };  

  useEffect(() => {
    if (buttonStatus && socket) {
      console.log('client connected')
      console.log(user_id)
      console.log(installation_id)
      socket.emit('interact', user_id, installation_id)

      socket.on("interact_data", (username) => {
        console.log('data received')
        notify(username)
        console.log(username)
      })

      setLoading(false);

      return () => {
        socket.off("interact_data");
      };
    }
  }, [buttonStatus, socket, user_id, installation_id]);

  return (
    <div>
      <Container>
    <Card >
       <CardContent>
      <CardActionArea>
        <CardMedia
              component="img"
              height="200"
              image={installation.image_url}
              alt= "featured installation"
            />
             </CardActionArea>
          <Typography gutterBottom variant="h6" component="div">
            {installation.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" alignContent="center">
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
          </CardContent>
    </Card><br/>
    </Container>
    </div>
  );
}

export default UserInstallationCard