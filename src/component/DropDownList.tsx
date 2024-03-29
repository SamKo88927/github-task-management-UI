import React, { useContext} from 'react'
import "./dropDownList.scss"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { LoginContext } from '../contexts/LoginContext';
import { logout } from '../constants/actionTypes';
interface UsersProps {
  userInfo: any,
  // 捨棄原來的useState
  // setUserInfo: React.Dispatch<React.SetStateAction<any>>;
} 
const DropDownList = ({ userInfo }: UsersProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };
  const { dispatch } = useContext(LoginContext)
  const handleLogout = async () => {
    setAnchorEl(null);
    try{
      //清除token
      const res = await axios.get("/auth/github/logout")
      //清除user在context api的資料 包括localstorage
      dispatch({type:logout,payload:null})
      window.location.reload()
  }catch(error){
      console.log(error)
  }
  };
  

  return (
    <div className="github-user-dropdown">
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: "5px" }} onClick={handleClick}>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 35, height: 35 }} src={userInfo.avatar_url} />
        </IconButton>
        {userInfo.name}

      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            background: "#24292e",
            border: "1px solid #e1e4e821",
            color: "#e1e4e8",
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 44,
              width: 10,
              height: 10,
              bgcolor: "#24292e",
              borderTop: "1px solid #e1e4e821",
              borderLeft: "1px solid #e1e4e821",
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ alignItems: "start", flexDirection: "column" }} >
          Signed in as
          <b>{userInfo.login}</b>
        </MenuItem>
        <Divider sx={{ border: "0.5px solid #e1e4e821", }} />
        <MenuItem  onClick={handleLogout}>
          <ListItemIcon >
            <Logout fontSize="small" sx={{ color: "#e1e4e8" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DropDownList

