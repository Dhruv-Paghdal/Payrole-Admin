import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export const login = async(payload) => {
    const res = await axios.post(`${baseUrl}/index/login`);
    console.log(res);
}