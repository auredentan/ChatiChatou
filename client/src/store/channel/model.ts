import { Action, action } from "easy-peasy";

export interface ChannelModel {
    avatarUrl: string | undefined
    currentViewerCount: number
    name: string 
    currentStreamSection: string | undefined
}

const channelModel: ChannelModel = {
    avatarUrl: undefined,
    currentViewerCount: 0,
    name: '',
    currentStreamSection: undefined
};

export default channelModel;
