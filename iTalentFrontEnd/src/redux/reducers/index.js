import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import detailsEmailReducer from './detailsEmailReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    routing,
    detailsEmail: detailsEmailReducer,
    cart: cartReducer
});

export default rootReducer;