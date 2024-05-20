import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Yourtreats = ({ products }) => {
  const [treats, setTreats] = useState([]);

  useEffect(() => {
    if (products) {
      setTreats(products);
    }
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="absolute top-0 right-0 mt-8 mr-8">
        <Link to="/add-product">
          <button className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
            Add Treats
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Your Treats</h1>
      <div className="mt-8">
        {treats.length === 0 ? (
          <p>No treats added yet.</p>
        ) : (
          <ul>
            {treats.map((treat, index) => (
              <li key={index} className="mb-4">
                <div className="bg-white shadow-md rounded p-4">
                  <h3 className="text-xl font-bold">{treat.productName}</h3>
                  <p>{treat.productDescription}</p>
                  <p>Price: ${treat.productPrice}</p>
                  {treat.productImage && (
                    <img src={treat.productImage} alt={treat.productName} className="w-full h-auto object-cover rounded"/>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Yourtreats;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const presetTreats = [
//   {
//     id: 1,
//     productName: 'Chocolate Cake',
//     productDescription: 'Delicious chocolate cake with rich chocolate frosting.',
//     productPrice: 20.99,
//     productImage: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg'
//   },
//   {
//     id: 2,
//     productName: 'Strawberry Cheesecake',
//     productDescription: 'Creamy cheesecake topped with fresh strawberries.',
//     productPrice: 15.99,
//     productImage: 'https://sugarandsparrow.s3.us-west-2.amazonaws.com/flour/wp-content/uploads/2022/06/18202010/Strawberry-Shortcake-Layer-Cake-Header.jpeg'
//   },
//   {
//     id: 3,
//     productName: 'Vanilla Cupcake',
//     productDescription: 'Soft and moist vanilla cupcakes with buttercream frosting.',
//     productPrice: 2.99,
//     productImage: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg'
//   }
// ];

// const YourTreats = ({ products }) => {
//   const [treats, setTreats] = useState(presetTreats);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTreats(products.length ? products : presetTreats);
//   }, [products]);

//   const handleDetailsClick = (id) => {
//     navigate(`/product-detail/${id}`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Your Treats</h1>
//         <Link to="/add-product">
//           <button className="bg-rose-900 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded">
//             Add Treats
//           </button>
//         </Link>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {treats.length === 0 ? (
//           <p>No treats added yet.</p>
//         ) : (
//           treats.map((treat) => (
//             <div key={treat.id} className="bg-white shadow-md rounded p-4 flex flex-col items-center">
//               <div className="w-full h-48 mb-4">
//                 {treat.productImage && (
//                   <img 
//                     src={treat.productImage} 
//                     alt={treat.productName} 
//                     className="w-full h-full object-cover rounded"
//                   />
//                 )}
//               </div>
//               <h3 className="text-xl font-bold mb-2">{treat.productName}</h3>
//               <p className="mb-2">{treat.productDescription}</p>
//               <p className="text-lg font-semibold mb-4">Price: ${treat.productPrice.toFixed(2)}</p>
//               <button 
//                 onClick={() => handleDetailsClick(treat.id)} 
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
//               >
//                 Details
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default YourTreats;
