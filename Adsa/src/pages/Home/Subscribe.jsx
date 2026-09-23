import React from "react";
import postsData from "../../data/posts.json";

export default function Subscribe() {
  return (
    <>
      <section className="py-24 relative overflow-hidden bg-dark">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-card rounded-3xl border border-border p-8 md:p-12 lg:p-16 text-center">
            <div className="size-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="size-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              اشترك في
              <span className="gradient-text"> نشرتنا الإخبارية</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
              احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك
              الإلكتروني
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-5 py-4 rounded-xl bg-dark border border-border focus:outline-none focus:border-orange-500/50 text-white placeholder-neutral-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
              >
                اشترك الآن
              </button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2 space-x-reverse">
                  {postsData.posts.slice(0, 3).map((post) => (
                    <img
                      src={post.author.avatar}
                      className="size-8 rounded-full border-2 border-dark-card"
                      alt={post.author.name}
                    />
                  ))}
                </div>
                <span>
                  انضم لـ
                  <span className="text-white font-medium">+10,000</span>
                  مصور
                </span>
              </div>
              <span className="hidden sm:inline text-border">•</span>
              <span>بدون إزعاج</span>
              <span className="hidden sm:inline text-border">•</span>
              <span>إلغاء الاشتراك في أي وقت</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
