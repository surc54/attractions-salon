import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";
import {useEzSettings} from "../../../hooks/EzSettingsHook";
import { getPhotos, addPhotos } from "../../../actions/photosActions";
import axios from 'axios';



const HomeSettings = (props) => {
    const [initialLoad, setInitialLoad] = useState(true);
    const [photoInfo, setPhotoInfo] = useState([]);
    const [pageNum, setPageNum] = useState(0);

    return (
        <>
            {/* {doInitialLoad(initialLoad, setInitialLoad, setPhotoInfo)} */}
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "20px",
                    }}
                >
                    <ButtonGroup variant="contained" color="primary">
                        <Button onClick={() => setPageNum(0)}>
                            Add Photos
                        </Button>
                        <Button onClick={() => setPageNum(1)}>
                            Update About Section
                        </Button>
                        <Button onClick={() => setPageNum(2)}>
                            Edit Stylist Info
                        </Button>
                    </ButtonGroup>
                    <Divider orientation="horizontal" />
                </div>

                {getChoiceView(pageNum,props.aboutBox, props.setAboutBox)}
            </div>
        </>
    );
};

const getChoiceView = (pageNum, aboutBox, setAboutBox) => {
    switch (pageNum) {
        case 0:
            return <AddPhoto />;
        case 1:
            return <HomeUpdateAboutView 
            aboutBox = {aboutBox}
            setAboutBox = {setAboutBox}/>;
        case 2:
            return <HomeUpdateStylistForm />;
        default:
            return "Unknown pageView";
    }
};

const AddPhoto = () => {
    const [image, setImage] = useState({preview: '', raw: ''})
    const [idCount, setidCount] = useState(10);
    const displayPhoto = false;

    const handleChange = (e) => {
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]
        })
        
      }

    const handleUpload = (e) => {
        //ensure way to handle if !image / hasn't been uploaded
        e.preventDefault()
        if (!image.imgURL) return;
        image.id = idCount;
        setidCount(idCount+1);
        const formData = new FormData()
        formData.append('image', image.raw)
        const config = { headers: { 'content-type': 'multipart/form-data' } }
        
        axios.post('/api/services', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          
        // await uploadToBackend('endpoint', {image: image.raw}, config)
    }


    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Add Slideshow Photo</h3>
                <Button>Submit</Button>
            </div>
            <Divider orientation="horizontal" />
            <div><img src={ image.preview } width="500" height="300" /></div>
            <div>Upload a preview of your photo, then click "Submit" to add to Slideshow.</div>
            <div>
                <input
                accept="image/*"
                style={{ display: 'none' }}
                id="slideshow-photo"
                onChange={handleChange}
                multiple
                type="file"
                />
                <label htmlFor="slideshow-photo">
                <Button variant="raised" color="pink" component="span"
                // onClick={handleUpload}
                >
                    Upload
                </Button>
                </label> 
                <Button 
                    variant="raised" color="pink" component="span"
                    onClick={handleUpload}>
                Submit</Button>
            </div>
        </div>
    );
};

const HomeUpdateAboutView = (props) => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Update About Section</h3>
                <Button >Update</Button>
            </div>
            <Divider orientation="horizontal" />
            <HomeAboutForm 
            aboutBox = {props.aboutBox}
            setAboutBox = {props.setAboutBox}/>
            <p>
                Please enter new text for "About Us" section.
            </p>
        </div>
    );
};

const HomeUpdateStylistForm = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Update Stylist Form</h3>
                <Button>Delete</Button>
            </div>
            <Divider orientation="horizontal" />
            <p>
                Add services here like in the services page, allow to select
                one, then, delete selected service when form is submitted
            </p>
        </div>
    );
};

const HomeAboutForm = (props) => {
    const ezSettings = useEzSettings();
    const handleInputChange = event => {
        // console.log('handle input change')
        const box = event.target.value;
        // props.setAboutBox({ ...props.aboutBox,box})
        ezSettings
        .set("home-about-us", box)
        .then((res) => props.setAboutBox(res))
        .catch((err) => console.log(err));
        }
    return (
        <form>
            <TextField 
             onSubmit = { event => {
                event.preventDefault();
                if (!props.aboutBox) return
                const box = event.target;
                props.setAboutBox({ ...props.aboutBox,box})
                console.log(props.aboutBox)
                }}
                placeholder="Enter new text for About Section here"
                multiline
                value={props.aboutBox}   
                variant="outlined"
                rows={4}
                style={{ margin: "10px", width: '600px' }}
                rowsMax={6}
                required
                input type="text" name="name" value={props.aboutBox} onChange={handleInputChange}
                >
                <input type="text" name="name" value={props.aboutBox} onChange={handleInputChange} />
                </TextField>
                <p></p>
                <input type="submit" value="Submit" /> 
    
            </form>  
    );
};

// const doInitialLoad = (
//     initialLoad,
//     setInitialLoad,
//     setPhotoInfo
// ) => {
//     if (initialLoad) {
//         setInitialLoad(false);
//         updatePhotos(setPhotoInfo);
//     }
// };

// const updatePhotos = (setPhotoInfo) => {
//     addPhotos()
//         .then((value) => setPhotoInfo(value))
//         .catch((reason) => console.log(reason));
// };

export default HomeSettings;
