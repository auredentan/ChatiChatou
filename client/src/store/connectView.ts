import { Action, action } from 'easy-peasy';

export interface ConnectView {
	isConnectModalOpen: boolean;
	choosenTab: number;
	loading: boolean;

    setTab: Action<ConnectView, number>;
    setIsConnectModalOpen: Action<ConnectView, boolean>;
	openSignIn: Action<ConnectView>;
	openSignUp: Action<ConnectView>;
}

const connectView: ConnectView = {
	isConnectModalOpen: false,
	choosenTab: 0,
	loading: false,

	setTab: action((state, payload) => {
		state.choosenTab = payload;
    }),
    setIsConnectModalOpen: action((state, payload) => {
        state.isConnectModalOpen = payload
    }),
	openSignIn: action((state) => {
		state.isConnectModalOpen = true;
		state.choosenTab = 1;
	}),
	openSignUp: action((state) => {
		state.isConnectModalOpen = true;
		state.choosenTab = 0;
	}),
};

export default connectView;
