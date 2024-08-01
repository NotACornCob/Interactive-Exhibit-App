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

    
    async function addInstallation(installationValues) {
        const resp = await fetch("http://127.0.0.1:5555/api/installations", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(installationValues)
        })
    const installation = await resp.json()
    setInstallations([...installations, installation])
}

async function removeInstallation(id) {
    const resp = await fetch(`http://127.0.0.1:5555/api/installations/${id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      const updatedInstallations = installations.filter(
        (installation) => installation.id !== id
      );
      setInstallations(updatedInstallations);
    } else {
      console.log("Failed to delete installation with id:", id);
    }
  }

    async function editInstallation(installation) {
        const resp = await fetch(`http://127.0.0.1:5555/api/installations/${installation.id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(installation)
        })
    const updatedInstallation = await resp.json()
    setInstallations([...installations,updatedInstallation])
    }

return <InstallationContext.Provider value={{installations, addInstallation, removeInstallation, editInstallation}}>{children}</InstallationContext.Provider>
}

export {InstallationContext, InstallationProvider}