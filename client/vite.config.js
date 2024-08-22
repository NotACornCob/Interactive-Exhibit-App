import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
const notify = (values) => toast(values.username + '' + ' has logged in!', {
  theme:"dark"
})


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  transports: ['websocket'],
  server: {
    proxy: {
     '/api': {
       target: 'http://localhost:5555',
       changeOrigin: true,
     },
    },
   }
});
