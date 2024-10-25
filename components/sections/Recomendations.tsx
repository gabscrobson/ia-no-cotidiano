// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Loader, Star } from 'lucide-react'
// import Image from 'next/image'

// const products = [
//   {
//     id: 1,
//     name: 'Tênis Nike Giannis Immortality 4 Masculino',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/029512NDA1.jpg',
//     price: 759.99,
//     categorias: ['Masculino', 'Tênis', 'Basquete', 'Roxo', 'Rosa'],
//   },
//   {
//     id: 2,
//     name: 'Tênis Nike Impact 4 Masculino',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/02425251A8.jpg',
//     price: 446.49,
//     categorias: ['Masculino', 'Tênis', 'Basquete', 'Branco', 'Corrida'],
//   },
//   {
//     id: 3,
//     name: 'Tênis Nike Precision 7 Unissex',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/02898551A20.jpg',
//     price: 549.99,
//     categorias: ['Unissex', 'Tênis', 'Basquete', 'Branco', 'Corrida'],
//   },
//   {
//     id: 4,
//     name: 'Tênis Nike LeBron Witness 8 Masculino',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/027294A1A9.jpg',
//     price: 569.99,
//     categorias: ['Masculino', 'Tênis', 'Basquete', 'Laranja', 'Lebron'],
//   },
//   {
//     id: 5,
//     name: 'Tênis Lebron XX',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/025444NXA10.jpg',
//     price: 949.99,
//     categorias: ['Masculino', 'Tênis', 'Basquete', 'Lebron', 'Verde'],
//   },
//   {
//     id: 6,
//     name: 'Tênis Jordan Stay Loyal 3 Masculino',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/027295IOA8.jpg',
//     price: 645.99,
//     categorias: ['Masculino', 'Tênis', 'Basquete', 'Jordan', 'Preto'],
//   },
//   {
//     id: 7,
//     name: 'Tênis Nike Dunk Infantil',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/02869215A8.jpg',
//     price: 269.99,
//     categorias: ['Infantil', 'Tênis', 'Casual', 'Nike', 'Azul'],
//   },
//   {
//     id: 8,
//     name: 'Tênis Nike Dunk Low Viotech',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/03399952A2.jpg',
//     price: 999.99,
//     categorias: ['Masculino', 'Tênis', 'Casual', 'Nike', 'Roxo'],
//   },
//   {
//     id: 9,
//     name: 'Tênis Nike Killshot 2 Leather Masculino',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/0280005BA6.jpg',
//     price: 399.99,
//     categorias: ['Masculino', 'Tênis', 'Casual', 'Nike', 'Branco'],
//   },
//   {
//     id: 10,
//     name: 'Tênis Nike SB Chron 2 Canvas Unissex',
//     imageUrl: 'https://imgnike-a.akamaihd.net/360x360/0145925BA10.jpg',
//     price: 399.99,
//     categorias: ['Unissex', 'Tênis', 'Casual', 'Nike', 'Bege'],
//   },
// ]

// interface Product {
//   id: number
//   name: string
//   imageUrl: string
//   price: number
//   categorias: string[]
//   purpose?: string
// }

// export default function Recomendations() {
//   const [input, setInput] = useState('')
//   const [currentProducts, setCurrentProducts] = useState(products.slice(0, 3))
//   const [thinking, setThinking] = useState(false)
//   const [suggestedProducts, setSuggestedProducts] = useState([])

//   const filterProducts = (searchTerm: string) => {
//     if (!searchTerm) {
//       return products
//     }
//     return products.filter(
//       (product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.categorias.some((categoria) =>
//           categoria.toLowerCase().includes(searchTerm.toLowerCase()),
//         ),
//     )
//   }

//   const handleSearchClick = async () => {
//     setThinking(true)
//     const filteredProducts = filterProducts(input)
//     setCurrentProducts(filteredProducts)
//     // Simulate AI recommendation process
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     const simulatedSuggestions = filteredProducts
//       .slice(0, 3)
//       .map((product) => ({
//         ...product,
//         purpose: `Recomendado para ${input}`,
//       }))
//     setSuggestedProducts(simulatedSuggestions)
//     setThinking(false)
//   }

//   return (
//     <section className="bg-yellow-500 w-full max-w-3xl mx-auto p-4 rounded-md">
//       <h2 className="text-xl font-semibold text-white mb-4">
//         Recomendações personalizadas
//       </h2>
//       <div className="flex flex-col gap-2 mb-4">
//         <Input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)} // Only update the state
//           placeholder="Qual tênis você procura?"
//           className="bg-yellow-600 border-yellow-400 text-white placeholder:text-yellow-300 focus-visible:ring-white focus-visible:ring-offset-yellow-500"
//         />
//         <Button
//           onClick={handleSearchClick}
//           className="bg-white text-yellow-500 hover:bg-yellow-100 focus-visible:ring-offset-yellow-500"
//         >
//           Pesquisar
//           <Star className="ml-2 h-4 w-4" />
//         </Button>
//       </div>

//       {thinking ? (
//         <div className="p-4 bg-yellow-600 rounded-lg">
//           <p className="text-white flex items-center">
//             <Loader className="animate-spin mr-2" />
//             Estou pensando...
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {(suggestedProducts.length > 0
//             ? suggestedProducts
//             : currentProducts
//           ).map((product) => (
//             <div
//               key={product.id}
//               className="bg-yellow-600 p-4 rounded-lg flex gap-4"
//             >
//               <Image
//                 src={product.imageUrl}
//                 alt={product.name}
//                 height={50}
//                 width={60}
//                 className="rounded-md"
//               />
//               <div>
//                 <h3 className="text-white font-semibold">{product.name}</h3>
//                 <p className="text-yellow-200">R$ {product.price.toFixed(2)}</p>
//                 {product.purpose && (
//                   <p className="text-yellow-100 mt-1">{product.purpose}</p>
//                 )}
//                 {!product.purpose && (
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {product.categorias.map((categoria) => (
//                       <span
//                         key={categoria}
//                         className="bg-yellow-700 text-yellow-100 px-2 py-1 rounded-full text-xs"
//                       >
//                         {categoria}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }
