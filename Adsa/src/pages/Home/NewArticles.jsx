import React from "react";
import { Link } from "react-router-dom";
import postsData from "../../data/posts.json";

export default function NewArticles() {
  return (
    <>
      <section className="py-24 bg-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-orange-500/5 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="section-label mb-4">
                <span className="relative flex w-2 h-2 ml-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-orange-500"></span>
                </span>
                الأحدث
              </span>
              <h2 className="section-title text-white">أحدث المقالات</h2>
              <p className="section-subtitle max-w-lg">
                محتوى جديد طازج من المطبعة
              </p>
            </div>

            <Link
              className="group inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors"
              to="/blog"
            >
              <span>عرض جميع المقالات</span>
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180"
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
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsData.posts.slice(3, 6).map((post, i) => (
              <article
                key={post.slug || i}
                className="group card overflow-hidden rounded-2xl bg-dark-card border border-border"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link className="block" to={`blog/${post.slug}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-dark/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-border-light">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span className="flex items-center gap-1">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        {post.readTime}
                      </span>
                      <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
                      <span>
                        {new Date(post.date).toLocaleDateString("ar-EG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-neutral-400 mb-5 line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 border border-orange-500/20 group-hover:border-transparent">
                        <svg
                          className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300 rotate-180"
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
