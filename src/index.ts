import express, { Application, Request, Response } from 'express';
// import taskRoutes from "./tasks";
import routers from './routes/index';

const app: Application = express();
const port: number = 3000;
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
    res.send("working..........");
})
// app.use('/tasks',taskRoutes);
app.use("/", routers);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});