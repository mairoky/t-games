import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletegame, getgames, updategame } from '../controllers/game.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getgames', getgames);
router.delete('/deletegame/:gameId/:userId', verifyToken, deletegame);
router.put('/updategame/:gameId/:userId', verifyToken, updategame);

export default router;