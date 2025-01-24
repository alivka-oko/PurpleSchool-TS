enum TypeRequests {
  get = "GET",
  post = "POST",
}

interface ITypeRequests {
  method: TypeRequests;
}

type IUrl<IsUrl extends string> = IsUrl extends `http://${string}`
  ? IsUrl
  : IsUrl extends `https://${string}`
  ? IsUrl
  : undefined;

class Fetch {
  private url: string | never;
  private method: TypeRequests;
  private body?: BodyInit;
  private headers?: HeadersInit;

  public setUrl<IsUrl extends string>(url: IUrl<IsUrl>): Fetch {
    if (!url) {
      throw new Error("Неверная ссылка");
    }
    this.url = url;
    return this;
  }

  public setMethod(method: TypeRequests): Fetch {
    if (this.body) {
      throw new Error(" Запрос с GET/HEAD method cannot have body");
    }
    this.method = method;
    return this;
  }

  public setBody(body: BodyInit): Fetch {
    if (this.method == TypeRequests.get) {
      throw new Error(" Запрос с GET/HEAD method cannot have body");
    }
    this.body = body;
    return this;
  }

  public setHeaders(headers: HeadersInit): Fetch {
    this.headers = headers;
    return this;
  }

  private async doFetch(): Promise<any> {
    if (this.url === undefined) {
      throw new Error("Ссылка не найдена");
    }
    if (this.method === undefined) {
      throw new Error("Не указан метод");
    }
    let response = await fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    });
    return response.json();
  }

  public async exec(): Promise<void> {
    console.log(await this.doFetch());
  }
}

try {
  new Fetch()
    .setUrl("https://dummyjson.com/user/login")
    .setMethod(TypeRequests.post)
    .setBody(
      JSON.stringify({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30, // optional, defaults to 60
      })
    )
    .setHeaders({ "Content-Type": "application/json" })
    .exec();

  new Fetch()
    .setUrl("https://dummyjson.com/users/1")
    .setMethod(TypeRequests.get)
    .exec();
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log(e.message + ": " + e.stack);
  }
}
