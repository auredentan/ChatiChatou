import { Action, action } from 'easy-peasy';

export interface ConnectViewState {
	isConnectModalOpen: boolean;
	choosenTab: number;
	loading: boolean;

    setTab: Action<ConnectViewState, number>;
    setIsConnectModalOpen: Action<ConnectViewState, boolean>;
	openSignIn: Action<ConnectViewState>;
	openSignUp: Action<ConnectViewState>;
}

const connectViewState: ConnectViewState = {
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

export default connectViewState;
