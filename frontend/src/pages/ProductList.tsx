import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { getProductCategories, getProducts } from "../services/product.service";
import type { Category, Product } from "../types/product";
import "./ProductList.css";

type SortOption = "default" | "name-asc" | "price-asc" | "price-desc";
type StockStatus = "all" | "in-stock" | "out-of-stock";

const PAGE_SIZE = 8;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState<StockStatus>("all");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("3000000");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [productData, categoryData] = await Promise.all([
          getProducts(),
          getProductCategories(),
        ]);

        setProducts(Array.isArray(productData) ? productData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu trang sản phẩm:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categoryOptions = useMemo(() => {
    const namesFromDb = categories
      .map((category) => category?.name?.trim())
      .filter((name): name is string => Boolean(name));

    return ["Tất cả", ...namesFromDb];
  }, [categories]);

  const filteredProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.MAX_SAFE_INTEGER;

    const result = products.filter((product) => {
      const categoryName = product.category?.name ?? "Chưa phân loại";
      const stockStatus: Exclude<StockStatus, "all"> =
        product.stock > 0 ? "in-stock" : "out-of-stock";

      const matchesKeyword =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        (product.description ?? "").toLowerCase().includes(keyword) ||
        categoryName.toLowerCase().includes(keyword);

      const matchesCategory =
        selectedCategory === "Tất cả" || categoryName === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" || stockStatus === selectedStatus;

      const matchesPrice = product.price >= min && product.price <= max;

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesStatus &&
        matchesPrice
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
    products,
    searchTerm,
    selectedCategory,
    selectedStatus,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tất cả");
    setSelectedStatus("all");
    setMinPrice("0");
    setMaxPrice("3000000");
    setSortBy("default");
    setVisibleCount(PAGE_SIZE);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="pl-page">
      <title>Khám phá sản phẩm</title>
      <Navbar />

      <main className="pl-shell">
        <section className="pl-banner">
          <div className="pl-banner__left">
            <span className="pl-banner__brand">PCity</span>
            <span className="pl-banner__title">Hotdeal RAM</span>
            <span className="pl-banner__fire">🔥</span>
          </div>

          <button type="button" className="pl-banner__btn">
            Xem ngay
          </button>
        </section>

        <section className="pl-toolbar">
          <div className="pl-toolbar__left">
            <button type="button" className="pl-chip">
              <span className="pl-chip__icon">▽</span>
              Bộ lọc
            </button>

            <select
              className="pl-control pl-control--select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category === "Tất cả" ? "Hãng" : category}
                </option>
              ))}
            </select>

            <select
              className="pl-control pl-control--select"
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

          <div className="pl-toolbar__right">
            <div className="pl-filter-group">
              <span className="pl-label">Giá:</span>

              <input
                type="number"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="pl-control pl-control--input pl-control--price-small"
              />

              <span className="pl-separator">-</span>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                className="pl-control pl-control--input pl-control--price-large"
              />
            </div>

            <div className="pl-filter-group">
              <span className="pl-label">Sắp xếp theo:</span>

              <select
                className="pl-control pl-control--select pl-control--sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setVisibleCount(PAGE_SIZE);
                }}
              >
                <option value="default">Phân loại</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pl-content">
          <aside className="pl-sidebar">
            <div className="pl-sidebar__title">
              <span className="pl-sidebar__icon">▤</span>
              <span>Tất cả danh mục</span>
            </div>

            <div className="pl-sidebar__line" />

            <ul className="pl-sidebar__list">
              {categoryOptions.map((category) => {
                const active = selectedCategory === category;

                return (
                  <li
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`pl-sidebar__item ${active ? "active" : ""}`}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="pl-products">
            {searchTerm && (
              <div className="pl-search">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                />
              </div>
            )}

            {loading ? (
              <div className="pl-empty">
                <div className="pl-empty__title">Đang tải sản phẩm...</div>
              </div>
            ) : visibleProducts.length > 0 ? (
              <>
                <div className="pl-grid">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="pl-grid__item">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <div className="pl-loadmore">
                    <button
                      type="button"
                      className="pl-loadmore__btn"
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="pl-empty">
                <div className="pl-empty__title">
                  Không tìm thấy sản phẩm phù hợp
                </div>
                <div className="pl-empty__desc">
                  Bạn thử đổi bộ lọc hoặc bấm Reset để xem lại toàn bộ sản phẩm.
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="pl-empty__btn"
                >
                  Reset bộ lọc
                </button>
              </div>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}