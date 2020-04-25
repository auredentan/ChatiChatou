import React from "react"

import { Tabs, Tab } from "@material-ui/core"
import { useStoreState, useStoreActions } from "hooks"
import TabPanel from 'components/TabPanel';

const StreamTabs = () => {

    const selectedTab = useStoreState(state => state.streamViewState.selectedTab)
    const setSelectedTab = useStoreActions(actions => actions.streamViewState.setSelectedTab)
	return (
		<>
			<Tabs value={selectedTab} onChange={(e: any, tab) => setSelectedTab(tab)}>
				<Tab label='Accueil' />
				<Tab label='Vidéos' />
				<Tab label='Clips' />
			</Tabs>
		</>
	);
};

export default StreamTabs;
