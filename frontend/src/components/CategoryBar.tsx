// src/components/CategoryBar.tsx
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
    <section className="category-bar">
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </section>
  );
}