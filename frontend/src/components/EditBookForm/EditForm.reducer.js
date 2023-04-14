const initialState = {
    id : 0,
    title: "",
    author:"",
    category:"",
    description:"",
    access:"",
   
    ISBN:""
    }

const EditFormReducer = (state=initialState , action)=>{

    switch(action.type){

        case "INCREMENT_ID":
            return {...state, id: state.id+1 }
        case "INCREMENT_TITLE":
            return {...state, title: action.payload}
        case "INCREMENT_AUTHOR":
            return {...state, author: action.payload}
        case "INCREMENT_CATEGORY":
            return {...state, category: action.payload}
        case "INCREMENT_DESCRIPTION":
            return {...state, description: action.payload}
        case "INCREMENT_ACCESS":
            return {...state, access: action.payload}
        case "INCREMENT_ISBN":
            return {...state, ISBN: action.payload}
        default:
            return state
    }
    
}

export default EditFormReducer