import { createContext, useState, useEffect } from 'react';
import io from "socket.io-client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';


const SocketContext = createContext([])

function SocketStateProvider({children}) {
const [isConnected, setIsConnected] = useState(false);
const [cookies] = useCookies(['session_id']);
const [usernameCookies] = useCookies(['username'])
const notify = (values) => toast(values.username + '' + ' has logged in!', {
  theme:"dark"
})


/* var socket = io.connect('http://localhost:5555',{transports: ['websocket'], upgrade: false});

useEffect(() => {
  function onConnect(data) {
    setIsConnected(true);
    socket.send('User is viewing a page!')
    socket.emit(notify('values' + data))
    }

  function onDisconnect() {
    setIsConnected(false);
  }

  function onLogin(values) {
    socket.send(values.username + '' + 'has joined the Rec Room!')
    toast_user(values)
  }

  function onSubmission() {

  }

  function onEvent(values) {
    socket.on('submit', (msg) => {
    } )
    setEvents(previous => [...previous, value]);
  }

  function custom_event() {
    socket.send('is this really json?')
  }

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('foo', onEvent);
  socket.on('custom_event', custom_event)

  socket.on('response', function(msg) {
    console.log(msg);
  })

  socket.on('JSON', function(json) {
    console.log(json);
  })
  


  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    socket.off('foo', onEvent);
  };
}, []); */

async function handleDelete(installation) {
/*   setEvents(previous => [...previous, installation.name])
  socket.send(installation.name + 'has been deleted'); */
}


return <SocketContext.Provider value={{isConnected, handleDelete}}>{children}</SocketContext.Provider>
}

export {SocketContext, SocketStateProvider}