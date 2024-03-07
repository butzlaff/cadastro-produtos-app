import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import router from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.configureCookies();

    this.routes();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public routes(): void {
    this.app.use(router);
  }

  public configureCookies(): void {
    this.app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000'],
      })
    );

    this.app.use(cookieParser());
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
export const { app } = new App(); // Usada apenas pelos tests
