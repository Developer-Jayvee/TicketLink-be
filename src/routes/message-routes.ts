
import express from 'express'
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { MessageQuery } from '../utils/query_handler';


const router = express.Router();


router.post("/message",AuthMiddleware, async (req,res) => {
    const { message  , conversation_id } = req.body
    const { id } = req.user;
    try {
        const response = await MessageQuery.create({
            user_id: id,
            message: message,
            channel_id: 0,
            department_id:null // temporary null
        }).then( (result) => {
            res.json({ message : 'Successfully saved.'});
        }).catch((err) => res.sendStatus(500));

    } catch (error) {
        res.sendStatus(500).json({ message : `Error at ${error}`});
    }
})

export default router;