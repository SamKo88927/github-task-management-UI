import React, { useEffect, useState } from 'react'
import "./header.scss"
import { useLocation } from 'react-router-dom'
import {  api, gh_APP_ID } from '../proxy';
import axios from 'axios';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import DropDownList from './DropDownList';
const Header = () => {
    const [code, setCode] = useState<null | string>(null);
    const [userInfo, setUserInfo] = useState<null | any>(null);
    const location = useLocation()
    const redirectUri = "http://localhost:5000/api/v1/auth/github";
    const handleLogin = () => {
        // 向 Login API 獲取授權碼
        const scope = "repo%20repo:status%20repo_deployment%20public_repo"
        window.location.replace(
            `https://github.com/login/oauth/authorize?client_id=${gh_APP_ID}&scope=${scope}&redirect_uri=${redirectUri}&state=sam88927`
        )
    };

//網站如果假冒這個 透過token去操作api 得確保說前端認證的過稱中都是完全對接的 上架後處理
   useEffect(() => {
    const connectedBE =async () => {
        try {
            const  res = await axios.get("/auth")
            console.log(res)
        } catch (error) {
            console.log(error)
            
        }
    }
    // connectedBE()
    const tokenVerify = async() => {
        try{
            const usr = await axios.get("/auth/github/userinfo",{
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_JSON_SECRET,
                    'Content-Type': 'application/json'
                }
            }
            )
            setUserInfo(usr.data)
        }catch(error){
            console.log(error)
        }
    }
        tokenVerify()
  }, []);

    //     Authorization: Bearer OAUTH-TOKEN
    // GET https://api.github.com/user
    return (
        <header>
            <div className="left">
                <GitHubIcon />
                SamKo Task Management
            </div>
            <div className="right">
                {/* <button className="buttonlink" >
                        <TiSocialInstagram onClick={() => setClickIg(!clickIg)} />
                        {
                            !user &&
                            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                <BsPersonFill className='svg2' />
                            </Link>
                        }
                        <div onClick={handleClick}>
                            <Badge badgeContent={notificationNumber} color="secondary" >
                                <FaShoppingBag className='svg3' onClick={() => setClickCart(!clickCart)} />
                            </Badge>
                        </div>
                    </button> */}  
                    { userInfo ?
                    <div className='userinfo'>
                        <DropDownList userInfo={userInfo} setUserInfo={setUserInfo}/>
                    </div>
                    :
                        <button onClick={handleLogin}>GitHub Login</button>
                    }
                   
            </div>

        </header>
    );
}

export default Header