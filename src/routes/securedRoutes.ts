
import express from 'express'
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { GroupQuery, MessageQuery } from '../utils/query_handler';
import { PayloadGroupChatInterface } from '../types/PayloadTypes';


const router = express.Router();


router.post('/save-group',AuthMiddleware, async (req,res) => {
    const { name , description } = req.body as PayloadGroupChatInterface;

    if(!name || !description) return res.status(500).json({ message : 'Missing payload.'});

    await GroupQuery.create({
        name : name,
        description : description
    }).then( response => res.json({ message : 'Success' , data : response}))
    .catch( err => res.status(500).json({ message : err}))
});
export default router;