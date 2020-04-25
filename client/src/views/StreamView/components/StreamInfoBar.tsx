import React from 'react';
import { Toolbar } from 'components';

const StreamInfoBar = () => {
	return (
		<>
		<Toolbar before={<>Stream title</>} after={<>Stream count and share</>} />
		<div>
			Categ + team + lang infos
		</div>
		</>
	);
};

export default StreamInfoBar;
