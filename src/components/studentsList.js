import React, { useState, useEffect } from 'react';
import { Student } from './students';

export const StudentsList = ({students, tagInChild}) => {
    //const studentsList = students;
    const [studentsList, setList] = useState(students);
    //console.log(studentsList);

    useEffect(() => {
        setList(students);
    }, [students]);

    const addTag = (st) => {
        var temp = [];
        studentsList.forEach(function(elem) {
            if(elem.id === st.id){
                elem = {...elem, tags: st.tags};
            }
            temp.push(elem);
        });

        tagInChild(temp);
        setList(temp);

    }

    
    return(
        studentsList.map((row) => (
            <Student key={row.id} data={row} addTag={addTag}/>
        ))
    );
}