import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox.js';
// import MailIcon from '@mui/icons-material/Mail.js';
import MenuIcon from '@mui/icons-material/Menu.js';
import './Navbar.css'
import HomeIcon from '@mui/icons-material/Home.js';
import InfoIcon from '@mui/icons-material/Info.js';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar.js';
import logo from "../images/logo.png";
import { FaDiscord } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiGoogledocs } from "react-icons/si";
import { SiDocsify } from "react-icons/si";
import {
  Box,
  Drawer,
//   Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Navbar = () => {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box className="box"
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className='side'>
                {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <section className="logo-section">
                    <img className="logo" src={logo} alt='logo' />
                </section>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <HomeIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"About"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PermContactCalendarIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"Contact"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"inbox"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"inbox"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"inbox"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <section className="bottomsocials">
                <section className="icos">
                    <FaDiscord className="discord" />
                    <BsTwitterX className="twitter" />
                    <SiGoogledocs className="googledocs" />
                    <SiDocsify className="docsify" />
                </section>
            </section>
        </Box>
    );

    return (
        <div className='Navbar'>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))} */}



            <MenuIcon
                onClick={
                    toggleDrawer("left", true)
                }
            />

            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>

        </div>
    )
}

export default Navbar