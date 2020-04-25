import React from 'react';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeleteIcon from '@material-ui/icons/Delete';

import { IconButton, Theme, makeStyles, createStyles } from '@material-ui/core';
import { useStoreState, useStoreActions } from 'hooks';
import StreamTabs from './StreamTabs';
import { Toolbar } from 'components';
import TabPanel from 'components/TabPanel';
import StreamHome from './StreamHome';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		topNav: {
			padding: theme.spacing(1),
		},
	}),
);
const Stream = () => {
	const classes = useStyles();

	const chatIsOpen = useStoreState((state) => state.streamViewState.chatOpen);
	const openChat = useStoreActions(
		(actions) => actions.streamViewState.openChat,
	);
	const selectedTab = useStoreState(
		(state) => state.streamViewState.selectedTab,
	);
	return (
		<main style={{width: '100%'}}>
			<Toolbar
				before={
					<IconButton>
						<DeleteIcon />
					</IconButton>
				}
				center={<StreamTabs />}
				after={
					<>
						<>
							<IconButton>
								<DeleteIcon />
							</IconButton>
						</>
						{!chatIsOpen && (
							<IconButton onClick={() => openChat()}>
								<ChevronLeftIcon />
							</IconButton>
						)}
					</>
				}
			/>
			<TabPanel tab={selectedTab} index={0}>
				<StreamHome />
			</TabPanel>
			<TabPanel tab={selectedTab} index={1}>
				<div>Vidéos</div>
			</TabPanel>
			<TabPanel tab={selectedTab} index={2}>
				<div>Clips</div>
			</TabPanel>
			<TabPanel tab={selectedTab} index={3}>
				<div>Followers</div>
			</TabPanel>
		</main>
	);
};

export default Stream;
