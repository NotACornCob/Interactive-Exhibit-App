
import { createContext, useState, useEffect } from 'react';

const InstallationContext = createContext([])

function InstallationProvider({children}) {
    const [installations, setInstallations] = useState([])

    useEffect(() => {
        const loadInstallations = async () => {
            const resp = await fetch("/api/installations")
            const data = await resp.json()
            setInstallations(data)
        }

        loadInstallations()
    }, [])

    return <InstallationContext.Provider value={{installations}}>{children}</InstallationContext.Provider>
}

export {InstallationContext, InstallationProvider}