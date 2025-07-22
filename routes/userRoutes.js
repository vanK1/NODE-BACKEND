import e from "express"
import { del1user, forlogin, forsignup, get1user, getAllUsers, update1user } from "../controllers/usercontroller.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post('/register', forsignup);

router.post('/login', forlogin);

router.get('/', getAllUsers);

router.get('/:id', get1user);

router.delete('/:id', authorize(['admin', 'user']), del1user);

router.put('/:id', update1user);


export default router
