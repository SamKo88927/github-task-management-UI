import React, { useContext, useEffect, useState } from 'react'
import "./header.scss"
import {   callbackURL, gh_APP_ID } from '../proxy';
import axios from 'axios';
import GitHubIcon from '@mui/icons-material/GitHub';
import DropDownList from './DropDownList';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import { login } from '../constants/actionTypes';
const Header = () => {
    // const [userInfo, setUserInfo] = useState<null | any>(null);Ｆ
    const redirectUri = "http://localhost:5000/api/v1/auth/github";
    const handleLogin = () => {
        // 向 Login API 獲取授權碼
        const scope = "repo%20repo:status%20repo_deployment%20public_repo"
        window.location.replace(
            `https://github.com/login/oauth/authorize?client_id=${gh_APP_ID}&scope=${scope}&redirect_uri=${redirectUri}&state=sam88927`
        )
    };
    const { user ,dispatch } = useContext(LoginContext)
//網站如果假冒這個 透過token去操作api 得確保說前端認證的過稱中都是完全對接的 上架後處理
   useEffect(() => {
    const tokenVerify = async() => {
        try{
            const usr = await axios.get("/auth/github/userinfo",{
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
                    'Content-Type': 'application/json'
                }
            }
            )
            dispatch({
                type: login,
                payload: usr.data
            })//
        }catch(error){
            console.log(error)
        }
    }
    tokenVerify()
  }, []);
    //    Authorization: Bearer OAUTH-TOKEN
    // GET https://api.github.com/user
    return (
        <header>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="left">
                <GitHubIcon />
                SamKo Task Management
            </div>
            </Link>
            <div className="right">
                    { user ?
                    <div className='userinfo'>
                        <DropDownList userInfo={user} />
                    </div>
                    :
                        <button onClick={handleLogin}>GitHub Login</button>
                    }
            </div>

        </header>
    );
}

export default Header