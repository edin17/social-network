

export default function userReducer(state={},action){
    switch(action.type){
        case "LOGIN":
            state=action.payload.user;
            return state;
        
        default:
            return state;
    }
}