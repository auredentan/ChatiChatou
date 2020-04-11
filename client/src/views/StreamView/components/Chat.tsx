import React, { useState, useMemo, useEffect } from 'react';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SettingsIcon from '@material-ui/icons/Settings';

import Drawer from '@material-ui/core/Drawer';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import useWebSocket from 'react-use-websocket';
import { Divider, IconButton, CircularProgress, Popover } from '@material-ui/core';

import { useStoreState, useStoreActions } from 'hooks';

import { Toolbar } from "components"

var wsUri = process.env.NODE_ENV === "development" ? 'ws://localhost:8080/ws/' : (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/ws/';

const drawerWidth = 340;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            zIndex: 1,
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            overflowX: 'hidden',
        },
        drawerPaper: {
            width: drawerWidth,
            overflowX: 'hidden',
            marginTop: '64px'
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
)

const Chat = () => {
    const classes = useStyles();
    const STATIC_OPTIONS = useMemo(() => ({
        onOpen: () => setMessages([{ message: "Welcome on the chat !" }]),
        shouldReconnect: (closeEvent: any) => true, //Will attempt to reconnect on all close events, such as server shutting down
    }), []);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const chatIsOpen = useStoreState(state => state.streamView.chatOpen)
    const closeChat = useStoreActions(actions => actions.streamView.closeChat)

    const [sendMessage, lastMessage, readyState] = useWebSocket(wsUri, STATIC_OPTIONS);

    const [messages, setMessages] = useState<Array<any>>([])

    const [myMessage, setMyMessage] = useState<string | undefined>(undefined)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMyMessage(event.target.value);
    }

    useEffect(() => {
        if (lastMessage) {
            try {
                const msg = JSON.parse(lastMessage.data)
                setMessages([...messages, msg])
            } catch {

            }

        }
    }, [lastMessage])

    return (
        <Drawer
            open={chatIsOpen}
            className={classes.drawer}
            classes={{
                root: classes.root,
                paper: classes.drawerPaper,
            }}
            variant="persistent" anchor="right">

            <Toolbar
                before={<><IconButton onClick={() => closeChat()}> <ChevronRightIcon /> </IconButton> Chat</>}
            />

            <Divider />

            <div style={{ marginTop: "10px", marginBottom: "10px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {messages.map((message: any, idx: number) => {
                    return <div style={{ width: "90%", padding: "8px", display: "flex", justifyContent: "flex-start" }}>
                        <span key={idx}>{message.user ? message.user + ':' : ''} {message.message}</span></div>
                })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {readyState === 0 && <div style={{ width: "90%" }}> <CircularProgress /> Connecting ...</div>}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TextField
                    style={{ width: "90%" }}
                    label="Type your message"
                    variant="outlined"
                    value={myMessage}
                    onChange={handleChange}
                    //@ts-ignore
                    onKeyDown={(e: any) => {
                        if (e.key === 'Enter' && sendMessage) {
                            //@ts-ignore
                            sendMessage(myMessage)
                            setMyMessage(undefined)
                        }
                    }}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end" >
                                <EmojiEmotionsIcon />
                            </InputAdornment>
                    }}

                />
            </div>

            <div style={{ display: "flex", alignItems: "center", padding: "8px" }}>
                <div style={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                    <IconButton onClick={handleClick}>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <div className={classes.drawer}>
                    Settings
                    </div>
            </Popover>
        </Drawer>
    )
}

export default Chat