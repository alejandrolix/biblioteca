export class Autor {
    _codigo;
    _nombre;

    constructor() {
        this._codigo = null;
        this._nombre = null;
    }

    get codigo() {
        return this._codigo;
    }

    set codigo(value) {
        this._codigo = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }
}