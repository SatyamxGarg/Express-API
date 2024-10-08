// import { Router, Request, Response } from 'express';
// import { Task } from './interfaces/task.interface';

// const router = Router();
// let tasks: Task[] = [];
// router.post('/', (req: Request, res: Response) => {
//     const task: Task = {
//         id: tasks.length + 1,
//         name: req.body.name,
//         description: req.body.description,
//         completed: false,
//     };

//     tasks.push(task);
//     res.status(201).send({
//         "status":201,
//         "message":"Done",
//         "data":{
//             "details":task,
//             "totalCount":tasks.length
//         }
//     });
// });
// router.get('/', (req: Request, res: Response) => {
//     // res.json(tasks);
//     res.status(201).send({
//         "details":tasks,
//         "totalCount":tasks.length
//     })
// });
// router.get('/:id', (req: Request, res: Response) => {
//     const task = tasks.find((t) => t.id === parseInt(req.params.id));

//     if (!task) {
//         res.status(404).send('Task not found');
//     } else {
//         // res.json(task);
//         res.status(201).send({
//             "details":task,
//         })
//     }
// });
// router.put('/:id', (req: Request, res: Response) => {
//     const task = tasks.find((t) => t.id === parseInt(req.params.id));

//     if (!task) {
//         res.status(404).send('Task not found');
//     } else {
//         task.name = req.body.name || task.name;
//         task.description = req.body.description || task.description;
//         task.completed = req.body.completed || task.completed;

//         res.json(task);
//     }
// });
// router.delete('/:id', (req: Request, res: Response) => {
//     const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

//     if (index === -1) {
//         res.status(404).send('Task not found');
//     } else {
//         tasks.splice(index, 1);
//         res.status(204).send({
//             "status":204,
//           "message":"Done",
//         });
//     }
// });


// export default router;