import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Tabs, Tab, TextField } from '@material-ui/core';
import SignUp from 'views/ConnectView/SignUp';
import SignIn from 'views/ConnectView/SignIn';

import { useStoreState, useStoreActions } from 'hooks';

interface TabPanelProps {
	value: number;
	index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
	return <>{value === index && <>{children}</>}</>;
};

const ConnectModal: React.FC = () => {
	const { isConnectModalOpen, choosenTab } = useStoreState(
		(state) => state.connectView,
	);

	const setIsConnectModalOpen = useStoreActions(
		(actions) => actions.connectView.setIsConnectModalOpen,
	);
	const setSelectedTab = useStoreActions(
		(actions) => actions.connectView.setTab,
	);

	return (
		<Dialog
			open={isConnectModalOpen}
			onClose={() => setIsConnectModalOpen(false)}
		>
			<DialogTitle>Se connecter à Twitch</DialogTitle>
			<Tabs
				centered
				value={choosenTab}
				onChange={(event: any, index: number) => setSelectedTab(index)}
			>
				<Tab label='Se connecter' />
				<Tab label="S'inscrire" />
			</Tabs>
			<TabPanel value={choosenTab} index={0}>
				<SignIn />
			</TabPanel>
			<TabPanel value={choosenTab} index={1}>
				<SignUp />
			</TabPanel>
		</Dialog>
	);
};

export default ConnectModal;
