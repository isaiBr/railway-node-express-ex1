//Se realiza toda la logica del modelo
const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate (){
    for(let index=0; index<100;index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: 'María Jesus Soledad Espezúa Valenzuela',
        price: 20122001,
        image: 'https://scontent.flim28-2.fna.fbcdn.net/v/t1.18169-9/22310561_1609456159097586_6899926250035790376_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_eui2=AeE__ysfCGj_L1Nc4ASCGMtQrnkaPdhXHZOueRo92Fcdk0kwiaRiRgsJg-fB8cJj_p0tdK9ACfL7w98zs1TJ8v4H&_nc_ohc=Zv9BZQh8NPYAX9k0Tky&_nc_ht=scontent.flim28-2.fna&oh=00_AfCoNtVVSEK1GtJu_O3t_48F72oZQLcpP9gOsk1o32v22g&oe=6433624E',
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products);
      });
    })
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }
}


module.exports = ProductsService;
