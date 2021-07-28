import React, { useState } from 'react';
import '../css/students.css';
import { WithContext as ReactTags } from 'react-tag-input';

export const Student = ({data, addTag}) => {
    //console.log(data);
    const { firstName, lastName, pic, email, company, grades, skill, tags} = data;
    const [tagState, setTags] = useState(tags? tags : []);
    const [open, setOpen] = useState(false);
    //var student = data;

    const average = () => {
        if(grades){
            var accu=0;
            for(var i=0; i < grades.length; i++){
                accu = parseInt(grades[i]) + accu;
            }
            return (accu/8);
        }else{
            return false;
        }
    }

    const toggle = () => {
        setOpen(!open);
    }

    const handleAddition = (tag) => {
        var newTags = [ ...tagState,  {id: (tagState.length+1).toString(), text: tag.text} ];
        setTags(newTags);

        //console.log(data);
        data = {...data,  tags: [ ...tagState,  {id: (tagState.length+1).toString(), text: tag.text} ] };
        addTag(data);
    }

    return(
        <div className="col-12 student">
            <div className="row">
                <div className="pic col-2">
                    <img src={pic} alt={firstName +" "+ lastName} className="img-fluid" />
                </div>
                <div className="info-wapper col-10">
                    <div className="name">
                        <h2>{firstName +" "+ lastName}</h2>
                        <button aria-label="Plus-Minus Button" onClick={toggle}><i className={open? "fas fa-minus" : "fas fa-plus"}></i></button>
                    </div>
                    <div className="info">
                        <p>Email: {email}</p>
                        <p>Company: {company}</p>
                        <p>Skill: {skill}</p>
                        <p>{average()? "Average: "+ average() +"%" : ""}</p>
                        <div className="grades" style={{display: (open? 'block' : 'none')}}>
                            {grades &&
                                grades.map((n, i) => {
                                    return(
                                        <p key={i}>Test {(i+1)}: <span>{n}%</span></p>
                                    );
                                })
                            }
                        </div>
                        <div className="tag-wrapp">
                            <ReactTags 
                                allowDragDrop={false}
                                allowUnique={true}
                                autofocus={false} 
                                placeholder="Add a tag" 
                                tags={tagState} 
                                handleAddition={handleAddition} 
                                maxLength={30}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}