import { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { UserContext } from '/src/context/UserContext'
import { SocketContext } from '../../context/SocketContext'
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
import { useCookies } from 'react-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

  const LoginForm = () => {
  const {addUser} = useContext(UserContext)
  const [cookies, setCookie] = useCookies();
  const {login} = useContext(SocketContext)
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [usernameCookies] = useCookies(['username'])
  const notify = (data) => toast(data + '' + ' has logged in!', {
    theme:"dark"
  })
  
  const validationSchema = yup.object({
      username: yup
        .string('Enter installation name')
        .required('please enter a username'),
    });

  
  const initialValues = {
      "username": "user1",
      "points": 0,
      "session_id": "",
      "id": ""
  }
  
  const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnChange: false,
      onSubmit: function(values) {
          addUser(values)
          setCookie('username', values.username)
      }
  })

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("http://localhost:5555", {
        transports: ["websocket"],
        upgrade: false,
        autoconnect: false,
      });      

      socket.on("connect", () => {
       console.log('client connected')
       socket.send('message')
      })

      socket.on("data", (data) => {
        console.log('data received')
        socket.broadcast(notify(data))
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
      <Container>
     <Box sx={{ bgcolor: '#262129', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'5px' }}>
     <Card sx={{ margin: 'auto', padding:'5px', width:'400px' }}>
     <CardContent>
        <CardHeader title="Welcome to the REC ROOM!" subheader="In order to get the most interactive experience possible, we require all our guests create a username before using our app." />
        <form onSubmit={formik.handleSubmit}>
          
          <TextField
            fullWidth
            id="username"
            name="username"
            label="enter a username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" onClick={handleClick} >
            Submit
          </Button>
        </form>
        </CardContent>
        </Card>
        </Box>
      </Container>
    );
  };
  
  export default LoginForm