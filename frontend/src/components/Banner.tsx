export default function Banner() {
  return (
    <div className="flex justify-between items-center px-[150px] py-[50px] bg-gradient-to-r from-[#2b2b2b] to-[#1f1f1f] text-white">
      
      <div className="text-left max-w-[500px]">
        <p className="text-[20px] mb-[10px]">PCity</p>

        <h1 className="text-[32px] leading-[1.3] mb-[20px]">
          Chợ Linh Kiện Máy Tính & Gaming <br />
          Gear
        </h1>

        <button className="px-[20px] py-[10px] rounded-[20px] bg-[#1e88e5] hover:bg-[#1565c0] transition duration-200">
          Khám phá thêm
        </button>
      </div>

      <div className="flex justify-center items-center">
        <img
          src="src/assets/laptop.png"
          alt="banner"
          className="w-[400px] object-contain"
        />
      </div>
    </div>
  );
}