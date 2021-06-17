import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'

const initialState = {};

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);

// export default { store, persistor };