import React, { useEffect, useRef, useState } from 'react'
import './todoForm.scss'
import api from '../../api/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditTodo() {
  const [todo, setTodo] = useState({});
  const { id } = useParams();
  const formRef = useRef(null);
  const titleErrorRef = useRef(null);
  const navigate = useNavigate();

  const editTodo = async () => {
    const title = formRef.current.title.value;
    const description = formRef.current.description.value;
    titleErrorRef.current.style.display = 'none'
    if(title.length < 2 || title.length > 30) return titleErrorRef.current.style.display = 'block';

    try{
      await api.put(`/todos/${id}`, {title, description});
      navigate('/');
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await api.get(`/todos/${id}`);
        setTodo(response.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    getTodo()
  }, [])



  return (
    <div className='page formTodoPage'>
      <Link className='homeLink' to="/"><i class="fa fa-arrow-left" aria-hidden="true"></i></Link>
      <section className='container'>
        <h1 className="title"><span>Edit Todo</span><i className='fa fa-edit' aria-hidden="true"></i></h1>
        <form ref={formRef} className='todoForm' onSubmit={(e) => e.preventDefault()}>
          <div className='input'>
            <p>Title <span ref={titleErrorRef} className='error'>Title must be beetwen 2 and 30 characters</span></p>
            <input defaultValue={todo.title} type="text" name='title' placeholder="Title" />
          </div>
          <div className='input'>
            <p>Description <span className='error'></span></p>
            <input defaultValue={todo.description} type="text" name='description' placeholder="Description" />
          </div>
          <button onClick={editTodo} className='addTodo'>Edit Todo</button>
        </form>
      </section>
    </div> 
  )
}
