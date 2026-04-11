import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold !text-[#008000]">
        Đặt hàng thành công!
      </h2>
      <p className="mt-2 force: text-gray-600">
        Cảm ơn bạn đã mua hàng. Chúng tôi sẽ gửi email xác nhận cho bạn.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}