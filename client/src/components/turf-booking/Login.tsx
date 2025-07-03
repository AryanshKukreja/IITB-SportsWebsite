// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';


// const AdminLoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt with:', email, password);
//     setIsLoggedIn(true);
//   };

//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate('/admin'); // Replace '/target-url' with your desired route
//   };
  

//   const headingStyle = {
//     fontSize: '2.5rem',
//     fontWeight: 'bold',
//     marginBottom: '2rem',
//     backgroundImage: 'linear-gradient(43deg, #c3b5f2 12%, rgb(235, 228, 159) 20%, #3e9df0 100%)',
//     backgroundClip: 'text',
//     WebkitBackgroundClip: 'text',
//     color: 'transparent',
//   };

//   if (isLoggedIn) {
//     return (
//       <div className='page'>
//         <h1 style={headingStyle}>Welcome to Dashboard</h1>
//         <p className="text-white">You have successfully logged in!</p>
//       </div>
//     );
//   }

//   return (
//     <div className='page'>
//       <h1 style={headingStyle}>Admin Login</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             onClick={handleButtonClick}
//           >
//             Sign In
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminLoginPage;