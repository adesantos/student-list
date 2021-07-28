import React, { useEffect, useState } from 'react';
import './css/App.css';
import { StudentsList } from './components/studentsList';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from './actions/students';

function App() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [studentsList, setList] = useState(students);
  const [studentsByTags, setTags] = useState(students);
  const [searchedTag, setTag] = useState("");
  

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  useEffect(() => {
    setList(students);
    setTags(students);
  }, [students]);

  const tagStudentsHandle = (list) => {
    setList(list);
    setTags(list);
  }


  const searchName = (e) => {
    const query = e.target.value.toLowerCase();

    var result = studentsByTags.filter(student => {
      var fullName = (student.firstName +" "+student.lastName).toLowerCase(); 
      return fullName.includes(query)? student : null;
    });

    if (result.length > 0 || query !== "" || searchedTag !== ""){
        setList(result);
    }else{
      setList(studentsByTags);
    }

  }

  const searchTag = (e) => {
    const query = e.target.value.toLowerCase();
    setTag(query);

    var result = studentsByTags.filter(student => {
      var flag = false;
      if(student.tags){
        student.tags.forEach(function(tag) {
          if(tag.text.includes(query)){
            flag = true;
          }
        });
      }
      return flag? student : null;
    });

    if (result.length === 0 || query === ""){
      setList(studentsByTags);
    }else{
      setList(result);
    }
  }

  return (
    <div className="app container">
      <header className="app-header">
        <input name="name" autoFocus="autofocus" type="text" placeholder="Search by name" onChange={searchName} />
        <input name="tag" type="text" placeholder="Search by tag" onChange={searchTag} />
      </header>

      <section className="row">
        {studentsList &&
          <StudentsList tagInChild={tagStudentsHandle} students={studentsList} />
        }
      </section>

    </div>
  );
}

export default App;