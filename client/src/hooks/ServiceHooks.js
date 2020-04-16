import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesList, addToCart, removeFromCart } from "../actions";

/**
 * I dont know what I am doing, 
 * let it be known that I am copy-pasting really hard atm
 */

export const useServices = () => {
    // get dispatcher. required to use actions in redux
    const dispatch = useDispatch();

    // Retrieve services state from redux.
    const serviceState = useSelector(state => state.services);
    // question, where do I define... what I attempt to call "services"
    // for example for you, "login" has loading, etc
    // where do I declare this?
    // where was my reducer put into the "state"
    // I onpurpose ingored that file, thinking it wasnt necessary
    // lol you can see that it actually takes all the reducers and combines it into one big reducer
    // then it gets inserted into the system in index.js
    // i just figured it was like for mass importing, crap, see you,
        // lol. imma go eat, then come back later
        // thnkyou

    //////////////////////////////////////////////
    // im going to take a bath
    // issues for this file
    //      - what is everything being called
    //          - this is the file I understand the least
    //      - I figure it has a shape of: 
    //          - state -> dispatch(action) = dispatch({type, etc}) -> state
    //      but idk if this is true or what are the names of everyhting being called
    //          - also, do I have to add this to another index file or it doesnt work (for a friend)
    // brb - I am back - leave message here: hello
    
    // you can include the userAuth to see what it does.
    // try to use vscode autocomplete on above (CTRL + SPACE)
    // got it
    // userAuth = state + (login) + (logout) + (signUp) + (updateInfo)
    // + all the "hooks"
    // ah yeah, this hook will return the services state + the new functions we are gonna define
    //console.log("test 1")
    const [ret, setRet] = React.useState({
        ...serviceState, // insert state into hook. // so "services" @index for reducer? // "loading", "services", and "error"
        // ok state.services = serviceState as done above
        getServicesList: () => {
            // we will dispatch the action of "getServicesList"
            dispatch(getServicesList());// ready? yup // I had an inrtusive thought but I wouldnt have guessed
        },

        addToCart: (id) => {
            dispatch(addToCart(id));
        },

        removeFromCart: (id) => {
            dispatch(removeFromCart(id));
        }
    });

    React.useEffect(() => {
        setRet({
            ...ret,
            ...serviceState,
        });
        
    }, [serviceState]);

    return ret;
}