import React from 'react';
import { ExhibitContext } from '../../context/ExhibitContext'
import { useContext } from 'react'
import ExhibitCard from './exhibitcard'
import { Grid, Container, Typography } from '@mui/material';


function ExhibitList() {
    const {exhibits} = useContext(ExhibitContext)

    return (
        <Container maxWidth="xl">
            <Typography 
                variant="h4" 
                sx={{ 
                    textAlign: 'center', 
                    margin: '20px 0',
                    color: 'text.primary'
                }}
            >
                Featured Exhibits
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {exhibits.map(exhibit => (
                    <Grid item xs={12} key={exhibit.id}>
                        <ExhibitCard exhibit={exhibit} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default ExhibitList;