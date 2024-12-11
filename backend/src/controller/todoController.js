import Todo from '../model/Todo.js';

class todoController {
    getTodoList = async (req, res) => {
        const todoList = await Todo.find();
        res.json(todoList);
    }
    getTodoListOfUser = async (req, res) => {
        try {
            const {id} = req.params;
            const todoList = await Todo.find().where('user').equals(id);
            res.json(todoList);
        } catch (error) {
            console.log(error);
        }
    }

    addTodo = async (req, res) => {
        try{
        const {desc, endDate, completed } = req.body;
        const newTodo = await Todo.create({
            desc,
            endDate,
            completed,
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        res.status(400).json({message: error.message}); 
    }
    }

    updateTodo = async (req, res) => {
        try{
        const {id} = req.params;
        const {desc, endDate, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body);
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({message: error.message}); 
    }
    }

    deleteTodo = async (req, res) => {
        try{
        const {id} = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        res.json(deletedTodo);
    } catch (error) {
        res.status(400).json({message: error.message}); 
    }
    }
}

export default todoController;