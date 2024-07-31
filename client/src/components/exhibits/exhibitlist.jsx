import React from 'react';
import { ExhibitContext } from '../../context/ExhibitContext'
import { useContext } from 'react'
import ExhibitCard from './exhibitcard'

function ExhibitList() {
    const {exhibits} = useContext(ExhibitContext)

    const ExhibitCards = exhibits.map(exhibit => <ExhibitCard key={ exhibit.id } exhibit={exhibit} />)

    return (
    <div>{ExhibitCards}</div>
    )
}

export default ExhibitList;