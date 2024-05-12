import axios from 'axios';
import React from 'react';

const getusers = () => {
    axios.get("http://localhost:5000/api/auth/getusers").then(e => {console.log(e.data)}).catch(e => console.log(e.response.data))  
}
export default getusers