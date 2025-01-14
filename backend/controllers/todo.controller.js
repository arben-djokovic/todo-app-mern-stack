import Todo from '../models/todo.model.js';

const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const updateFields = req.body;
        delete updateFields.completed;
        delete updateFields.date;
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const completeTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const incompleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { completed: false }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { createTodo, getTodos, getTodo, updateTodo, deleteTodo, completeTodo, incompleteTodo };