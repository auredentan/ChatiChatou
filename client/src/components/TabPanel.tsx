import React from 'react';

interface TabPanelProps {
	tab: number;
	index: number;
}
const TabPanel: React.FC<TabPanelProps> = ({ tab, index, children }) => {
	return <>{tab === index && children}</>;
};

export default TabPanel;
