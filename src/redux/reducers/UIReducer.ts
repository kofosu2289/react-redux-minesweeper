import { UIActions } from '../actions/UIActions';

type UIState = {

}

const initialUIState = {

}

const UIReducer = (state: UIState = initialUIState, action: UIActions) => {
    switch(action.type) {
        case 'TEST':
            console.log(action.payload);
            return state;
        default:
            return state;
    }
}

export default UIReducer;