
import axios from 'axios';


  export const api = axios.create({
    // baseURL: 'http://localhost:5000/api/v1', 
    baseURL: process.env.REACT_APP_BACKEND_URL ,
    // baseURL: 'https://chiioa-api.onrender.com/api/v1',
    headers: { 'Content-Type': 'application/json' },
  });
export const JsonSecret = process.env.REACT_APP_JSON_SECRET 
export const gh_APP_ID = process.env.REACT_APP_github_Client_ID
export const gh_APP_SECRET = process.env.REACT_APP_github_SECRET
//換成.env 用這隻api打回來才會是回到local連接不然會用到 回正式網的連結
export const callbackURL = process.env.REACT_APP_CallBack_URL