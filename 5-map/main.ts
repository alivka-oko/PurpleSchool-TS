type Bucket = { [key: string]: BucketItem[] };

interface BucketItem {
  key: unknown;
  value: unknown;
}

class MapCopy {
  private bucket: Bucket = {};
  size: number = 0;

  set(key: unknown, value: unknown): void {
    const hash = Hash(key);
    if (!this.bucket[hash]) {
      this.bucket[hash] = [];
    }
    const bucketCell: BucketItem[] = this.bucket[Hash(key)];
    const existingItem = bucketCell.find((item) => item.key === key);
    if (existingItem) {
      existingItem.value = value;
    } else {
      bucketCell.push({ key, value });
      this.size++;
    }
  }

  get(key: unknown): unknown | undefined {
    const bucketCell: BucketItem[] | undefined = this.bucket[Hash(key)];
    if (!bucketCell) {
      return undefined;
    }
    return bucketCell.find((el) => el.key == key)?.value;
  }

  has(key: unknown): boolean {
    const hash = Hash(key);
    const bucketCell = this.bucket[hash];
    if (!bucketCell) {
      return false;
    }
    return this.bucket[hash].some((el: BucketItem) => el.key === key);
  }

  delete(key: unknown): void {
    const hash = Hash(key);
    const BucketCell: BucketItem[] = this.bucket[hash];
    const index = BucketCell.findIndex((el) => el.key === key);
    this.bucket[hash].splice(index, 1);
    if (this.bucket[hash].length === 0) {
      delete this.bucket[hash];
      this.size--;
    }
  }

  clear(): void {
    this.bucket = {};
    this.size = 0;
  }
}

function Hash(x: unknown): string {
  let hash = "";
  if (typeof x == "string") {
    const code = (x.charCodeAt(0) + x.length) % 99;
    hash += "S" + Math.abs(code);
  } else if (typeof x == "object" && x) {
    const ObjectKeysLength = Object.keys(x).length;
    const code =
      ObjectKeysLength > 9
        ? (ObjectKeysLength * (ObjectKeysLength + 1)) % 99
        : ((ObjectKeysLength + 1) * 12 * (ObjectKeysLength + 2)) % 99;
    hash += "O" + Math.abs(code);
  } else if (typeof x == "number") {
    const code =
      (x.toString().charCodeAt(x.toString().length - 1) + x * 3) % 99;
    hash += "N" + Math.abs(code);
  } else {
    const type = typeof x;
    const code = (type.charCodeAt(type.length - 1) + type.length * 5) % 99;
    hash += `${type.toUpperCase().slice(0, 1)}${Math.abs(code)}`;
  }
  return hash;
}

const obj = {
  test: 12,
  test2: [1, 2, 3],
};
const arr = [1, 2, 3];
const value = {
  name: "Привет, мир",
};
const Moskow = "Москва";

let newMap = new MapCopy();
newMap.set(Moskow, 158);
newMap.set(obj, "Объект");
newMap.set(arr, value);

console.log(newMap.size); //3
console.log(newMap.get(obj)); // Объект
console.log(newMap.get(arr)); // {  name: "Привет, мир",};
console.log(newMap.get("123")); // undefined
newMap.delete(obj);
console.log(newMap.size); //2
newMap.clear();
console.log(newMap.size); //0
