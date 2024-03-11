import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL

export const login = async(payload) => {
    try {
        const res = await axios.post(`${baseUrl}/index/login`, payload);
        return {success: true, status: res.data.status, data: res.data.data , message: res.data.message}
    } catch (error) {
        if (!error.response) {
            return {success: false, status: 503, message: error, data: ""}
        } else {
            return {success: false, status: error.response.data.status, message: error.response.data.message, data: ""}
        }
    }
}
