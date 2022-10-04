import express, {Request, Response} from "express";
import { Todo } from "../models/todo.model";
const router = express.Router();

// Index Page
router.get("/todo", async(req: Request, res: Response) => {
    Todo.find({}, (err: any, todos: any) => {
        if (err) {
            console.log(err);
        } else {
            res.render("landing", { todos: todos });
        }
    });
});

// Add Todo
router.get("/todo/new", async(req: Request, res: Response) => {
    res.render("new")
});

// Create Todo
router.post("/todo", async(req: Request, res: Response) => {
    const { title, description, someMoreDetails } = req.body;
    Todo.create({ title, description, someMoreDetails }, (err: any, todo: any) => {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/todo");
        }
    });
});

// Show Page
router.get("/todo/:id", async(req: Request, res: Response) => {
    const { title, description, someMoreDetails } = req.body;
    Todo.findById(req.params.id, { title, description, someMoreDetails }, (err: any, todo: any) => {
        if (err) {
            res.redirect("/landing");
        } else {
            res.render("show", { todo: todo });
        }
    });
});

// Edit Page
router.get("/todo/:id/edit", async(req: Request, res: Response) => {
    Todo.findById(req.params.id, (err: any, todo: any) => {
        if (err) {
            res.redirect("/landing");
        } else {
            res.render("edit", { todo: todo });
        }
    });
});

// Update Todo
router.put("/todo/:id/", async(req: Request, res: Response) => {
    const { title, description, someMoreDetails } = req.body;
    Todo.findByIdAndUpdate(req.params.id, { title, description, someMoreDetails }, (err: any, todo: any) => {
        if(err) {
            res.redirect("/todo");
        } else {
            res.redirect("/todo/" + req.params.id);
        }  
    });
});

// Delete Todo
router.delete("/todo/:id", async(req: Request, res: Response) => {
    Todo.findByIdAndRemove(req.params.id, (err: any, todo: any) => {
        if(err) {
            res.redirect("/todo");
        } else {
            res.redirect("/todo");
        }
    });
});


export { router };