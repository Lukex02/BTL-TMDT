// src/components/Banner.tsx
export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <p className="brand">PCity</p>
        <h1>
          Chợ Linh Kiện Máy Tính & Gaming <br />
          Gear
        </h1>

        <button className="banner-btn">Khám phá thêm</button>
      </div>

      <div className="banner-image">
        <img src="src/assets/laptop.png" alt="banner" className="banner-img" />
      </div>
    </div>
  );
}