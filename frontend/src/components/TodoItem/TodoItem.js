import React, { useRef, useState } from 'react'
import "./todoItem.scss"
import api from '../../api/api';
import { Link } from 'react-router-dom';

export default function Todo({todo}) {
    const [checked, setChecked] = useState(todo.completed);
    const todoRef = useRef(null);

    const changeStatus = async(e) => {
        if(e.target.classList.contains("iconEdit") || e.target.classList.contains("iconTrash")) return;
        let requestUrl = 'complete'
        if(checked){
            requestUrl = 'incomplete'
        }
        try{
            await api.put(`/todos/${todo._id}/${requestUrl}`);
            setChecked(!checked);
        }catch(err){
            console.log(err)
            if(err.response.status === 404){
                todoRef.current.remove();
            }
        }
    }

    const deleteTodo = async() => {
        try{
            await api.delete(`/todos/${todo._id}`);
            todoRef.current.remove();
        }catch(err){
            console.log(err)
            if(err.response.status === 404){
                todoRef.current.remove();
            }
        }
    }

    return (<div ref={todoRef} onClick={changeStatus} className={checked ? "todo checkedTodo" : "todo"}>
        {checked ? <i className="fa fa-check-circle checked" aria-hidden="true"></i> : <i className="fa fa-check-circle-o" aria-hidden="true"></i>}
        <div className="text">
            <h3 className="todoTitle">{todo.title}</h3>
            <p className="description">{todo.description}</p>
            <p className="date">{todo.timeago}</p>
        </div>
        <div className="icons">
            <Link to={`/edit/${todo._id}`} className="link"><i className="fa fa-pencil iconEdit" aria-hidden="true"></i></Link>
            <i onClick={deleteTodo} className="fa fa-trash-o iconTrash" aria-hidden="true"></i>
        </div>
    </div>
    )
}
