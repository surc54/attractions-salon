import {
    Button,
    Container,
    Grid,
    Icon,
    Typography,
    useScrollTrigger,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";

// This library lets you chain classNames together without
// the string manipulation hassle
import clsx from "clsx";

import React from "react";
import { Link, useHistory } from "react-router-dom";
import homepic from "../../assets/attractions_salon_photo.jpeg";
import SpacingGrid from "./SpacingGrid";
import SpacingGrid2 from "./SpacingGrid2";
// This "styles" object is the only way to set styles from
// your scss file now (because of modularity)
import styles from "./Home.module.scss";

import InfoPiece from "./InfoPiece";
import Slideshow from "./Slideshow";

/*
 Changes to note
    - I removed react-rectangle (<Rectangle ... />) because it wasn't
      being used properly. Replaced them with <div />
    - <linearGradient ... /> are only for svg graphics (which you aren't using)
      These will be replaced with css gradients (the html version)
    - Custom html-components such as <stylists /> are not a thing
      Use standard html or custom React components (starts with capital letter)
    - The default "display" css property is fine in most cases. Change only if needed
    - Never use absolute positioning for things meant to work when resizing unless
      you have a parent element that can restrain the child. 
 */

// Changed this to an ES6 function
const Home = () => {
    // Grab history object from react-router
    const history = useHistory();

    // Scroll detection hook provided by Material-UI
    const isScrolled = useScrollTrigger({
        disableHysteresis: true,
        threshold: 64,
    });

    // Grab the Theme from Material-UI
    const theme = useTheme();

    // Hook from Material-UI: checks if screen is small-sized or below
    const isSmallOrBelow = useMediaQuery(theme.breakpoints.down("sm"));

    // Disable nav-bar
    React.useEffect(() => {
        // Don't worry, there was no way to know this without reading
        // the Navbar code.
        history.replace(
            history.location.pathname +
                history.location.search +
                history.location.hash,
            {
                navbarSettings: {
                    style: isScrolled ? "default" : "light",
                    transparent: !isScrolled,
                },
            }
        );

        // Return it back to normal once we leave home.
        return () => {
            history.replace(
                history.location.pathname +
                    history.location.search +
                    history.location.hash,
                {
                    navbarSettings: {
                        style: "default",
                        transparent: false,
                    },
                }
            );
        };

        // This array is a dependency list. It runs the above code
        // when anything inside changes.
    }, [isScrolled]);

    return (
        /* This is how you must set styles with modular styles */
        <div className={styles.App}>
            {/* Adding new className "jumbotron" */}
            {/* This will be the huge picture at the top of the page */}
            {/* We will set the picture to this instead of an <img /> tag */}
            <div
                className={styles.jumbotron}
                style={{
                    backgroundImage: `url(${homepic})`,
                }}
            >
                {/* I changed the below element from <header /> -> <div /> */}
                <div className={styles.appHeader}>
                    {/* <img src={homepic} className="salon-bkgrnd" alt="logo" /> */}
                    {/* <div className={styles.lingrad}></div> */}
                    {/* <div className={styles.rect}></div> */}
                    <div className={styles.topGradient}></div>

                    {/* This is a special style from global.scss */}
                    <span className="spacer" />
                    {/* This takes up all the space it can. */}

                    <div className={styles.bottomGradient}>
                        <h2
                            className={clsx(styles.homeH2, {
                                [styles.smallOrBelow]: isSmallOrBelow, // styles.smallOrBelow is only added if isSmallOrBelow is true
                            })}
                        >
                            Beautiful hair with beautiful care
                        </h2>

                        {/* <Link to="/book">
                            <button className={styles["booton"]}>
                                Book Now
                            </button>
                        </Link> */}

                        {/* Let's use a Material-UI (MUI) Button instead */}
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link} // MUI buttons have this ability to copy other components
                            to="/services" //       We just stole Link's functionality! So no need for <Link />
                        >
                            Book now
                        </Button>
                    </div>
                </div>
            </div>

            {/* In the design, theres a fade from pink to white. */}
            <div className={styles.contentBeginFadeOut} />

            {/* Container adds padding to the sides of the page */}
            <Container>
                <Grid
                    className={styles.aboutUsSection} // Add a className for specificity in scss file
                    container
                    spacing={5} // Add spacing between the grid items
                    // direction="column" // define these in scss file (if necessary)
                    // justify="flex-start" // define these in scss file (if necessary)
                    // alignItems="center" // define these in scss file (if necessary)
                >
                    {/* When using <Grid container />s, the inner item must be a Grid item */}
                    <Grid item xs={12} md={8} className={styles.left}>
                        {/* Explanation on the xs/md properties: */}
                        {/* The grid divides space into 12 equal spaces. The xs={12} means that */}
                        {/* on extra-small devices and up, take up all 12 spaces. The md={6} */}
                        {/* overrides the "xs" prop only on medium devices and up, saying it */}
                        {/* should take 8/12 of the screen */}

                        <Slideshow></Slideshow>
                        {/* <div className={styles["slideshow"]}>
                            <p
                                style={{
                                    fontSize: "25px",
                                    fontFamily: '"Roboto", sans-serif',
                                }}
                            >
                                Slideshow
                            </p>
                        </div> */}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        className={clsx(styles.right, {
                            [styles.smallOrBelow]: isSmallOrBelow, // styles.smallOrBelow is only added if isSmallOrBelow is true
                        })}
                    >
                        {/* We'll use h2 instead of h3 because of accessibility */}
                        <h2 className={styles.about}>About Us</h2>

                        {/* Typography is something special from Material-UI */}
                        {/* Provides some text styling */}
                        <Typography
                            variant="body1"
                            className={styles.text}
                            component="p"
                        >
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean massa
                            strong. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            className={styles.readMoreButton}
                            component={Link}
                            to="/"
                        >
                            Read more
                            <Icon>chevron_right</Icon>
                        </Button>
                    </Grid>

                    {/* Below is your old code. Since it was incompatible with how */}
                    {/* <Grid /> works, I rewrote it above. */}

                    {/* Note: You used a custom tag <about-header />. React is not fond */}
                    {/* of non-standard non-component tags. */}

                    {/* <div style={{ top: "100%", minHeight: "100vh" }}>
                        <about-header className={styles["about-header"]}>
                            <div style={{ height: "50px" }}>
                                <Grid item h3 className={styles["about"]}>
                                    About Us
                                </Grid>
                            </div>
                            <img
                                src={logo}
                                className={styles["logo2"]}
                                alt="logo2"
                            />
                            <Container className={styles["about-body"]}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetuer
                                    adipiscing elit. Aenean commodo ligula eget
                                    dolor. Aenean massa strong. Cum sociis
                                    natoque penatibus et magnis dis parturient
                                    montes, nascetur ridiculus mus. Donec quam
                                    felis, ultricies nec, pellentesque eu,
                                    pretium quis, sem.
                                </p>
                            </Container>
                        </about-header>
                    </div> */}
                </Grid>
            </Container>

            {/* <stylists /> is not a thing. Use standard tags, or custom react components */}
            {/* Note: React components MUST start with capital letter */}
            {/* <stylists className={styles["stylist-header"]}>
                <h4 className={styles["stylists-title"]}>Our Stylists</h4>
                <SpacingGrid className={styles["stylist1"]}></SpacingGrid>
                <SpacingGrid2 className={styles["stylist-box"]}>
                    Jane Doe
                </SpacingGrid2>
            </stylists> */}

            {/* Section tag we can use. We don't really have to. Its actually just a div. */}
            <section id="stylists" className={styles.stylists}>
                {/* Use container to get padding on the sides */}
                <Container>
                    <h2 className={styles.sectionTitle}>Stylists</h2>
                    <h2>{" "}</h2>
                    <SpacingGrid className={styles["stylist1"]}></SpacingGrid>
                    {/* <p style = {{color: 'white'}}>h</p> */}
                    <SpacingGrid2 className={styles["stylist-box"]}>
                        Jane Doe
                    </SpacingGrid2>
                </Container>
            </section>

            <section
                id="get-in-touch"
                className={clsx(styles.getInTouch, {
                    [styles.smallOrBelow]: isSmallOrBelow,
                })}
            >
                <Container>
                    {/* Use grid to get "split-view" design */}
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4} className={styles.left}>
                            <h2 className={styles.sectionTitle}>
                                Get in Touch
                            </h2>
                            <div className={styles.information}><a id="contactSection"></a>
                                <InfoPiece
                                    maxWidth={
                                        isSmallOrBelow ? "100%" : undefined
                                    }
                                    icon="navigation"
                                    href="https://goo.gl/maps/nUEVvWG9NXdaa9RH9"
                                    target="_blank"
                                >
                                    <Typography variant="body1">
                                        4509 NW 23 Ave
                                        <br />
                                        Gainesville, FL 32606
                                    </Typography>
                                </InfoPiece>
                                <InfoPiece
                                    maxWidth={
                                        isSmallOrBelow ? "100%" : undefined
                                    }
                                    icon="phone"
                                    href="tel:1-352-376-6008"
                                >
                                    <Typography variant="body1">
                                        (352) 376 6008
                                    </Typography>
                                </InfoPiece>
                                <InfoPiece
                                    maxWidth={
                                        isSmallOrBelow ? "100%" : undefined
                                    }
                                    icon="email"
                                    href="mailto:sample@attractionssalon.com"
                                >
                                    <Typography variant="body1">
                                        sample@attractionssalon.com
                                    </Typography>
                                </InfoPiece>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={8} className={styles.right}>
                            <iframe
                                // Removed height/weight props. Defined in scss file
                                title="map"
                                className={styles.map}
                                frameBorder="0"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.590252296763!2d-82.393560285099!3d29.673662342947903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e8bb527c8cb42d%3A0x1a9ff37664975788!2sAttractions%20Salon!5e0!3m2!1sen!2sus!4v1583782909156!5m2!1sen!2sus"
                                allowFullScreen={false}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* Setting a fixed height is not a good idea for sections that contain */}
            {/* varied amounts of info (unless, you want it to scroll when overflowing) */}
            {/* <div style={{ height: "60vh" }}> */}
            {/* <location-header /> is not a thing */}
            {/* <location-header className={styles["location-header"]}>
                    <h4 className={styles["location-title"]}>Visit Us</h4>
                    <h5 className={styles["loc-title2"]}>Get in Touch</h5>
                    <Container className={styles["loc-text"]}>
                        <p>4509 NW 23 Ave, Gainesville, FL 32606</p>
                        <p className={styles["loc-text2"]}>
                            <b>Phone:</b> (352) 376-6008
                        </p>
                    </Container>
                </location-header> */}

            {/* This footer was at the top of the page. */}
            {/* Better to rewrite completely. */}
            {/* <div className={styles["footer"]}></div> */}
            {/* </div> */}
        </div>
    );
};

export default Home;
