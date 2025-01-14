import React, { useRef } from "react";
import "./todoForm.scss";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const formRef = useRef(null);
  const titleErrorRef = useRef(null);
  const descriptionErrorRef = useRef(null);
  const navigate = useNavigate();

  const createTodo = async () => {
    const title = formRef.current.title.value;
    const description = formRef.current.description.value;
    titleErrorRef.current.style.display = "none";
    descriptionErrorRef.current.style.display = "none";
    if (title.length < 2 || title.length > 30)
      return (titleErrorRef.current.style.display = "block");
    if (description.length > 50)
      return (descriptionErrorRef.current.style.display = "block");

    try {
      await api.post("/todos", { title, description });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page formTodoPage">
      <Link className="homeLink" to="/">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </Link>
      <section className="container">
        <h1 className="title">
          <span>Create Todo</span>
          <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
        </h1>
        <form
          ref={formRef}
          className="todoForm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="input">
            <p>
              Title{" "}
              <span ref={titleErrorRef} className="error">
                Title must be beetwen 2 and 30 characters
              </span>
            </p>
            <input type="text" name="title" placeholder="Title" />
          </div>
          <div className="input">
            <p>
              Description
              <span ref={descriptionErrorRef} className="error">
                Description must be at most 50 characters.
              </span>
            </p>
            <input type="text" name="description" placeholder="Description" />
          </div>
          <button onClick={createTodo} className="addTodo">
            Create Todo
          </button>
        </form>
      </section>
    </div>
  );
}
