import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { SocketContext } from '../../context/SocketContext.jsx';

function InstallationCard({installation}) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [cookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const user_id = cookies.session_id;
  const [receivedUsernames, setReceivedUsernames] = useState([]);
  const [receivedInstallations, setReceivedInstallations] = useState([]);
  const socket = useContext(SocketContext);

  const notify = (data) => toast(data + '' + ' has gained 3 points!', {
    theme:"dark"
  });

  const handleClick = (value) => {
    setButtonStatus(!buttonStatus);
    setInstallationId(installation.id);
  };  

  useEffect(() => {
    if (buttonStatus && socket) {
      console.log('client connected');
      socket.emit('interact', user_id, installation_id);

      socket.on("interact_data", (username, installation) => {
        console.log("data received");
        if (!receivedUsernames.includes(username) || !receivedInstallations.includes(installation)) {
          notify(username);
          setReceivedUsernames((prevUsernames) => [...prevUsernames, username]);
          setReceivedInstallations((prevInstallations) => [...prevInstallations, installation]);
        }
      });

      return () => {
        socket.off("interact_data");
      };
    }
  }, [buttonStatus, socket, user_id, installation_id, receivedUsernames, receivedInstallations]);

  return (
    <div>
      <Card color="primary" >
        <CardContent>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={installation.image_url}
              alt="featured installation"
            />
          </CardActionArea>
          <Typography gutterBottom component="div">
            {installation.name}
          </Typography>
          <Button variant="contained" classname="btn" color="primary" fullWidth onClick={handleClick}>
            Interact
          </Button> 
        </CardContent>
      </Card>
      <br/>
    </div>
  );
}

export default InstallationCard;