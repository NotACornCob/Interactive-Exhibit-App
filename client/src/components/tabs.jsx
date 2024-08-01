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
    <Box sx={{ width: 'fullwidth', bgcolor: 'primary' }}>
     
      <Tabs value={value} onChange={handleChange} sx={{ 
      'width': 'full-width', '.MuiTabs-indicator': 'None'
        }} centered>
        <Tab label="Home" href="/" />
        <Tab label="Featured Artists" href="/Artists"/>
        <Tab label="Add Installation" href="/InstallationForm" />
        <Tab label="Edit Installation" href="/EditForm" />
        <Tab label="Add Artist" href="/ArtistForm" />
        <Tab label="Add Exhibit" href="/ExhibitForm" />

      </Tabs>
    </Box>
  );
}
