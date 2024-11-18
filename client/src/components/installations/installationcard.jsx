import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { SocketContext } from '../../context/SocketContext.jsx';
import { UserContext } from '../../context/UserContext.jsx';

function InstallationCard({installation}) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [cookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const user_id = cookies.session_id;
  const [receivedUsernames, setReceivedUsernames] = useState([]);
  const [receivedInstallations, setReceivedInstallations] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleInteractData = (username) => {
      console.log('Received interact_data:', username);
      toast(`${username} gained 10 points for interacting!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    socket.on('interact_data', handleInteractData);

    return () => {
      socket.off('interact_data', handleInteractData);
    };
  }, [socket]);

  const handleInteract = () => {
    if (socket && user) {
      setIsLoading(true);
      console.log('Emitting interact event:', { user_id: user.id, installation_id: installation.id });
      socket.emit('interact', user.id, installation.id);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card color="primary" elevation={4}>
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
          <Button variant="contained" className="btn" color="primary" fullWidth onClick={handleInteract} disabled={isLoading}>
            {isLoading ? 'Interacting...' : 'Interact'}
          </Button> 
        </CardContent>
      </Card>
      <br/>
    </div>
  );
}

export default InstallationCard;