import React, { useEffect, useState } from "react";
import './Mainapp.css';

import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


function Mainapp(){

    const [isComplete ,setIsComplete]=useState(false);



    //    Input part using onchange
     

    const[allTodos , setAllTodos]=useState([]);

    const[todoInput , setTodoInput]=useState("");

    const[descriptionInput , setDescriptionInput]=useState("");

    const [compeletedTodos , setCompeletedTodos]=useState([]);



    function Userinput(event){
        setTodoInput(event.target.value);
        console.log(event.target.value);
        console.log(event.target.name);
    }


    function DescriptionInput(event){
        setDescriptionInput(event.target.value);
        console.log(event.target.value);
        console.log(event.target.name);
    }


      function handleaddtodo(){

        const newTodoItem ={
            title:todoInput,
            description:descriptionInput
        }

        const updateTodoArray=[...allTodos];
        updateTodoArray.push(newTodoItem);
      
        setAllTodos(updateTodoArray);
        localStorage.setItem('todolist' , JSON.stringify(updateTodoArray));
       

      }

    //   Delete todo list part


    const handleDeletetodo = (index)=>{
        let reducetodo=[...allTodos];
        reducetodo.splice(index , 1);

        localStorage.setItem('todolist' , JSON.stringify(reducetodo));
        setAllTodos(reducetodo);
    }


    // Compelete tick part 

    const handleCompelete =(index) =>{
        let now =new Date();

        let dd=now.getDate();
        let mm=now.getMonth() +1;
        let yyyy=now.getFullYear();
        let h=now.getHours();
        let m=now.getMinutes();
        let s=now.getSeconds();


        let compeletedOn= dd + " - " + mm + " - " + yyyy + ' at ' + h + " :" + m + " :" + s;
        
        let filteredItem={
            ...allTodos[index],
            compeletedOn:compeletedOn
        }

        let updatecompeleteArr=[...compeletedTodos];
        updatecompeleteArr.push(filteredItem);
        setCompeletedTodos(updatecompeleteArr);
        handleDeletetodo(index);

        localStorage.setItem('compeletedTodos' , JSON.stringify(updatecompeleteArr));

    }


    // Compeleted deleted part 

    const handleDeleteCompeletedtodo=(index) =>{

        let reducetodo=[...compeletedTodos];
        reducetodo.splice(index , 1);

        localStorage.setItem('compeletedTodos' , JSON.stringify(reducetodo));
        setCompeletedTodos(reducetodo);

    }


      useEffect(()=>{
        const SavedTodolist=JSON.parse(localStorage.getItem('todolist'));
        const SavedCompeleted=JSON.parse(localStorage.getItem('compeletedTodos'));

        if(SavedTodolist){
            setAllTodos(SavedTodolist)
        }

        if(SavedCompeleted){
            setCompeletedTodos(SavedCompeleted);
        }


      },[])





// For Active btn 
    function secbtn1(){
        setIsComplete(false);
    }

    function secbtn2(){
        setIsComplete(true);
    }

    return(
        <div>
            
            <div className="todo-header">
                <h1>TO-DO LIST WEB APP</h1>
            </div>

            <div className="todo-part">

                <div className="todo-input">
                    <div className="todo-input-item">
                        <label htmlFor="">Title</label>
                        <input type="text" onChange={Userinput}  name="user" placeholder="what is the task title?" value={todoInput} />
                    </div>

                    <div className="todo-input-item">
                        <label htmlFor="">Description</label>
                        <input type="text" onChange={DescriptionInput} name="description" placeholder="what is the  task description?" value={descriptionInput} />
                    </div>

                    <div className="todo-input-item">
                     <button type="submit" onClick={handleaddtodo} className="primarybtn">Add</button>
                    </div>

        
                </div>

            
                <div>
                <hr className="border-line" />
                </div>

                <div className="btn-area">

                    <button  className={`secondary-btn ${isComplete ===false && 'active'}`} 
                     onClick={secbtn1} >Todo</button>
                    <button className={`secondary-btn ${isComplete ===true && 'active'}`} 
                    onClick={secbtn2} >Complete</button>

                </div>


                <div className="todo-list">

                 {isComplete=== false && allTodos.map((item , index)=>{
                    return(
                        <div className="todo-list-item" key={index}>
                        <div>
                        <h1> {item.title}</h1>
                        <p> {item.description} </p>
                        </div>
                   

                <div  className="tick-btn">

                <MdDelete  className="delete-icon" onClick={()=>handleDeletetodo(index)} title="Delete?" />
                <FaCheck   className="check-icon"  onClick={()=>handleCompelete(index)} title="Compelete?"/>

                   </div>
                </div>
                    );
                 })}



                   {isComplete=== true && compeletedTodos.map((item , index)=>{
                    return(
                        <div className="todo-list-item" key={index}>
                        <div>
                        <h1> {item.title}</h1>
                        <p> {item.description} </p>
                        <p> <small>Compeleted On : {item.compeletedOn} </small></p>
                        </div>
                   

                <div  className="tick-btn">

                <MdDelete  className="delete-icon" onClick={()=>handleDeleteCompeletedtodo(index)} title="Delete?" />
                
                   </div>
                </div>
                    );
                 })}

                </div>


            </div>
           
        </div>
    )
};

export default Mainapp;