export const getStudents = (state = {}, action) => {
    switch(action.type){
        case true:
            return {
                ...state,
                students: action.payload
            }
        default:
            return state;
    }
}