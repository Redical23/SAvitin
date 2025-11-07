import { notFound } from "next/navigation";
import Footer from "../../slidebar/FOOTER";

const products = [
  {
    _id: "1",
    name: "Noise ColorFit Pro 4 Smartwatch",
    category: "Electronics",
    price: 2999,
    originalPrice: 4999,
    discount: true,
    image: "/watch.jpg",
    featured: true,
    rating: 4.5,
    reviews: 328,
    stock: 45,
    badge: "Best Seller",
  },
  {
    _id: "2",
    name: "boAt Rockerz 450 Bluetooth Headphones",
    category: "Audio",
    price: 1599,
    originalPrice: 3490,
    discount: true,
    image: "/headphone.jpg",
    featured: true,
    rating: 4.3,
    reviews: 512,
    stock: 82,
    badge: "Hot Deal",
  },
  {
    _id: "3",
    name: "ASUS Vivobook 15 Laptop (i5 12th Gen)",
    category: "Computers",
    price: 49990,
    originalPrice: 63990,
    discount: true,
    image: "/asusvivobook.jpg",
    featured: true,
    rating: 4.7,
    reviews: 195,
    stock: 12,
    badge: "Limited",
  },
  {
    _id: "4",
    name: "OnePlus Nord CE 3 Lite 5G (8GB RAM, 128GB)",
    category: "Mobiles",
    price: 19999,
    originalPrice: 22999,
    discount: true,
    image: "/h7.jpg",
    featured: true,
    rating: 4.6,
    reviews: 847,
    stock: 156,
    badge: "New",
  },
];

export default function ProductPage({ params }) {
  const product = products.find((item) => item._id === params.id); // ✅ FIXED: use _id

  if (!product) return notFound();

  return (
     <>
    <div className="p-6 flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg w-full md:w-1/2 object-cover"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500 text-lg">{product.category}</p>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </span>
          {product.discount && (
            <span className="line-through text-gray-400 text-lg">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <p className="text-gray-600">
          ⭐ {product.rating} ({product.reviews} reviews)
        </p>

        <p className="text-sm text-gray-500">
          Stock available: {product.stock}
        </p>

        <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full w-fit font-medium">
          {product.badge}
        </span>

        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
    <Footer/>
   
    </>
  );
}
