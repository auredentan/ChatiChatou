import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Drawer from '@material-ui/core/Drawer';

import useWebSocket from 'react-use-websocket';
import {
	Divider,
	IconButton,
	CircularProgress,
	TextField,
} from '@material-ui/core';

import { useStoreState, useStoreActions } from 'hooks';

import { Toolbar } from 'components';
import ChatBottomBar from './ChatBottomBar';

var wsUri =
	process.env.NODE_ENV === 'development'
		? 'ws://localhost:8080/ws/'
		: (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
		  window.location.host +
		  '/ws/';

const drawerWidth = 340;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		messagesContainer: {
			display: 'flex',
			flexDirection: 'column',
			flexGrow: 1,
			alignItems: 'center',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerPaper: {
			width: drawerWidth,
			overflowX: 'hidden',
			marginTop: '64px',
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
            width: 0,
            [theme.breakpoints.up('sm')]: {
                width: 0,
            },
		},
	}),
);

const Chat = () => {
	const classes = useStyles();
	const STATIC_OPTIONS = useMemo(
		() => ({
			onOpen: () => setMessages([{ message: 'Welcome on the chat !' }]),
			shouldReconnect: (closeEvent: any) => true, //Will attempt to reconnect on all close events, such as server shutting down
		}),
		[],
	);

	const chatIsOpen = useStoreState((state) => state.streamViewState.chatOpen);
	const closeChat = useStoreActions(
		(actions) => actions.streamViewState.closeChat,
	);

	const [sendMessage, lastMessage, readyState] = useWebSocket(
		wsUri,
		STATIC_OPTIONS,
	);

	const [messages, setMessages] = useState<Array<any>>([
		{ user: 'dd', message: 'dadad' },
	]);

	useEffect(() => {
		if (lastMessage) {
			try {
				const msg = JSON.parse(lastMessage.data);
				setMessages([...messages, msg]);
			} catch {}
		}
	}, [lastMessage]);

	return (
		<Drawer
			open={chatIsOpen}
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: chatIsOpen,
				[classes.drawerClose]: !chatIsOpen,
			})}
			classes={{
				paper: clsx({
					[classes.drawerPaper]: true,
					[classes.drawerOpen]: chatIsOpen,
					[classes.drawerClose]: !chatIsOpen,
				}),
			}}
			variant='permanent'
			anchor='right'
		>
			<Toolbar
				before={
					<>
						<IconButton onClick={() => closeChat()}>
							<ChevronRightIcon />
						</IconButton>
						Chat
					</>
				}
			/>

			<Divider />
			<div>
				{messages.map((message: any, idx: number) => {
					return (
						<div
							style={{
								width: '90%',
								padding: '8px',
								display: 'flex',
								justifyContent: 'flex-start',
							}}
						>
							<span key={idx}>
								{message.user ? message.user + ':' : ''} {message.message}
							</span>
						</div>
					);
				})}
			</div>
			<div>
				<ChatBottomBar sendMessage={sendMessage} />
			</div>
		</Drawer>
	);
};

export default Chat;
