import express from 'express'
const router = express.Router({ mergeParams: true });
import  textToVideoController  from '../controller/prompt.js';
router.get("/give", async (req, res) => {
    textToVideoController(req, res);
});
export default router;