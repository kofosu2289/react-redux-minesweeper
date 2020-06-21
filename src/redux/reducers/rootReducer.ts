import { combineReducers } from 'redux';
import UIReducer from './UIReducer';
import gameBoardReducer from './gameBoardReducer';

const rootReducer = combineReducers({
    UI: UIReducer,
    gameBoard: gameBoardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;