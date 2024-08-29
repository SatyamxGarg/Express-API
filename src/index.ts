import express, { Application, Request, Response } from 'express';
// import taskRoutes from "./tasks";
import rootRouter from './routes';

const app: Application = express();
const port: number = 3000;
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("working..........");
})


// app.use('/tasks',taskRoutes);
app.use("/", rootRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});