// types.ts
export interface Beer {
    name: string;
    price: number;
    quantity: number;

  }
  
  export interface Stock {
    last_updated: string;
    beers: Beer[];
  }
  
  export interface OrderItem {
    name: string;
    quantity: number;
  }
  
  export interface Round {
    created: string;
    items: OrderItem[];
  }
  
  export interface Order {
    created: string;
    paid: boolean;
    subtotal: number;
    taxes: number;
    discounts: number;
    rounds: Round[];
  }