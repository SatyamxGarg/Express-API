"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./tasks"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// app.get('/data', (req: Request, res: Response) => {
//   res.send('Hello World with TypeScript!');
// });
app.get("/", (req, res) => {
    res.send("working..........");
});
app.use('/tasks', tasks_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
