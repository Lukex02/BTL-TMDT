import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "../services/mockproduct";
import type { Product } from "../types/product";


type SortOption = "default" | "name-asc" | "price-asc" | "price-desc";
type StockStatus = "all" | "in-stock" | "out-of-stock";

type ProductListItem = Product & {
  uniqueKey: string;
  category: string;
  brand: string;
  stockStatus: Exclude<StockStatus, "all">;
  isHotDeal: boolean;
};

const PAGE_SIZE = 8;

const categories = [
  "Tất cả",
  "Máy Tính & Laptop",
  "Chuột Gaming",
  "Bàn Phím",
  "Keycap",
  "Linh Kiện",
  "Phụ Kiện",
];

const brands = ["Tất cả", "HP", "Dell", "ASUS", "Acer", "Logitech", "Razer"];

const seedData: Array<{
  category: string;
  brand: string;
  stockStatus: "in-stock" | "out-of-stock";
  isHotDeal: boolean;
}> = [
    {
      category: "Máy Tính & Laptop",
      brand: "HP",
      stockStatus: "in-stock",
      isHotDeal: true,
    },
    {
      category: "Máy Tính & Laptop",
      brand: "Dell",
      stockStatus: "in-stock",
      isHotDeal: true,
    },
    {
      category: "Linh Kiện",
      brand: "ASUS",
      stockStatus: "in-stock",
      isHotDeal: true,
    },
    {
      category: "Phụ Kiện",
      brand: "Acer",
      stockStatus: "out-of-stock",
      isHotDeal: false,
    },
    {
      category: "Chuột Gaming",
      brand: "Logitech",
      stockStatus: "in-stock",
      isHotDeal: false,
    },
    {
      category: "Bàn Phím",
      brand: "Razer",
      stockStatus: "in-stock",
      isHotDeal: false,
    },
    {
      category: "Keycap",
      brand: "Razer",
      stockStatus: "out-of-stock",
      isHotDeal: false,
    },
    {
      category: "Máy Tính & Laptop",
      brand: "HP",
      stockStatus: "in-stock",
      isHotDeal: true,
    },
    {
      category: "Linh Kiện",
      brand: "ASUS",
      stockStatus: "in-stock",
      isHotDeal: false,
    },
    {
      category: "Phụ Kiện",
      brand: "Acer",
      stockStatus: "in-stock",
      isHotDeal: false,
    },
    {
      category: "Máy Tính & Laptop",
      brand: "Dell",
      stockStatus: "in-stock",
      isHotDeal: true,
    },
    {
      category: "Chuột Gaming",
      brand: "Logitech",
      stockStatus: "in-stock",
      isHotDeal: false,
    },
  ];

const displayProducts: ProductListItem[] = Array.from({ length: 12 }, (_, index) => {
  const product = mockProducts[index % mockProducts.length];
  const seed = seedData[index % seedData.length];

  return {
    ...product,
    uniqueKey: `${product.id}-${index + 1}`,
    category: seed.category,
    brand: seed.brand,
    stockStatus: seed.stockStatus,
    isHotDeal: seed.isHotDeal,
  };
});

const readNumberParam = (
  value: string | null,
  fallback: string
): string => {
  if (!value || Number.isNaN(Number(value))) return fallback;
  return value;
};

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "Tất cả"
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") ?? "Tất cả"
  );
  const [selectedStatus, setSelectedStatus] = useState<StockStatus>(
    (searchParams.get("status") as StockStatus) ?? "all"
  );
  const [minPrice, setMinPrice] = useState(
    readNumberParam(searchParams.get("min"), "0")
  );
  const [maxPrice, setMaxPrice] = useState(
    readNumberParam(searchParams.get("max"), "30000000")
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "default"
  );
  const [visibleCount, setVisibleCount] = useState(() => {
    const value = Number(searchParams.get("limit"));
    return Number.isNaN(value) || value <= 0 ? PAGE_SIZE : value;
  });
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [hotDealOnly, setHotDealOnly] = useState(searchParams.get("hot") === "1");

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (searchTerm.trim()) nextParams.set("q", searchTerm.trim());
    if (selectedCategory !== "Tất cả") nextParams.set("category", selectedCategory);
    if (selectedBrand !== "Tất cả") nextParams.set("brand", selectedBrand);
    if (selectedStatus !== "all") nextParams.set("status", selectedStatus);
    if (minPrice !== "0") nextParams.set("min", minPrice);
    if (maxPrice !== "30000000") nextParams.set("max", maxPrice);
    if (sortBy !== "default") nextParams.set("sort", sortBy);
    if (visibleCount !== PAGE_SIZE) nextParams.set("limit", String(visibleCount));
    if (hotDealOnly) nextParams.set("hot", "1");

    setSearchParams(nextParams, { replace: true });
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedStatus,
    minPrice,
    maxPrice,
    sortBy,
    visibleCount,
    hotDealOnly,
    setSearchParams,
  ]);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.MAX_SAFE_INTEGER;

    const result = displayProducts.filter((product) => {
      const matchesKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "Tất cả" || product.category === selectedCategory;

      const matchesBrand =
        selectedBrand === "Tất cả" || product.brand === selectedBrand;

      const matchesStatus =
        selectedStatus === "all" || product.stockStatus === selectedStatus;

      const matchesPrice = product.price >= min && product.price <= max;

      const matchesHotDeal = !hotDealOnly || product.isHotDeal;

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesBrand &&
        matchesStatus &&
        matchesPrice &&
        matchesHotDeal
      );
    });

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    selectedStatus,
    minPrice,
    maxPrice,
    sortBy,
    hotDealOnly,
  ]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tất cả");
    setSelectedBrand("Tất cả");
    setSelectedStatus("all");
    setMinPrice("0");
    setMaxPrice("30000000");
    setSortBy("default");
    setVisibleCount(PAGE_SIZE);
    setHotDealOnly(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleAddToCart = (uniqueKey: string) => {
    setCartIds((prev) =>
      prev.includes(uniqueKey)
        ? prev.filter((id) => id !== uniqueKey)
        : [...prev, uniqueKey]
    );
  };

  return (
    <div className="product-list-page">
      <title>Danh sách sản phẩm</title>
      <div className="product-list-shell">
        <div className="product-list-container">
          <Navbar />

          <div className="product-list-toolbar-top">
            <div className="product-list-breadcrumb">
              Trang chủ / Máy tính &amp; Laptop
            </div>

            <div className="product-list-cart-badge">
              Giỏ hàng: <strong>{cartIds.length}</strong>
            </div>
          </div>

          <div className="product-list-banner">
            <div className="product-list-banner-left">
              <span className="product-list-banner-brand">PCity</span>
              <span className="product-list-banner-title">Hotdeal RAM 🔥</span>
            </div>

            <button
              type="button"
              className="product-list-banner-btn"
              onClick={() => {
                setHotDealOnly(true);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              Xem ngay
            </button>
          </div>

          <div className="product-list-search-row">
            <input
              type="text"
              placeholder="Tìm sản phẩm, thương hiệu, danh mục..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="product-list-search-input"
            />

            <button
              type="button"
              className="product-list-reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <div className="product-list-filter-row">
            <div className="product-list-filter-left">
              <div className="product-list-filter-chip">Bộ lọc</div>

              <select
                className="product-list-select"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === "Tất cả" ? "Hãng" : brand}
                  </option>
                ))}
              </select>

              <select
                className="product-list-select"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as StockStatus);
                  setVisibleCount(PAGE_SIZE);
                }}
              >
                <option value="all">Tình trạng</option>
                <option value="in-stock">Còn hàng</option>
                <option value="out-of-stock">Hết hàng</option>
              </select>
            </div>

            <div className="product-list-filter-right">
              <div className="product-list-price-group">
                <span className="product-list-filter-label">Giá:</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                />
                <span className="product-list-price-separator">-</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                />
              </div>

              <div className="product-list-sort-group">
                <span className="product-list-filter-label">Sắp xếp theo:</span>
                <select
                  className="product-list-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setVisibleCount(PAGE_SIZE);
                  }}
                >
                  <option value="default">Mặc định</option>
                  <option value="name-asc">Tên A-Z</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>

          <div className="product-list-active-filters">
            {hotDealOnly && (
              <button
                type="button"
                className="product-list-tag"
                onClick={() => setHotDealOnly(false)}
              >
                Hotdeal ✕
              </button>
            )}
            {selectedCategory !== "Tất cả" && (
              <button
                type="button"
                className="product-list-tag"
                onClick={() => setSelectedCategory("Tất cả")}
              >
                {selectedCategory} ✕
              </button>
            )}
            {selectedBrand !== "Tất cả" && (
              <button
                type="button"
                className="product-list-tag"
                onClick={() => setSelectedBrand("Tất cả")}
              >
                {selectedBrand} ✕
              </button>
            )}
            {selectedStatus !== "all" && (
              <button
                type="button"
                className="product-list-tag"
                onClick={() => setSelectedStatus("all")}
              >
                {selectedStatus === "in-stock" ? "Còn hàng" : "Hết hàng"} ✕
              </button>
            )}
          </div>

          <div className="product-list-main">
            <aside className="product-list-sidebar">
              <div className="product-list-sidebar-title">
                <span className="product-list-sidebar-icon">▤</span>
                <span>Tất cả danh mục</span>
              </div>

              <div className="product-list-sidebar-divider" />

              <ul className="product-list-sidebar-menu">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`product-list-sidebar-item ${selectedCategory === category ? "active" : ""
                      }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </aside>

            <section className="product-list-products">
              <div className="product-list-result-row">
                <div className="product-list-result-text">
                  Hiển thị {visibleProducts.length} / {filteredProducts.length} sản phẩm
                </div>
              </div>

              {visibleProducts.length > 0 ? (
                <div className="product-list-grid">
                  {visibleProducts.map((product) => (
                    <div key={product.uniqueKey} className="product-list-card-wrap">
                      <ProductCard product={product} />

                      <button
                        type="button"
                        className={`product-list-cart-toggle ${cartIds.includes(product.uniqueKey) ? "active" : ""
                          }`}
                        onClick={() => handleAddToCart(product.uniqueKey)}
                      >
                        {cartIds.includes(product.uniqueKey)
                          ? "Đã thêm vào giỏ"
                          : "Thêm vào giỏ"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="product-list-empty">
                  <div className="product-list-empty-title">
                    Không tìm thấy sản phẩm phù hợp
                  </div>
                  <div className="product-list-empty-desc">
                    Bạn thử đổi từ khóa tìm kiếm hoặc bấm Reset để xem lại toàn bộ sản phẩm.
                  </div>
                </div>
              )}

              {hasMore && (
                <div className="product-list-load-more-wrap">
                  <button
                    type="button"
                    className="product-list-load-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  >
                    Xem thêm
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}