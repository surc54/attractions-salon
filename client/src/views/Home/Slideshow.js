import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styles from "./Home.module.scss";
import photo2 from "../../assets/attractions_salon_photos/IMG_2862.jpeg";
import photo3 from "../../assets/attractions_salon_photos/IMG_2863.jpeg";
import photo4 from "../../assets/attractions_salon_photos/IMG_2864.jpeg";
import photo5 from "../../assets/attractions_salon_photos/IMG_2868.jpeg";
import photo6 from "../../assets/attractions_salon_photos/IMG_2869.jpeg";
import photo7 from "../../assets/attractions_salon_photos/IMG_2875.jpeg";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from 'axios';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 0,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 490,
      display: 'block',
      maxWidth: 800,
      overflow: 'hidden',
      width: '100%',
    },
  }));

const Items = [
    {
      label: 'Photo 1',
      imgPath: photo2
    },
    {
        label: 'Photo 2',
        imgPath: photo3
    },
    {
        label: 'Photo 3',
        imgPath: photo4
    },
    {
        label: 'Photo 4',
        imgPath: photo5
    },
    {
        label: 'Photo 5',
        imgPath: photo6
    },
    {
        label: 'Photo 6',
        imgPath: photo7
    },
  ];

export default function Slideshow (props) {
    const [photosData, setPhotos] = useState([]);
    React.useEffect(() => {
      axios.get('/api/photos')
      .then(res => {
          // console.log(res.data)
          setPhotos(res.data.data)
          })
          .catch(function(error) {
          console.log(error);
      })
    }, 
    []
    );
    const photos = Object.values(photosData);
    // console.log(photos)
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = photos.length;
    const stepz = maxSteps;
    const classes = useStyles();
    const theme = useTheme();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      };

      const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
      };
    
      const handleStepChange = step => {
        setActiveStep(step);
      };

      return (
        <div>
            <div className={styles["slideshow"]} >
                <AutoPlaySwipeableViews
                axis={'x'}
                photos = {photos}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                >
                {/* {Items.map((step, index) => (
                <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                    ) : null} */}
                {photos.map((step, index) => (
                <div key={step.id}>
                    {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={step.imgURL} alt={step.id} />
                    ) : null}
                </div>
                ))
                }
                </AutoPlaySwipeableViews>
            </div>
            <div>
                <MobileStepper
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === (maxSteps-1)}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                }
                />
            </div>
        </div>
      )}
    
// return (
//     <div className={styles["slideshow"]} >
//         <AutoRotatingCarousel open={true} className={styles["slideshow"]}>
//             <Slide
//             media ={<img src={photo2}></img>}>
//             </Slide>
//             <Slide 
//             media ={<img src={photo3}></img>}>
//             </Slide>
//             <Slide 
//             media ={<img src={photo4}></img>}>
//             </Slide>
//         </AutoRotatingCarousel>
//     </div>
// )}
// <Carousel
//   slidesPerPage={1}
//   centered
//   dots
//   animationSpeed={0}
//   className={styles["slideshow"]}
// >
//   <img src={photo3} />
//   {/* <img src={photo1} /> */}
//   <img src={photo2} />
//   <img src = {photo7} />
//   {/* <img src={photo4} /> */}
//   {/* <img src={photo5} /> */}
  
// </Carousel>
// )}
