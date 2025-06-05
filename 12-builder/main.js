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
var TypeRequests;
(function (TypeRequests) {
    TypeRequests["get"] = "GET";
    TypeRequests["post"] = "POST";
})(TypeRequests || (TypeRequests = {}));
class Fetch {
    setUrl(url) {
        if (!url) {
            throw new Error("Неверная ссылка");
        }
        this.url = url;
        return this;
    }
    setMethod(method) {
        if (this.body) {
            throw new Error(" Запрос с GET/HEAD method cannot have body");
        }
        this.method = method;
        return this;
    }
    setBody(body) {
        if (this.method == TypeRequests.get) {
            throw new Error(" Запрос с GET/HEAD method cannot have body");
        }
        this.body = body;
        return this;
    }
    setHeaders(headers) {
        this.headers = headers;
        return this;
    }
    doFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.url === undefined) {
                throw new Error("Ссылка не найдена");
            }
            if (this.method === undefined) {
                throw new Error("Не указан метод");
            }
            let response = yield fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: this.body,
            });
            return response.json();
        });
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.doFetch());
        });
    }
}
try {
    new Fetch()
        .setUrl("https://dummyjson.com/user/login")
        .setMethod(TypeRequests.post)
        .setBody(JSON.stringify({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30, // optional, defaults to 60
    }))
        .setHeaders({ "Content-Type": "application/json" })
        .exec();
    new Fetch()
        .setUrl("https://dummyjson.com/users/1")
        .setMethod(TypeRequests.get)
        .exec();
}
catch (e) {
    if (e instanceof Error) {
        console.log(e.message + ": " + e.stack);
    }
}
