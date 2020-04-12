import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";


const HomeSettings = (props) => {
    const [pageNum, setPageNum] = useState(0);

    return (
        <>
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
                            Add photos
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
            <div>
                {/* <ServicesForm /> */}
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
    const handleInputChange = event => {
        console.log('handle input change')
        const box = event.target;
        props.setAboutBox({ ...props.aboutBox,box})
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

export default HomeSettings;
