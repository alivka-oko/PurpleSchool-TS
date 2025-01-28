"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Реальный объект изображения
class getProductDummyJson {
    constructor(id) {
        this.id = id;
        this.id = id;
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`https://dummyjson.com/product/${this.id}`)
                .then((response) => response.json())
                .then(console.log);
        });
    }
}
class ProductProxy {
    constructor(id) {
        this.realProduct = null;
        this.id = id;
    }
    getProduct() {
        if (this.id < 10) {
            this.realProduct = new getProductDummyJson(this.id);
            return this.realProduct.getProduct();
        }
        else {
            return console.log("ID больше 10, доступ запрещен, введенное значение: ", this.id);
        }
    }
}
let product1 = new ProductProxy(1);
product1.getProduct();
let product20 = new ProductProxy(20);
product20.getProduct();
