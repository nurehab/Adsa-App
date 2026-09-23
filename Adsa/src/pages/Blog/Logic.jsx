import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import postsData from "../../data/posts.json";

const categories = [
  "جميع المقالات",
  "إضاءة",
  "بورتريه",
  "مناظر طبيعية",
  "تقنيات",
  "معدات",
];

const arabicDateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const formattedDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "" : arabicDateFormatter.format(date);
};

const NextIcon = () => (
  <svg
    className="size-5 rotate-180"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const PrevIcon = () => (
  <svg
    className="size-5 rotate-180"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function Logic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchItem, setSearchItem] = useState("");
  const [selectedCat, setSelectedCat] = useState(
    categoryParam || "جميع المقالات",
  );
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const isFirstRender = useRef(true);
  const itemsPerPage = 6;

  useEffect(() => {
    if (categoryParam) {
      setSelectedCat(categoryParam);
    } else {
      setSelectedCat("جميع المقالات");
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setSelectedCat(cat);
    if (cat === "جميع المقالات") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleClearFilters = () => {
    setSearchItem("");
    handleCategoryChange("جميع المقالات");
  };

  const isFilterActive =
    searchItem.trim() !== "" || selectedCat !== "جميع المقالات";

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCurrentPage(0);
  }, [searchItem, selectedCat]);

  const filteredItems = postsData.posts.filter((post) => {
    const querySearch = searchItem.toLowerCase().trim();

    const matchedSearch =
      querySearch === "" ||
      post.title.toLowerCase().includes(querySearch) ||
      post.category.toLowerCase().includes(querySearch) ||
      post.excerpt.toLowerCase().includes(querySearch) ||
      post.tags.some((tag) => tag.toLowerCase().includes(querySearch));

    const matchedSelected =
      post.category === selectedCat || selectedCat === "جميع المقالات";
    return matchedSearch && matchedSelected;
  });

  const itemsOffset = currentPage * itemsPerPage;
  const endOffset = itemsOffset + itemsPerPage;

  const currentItems = filteredItems.slice(itemsOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <div className="sticky top-20 z-40 bg-dark/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                className="input-dark w-full px-5 py-3 pr-12 rounded-xl"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCat === cat
                      ? "bg-linear-to-r from-orange-500 to-orange-600 text-white"
                      : " bg-dark-card text-neutral-400 border border-border hover:border-orange-500/30"
                  } `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-36.5">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-neutral-400">
            عرض{" "}
            <span className="font-bold text-white">{filteredItems.length}</span>{" "}
            مقالات
            {selectedCat !== "جميع المقالات" && (
              <>
                {" "}
                في{" "}
                <span className="font-bold text-orange-500 capitalize">
                  {selectedCat}
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-xl p-1">
              <button
                onClick={() => setIsGrid(true)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isGrid
                    ? "bg-orange-500 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
                title="عرض شبكي"
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => setIsGrid(false)}
                title="عرض قائمة"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  !isGrid
                    ? "bg-orange-500 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <svg
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
            {isFilterActive && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-neutral-500 hover:text-orange-500 flex items-center gap-1 transition-colors"
              >
                <span>مسح الفلاتر</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <>
            <div
              className={
                isGrid
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              }
            >
              {currentItems.map((item, i) => (
                <React.Fragment key={item.id}>
                  {isGrid ? (
                    <article
                      className="group card overflow-hidden"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <Link className="block" to={`/blog/${item.slug}`}>
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="size-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 bg-dark/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-border-light">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                            <span className="flex items-center gap-1">
                              <svg
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              {item.readTime}
                            </span>
                            <span className="size-1 bg-neutral-600 rounded-full"></span>
                            <span>{formattedDate(item.date)}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.author.avatar}
                                alt={item.author.name}
                                className="size-9 rounded-full object-cover ring-2 ring-border"
                              />
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {item.author.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {item.author.role}
                                </p>
                              </div>
                            </div>
                            <div className="size-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                              <svg
                                className="size-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ) : (
                    <article
                      className="group bg-dark-card rounded-2xl border border-border hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <Link
                        className="flex flex-col md:flex-row"
                        to={`/blog/${item.slug}`}
                      >
                        <div className="relative w-full md:w-72 lg:w-80 h-52 md:h-auto shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-l from-dark-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-center">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full border border-orange-500/20">
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-neutral-500">
                              <svg
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              {item.readTime}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-neutral-500">
                              <svg
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                              {formattedDate(item.date)}
                            </span>
                          </div>
                          <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                            {item.title}
                          </h2>
                          <p className="text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                            {item.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.author.avatar}
                                alt={item.author.name}
                                className="size-10 rounded-full object-cover ring-2 ring-border"
                              />
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  {item.author.name}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {item.author.role}
                                </p>
                              </div>
                            </div>
                            <span className="hidden sm:inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                              اقرأ المقال
                              <svg
                                className="size-5 rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  )}
                </React.Fragment>
              ))}
            </div>

            {pageCount > 1 && (
              <div className="flex flex-col items-center mt-12 select-none">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 0}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      currentPage === 0
                        ? "bg-dark border-border text-neutral-600 cursor-not-allowed"
                        : "bg-dark-card border-border text-white hover:border-orange-500/50 hover:bg-dark-tertiary cursor-pointer"
                    }`}
                  >
                    <NextIcon />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: pageCount }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`min-w-11 h-11 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                          currentPage === index
                            ? "bg-linear-to-r from-orange-500 to-orange-600 text-white"
                            : "bg-dark-card text-neutral-400 border border-border hover:border-orange-500/50 hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === pageCount - 1}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      currentPage === pageCount - 1
                        ? "bg-dark border-border text-neutral-600 cursor-not-allowed"
                        : "bg-dark-card border-border text-white hover:border-orange-500/50 hover:bg-dark-tertiary cursor-pointer"
                    }`}
                  >
                    <PrevIcon />
                  </button>
                </div>

                <p className="text-center text-neutral-500 mt-4 text-sm">
                  صفحة {currentPage + 1} من {pageCount}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="size-24 bg-dark-card border border-border rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="size-12 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              لا توجد مقالات
            </h3>
            <p className="text-neutral-400 mb-6">
              حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.
            </p>
            <button
              className="btn-primary inline-flex items-center gap-2"
              onClick={handleClearFilters}
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </>
  );
}
