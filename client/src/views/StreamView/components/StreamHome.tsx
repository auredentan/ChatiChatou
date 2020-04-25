import React from 'react';
import StreamInfoBar from './StreamInfoBar';
import StreamCustomInfos from './StreamCustomInfos';

const StreamHome = () => {
	return (
		<div>
			<div>
				<iframe
					src='https://player.twitch.tv/?channel=zerator'
					//@ts-ignore
					frameborder='0'
					allowfullscreen='true'
					scrolling='no'
					height='378'
					width='100%'
				></iframe>
			</div>
			<div>
				<StreamInfoBar />
			</div>
			<div>
				<StreamCustomInfos />
			</div>
		</div>
	);
};

export default StreamHome;
