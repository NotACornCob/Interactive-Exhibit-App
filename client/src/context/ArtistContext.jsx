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

    async function addArtist(ArtistValues) {
        const resp = await fetch("http://127.0.0.1:5555/api/artists", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ArtistValues)
        })
    const artist = await resp.json()
    setArtists([...artists, artist])
}

    return <ArtistContext.Provider value={{artists, addArtist}}>{children}</ArtistContext.Provider>
}

export { ArtistContext, ArtistProvider }