import {Product} from "./product";
import {Ordenador} from "./ordenador";

let p = new Product('Product', 50);

console.log(p);
console.log(p.getDiscount(20));

let o = new Ordenador('8 GB', 'i7');
console.log(o.getTitle());

console.log(Product.getStoreName());