export default function Footer() {
  return (
    <footer className="bg-black text-white px-16 pt-10 pb-5">
      
      <div className="flex justify-between gap-10">
        
        <div className="text-left">
          <h3 className="mb-3 text-lg font-semibold">PCity</h3>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Về PCity</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Kênh Người Bán</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Liên Hệ Truyền Thông</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Chính Sách Bảo Mật</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Điều Khoản PCity</p>
        </div>

        <div className="text-left">
          <h3 className="mb-3 text-lg font-semibold">Dịch vụ khách hàng</h3>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Trung Tâm Trợ Giúp</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Hướng Dẫn Mua Hàng</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Hướng Dẫn Bán Hàng</p>
          <p className="text-sm text-gray-400 hover:text-white cursor-pointer">Liên Hệ PCity</p>
        </div>

        <div className="text-left">
          <h3 className="mb-3 text-lg font-semibold">Theo dõi PCity</h3>
          <p className="text-sm text-gray-400 mb-2">
            Đăng ký để nhận ưu đãi và tin tức
          </p>

          <div className="flex mt-2">
            <input
              placeholder="Email của bạn"
              className="px-3 py-2 bg-gray-200 text-black rounded-l-full outline-none w-52 text-sm"
            />
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-full text-sm">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pt-5 border-t border-gray-800 text-xs text-gray-400">
        © 2026 PCity. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}