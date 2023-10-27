import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToasterNotification(notification_props){
    if(notification_props.resonse_status == 'success' ){
        toast.success(notification_props.message , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    if(notification_props.resonse_status == 'error' || notification_props.resonse_status == ''){
        toast.error(notification_props.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "error",
        });
    }
    return (
        <div>
            {/*<button onClick={notify}>Notify!</button>*/}
            <ToastContainer />
        </div>
    );
}
