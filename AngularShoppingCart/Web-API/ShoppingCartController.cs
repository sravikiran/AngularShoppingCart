using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularShoppingCart.Domain;

namespace AngularShoppingCart.Web_API
{
    public class ShoppingCartController : ApiController
    {
        ShoppingCart cart;

        public ShoppingCartController()
        {
            cart = new ShoppingCart();
        }

        // GET api/<controller>
        public IEnumerable<ShoppingCartItem> Get()
        {
            return cart.GetAllItems();
        }

        // POST api/<controller>
        public void Post(ShoppingCartItem item)
        {
            cart.AddCartItem(item);
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int id)
        {
            cart.RemoveItem(id);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }

}