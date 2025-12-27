import { addTodoService, deleteTodoService, getTodoByIdService, getTodosService, updateTodoService } from "../services/todo.service.js"

export const getTodos = async (_, res) => {
    try {
        const tasks = await getTodosService()
        res.status(200).send({ tasks })
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const getTodoById = async (req, res) => {
    try {
        const task = await getTodoByIdService(req.params.id)
        if (!task) return res.status(404).send({ message: "Task not found" })
        res.status(200).send({ task })

    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const addTodo = async (req, res) => {
    try {
        await addTodoService(req.body)
        res.status(201).send({ message: "Added successfully" })
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const deleteTodo = async (req, res) => {
    const result = await deleteTodoService(req.params.id)
    if (!result.deletedCount)
        return res.status(404).send({ message: "Not found" })

    res.status(200).send({ message: "Deleted successfully" })
}

export const updateTodo = async (req, res) => {
    const result = await updateTodoService(req.params.id, req.body)
    if (!result.matchedCount)
        return res.status(404).send({ message: "Task not found" })

    res.status(200).send({ message: "Updated successfully", result })
}