import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const UserRoutes = Router();
 
UserRoutes.post('/', async  (req, res) => {

  try{

    //dados no body da requisição
    const { name, password, tag} = req.body;

    const createUser = new CreateUserService();
    
    const user = await createUser.execute({name, password, tag});
  
    return res.json(user);
  
  }catch(err) {
     return res.status(400).json({error:err.message});
  }

});

UserRoutes.get('/', async (req, res) => {

  try{
    const createUser = new CreateUserService();
    const findAll = await createUser.findAll();
    return res.json(findAll);
  }

  catch(err) {
    return res.status(400).json({error: err.message});  
  }
});


UserRoutes.put('/:id', async (req, res) => {

  try{ 
    
    const id = req.params.id;

    const { name, password, tag } = req.body;

    const createUser = new CreateUserService();

    const update = createUser.Update(id, name, password, tag);

    return res.json(update);

  }
  catch(err){
    return res.status(400).json({error: err.message});
  }
})

export default UserRoutes;