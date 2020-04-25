import React, { useState } from 'react';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SettingsIcon from '@material-ui/icons/Settings';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { IconButton, Popover } from '@material-ui/core';

import { Toolbar } from 'components';

interface ChatBottomBarProps {
	sendMessage: any;
}

const ChatBottomBar: React.FC<ChatBottomBarProps> = ({ sendMessage }) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const [myMessage, setMyMessage] = useState<string | undefined>(undefined);

	return (
		<>
			<div>
				<TextField
					style={{ width: '90%' }}
					label='Type your message'
					variant='outlined'
					value={myMessage}
					onChange={(e: any) => setMyMessage(e.target.value)}
					//@ts-ignore
					onKeyDown={(e: any) => {
						if (e.key === 'Enter' && sendMessage) {
							//@ts-ignore
							sendMessage(myMessage);
							setMyMessage(undefined);
						}
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<EmojiEmotionsIcon />
							</InputAdornment>
						),
					}}
				/>
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
				<div>Settings</div>
			</Popover>
		</>
	);
};

export default ChatBottomBar;
