import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
  constructor(path){
    this.products = [];
    this.path = path;
  }
  #checkDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(fs.readFileSync(this.path))
    }
  }
  addProduct(title, description, price, thumbnail, code, stock){
    this.#checkDB()
    const isInArray = this.products.some(product => product.code === code)
    if(isInArray === false && title && description && price && thumbnail && stock){
      this.products.push({
        id: uuidv4(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Producto agregado"
    }else{
      return "Producto repetido o faltan características"
    }
  }
  getProducts(){
    return this.products
  }
  getProductById(id){
    this.#checkDB()
    const productFound = this.products.find(product => product.id === id)
    if (productFound){
      return productFound
    }else{
      return "Not found"
    }
  }
  updateProduct(id, title, description, price, thumbnail, code, stock){
    this.#checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products[indexFound] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Producto actualizado"
    }else{
      return "Not found"
    }
  }
  deleteProduct(id){
    this.#checkDB()
    const indexFound = this.products.findIndex(product => product.id === id)
    if(indexFound !== -1){
      this.products.splice(indexFound,indexFound+1)
      fs.writeFileSync(this.path, JSON.stringify(this.products))
      return "Producto eliminado"
    }else{
      return "Not found"
    }
  }
}
