// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { services } from "../actions/serviceActions";

// /**
//  * I dont know what I am doing, 
//  * let it be known that I am copy-pasting really hard atm
//  */

// export const useServices = () => {
//     const dispatch = useDispatch();
//     const serviceState = useSelector(state => state.services);
//     console.log("test 1")
//     const [ret, setRet] = React.useState({
//         ...serviceState,
//         get_services: () => {
//             return new Promise((resolve, reject) => {
//                 dispatch(
//                     services({
//                         then: resolve,
//                         catch: reject,
//                     })
//                 );
//             });
//         },
//     });

//     React.useEffect(() => {
//         setRet({
//             ...ret,
//             ...serviceState,
//         });
//         // eslint-disable-next-line
//     }, [serviceState]);

//     return ret;
// }