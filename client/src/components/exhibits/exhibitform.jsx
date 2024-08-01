import {useEffect, useState, useContext} from 'react'
import { InstallationContext, InstallationProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/InstallationContext.jsx"
import { ExhibitContext, ExhibitProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/ExhibitContext.jsx"
import { ArtistContext, ArtistProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/ArtistContext.jsx"
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  name: yup
    .string('Enter installation name')
    .required('Installation name is required'),
  location: yup
    .string('Enter installation description')
    .min(1, 'description should be of minimum 8 characters length')
    .required('Installation description is required'),
});

const ExhibitForm = () => {
const [artists, setArtists] = useState([])
const [exhibits, setExhibits] = useState([])
const {addExhibit} = useContext(ExhibitContext)
const {addArtist} = useContext(ArtistContext)
const {addInstallation} = useContext(InstallationContext)

const initialValues = {
  "id": "",
  "name": "",
  "location": ""
}

const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
        alert("exhibit submitted!")
        addExhibit(values)
    }
})


  useEffect(() => {
    const loadExhibits = async () => {
        const resp = await fetch("/api/exhibits")
        const data = await resp.json()
        setExhibits(data)
    }
    loadExhibits()
},[])

  const artistOptions = artists.map(artist => <option key={artist.id} value={artist.id}>{ artist.name }</option>)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Exhibit Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="location"
          name="location"
          label="Exhibit Location"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <br/>
        <Button color="tertiary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ExhibitForm