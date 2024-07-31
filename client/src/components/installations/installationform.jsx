import {useEffect, useState, useContext} from 'react'
import { useFormik, Formik } from 'formik'
import * as yup from 'yup'
import { InstallationContext, InstallationProvider } from "/home/notacorncob/phase4/flask-p4-project-Museum-App/client/src/context/InstallationContext.jsx"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonUsage from '../button';
import InstallationList from '../installations/installationlist'


const InstallationForm = () => {
    const [artists, setArtists] = useState([])
    const [exhibits, setExhibits] = useState([])

    const {addInstallation} = useContext(InstallationContext)

    const initialValues = {
        "name": "",
        "image_url": "",
        "description": "", 
        "artist_id": "8",
        "exhibit_id": "1"
         
    }

    const validationSchema = yup.object({
        description: yup.string().min(1, "Must be at least 1 characters long").required("Description must be at least 1 characters long.")
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
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: function(values) {
            addInstallation(values)
        }
    })

    //const artistOptions = artists.map(artist => <option key={artist.id} value={artist.id}>{ artist.name }</option>)
    const exhibitOptions = exhibits.map(exhibit => <option key={exhibit.id} value={exhibit.id}>{exhibit.name}</option>)

    return (
            <div>
            <form onSubmit={ formik.handleSubmit}>
            <Card>
            <Container alignItems="center">
            <Grid containerdirection="column"
            justify="center"
            alignItems="center"
            alignContent="center"
            textAlign="center">
            <Typography variant="body2">
            <h3>Add Installation</h3>
            </Typography>
                    <Typography variant="body2" color="text.primary">
                    <label htmlFor="name">Installation Name:       </label>
                    <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
                <br />
                <div>
                    <label htmlFor="image_url">Installation Photo:      </label>
                    <input type="text" name="image_url" id="image_url" value={formik.values.image_url} onChange={formik.handleChange}/>
                </div>
                <div>
                    <label htmlFor="description">Description:     </label>
                    <input type="text" name="description" id="description" value={formik.values.description} onChange={formik.handleChange} />
                </div>
                <div>
                    <label htmlFor="artist_id">Artist:       </label>
                    <input type="text" name="artist_id" id="artist_id" value={formik.values.id} onChange={formik.handleChange} />
                </div>
                <div>
                    <label htmlFor="exhibit_id">Exhibit: </label>
                    <select name="exhibit_id" id="exhibit_id" value={formik.values.id} onChange={formik.handleChange}>
                        {exhibitOptions}
                    </select>
                </div><br/>
                <input type="submit" value="Create Installation">
                </input>
                </Typography><br/>
                </Grid>
                </Container>
                </Card>
            </form>
            <br/>
            <InstallationList/>
        </div>

    )
}

export default InstallationForm