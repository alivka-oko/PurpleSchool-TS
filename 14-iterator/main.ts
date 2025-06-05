enum SortMode {
  ID = "id",
  DATE = "date",
  TITLE = "title",
}

enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

interface IItem {
  date: Date;
  title: string;
}

class Item implements IItem {
  id: number;
  constructor(public title: string, public date: Date) {
    this.date = date;
    this.title = title;
  }
}

class ItemList {
  private items: Item[] = [];
  public addItem(item: Item): void {
    item.id = this.items.length + 1;
    this.items.push(item);
  }
  public getItems(): Item[] {
    return this.items;
  }
  public count(): number {
    return this.items.length;
  }
  public sortById(sortDirection: SortDirection) {
    switch (sortDirection) {
      case SortDirection.ASC:
        return this.items.sort((a, b) => a.id - b.id);
      case SortDirection.DESC:
        return this.items.sort((a, b) => b.id - a.id);
    }
  }
  public sortByDate(sortDirection: SortDirection) {
    switch (sortDirection) {
      case SortDirection.ASC:
        return this.items.sort((a, b) => a.id - b.id);
      case SortDirection.DESC:
        return this.items.sort((a, b) => b.id - a.id);
    }
  }
  public sortByTitle(sortDirection: SortDirection) {
    this.items.sort(function (a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (b.title > a.title) {
        return -1;
      }
      return 0;
    });
  }

  public sortByTag(
    sortMode: SortMode = SortMode.ID,
    sortDirection: SortDirection = SortDirection.ASC
  ) {
    if (sortDirection == SortDirection.ASC) {
      this.items.sort(function (a, b) {
        if (a[sortMode] > b[sortMode]) {
          return 1;
        }
        if (b[sortMode] > a[sortMode]) {
          return -1;
        }
        return 0;
      });
    } else {
      this.items.sort(function (a, b) {
        if (a[sortMode] > b[sortMode]) {
          return -1;
        }
        if (b[sortMode] > a[sortMode]) {
          return 1;
        }
        return 0;
      });
    }
  }

  public getIterator(
    sortMode: SortMode = SortMode.ID,
    sortDirection: SortDirection = SortDirection.ASC
  ): PriorityIterator {
    return new PriorityIterator(this, sortMode, sortDirection);
  }
}

interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class PriorityIterator implements IIterator<Item> {
  private position: number = 0;
  private itemList: ItemList;

  constructor(
    item: ItemList,
    sortMode: SortMode,
    sortDirection: SortDirection
  ) {
    item.sortByTag(sortMode, sortDirection);
    this.itemList = item;
  }

  public current(): Item | undefined {
    return this.itemList.getItems()[this.position];
  }

  public next(): Item | undefined {
    this.position++;
    return this.itemList.getItems()[this.position];
  }

  public prev(): Item | undefined {
    this.position--;
    return this.itemList.getItems()[this.position];
  }

  public index(): number {
    return this.position;
  }
}

const itemList = new ItemList();
itemList.addItem(new Item("AItem 1", new Date("2025-05-15")));
itemList.addItem(new Item("CItem 2", new Date("2024-05-16")));
itemList.addItem(new Item("BItem 3", new Date("2023-05-17")));

const iterator = itemList.getIterator(SortMode.TITLE, SortDirection.DESC);
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
