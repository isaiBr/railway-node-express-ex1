const faker = require('faker');

class UserService{
  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    for (let i=0; i<10;i++){
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        image: faker.image.imageUrl()
      })
    }
  }

  create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find(){
    return this.users;
  }

  findOne(id){
    return this.users.find(user=>user.id === id);
  }

  update(id, changes){
    const index =  this.user.findIndex(user=> user.id===id);
    if(index === -1){
      throw new Error('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  delete(id){
    const index =  this.users.findIndex(user=> user.id===id);
    if(index === -1){
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return {id};
  }

}

module.exports =  UserService;
