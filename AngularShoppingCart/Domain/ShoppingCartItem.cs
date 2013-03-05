using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngularShoppingCart.Domain
{
    public class ShoppingCartItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
    }
}
