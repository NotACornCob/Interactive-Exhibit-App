import React from 'react';
import ArtistCard from './artistcard'
import { ArtistContext } from '../../context/ArtistContext'
import { useContext } from 'react'
import { Typography } from '@mui/material';

function ArtistList() {
    const {artists} = useContext(ArtistContext)

    const ArtistCards = artists.map(artist => <ArtistCard key={ artist.id } artist={artist} />)

    return ( <>
    <div><Typography variant="h4" component="div" sx={{ flexGrow: 1, "text-align":"center", margin: "10px" }}>Featured Artists</Typography></div>
    <div>{ArtistCards}</div>
    </>
     )
}

export default ArtistList;