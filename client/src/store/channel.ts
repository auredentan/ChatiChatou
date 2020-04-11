export interface Channel {
    avatarUrl: string | undefined
    currentViewerCount: number
    name: string
    currentStreamSection: string | undefined
    isOnline: boolean
}

const channel: Channel = {
    avatarUrl: undefined,
    currentViewerCount: 0,
    name: '',
    currentStreamSection: undefined,
    isOnline: false
};

export default channel;
