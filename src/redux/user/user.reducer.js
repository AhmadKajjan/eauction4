const INITIAL_STATE={
    currentUser:"",
    currentUserProducts:[],
    currentUserID:"",
}

const userReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case 'Set_CurrentUser':
            return{
                ...state,
                currentUser:action.payload
            }
        case 'Set_CurrentUserProducts':
            return{
                ...state,
                currentUserProducts:action.payload
            }
        case 'Set_CurrentUserID':
            return{
                ...state,
                currentUserID:action.payload
             }
        default:
            return state;
    }
}
export default userReducer; 