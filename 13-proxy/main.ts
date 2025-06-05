// Интерфейс изображения
interface Product {
  id: number;
}

// Реальный объект изображения
class getProductDummyJson implements Product {
  constructor(public id: number) {
    this.id = id;
  }

  async getProduct(): Promise<void> {
    fetch(`https://dummyjson.com/product/${this.id}`)
      .then((response) => response.json())
      .then(console.log);
  }
}

class ProductProxy implements Product {
  private realProduct: getProductDummyJson | null = null;
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  getProduct(): Promise<void> | void {
    if (this.id < 10) {
      this.realProduct = new getProductDummyJson(this.id);
      return this.realProduct.getProduct();
    } else {
      return console.log(
        "ID больше 10, доступ запрещен, введенное значение: ",
        this.id
      );
    }
  }
}

let product1 = new ProductProxy(1);
product1.getProduct();
let product20 = new ProductProxy(20);
product20.getProduct();
