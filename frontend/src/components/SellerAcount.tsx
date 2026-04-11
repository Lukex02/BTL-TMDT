export default function AccountHeader() {
  return (
    <div className="max-w-6xl w-full mx-auto mt-6 px-4">
  <div className="flex items-center gap-5 bg-gray-200 rounded-xl p-5 mb-8">
    
    <div className="ml-5 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-semibold">
      N
    </div>

    
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-black">Nguyễn Văn A</h3>
        <span className="text-blue-500">✔</span>
      </div>

      <div className="mt-2 flex gap-3">
        <button className="px-3 py-1 rounded-full border border-gray-300 bg-white text-sm">
          💬 Chat
        </button>

        <button className="px-4 py-1 rounded-full bg-blue-500 text-white text-sm">
          Theo dõi
        </button>
      </div>
    </div>

    
    <div className="mr-10 grid grid-cols-2 gap-x-20 gap-y-3 text-sm">
  <div className="flex justify-between w-40">
    <p className="text-gray-500">Đánh giá</p>
    <span className="text-blue-500 font-medium">6.7k</span>
  </div>

  <div className="flex justify-between w-40">
    <p className="text-gray-500">Tham gia</p>
    <span className="text-blue-500 font-medium">7 năm trước</span>
  </div>

  <div className="flex justify-between w-40">
    <p className="text-gray-500">Sản phẩm</p>
    <span className="text-blue-500 font-medium">36</span>
  </div>

  <div className="flex justify-between w-40">
    <p className="text-gray-500">Số lượng theo dõi</p>
    <span className="text-blue-500 font-medium">36</span>
  </div>
</div>
  </div>
</div>
  );
}