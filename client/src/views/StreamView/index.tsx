import React from 'react';

import { Stream, Chat } from './components';
import { useStoreState } from 'hooks';
import { LeftSidebar, Toolbar } from 'components';

const StreamView = () => {
	const isLeftSidebarOpen = useStoreState(
		(state) => state.globalState.leftSidebarIsOpen,
	);
	return (
		<div style={{
            display: 'flex',
            width: '100%',
            zIndex: 1
        }}>
			<LeftSidebar />
			<Stream />
			<Chat />
		</div>
	);
};

export default StreamView;
