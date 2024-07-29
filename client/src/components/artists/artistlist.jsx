import React from 'react';
import ArtistCard from './artistcard'
import { ArtistContext } from '../../context/ArtistContext'
import { useContext } from 'react'

function ArtistList() {
    const {artists} = useContext(ArtistContext)

    const ArtistCards = artists.map(artist => <ArtistCard key={ artist.id } artist={artist} />)

    return ( <>
    <div>Artist List</div>
    <div>{ArtistCards}</div>
    </>
     )
}

export default ArtistList;