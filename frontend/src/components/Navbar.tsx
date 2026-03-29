export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-16 py-3 bg-gray-100">
      
      {/* Left */}
      <div className="flex gap-8">
        <a className="text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-500 hover:drop-shadow-md transition">
          Trang chủ
        </a>
        <a className="text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-500 hover:drop-shadow-md transition">
          Kênh Người Bán
        </a>
        <a className="text-sm font-bold text-gray-800 cursor-pointer hover:text-blue-500 hover:drop-shadow-md transition">
          Hỗ Trợ
        </a>
      </div>

      {/* Right */}
      <div className="flex gap-5 text-lg">
        <span className="cursor-pointer">🔍</span>
        <span className="cursor-pointer">👤</span>
        <span className="cursor-pointer">🛒</span>
      </div>
    </div>
  );
}