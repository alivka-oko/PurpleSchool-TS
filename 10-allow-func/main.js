"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class User {
    constructor() {
        this.age = 30;
        this.name = "Alex";
    }
}
__decorate([
    allowFunc((a) => a > 0),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
function allowFunc(func) {
    return function (target, propertyKey) {
        let value = undefined;
        const setter = (newValue) => {
            if (func(newValue)) {
                value = newValue;
            }
            else {
                throw new Error(`Недопустимое значение`);
            }
        };
        const getter = () => value;
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
let user = new User();
user.age = 10;
user.age = 5;
console.log(user);
console.log(user.age);
