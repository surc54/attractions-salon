import React, { useState } from "react";
import {
    Divider,
    Button,
    ButtonGroup,
    TextField,
    TextareaAutosize,
} from "@material-ui/core";


const HomeSettings: React.FC = () => {
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

                {getChoiceView(pageNum)}
            </div>
        </>
    );
};

const getChoiceView = (pageNum: number) => {
    switch (pageNum) {
        case 0:
            return <AddPhoto />;
        case 1:
            return <HomeUpdateAboutView />;
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

const HomeUpdateAboutView = () => {
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
            <HomeAboutForm />
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

interface Props {
 } 

const HomeAboutForm = (props: Props) => {
    const [aboutBox, setAboutBox] = useState("")
    // const handleSubmit = event => {
    //     const {name, value } = event.target;
        
    //     // setAboutBox({...aboutBox, [name]: value})
    // }
    return (
        <>
            <TextField 
                onSubmit = { event => {
                    event.preventDefault();
                    if (!aboutBox) return
                    const aboutbox = aboutBox
                    setAboutBox(aboutbox)
                }}
                placeholder="Enter new text for About Section here"
                multiline
                value={aboutBox}  
                onChange={event => setAboutBox(event.target.value)}   
                variant="outlined"
                rows={4}
                style={{ margin: "10px", width: '600px' }}
                rowsMax={6}
                required
                >
                </TextField>
                <p></p>
                {<Button> Submit </Button>} 
                <p></p>
                
            
        </>
    );
};

export default HomeSettings;
