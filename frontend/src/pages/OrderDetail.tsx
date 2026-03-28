import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Package, CreditCard, Clock, User as UserIcon, ChevronDown } from 'lucide-react';
import { format, parseISO, isValid } from 'date-fns';
import { vi } from 'date-fns/locale';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN') + 'đ';

  const formatDT = (dateStr: any, formatStr: string) => {
    if (!dateStr) return "---";
    let date = parseISO(dateStr);
    if (!isValid(date)) date = new Date(dateStr);
    return isValid(date) ? format(date, formatStr, { locale: vi }) : "---";
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken'); 
        const response = await fetch(`http://localhost:3000/order/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        const data = await response.json();

        const createdAt = data.createdAt || data.items?.[0]?.product?.createdAt || new Date().toISOString();
        
        setOrder({
          ...data,
          status: data.status || 'completed',
          createdAt,
          paymentMethod: data.paymentMethod || "Thanh toán Online",
          shippingFee: data.shippingFee || 120000,
          timeline: [
            { time: createdAt, content: "Đơn hàng thành công", description: "Shipper xác nhận đơn hàng thành công" },
            { time: createdAt, content: "Hàng đặt trên web", description: "" }
          ]
        });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy đơn hàng</div>;

  const subTotal = order.items?.reduce((acc: number, item: any) => acc + (item.unitPrice * item.quantity), 0) || 0;

  return (
    <>
      <Navbar />
      <main className="w-full bg-gray-50 pb-16 pt-8 text-left !text-gray-900 min-h-screen font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Link to="/orders" className="p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-50">
                  <ArrowLeft className="w-5 h-5 !text-gray-700" />
                </Link>
                <div>
                  <p className="text-[11px] !text-gray-400 font-mono mb-1 bg-gray-100 px-2 py-0.5 rounded w-fit">
                    {formatDT(order.createdAt, "dd/MM/yyyy HH:mm")} ——— {formatDT(order.createdAt, "dd/MM/yyyy HH:mm")}
                  </p>
                  <h1 className="text-3xl font-black !text-gray-950 tracking-tighter">DH-PCITY-{order.id}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="border border-gray-200 rounded-lg px-4 py-2 bg-white flex items-center gap-2 shadow-sm">
                  <span className="text-sm font-medium !text-gray-500">Trạng thái:</span>
                  <span className="!text-green-600 font-bold uppercase text-xs tracking-widest">Hoàn thành</span>
                  <ChevronDown className="w-4 h-4 !text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-2/3 space-y-8">
              
              <section className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 rounded-lg"><Package className="w-5 h-5 !text-blue-600" /></div>
                  <h2 className="font-bold text-xl !text-gray-950 tracking-tight">Thông tin đơn hàng</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="!text-gray-400 border-b border-gray-100 uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="pb-4 font-semibold px-2 w-16">#ID</th>
                        <th className="pb-4 font-semibold px-2 text-center">SL</th>
                        <th className="pb-4 font-semibold px-2">Tên linh kiện</th>
                        <th className="pb-4 font-semibold px-2 text-right">Giá tiền x1</th>
                        <th className="pb-4 font-semibold px-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 !text-gray-900">
                      {order.items?.map((item: any) => (
                        <tr key={item.id} className="hover:bg-gray-50/50">
                          <td className="py-5 px-2 !text-gray-400 font-mono">#{item.product?.id.toString().padStart(6, '0')}</td>
                          <td className="py-5 px-2 text-center font-semibold text-base">{item.quantity}</td>
                          <td className="py-5 px-2">
                            <div className="font-bold font-semibold">{item.product?.name}</div>
                            <div className="text-[11px] !text-gray-400 tracking-wider">Shop: {item.product?.seller?.username || 'PCity'}</div>
                          </td>
                          <td className="py-5 px-2 text-right font-semibold text-base">{formatCurrency(item.unitPrice)}</td>
                          <td className="py-5 px-2 text-right font-semibold text-base">{formatCurrency(item.unitPrice * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-6 text-blue-600">
                  <div className="p-2.5 bg-blue-50 rounded-lg"><CreditCard className="w-5 h-5" /></div>
                  <h2 className="font-bold text-xl !text-gray-950 tracking-tight">Thông tin thanh toán</h2>
                </div>
                <div className="space-y-4 text-sm !text-gray-900 font-medium">
                  <div className="flex justify-between items-center py-2">
                    <span className="!text-gray-500">Tổng giá sản phẩm</span>
                    <span className="text-right font-semibold text-base">{formatCurrency(subTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-gray-50">
                    <span className="!text-gray-500">Phí giao hàng</span>
                    <span className="text-right font-semibold text-base">{formatCurrency(order.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-t-2 border-gray-100">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-xl font-bold !text-blue-600">{formatCurrency(subTotal + order.shippingFee)}</span>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-blue-50 rounded-lg"><Clock className="w-5 h-5 !text-blue-600" /></div>
                  <h2 className="font-bold text-xl !text-gray-950 tracking-tight">Timeline</h2>
                </div>
                
                <div className="relative border-l-2 border-gray-100 ml-4 lg:ml-28 space-y-12 pb-2">
                  {order.timeline?.map((evt: any, idx: number) => (
                    <div key={idx} className="relative pl-8">
                      <div className={`absolute w-3.5 h-3.5 rounded-full -left-[9px] top-1 ring-4 ring-white ${idx === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex flex-col">
                           <p className={`font-semibold ${idx === 0 ? '!text-gray-950' : '!text-gray-400'}`}>{evt.content}</p>
                           {evt.description && <p className="text-xs !text-gray-400 mt-1 italic">{evt.description}</p>}
                        </div>
                        <p className="text-[11px] font-mono !text-gray-400 bg-gray-50 px-2 py-1 rounded w-fit">
                           {formatDT(evt.time, "HH:mm aa")}
                        </p>
                      </div>

                      <div className="absolute -left-12 lg:-left-28 top-0 text-right w-10 lg:w-24">
                        <p className="font-black text-xs lg:text-sm !text-gray-900 leading-tight">
                           {formatDT(evt.time, "dd 'Tháng' M")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="w-full lg:w-1/3 sticky top-24">
              <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-50 rounded-lg"><UserIcon className="w-5 h-5 !text-blue-600" /></div>
                    <h2 className="font-bold text-lg !text-gray-950 tracking-tight">Thông tin khách hàng</h2>
                  </div>
                  
                  <div className="space-y-4 text-sm !text-gray-950 font-medium">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
                      <span className="!text-blue-600 text-base">Tên:</span>
                      <span className="font-semibold text-base">{order.user?.username}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
                      <span className="!text-blue-600 text-base">Sđt:</span>
                      <span className="font-semibold text-base">{order.phone || "(Chưa có số)"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
                      <span className="!text-blue-600 text-base">Email:</span>
                      <span className="font-semibold text-base">{order.user?.email || "(Trống)"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
                      <span className="!text-blue-600 text-base">Địa chỉ:</span>
                      <span className="font-semibold text-base text-right">{order.address || "(Chưa có địa chỉ)"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="!text-blue-600 text-base">Phương thức:</span>
                      <span className="font-semibold text-base">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderDetail;