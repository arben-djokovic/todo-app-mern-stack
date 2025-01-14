import React, { useEffect, useState} from 'react'
import api from '../../api/api';
import './home.scss'
import TodoItem from '../../components/TodoItem/TodoItem';
import { Link } from 'react-router-dom';


export default function Home() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await api.get('/todos');
                setTodos(response.data);
            } catch (err) {
                console.error(err.message);
            }
        }

        getTodos();
    }, [])
  return (
    <div className='homePage page'>
        <section className="container">
            <h1 className='title'><span>ToDo List </span><i className="fa fa-list-alt" aria-hidden="true"></i></h1>
            <Link to="/create" className="addTodo"><i className="fa fa-plus" aria-hidden="true"></i></Link>
            <div className="todos">
                {
                    todos.length ? todos.map((todo) => (
                        <TodoItem key={todo._id} todo={todo} />
                    )) : "No todos found"
                }
            </div>
        </section>
    </div>
  )
}
