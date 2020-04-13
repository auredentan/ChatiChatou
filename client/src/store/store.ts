import { createStore } from 'easy-peasy';
import storeModel from './storeModel';
import { userService } from 'services';

const store = createStore(storeModel, {
    injections: {
        userService: userService()
    }
});

export default store;
