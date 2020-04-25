import React from 'react';

import { useStoreState } from 'hooks';
import { LeftSidebar } from 'components';

const HomeView = () => {
	const isLeftSidebarOpen = useStoreState(
		(state) => state.globalState.leftSidebarIsOpen,
	);

	return (
		<div
			style={{
                display: 'flex'
            }}
		>
			<LeftSidebar />
			Home view
		</div>
	);
};

export default HomeView;
