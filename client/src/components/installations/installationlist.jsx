import React from 'react';
import { InstallationContext } from '../../context/InstallationContext'
import { useContext } from 'react'
import InstallationCard from './installationcard'
import Grid from '@mui/material/Grid';

function InstallationList() {
    const {installations} = useContext(InstallationContext)

    const InstallationCards = installations.map(installation => <InstallationCard key={ installation.id } installation={ installation } />)

    return (
        <div>
        <Grid containerdirection="column"
        justify="center"
        alignItems="center">
    <div>{InstallationCards}</div>
    </Grid>
    </div>)
}

export default InstallationList;