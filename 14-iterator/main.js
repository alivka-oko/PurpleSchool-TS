"use strict";
var SortMode;
(function (SortMode) {
    SortMode["ID"] = "id";
    SortMode["DATE"] = "date";
    SortMode["TITLE"] = "title";
})(SortMode || (SortMode = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
})(SortDirection || (SortDirection = {}));
class Item {
    constructor(title, date) {
        this.title = title;
        this.date = date;
        this.date = date;
        this.title = title;
    }
}
class ItemList {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        item.id = this.items.length + 1;
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }
    count() {
        return this.items.length;
    }
    sortById(sortDirection) {
        switch (sortDirection) {
            case SortDirection.ASC:
                return this.items.sort((a, b) => a.id - b.id);
            case SortDirection.DESC:
                return this.items.sort((a, b) => b.id - a.id);
        }
    }
    sortByDate(sortDirection) {
        switch (sortDirection) {
            case SortDirection.ASC:
                return this.items.sort((a, b) => a.id - b.id);
            case SortDirection.DESC:
                return this.items.sort((a, b) => b.id - a.id);
        }
    }
    sortByTitle(sortDirection) {
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
    sortByTag(sortMode, sortDirection) {
        if ((sortDirection == SortDirection.ASC)) {
            this.items.sort(function (a, b) {
                if (a[sortMode] > b[sortMode]) {
                    return 1;
                }
                if (b[sortMode] > a[sortMode]) {
                    return -1;
                }
                return 0;
            });
        }
        else {
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
    getIterator(sortMode = SortMode.ID, sortDirection = SortDirection.ASC) {
        return new PriorityIterator(this, sortMode, sortDirection);
    }
}
class PriorityIterator {
    constructor(item, sortMode, sortDirection) {
        this.position = 0;
        item.sortByTag(sortMode, sortDirection);
        this.itemList = item;
    }
    current() {
        return this.itemList.getItems()[this.position];
    }
    next() {
        this.position++;
        return this.itemList.getItems()[this.position];
    }
    prev() {
        this.position--;
        return this.itemList.getItems()[this.position];
    }
    index() {
        return this.position;
    }
}
const itemList = new ItemList();
itemList.addItem(new Item("AItem 1", new Date("2025-05-15")));
itemList.addItem(new Item("CItem 2", new Date("2024-05-16")));
itemList.addItem(new Item("BItem 3", new Date("2023-05-17")));
const iterator = itemList.getIterator(SortMode.DATE, SortDirection.ASC);
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
