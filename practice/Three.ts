import { Component, OnInit } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  template:`
  <div>
    <h3>Products</h3>
    <div  *ngFor="let product of products">
      <span>{{product.name}}  --- $ {{product.price}} </span>
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
    <hr>
    <h3>cart Products</h3>
    <div  *ngFor="let item of cartItems">
      <span>{{item.name}}  --- $ {{item.price}} x {{item.quantity}} </span>
      <button (click)="increaseQuantity(item.id)">+</button>
      <button (click)="decreaseQuantity(item.id)">-</button>
      <button (click)="removeFromCart(item.id)">Remove</button>

      </div>
  </div>
`,
  styles: []
})
export class Three implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];

  cartItems: CartItem[] = [];

  ngOnInit() {}

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  increaseQuantity(id: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(id: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else if (item) {
      this.removeFromCart(id);
    }
  }
}
