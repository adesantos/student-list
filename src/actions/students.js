import axios from "axios";

function students(res){
    return{ type: true, payload: res}
}
export function getStudents(){

    return dispatch => {
        axios.get('https://api.hatchways.io/assessment/students')
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            //console.log(res.data.students);
            dispatch(students(res.data.students));
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
}