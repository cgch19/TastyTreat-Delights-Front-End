import React from 'react';
import { Link } from 'react-router-dom';

const presetTreats = [
  {
    id: '1',
    productName: 'Chocolate Chip Cookies',
    productDescription: 'Classic chocolate chip cookies made with premium chocolate chips.',
    productPrice: 2.99,
    productImage: 'https://i0.wp.com/www.brownedbutterblondie.com/wp-content/uploads/2023/05/CCC-Cuisinart-IG-BEST-1-scaled.jpg?fit=1834%2C2560&ssl=1'
  },
  {
    id: '2',
    productName: 'Vanilla Cupcakes',
    productDescription: 'Soft and fluffy vanilla cupcakes topped with creamy vanilla frosting.',
    productPrice: 3.49,
    productImage: 'https://www.mybakingaddiction.com/wp-content/uploads/2011/07/unwrapped-vanilla-cupcake-hero.jpg'
  },
  {
    id: '3',
    productName: 'Brownie Delight',
    productDescription: 'Rich and decadent brownies loaded with chunks of chocolate.',
    productPrice: 4.99,
    productImage: 'https://www.persnicketyplates.com/wp-content/uploads/2022/04/strawberry-brownie-delight10-681x1024.jpg'
  },
  {
    id: '4',
    productName: 'Strawberry Shortcake',
    productDescription: 'Delicious strawberry shortcake with fresh strawberries and whipped cream.',
    productPrice: 5.99,
    productImage: 'https://sugarandsparrow.s3.us-west-2.amazonaws.com/flour/wp-content/uploads/2022/06/18202010/Strawberry-Shortcake-Layer-Cake-Header.jpeg'
  },
  {
    id: '5',
    productName: 'Blueberry Muffins',
    productDescription: 'Moist and tender blueberry muffins bursting with juicy blueberries.',
    productPrice: 3.99,
    productImage: 'https://www.inspiredtaste.net/wp-content/uploads/2023/11/Easy-Blueberry-Muffin-Recipe-Video.jpg'
  },
  {
    id: '6',
    productName: 'Lemon Bars',
    productDescription: 'Tangy and sweet lemon bars with a buttery shortbread crust.',
    productPrice: 4.49,
    productImage: 'https://www.onceuponachef.com/images/2019/04/Luscious-Lemon-Bars.jpg'
  },
  {
    id: '7',
    productName: 'Caramel Brownies',
    productDescription: 'Decadent caramel brownies with a gooey caramel center.',
    productPrice: 6.49,
    productImage: 'https://www.recipetineats.com/wp-content/uploads/2015/08/Salted-Caramel-Stuffed-Brownies_7a-SQ.jpg'
  },
  {
    id: '8',
    productName: 'Red Velvet Cake',
    productDescription: 'Classic red velvet cake with cream cheese frosting.',
    productPrice: 7.99,
    productImage: 'https://preppykitchen.com/wp-content/uploads/2022/07/Red-Velvet-Recipe-Card-1a.jpg'
  },
];

const ProductCatalog = ({ products, deleteProduct }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {presetTreats.map(preset => (
          <div key={preset.id} className="border border-gray-300 rounded-md p-4 shadow-md">
            <img src={preset.productImage} alt={preset.productName} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{preset.productName}</h2>
            <p className="text-gray-700 mb-2">{preset.productDescription}</p>
            <p className="text-gray-900 font-bold mb-4">${preset.productPrice.toFixed(2)}</p>
            <Link to="/checkout">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                Add to Cart
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
