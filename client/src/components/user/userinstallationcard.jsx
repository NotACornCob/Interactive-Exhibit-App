import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';


function UserInstallationCard({installation}) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [cookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const user_id = cookies.session_id


  const notify = (data) => toast(data + '' + ' has gained 3 points!', {
    theme:"dark"
  })

  const handleClick = (value) => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
    setInstallationId(installation.id)
  };  

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("http://localhost:5555", {
        transports: ["websocket"],
        upgrade: false,
        autoconnect: false,
      });
  
      setSocketInstance(socket);
      
  
      socket.on("connect", () => {
       console.log('client connected')
       console.log(user_id)
       console.log(installation_id)
       socket.emit('interact', user_id, installation_id)
      })
  
      socket.on("interact_data", (username) => {
        console.log('data received')
        socket.broadcast(notify(username))
        console.log(username)
      })
  
      setLoading(false);
  
      socket.on("disconnect", (data) => {
        console.log(data);
      });
  
      return function cleanup() {
        console.log('test')
      };
    }}
  , [buttonStatus]);

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