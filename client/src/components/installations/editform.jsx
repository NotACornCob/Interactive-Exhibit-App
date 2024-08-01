import {useEffect, useState, useContext} from 'react'
import { InstallationContext, InstallationProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/InstallationContext.jsx"
import { ExhibitContext, ExhibitProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/ExhibitContext.jsx"
import { ArtistContext, ArtistProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/ArtistContext.jsx"
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, useField, useFormikContext, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';

const validationSchema = yup.object({
  name: yup
    .string('Enter installation name')
    .required('Installation name is required'),
  description: yup
    .string('Enter installation description')
    .min(8, 'description should be of minimum 8 characters length')
    .required('Installation description is required'),
  image_url: yup
    .string('Enter installation image URL')
});

const EditForm = () => {
const [artists, setArtists] = useState([])
const [exhibits, setExhibits] = useState([])
const [installations, setInstallations] = useState([])
const {editInstallation} = useContext(InstallationContext)

const initialValues = {
  "description": "",
  "exhibit_id": "",
  "name": "",
  "artist": {
    "id": "",
    "name": "",
    "bio": ""
  },
  "artist_id": 1,
  "exhibit": {
    "id": "",
    "location": "",
    "name": ""
  },
  "id": "",
  "image_url": "https://images.metmuseum.org/CRDImages/ep/original/DP-14201-023.jpg"
}

const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
        alert("installation edited!")
        editInstallation(values)
    }
})

useEffect(() => {
    const loadArtists = async () => {
        const resp = await fetch("/api/artists")
        const data = await resp.json()
        setArtists(data)
    }
    loadArtists()
},[])

  useEffect(() => {
    const loadExhibits = async () => {
        const resp = await fetch("/api/exhibits")
        const data = await resp.json()
        setExhibits(data)
    }
    loadExhibits()
},[])

useEffect(() => {
  const loadInstallations = async () => {
      const resp = await fetch("/api/installations")
      const data = await resp.json()
      setInstallations(data)
  }
  loadInstallations()
},[])

  const installationOptions = installations.map(installation => <option key={installation.id} value={installation.id}>{installation.name}</option>)
  const artistOptions = artists.map(artist => <option key={artist.id} value={artist.id}>{ artist.name }</option>)
  const exhibitOptions = exhibits.map(exhibit => <option key={exhibit.id} value={exhibit.id}>{exhibit.name}</option>)


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Typography variant="subtitle1" display="inline" color="textSecondary"><br/>
        <label htmlFor="id" >Select Installation: </label>
        </Typography>
        <select name="id" id="id" value={formik.values.id} fullWidth onChange={formik.handleChange}>
        {installationOptions}
        </select>
        <Typography variant="subtitle1" display="inline" color="textSecondary"><br/>
        <label htmlFor="exhibit_id" >Exhibit: </label>
        </Typography>
        <select name="exhibit_id" id="exhibit_id" value={formik.values.exhibit_id} fullWidth onChange={formik.handleChange}>
        {exhibitOptions}
        </select>
        <Typography variant="subtitle1" display="inline" color="textSecondary"><br/>
        <label htmlFor="artist_id" >Featured Artists: </label>
        </Typography>
        <select name="artist_id" id="artist_id" value={formik.values.artist_id} fullWidth onChange={formik.handleChange}>
        {artistOptions}
        </select>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Installation Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Installation Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          id="image_url"
          name="image_url"
          label="Installation Photo (URL)"
          value={formik.values.image_url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          /* error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image} */
        /><br/>
        <Button color="tertiary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditForm