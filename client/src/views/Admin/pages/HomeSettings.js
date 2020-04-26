import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";
import {useEzSettings} from "../../../hooks/EzSettingsHook";
import axios from 'axios';



const HomeSettings = (props) => {
    // const [stylistSetting,setStylistSetting] = useState("");
    // const [stylistSetting2,setStylistSetting2] = useState("");
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

                {getChoiceView(pageNum,props)}
            </div>
        </>
    );
};

const getChoiceView = (pageNum, props) => {
    switch (pageNum) {
        case 0:
            return <AddPhoto />;
        case 1:
            return <HomeUpdateAboutView 
            aboutBox = {props.aboutBox}
            setAboutBox = {props.setAboutBox}
            email = {props.email}
            setEmail = {props.setEmail}/>;
        case 2:
            return <HomeUpdateStylistForm
            stylist1Name = {props.stylist1Name}
            setStylist1Name = {props.setStylist1Name}
            stylist2Name = {props.stylist2Name}
            setStylist2Name = {props.setStylist2Name}
            // stylistSetting = {props.stylistSetting}
            // setStylistSetting = {props.setStylistSetting}
            // stylistSetting2 = {props.stylistSetting2}
            // setStylistSetting2 = {props.setStylistSetting2}
             />;
        default:
            return "Unknown pageView";
    }
};

const AddPhoto = () => {
    const [newURL, setURL] = useState("");
    const [image, setImage] = useState({preview: '', raw: ''})
    const [idCount, setidCount] = useState(10);
    const displayPhoto = false;

    const handleChange = (e) => {
        console.log("setting image")
        // setImage({
        //     //need to change from creatrObjectURL - deprecated
        //     preview: URL.createObjectURL(e.target.files[0]),
        //     raw: e.target.files[0]
        // })
        console.log(e.target.value)
        console.log(newURL)
        setImage({
            id: idCount,
            imgURL: newURL
        })
        // console.log(image.preview);
        // console.log(image.raw);
        // image.imgURL = image.preview;

        image.id = idCount;
        image.imgURL = e.target.value
        // image.imgURL = 'data:image/jpeg;base64,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';
        console.log("printing id for image...")
        console.log(image.id)
        setidCount(idCount + 1)
        console.log('new id count is ', idCount)

        axios.put('/api/photos', image)
        .then(res => {
            console.log('printing data')
            console.log(res.data);
            })
            .catch(function(error) {
            console.log(error);
        })
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
                {/* <Button>Submit</Button> */}
            </div>
            <Divider orientation="horizontal" />
            {/* <div><img src={ image.imgURL } width="500" height="300" /></div> */}
            <form>
            <TextField 
            style={{ margin: "10px", width: '300px' }}
            label="Upload image URL here"
            defaultValue={image.imgURL}
            multiline
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            />
            <p></p>
            <input type="submit" value="Submit" /> 
        </form>
        <p></p>
        <div>Upload your image URL to add it to the Home Slideshow.</div>
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
            </div>
            <Divider orientation="horizontal" />
            <HomeAboutForm 
            aboutBox = {props.aboutBox}
            setAboutBox = {props.setAboutBox}
            email = {props.email}
            setEmail = {props.setEmail}/>
        </div>
    );
};

const HomeUpdateStylistForm = (props) => {
    const setting1 = "stylist-name";
    const setting2 = "stylist-two";

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h3 style={{ marginBottom: "4px" }}>Update Stylist Form</h3>
            </div>
            <Divider orientation="horizontal" />
            <p>
                Update Stylist 1 Name
            </p>
            <HomeStylistForm
            stylist1Name = {props.stylist1Name}
            setStylist1Name = {props.setStylist1Name}
            setting = {setting1}
            />
            <p>
                Update Stylist 2 Name
            </p>
            <HomeStylistForm
            stylist2Name = {props.stylist2Name}
            setStylist2Name = {props.setStylist2Name}
            setting = {setting2}
            />

        </div>
    );
};

const HomeAboutForm = (props) => {
    const ezSettings = useEzSettings();

    const handleChange = event => {
        const box = event.target.value;
        ezSettings
        .set('email', box)
        .then((res) => props.setEmail(res))
        .catch((err) => console.log(err));
        }

    const handleInputChange = event => {
        // console.log('handle input change')
        const box = event.target.value;
        // props.setAboutBox({ ...props.aboutBox,box})
        ezSettings
        .set("home-about-us", box)
        .then((res) => props.setAboutBox(res))
        .catch((err) => console.log(err));
        }

        const handlePhoneChange = event => {
            // console.log('handle input change')
            const box = event.target.value;
            // props.setAboutBox({ ...props.aboutBox,box})
            ezSettings
            .set("phone", box)
            .then((res) => props.setPhone(res))
            .catch((err) => console.log(err));
            }

    return (
        <div>
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
                value={props.aboutBox}   
                variant="outlined"
                rows={4}
                style={{ margin: "10px", width: '500px' }}
                rowsMax={6}
                multiline
                required
                input type="text" name="name" value={props.aboutBox} onChange={handleInputChange}
                >
                <input type="text" name="name" value={props.aboutBox} onChange={handleInputChange} />
                </TextField>
                <p></p>
                <input type="submit" value="Submit" /> 
            </form>
            <p>
                Enter new text for "About Us" section above.
            </p>
            <form>
            <TextField 
             onSubmit = { event => {
                event.preventDefault();
                if (!props.email) return
                const box = event.target;
                props.setEmail({ ...props.email,box})
                console.log(props.email)
                }}
                placeholder="Enter email address"
                value={props.email}   
                variant="outlined"
                rows={1}
                style={{ margin: "10px", width: '500px' }}
                rowsMax={1}
                required
                input type="text" name="name" value={props.email} onChange={handleChange}
                >
                <input type="text" name="name" value={props.email} onChange={handleChange} />
                </TextField>
                <p></p>
                <input type="submit" value="Submit" /> 
    
            </form> 
            <p>
                Enter email address to be displayed on Home Page above.
            </p>
            <form>
            <TextField 
             onSubmit = { event => {
                event.preventDefault();
                if (!props.phone) return
                const box = event.target;
                props.setPhone({ ...props.phone,box})
                }}
                placeholder="Enter phone number"
                value={props.phone}   
                variant="outlined"
                rows={1}
                style={{ margin: "10px", width: '500px' }}
                rowsMax={1}
                required
                input type="text" name="name" value={props.phone} onChange={handlePhoneChange}
                >
                <input type="text" name="name" value={props.phone} onChange={handlePhoneChange} />
                </TextField>
                <p></p>
                <input type="submit" value="Submit" /> 
    
            </form> 
            <p>
                Enter the phone number to be displayed on Home Page above.
            </p>
            </div>  
    );
};

const HomeStylistForm = (props) => {
    const ezSettings = useEzSettings();
    const handleInputChange = event => {
        const box = event.target.value;
        const setting = props.setting
        console.log(setting)
        ezSettings
        .set(setting, box)
        // .set({setting}, box)
        .then((res) => props.setStylist1Name(res))
        .catch((err) => console.log(err));
        }
    return (
        <form>
            <TextField 
             onSubmit = { event => {
                event.preventDefault();
                if (!props.stylist1Name) return
                const box = event.target;
                props.setStylist1Name({ ...props.stylist1Name,box})
                console.log(props.stylist1Name)
                }}
                placeholder="Enter name for Stylist 1"
                value={props.stylist1Name}   
                variant="outlined"
                rows={1}
                style={{ margin: "10px", width: '600px' }}
                rowsMax={1}
                required
                input type="text" name="name" value={props.stylist1Name} onChange={handleInputChange}
                >
                <input type="text" name="name" value={props.stylist1Name} onChange={handleInputChange} />
                </TextField>
                <p></p>
                <input type="submit" value="Submit" /> 
    
            </form>
              
    );
};

export default HomeSettings;
