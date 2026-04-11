type Category = {
  id: number;
  name: string;
  image: string;
};

const categories: Category[] = [
  {
    id: 1,
    name: "Card đồ họa",
    image: "src/assets/gpu.png",
  },
  {
    id: 2,
    name: "Bàn phím",
    image: "src/assets/keyboard.png",
  },
  {
    id: 3,
    name: "Chuột",
    image: "src/assets/mouse.png",
  },
  {
    id: 4,
    name: "RAM",
    image: "src/assets/ram.png",
  },
  {
    id: 5,
    name: "Ổ cứng",
    image: "src/assets/storage.png",
  },
];

export default function CategoryBar() {
  return (
    <section className="w-full max-w-[1240px] mx-auto py-[24px] grid grid-cols-5 gap-x-[36px] items-start">
      {categories.map((category) => (
        <div
          key={category.id}
          className="w-full min-w-0 flex flex-col items-center justify-start text-center cursor-pointer group"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-[56px] h-[56px] object-contain mb-[12px] transition-transform duration-200 group-hover:scale-105"
          />

          <p className="text-[18px] leading-[1.4] text-slate-400 font-medium transition-colors duration-200 group-hover:text-[#1565c0]">
            {category.name}
          </p>
        </div>
      ))}
    </section>
  );
}