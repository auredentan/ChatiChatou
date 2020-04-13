import React, { useState } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { List, ListItem, ListSubheader, Divider, Tabs, Tab, Switch, FormControlLabel, ListItemIcon, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'hooks';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import ConnectModal from './ConnectModal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
            zIndex: 2000
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

export default function TopNavBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [moreMenuAnchor, setMoreMenuAnchor] = React.useState<null | HTMLElement>(null);
    const isMoreMenuOpen = Boolean(moreMenuAnchor)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMoreMenuAnchor(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMoreMenuClose = () => {
        setMoreMenuAnchor(null);
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const darkMode = useStoreState(state => state.user.preferences.darkMode)
    const changeDarkMode = useStoreActions(actions => actions.user.changeDarkMode)
    const logout = useStoreActions(actions => actions.user.logout)
    const menuId = 'primary-search-account-menu';
    const renderProfileMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <NightsStayIcon />
                </ListItemIcon>
                <FormControlLabel
                    control={<Switch onChange={() => changeDarkMode()} checked={darkMode} />}
                    label="Thème sombre"
                    labelPlacement="start"
                />
            </MenuItem>
            <MenuItem onClick={() => {
                logout()
                handleProfileMenuClose()
            }}>
                Logout
            </MenuItem>
        </Menu>
    );

    const moreMenuId = 'primary-more-menu'
    const renderMoreMenu = (
        <Menu
            anchorEl={moreMenuAnchor}
            id={moreMenuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={isMoreMenuOpen}
            onClose={handleMoreMenuClose}
            style={{ marginTop: '30px' }}
        >
            <List>
                <ListSubheader>Général</ListSubheader>
                <ListItem>
                    A propos
                </ListItem>
                <ListItem>
                    A propos
                </ListItem>
                <ListItem>
                    A propos
                </ListItem>
                <Divider />
                <ListSubheader>Aide et juridique</ListSubheader>
                <ListItem>
                    A propos
                </ListItem>
            </List>
        </Menu>
    )

    const isAuthenticated = useStoreState(state => state.user.isAuthenticated)

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {isAuthenticated && 
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
            }
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
            
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const history = useHistory()
    const location = useLocation()

    const whichTabIsSelected = () => {
        switch (location.pathname) {
            case "/discover":
                return 0
            case "/followed":
                return 1
            default:
                return 2
        }
    }

    const [connectModalIsOpen, setConnectModalIsOpen] = useState(false)
    const [connectModalTab, setConnectModalTab] = useState(0)
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Home"
                        onClick={() => history.push("/")}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Tabs indicatorColor="primary" value={whichTabIsSelected()}>
                        <Tab label="Découvrir" id="/discover" onClick={() => { history.push('/discover') }} />
                        <Tab label="Suivis" id="/followed" onClick={() => { history.push('/followed') }} />
                    </Tabs>
                    <IconButton
                        edge="end"
                        aria-label="more"
                        aria-controls={moreMenuId}
                        aria-haspopup="true"
                        onClick={handleMoreMenuOpen}
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {isAuthenticated &&
                            <>
                                <IconButton aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </>
                        }
                        {!isAuthenticated &&
                            <>
                                <Button onClick={() => {
                                    setConnectModalTab(0)
                                    setConnectModalIsOpen(true)
                                }}>
                                    Connect</Button>
                                <Button onClick={() => {
                                    setConnectModalTab(1)
                                    setConnectModalIsOpen(true)
                                }}>Sign In</Button>
                            </>}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderProfileMenu}
            {renderMoreMenu}
            <ConnectModal
                tab={connectModalTab}
                open={connectModalIsOpen}
                onClose={() => setConnectModalIsOpen(false)}
            />
        </div>
    );
}
