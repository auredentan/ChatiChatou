import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Tabs, Tab, TextField } from '@material-ui/core';
import SignUp from 'views/ConnectView/SignUp';
import SignIn from 'views/ConnectView/SignIn';

interface TabPanelProps {
	value: number;
	index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
	return <>{value === index && <>{children}</>}</>;
};

interface ConnectModalProps {
	tab: number;
	open: boolean;
	onClose: any;
}

const ConnectModal: React.FC<ConnectModalProps> = ({ open, onClose, tab }) => {
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		if (tab) {
			setSelectedTab(tab);
		}
	}, [tab]);

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Se connecter à Twitch</DialogTitle>
			<Tabs
				centered
				value={selectedTab}
				onChange={(event: any, index: number) => setSelectedTab(index)}
			>
				<Tab label='Se connecter' />
				<Tab label="S'inscrire" />
			</Tabs>
			<TabPanel value={selectedTab} index={0}>
				<SignIn />
			</TabPanel>
			<TabPanel value={selectedTab} index={1}>
				<SignUp />
			</TabPanel>
		</Dialog>
	);
};

export default ConnectModal;
