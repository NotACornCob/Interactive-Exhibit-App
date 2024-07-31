import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

      return (
    <Box sx={{ width: 'fullwidth', bgcolor: 'background.paper' }}>
     
      <Tabs value={value} onChange={handleChange} sx={{ 
      'width': 'full-width',
        }} centered>
        <Tab label="Home" href="/" value={0} />
        <Tab label="Featured Artists" href="/Artists" value={1} />
        <Tab label="Add Installation" href="/InstallationForm" value={2} />
      </Tabs>
    </Box>
  );
}
