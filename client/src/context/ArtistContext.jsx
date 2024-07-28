import React, { createContext, useState, useEffect } from 'react';

const ArtistContext = createContext([])

function ArtistProvider({children}) {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const loadArtists = async () => {
            const resp = await fetch("/api/artists")
            const data = await resp.json()
            setArtists(data)
        }

        loadArtists()
    }, [])

    return <ArtistContext.Provider value={{artists}}>{children}</ArtistContext.Provider>
}

export {ArtistContext, ArtistProvider}