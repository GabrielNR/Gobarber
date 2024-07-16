import { Router } from "express";

import { SessionsController } from '@modules/Users/infra/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.create)

export default sessionsRouter;