import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@material-ui/core/Button';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';


function InstallationCard({installation}) {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [cookies] = useCookies('session_id');
  const [Installationcookies] = useCookies('session_id');
  const [installation_id, setInstallationId] = useState('');
  const user_id = cookies.session_id
  const [receivedUsernames, setReceivedUsernames] = useState([]);
  const [receivedInstallations, setReceivedInstallations] = useState([]);

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
      });      
  
      socket.on("connect", () => {
       console.log('client connected')
       socket.emit('interact', user_id, installation_id)
      })

      socket.on("interact_data", (username, installation) => {
        console.log("data received");
        if (!receivedUsernames.includes(username) || !receivedInstallations.includes(installation)) {
          notify(username);
          setReceivedUsernames((prevUsernames) => [...prevUsernames, username]);
          setReceivedInstallations((prevInstallations) => [...prevInstallations, installation]);
        }
      });
    
      socket.on("disconnect", (data) => {
        console.log(data);
      });
  
      return function cleanup() {
        socket.off("interact_data")
      };
    }}
  , [buttonStatus, receivedUsernames]);

  return (
    <div>
    <Card color="primary" >
       <CardContent>
      <CardActionArea>
        <CardMedia
              component="img"
              height="200"
              image={installation.image_url}
              alt= "featured installation"
            />
             </CardActionArea>
          <Typography gutterBottom component="div">
            {installation.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
          <Button color="primary" variant="contained" fullWidth type="submit" value={installation.id} onClick={handleClick}>
                  Interact
          </Button> 
          </CardContent>
    </Card><br/>
    </div>
  );
}

export default InstallationCard