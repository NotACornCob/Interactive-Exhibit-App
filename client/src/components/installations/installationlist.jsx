import React from 'react'
import { InstallationContext } from '../../context/InstallationContext'
import { useContext } from 'react'
import InstallationCard from './installationcard'

function InstallationList() {
    const {installations} = useContext(InstallationContext)

    const InstallationCards = installations.map(installation => <InstallationCard key={ installation.id } installation={installation} />)
    return (
    <div>{InstallationCards}</div>
    )
}

export default InstallationList;