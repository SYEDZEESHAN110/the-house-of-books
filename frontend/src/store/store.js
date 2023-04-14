import { legacy_createStore as createStore , combineReducers} from "redux";
import LoginSignupFormReducer from "../components/LoginSignup/LoginSignup.reducer";
import AddFormReducer from "../components/AddBookForm/AddForm.reducer";
import EditFormReducer from "../components/EditBookForm/EditForm.reducer";

const store = createStore(combineReducers({LoginSignupFormReducer, AddFormReducer, EditFormReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;