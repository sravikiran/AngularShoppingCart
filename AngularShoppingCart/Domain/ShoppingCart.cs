using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngularShoppingCart.Domain
{
    public class ShoppingCart
    {
        static List<ShoppingCartItem> cartItems;

        static ShoppingCart()
        {
            cartItems = new List<ShoppingCartItem>()
            {
                new ShoppingCartItem(){ID=1,Name="Soap",Price=25,Quantity=5},
                new ShoppingCartItem(){ID=2,Name="Shaving cream",Price=30,Quantity=15},
                new ShoppingCartItem(){ID=3,Name="Shampoo",Price=100,Quantity=5}
            };
        }

        public void AddCartItem(ShoppingCartItem item)
        {
            int nextID = cartItems.Max(sci => sci.ID) + 1;
            item.ID = nextID;
            cartItems.Add(item);
        }

        public IEnumerable<ShoppingCartItem> GetAllItems()
        {
            return cartItems;
        }

        public void RemoveItem(int id)
        {
            cartItems.RemoveAll(sci => sci.ID == id);
        }
    }
}
