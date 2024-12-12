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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function getUsersArray() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://dummyjson.com/users");
            const dataUsers = response.data.users;
            return dataUsers;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.error(`Неизвестная ошибка: ${error}`);
            }
            return [];
        }
    });
}
function outputUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const usersArray = yield getUsersArray();
        usersArray.forEach((user) => {
            console.log(`Имя: ${user.firstName}, Пол: ${user.gender}, Email: ${user.email}, Группа крови: ${user.bloodGroup}`);
        });
    });
}
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_POSITIVE"] = "A+";
    BloodGroup["A_NEGATIVE"] = "A-";
    BloodGroup["B_POSITIVE"] = "B+";
    BloodGroup["B_NEGATIVE"] = "B-";
    BloodGroup["AB_POSITIVE"] = "AB+";
    BloodGroup["AB_NEGATIVE"] = "AB-";
    BloodGroup["O_POSITIVE"] = "O+";
    BloodGroup["O_NEGATIVE"] = "O-";
})(BloodGroup || (BloodGroup = {}));
var EyeColor;
(function (EyeColor) {
    EyeColor["Brown"] = "Brown";
    EyeColor["Amber"] = "Amber";
    EyeColor["Blue"] = "Blue";
    EyeColor["Red"] = "Red";
    EyeColor["Green"] = "Green";
    EyeColor["Violet"] = "Violet";
    EyeColor["Hazel"] = "Hazel";
})(EyeColor || (EyeColor = {}));
var HairType;
(function (HairType) {
    HairType["Straight"] = "Straight";
    HairType["Wavy"] = "Wavy";
    HairType["Curly"] = "Curly";
    HairType["Kinky"] = "Kinky";
})(HairType || (HairType = {}));
var HairColor;
(function (HairColor) {
    HairColor["Brown"] = "Brown";
    HairColor["White"] = "White";
    HairColor["Blonde"] = "Blonde";
    HairColor["Purple"] = "Purple";
    HairColor["Red"] = "Red";
    HairColor["Green"] = "Green";
})(HairColor || (HairColor = {}));
var UsersRole;
(function (UsersRole) {
    UsersRole["admin"] = "admin";
    UsersRole["moderator"] = "moderator";
    UsersRole["user"] = "user";
})(UsersRole || (UsersRole = {}));
outputUsers();
