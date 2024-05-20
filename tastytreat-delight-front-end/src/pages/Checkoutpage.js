import React from 'react';

const cartItems = [
  {
    id: '1',
    productName: 'Chocolate Chip Cookies',
    productPrice: 2.99,
    productImage: 'https://i0.wp.com/www.brownedbutterblondie.com/wp-content/uploads/2023/05/CCC-Cuisinart-IG-BEST-1-scaled.jpg?fit=1834%2C2560&ssl=1',
    quantity: 2
  },
  {
    id: '2',
    productName: 'Vanilla Cupcakes',
    productPrice: 3.49,
    productImage: 'https://www.mybakingaddiction.com/wp-content/uploads/2011/07/unwrapped-vanilla-cupcake-hero.jpg',
    quantity: 1
  },
];

function Checkoutpage() {
  // const totalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-700 mb-4">Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center mb-4 border-b border-gray-300 pb-4">
                    <img src={item.productImage} alt={item.productName} className="w-20 h-20 object-cover rounded mr-4" />
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold">{item.productName}</h2>
                      <p className="text-gray-700">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-gray-900 font-bold">
                      ${ (item.productPrice * item.quantity).toFixed(2) }
                    </div>
                  </div>
                ))}
                <div className="text-right mt-4">
                  {/* <p className="text-xl font-bold">Subtotal: ${totalPrice.toFixed(2)}</p> */}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter your gift card code"
                      className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    />
                    <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded w-full">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 mb-4">Enter your email address. This address will be used to send you order status updates.</p>
            <input
              type="email"
              placeholder="Your email address"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
            <div className="mb-4">
              <input type="checkbox" id="subscribe" className="mr-2" />
              <label htmlFor="subscribe" className="text-gray-700">Keep me up to date on news and exclusive offers</label>
            </div>
            <button className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded w-full mb-4">
              Checkout
            </button>
            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
              🍎Apple Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkoutpage;
