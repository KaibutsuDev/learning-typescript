"use client";

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

type CartItem = Product & { quantity: number };

export function CartSolution() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
     setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-900 dark:text-zinc-100">
      
      {/* Product List */}
      <div className="space-y-3">
        <h4 className="font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2">Products</h4>
        {[
            { id: 1, name: 'Laptop', price: 999 },
            { id: 2, name: 'Mouse', price: 29 },
            { id: 3, name: 'Keyboard', price: 59 },
        ].map(p => (
            <button 
                key={p.id}
                onClick={() => addToCart(p)} 
                className="w-full flex justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm bg-white dark:bg-zinc-900"
            >
                <span>{p.name}</span>
                <span className="font-mono text-zinc-500">${p.price}</span>
            </button>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="space-y-3">
        <h4 className="font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2 flex justify-between">
            <span>Cart</span>
            <span>${total}</span>
        </h4>
        {cart.length === 0 && <p className="text-zinc-400 text-sm italic py-2">Cart is empty</p>}
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded">
                <div>
                   <span className="font-semibold block">{item.name}</span>
                   <span className="text-xs text-zinc-500">${item.price} x {item.quantity}</span>
                </div>
                <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                >
                    &times;
                </button>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
