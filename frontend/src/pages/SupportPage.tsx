import React, { useState } from 'react';
import { 
  ShoppingCart, 
  RefreshCcw, 
  Store, 
  ShieldCheck, 
  Phone, 
  Mail,  
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const SupportPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "Làm sao để đảm bảo an toàn khi mua linh kiện cũ (2nd hand)?",
      answer: "Hệ thống sẽ giữ tiền thanh toán của bạn an toàn cho đến khi bạn nhận được hàng, test thử linh kiện lên nguồn và bấm xác nhận 'Đã nhận hàng'. Tuyệt đối không giao dịch chuyển khoản trực tiếp bên ngoài."
    },
    {
      question: "Tôi nhận được VGA bị lỗi / không đúng mô tả, phải làm sao?",
      answer: "Vui lòng KHÔNG bấm xác nhận đã nhận hàng. Hãy quay video mở hộp (unboxing) và test sản phẩm, sau đó bấm nút 'Yêu cầu Trả hàng/Hoàn tiền' trong mục Đơn mua. Quản trị viên sẽ can thiệp xử lý trong vòng 24h."
    },
    {
      question: "Người bán cần lưu ý gì khi đóng gói gửi linh kiện nhạy cảm?",
      answer: "Với CPU, RAM hoặc VGA, bắt buộc phải bọc màng chống sốc từ 3-5 lớp và đóng trong hộp carton cứng. Nếu linh kiện hỏng hóc do đóng gói sơ sài, người bán sẽ phải chịu trách nhiệm bồi thường."
    },
    {
      question: "Phí vận chuyển và thời gian giao hàng tính như thế nào?",
      answer: "Phí vận chuyển được tính dựa trên kích thước và khối lượng gói hàng (case PC hoặc màn hình sẽ có phí cồng kềnh). Thời gian giao nội tỉnh từ 1-2 ngày, liên tỉnh từ 3-5 ngày."
    }
  ];

  return (
    <main className="w-full bg-white pb-16">
      {/* 1. Hero Section */}
      <section className="w-full bg-[#232323] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400 mb-2 font-medium">PCity Cares</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Trung tâm Hỗ trợ Kỹ thuật</h1>
          <p className="text-gray-300 mb-8 max-w-2xl">
            Giải đáp thắc mắc về đơn hàng, quy trình mua bán linh kiện và xử lý khiếu nại.
          </p>
          
          <div className="flex w-full max-w-2xl bg-white rounded-md overflow-hidden">
            <input 
              type="text" 
              placeholder="Nhập từ khóa (Ví dụ: hoàn tiền, lừa đảo, đóng gói...)" 
              className="flex-1 px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition-colors">
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <ShoppingCart className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Mua hàng</h3>
            <p className="text-sm text-gray-600">Theo dõi đơn hàng và các phương thức thanh toán an toàn.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <RefreshCcw className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Trả hàng & Hoàn tiền</h3>
            <p className="text-sm text-gray-600">Quy trình xử lý khi linh kiện lỗi hoặc sai mô tả.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <Store className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Bán hàng</h3>
            <p className="text-sm text-gray-600">Cách đăng tin chuẩn, định giá đồ cũ và quy chuẩn đóng gói.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <ShieldCheck className="w-10 h-10 mx-auto text-gray-800 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Tài khoản</h3>
            <p className="text-sm text-gray-600">Báo cáo gian lận, bảo mật và quản lý thông tin cá nhân.</p>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Câu hỏi thường gặp</h2>
        <p className="text-gray-600 mb-6">Những vấn đề người dùng thường gặp nhất khi giao dịch linh kiện.</p>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFaqIndex === index && (
                <div className="p-4 bg-white text-gray-600 text-sm border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Liên hệ với Chúng tôi</h2>
          <p className="text-gray-600">Nếu câu hỏi trên chưa giải quyết được vấn đề, hãy liên hệ trực tiếp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <Phone className="w-12 h-12 text-gray-800 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tổng đài Khiếu nại</h3>
            <p className="text-gray-600 text-sm mb-4">
              Hỗ trợ khẩn cấp các vấn đề về lừa đảo hoặc kẹt tiền thanh toán.
            </p>
            <p className="font-bold text-lg text-gray-900">1900 - 1234</p>
            <p className="text-sm text-gray-500">Thứ 2 - Thứ 6 | 9:00 Sáng - 6:00 Chiều</p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <Mail className="w-12 h-12 text-gray-800 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Hỗ trợ qua Email</h3>
            <p className="text-gray-600 text-sm mb-6">
              Gửi email đính kèm hình ảnh/video để chúng tôi xử lý nhanh nhất.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Gửi Email
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SupportPage;