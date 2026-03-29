export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg text-black font-semibold mb-6 flex items-center gap-2">
              📦 Thông tin mua hàng
            </h2>

            <div className="space-y-4">
              <input className="input" placeholder="Họ và tên" />

              <div className="grid grid-cols-2 gap-4">
                <input className="input" placeholder="Email" />
                <input className="input" placeholder="Số điện thoại" />
              </div>

              <input className="input" placeholder="Địa chỉ" />

              <div className="grid grid-cols-2 gap-4">
                <select className="input">
                  <option>Phường/xã</option>
                </select>
                <select className="input">
                  <option>Quận/huyện</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select className="input">
                  <option>Tỉnh/thành</option>
                </select>
                <input className="input" placeholder="Mã bưu điện (Tự động điền)" />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="appearance-none w-5 h-5 border border-gray-300 rounded bg-white 
             checked:bg-indigo-600 checked:bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/27/White_check.svg')] 
             bg-center bg-no-repeat bg-[length:12px_12px]"/>
                Lưu Thông Tin Này
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg text-black font-semibold mb-6 flex items-center gap-2">
              💳 Phương thức thanh toán
            </h2>

            <div className="flex gap-6 border-b mb-6">
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Thẻ</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Momo</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">Zalopay</button>
              <button className="pb-2 text-gray-500 hocus:border-b-2 hocus:border-indigo-500 hocus:text-indigo-500">...</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium mb-1">Số thẻ</label>
                <input className="input" placeholder="1234 1234 1234 1234" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-left block text-sm font-medium mb-1">Ngày hết hạn</label>
                  <input className="input" placeholder="MM/YY" />
                </div>

                <div>
                  <label className="text-left block text-sm font-medium mb-1">CVC</label>
                  <input className="input" placeholder="CVC" />
                </div>
              </div>

              <div>
                <label className="text-left block text-sm font-medium mb-1">Khác</label>
                <input className="input active:blank" placeholder="..." />
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold mt-4
              hover:from-indigo-600 hover:to-purple-600 transition">
                Hoàn tất
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          
          <div className="flex gap-4 mb-6">
            <div className="relative">
              <img
                src="https://via.placeholder.com/80"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                1
              </span>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-medium">
                Bộ PC Gaming ASUS - ROG - Intel Core i7...
              </h4>
              <p className="text-sm text-gray-500 mt-1">30,000,000 ₫</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              className="input flex-1"
              placeholder="Mã giảm giá"
            />
            <button className="bg-indigo-500 text-white px-4 rounded-lg hover:bg-indigo-600 transition">
              Sử dụng
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>30,000,000 ₫</span>
            </div>

            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>0 ₫</span>
            </div>

            <div className="flex justify-between font-semibold text-base pt-2 border-t">
              <span>Tổng cộng</span>
              <span>30,000,000 ₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};