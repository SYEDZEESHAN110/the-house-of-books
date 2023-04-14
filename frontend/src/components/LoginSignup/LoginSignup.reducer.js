export function login(isLoggedIn) {
  return {
    type: "INCREMENT_LOGIN",
    payload: isLoggedIn
  };
}

const initialState = {
  user: null,
  isLoggedIn: false,
  id: 0,
  name: "",
  email: "",
  password: "",
  password2: "",
  formData: [],
};

const LoginSignupFormReducer = (state = initialState, action) => {
  switch (action.type) {

    case "INCREMENT_LOGIN":
      return { ...state, isLoggedIn: action.payload };
    case "INCREMENT_USER":
      return { ...state, user: action.payload.token };
    case "INCREMENT_ID":
      return { ...state, id: state.id + 1 };
    case "INCREMENT_NAME":
      return { ...state, name: action.payload };
    case "INCREMENT_EMAIL":
      return { ...state, email: action.payload };
    case "INCREMENT_PASSWORD":
      return { ...state, password: action.payload };
    case "INCREMENT_PASSWORD2":
      return { ...state, password2: action.payload };
    case "INCREMENT_FORMDATA":
      return {
        ...state,
        formData: [
          ...state.formData,
          {
            id: state.id,
            name: state.name,
            email: state.email,
            password: state.email,
            password2: state.password2,
          },
        ],
      };
    default:
      return state;
  }
};

export default LoginSignupFormReducer;
