import express, { Application, Request, Response } from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes"
import { dbConnection } from "./database/connection";

export class Server {
  private app: Application;
  private port: string;
  private api_paths = { home: "/api/v1/home", users: "/api/v1/users" };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";


    // DB Connection
    dbConnection()

    //Metodos iniciales
    this.middlewares(); 

    // Definir Rutas
    this.routes()
  }

  mi_primera_api() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ msg: "Apifuncionando" });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.mi_primera_api();
  }

  //Rutas
  routes(): void{
    this.app.use(this.api_paths.users, usersRoutes)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("El servidor esta corriendo en el puerto", this.port);
    });
  }
}