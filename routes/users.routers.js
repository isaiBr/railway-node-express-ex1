const express = require('express');

const router = express.Router();

const UserService = require('../services/user.service');
const service = new UserService();

router.get('/',(req, res)=>{
  // const {limit, offset}= req.query;
  // if(limit && offset){
  //   res.json({
  //     limit,
  //     offset
  //   })
  // }
  // else{
  //   res.send('No hay parametros');
  // }
  const users = service.find();
  res.json(users);
})

//post
router.post('/',(req, res)=>{
  const body = req.body;
  const newUser = service.create(body);
  res.json(newUser)
})

//patch
router.patch('/:id',(req, res)=>{
  const {id} = req.params;
  const body = req.body;
  const user = service.update();
  res.json(user);
})


//delete
router.delete('/:id',(req, res)=>{
  const {id} = req.params;
  const rta = service.delete(id);
  res.json(rta);
})





module.exports = router;
