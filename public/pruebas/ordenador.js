'use strict';

import {Product} from "./product";

export class Ordenador extends Product {
    _ram;
    _procesador;

    constructor(ram, procesador) {
        super('Ordenador', 100);
        this._ram = ram;
        this._procesador = procesador;
    }
}