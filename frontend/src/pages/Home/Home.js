import React, { useEffect, useState} from 'react'
import api from '../../api/api';
import './home.scss'
import Todo from '../../components/Todo/Todo';


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
    <div className='homePage'>
        <section className="todoContainer">
            <h1 className='title'><span>ToDo List </span><i className="fa fa-list-alt" aria-hidden="true"></i></h1>
            <div className="todos">
                {
                    todos.map((todo) => (
                        <Todo key={todo._id} todo={todo} />
                    ))
                }
            </div>
        </section>
    </div>
  )
}
