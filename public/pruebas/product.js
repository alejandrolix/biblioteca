'use strict';

export class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }

    getDiscount(discount) {
        this.totalDisc = (this._price * discount) / 100;

        return this._price - this.totalDisc;
    }

    getTitle() {
        return this.title;
    }

    static getStoreName() {
        return 'Nombre de la tienda';
    }
}