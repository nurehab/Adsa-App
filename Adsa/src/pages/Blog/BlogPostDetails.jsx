import React from "react";
import { useParams, Link } from "react-router-dom";
import postsData from "../../data/posts.json";

export default function BlogPostDetails() {
  const { slug } = useParams();

  const arabicDateFormatter = new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const relatedPosts = postsData.posts
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const sharePlatforms = [
    {
      name: "X (Twitter)",
      icon: "fa-brands fa-x-twitter",
      hoverBg: "hover:bg-[#1da1f2]",
      action: () => window.open(`https://x.com/iitrybegood`, "_blank"),
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      hoverBg: "hover:bg-[#0077b5]",
      action: () =>
        window.open(
          `https://www.linkedin.com/in/nour-ehab-0887ab371/`,
          "_blank",
        ),
    },
    {
      name: "WhatsApp",
      icon: "fa-brands fa-whatsapp",
      hoverBg: "hover:bg-[#25d366]",
      action: (url, title) =>
        window.open(
          `https://api.whatsapp.com/send?phone=201271082427&text=${encodeURIComponent(`${title}\n${url}`)}`,
          "_blank",
        ),
    },
    {
      name: "Copy Link",
      icon: "fa-solid fa-link",
      hoverBg: "hover:bg-orange-500",
      action: (url) => navigator.clipboard.writeText(url),
    },
  ];

  const formattedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : arabicDateFormatter.format(date);
  };

  const post = postsData.posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 text-white">
        <h2>المقال غير موجود</h2>
        <Link
          to="/blog"
          className="text-orange-500 underline mt-4 inline-block"
        >
          العودة للمقالات
        </Link>
      </div>
    );
  }

  const headings = post.content
    ? post.content
        .split("\n\n")
        .filter((block) => block.startsWith("## "))
        .map((h) => h.replace("## ", "").trim())
    : [];

  const sections = headings.map((title, index) => ({
    id: `section-${index}`,
    title,
  }));

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderContent = () => {
    if (!post.content) return null;

    const blocks = post.content.split("\n\n");
    let currentHeadingIndex = 0;

    return blocks.map((block, index) => {
      if (block.startsWith("## ")) {
        const title = block.replace("## ", "").trim();
        const sectionId = `section-${currentHeadingIndex}`;
        currentHeadingIndex++;

        return (
          <h2
            key={`heading-${index}`}
            id={sectionId}
            className="text-2xl md:text-3xl font-bold text-white mt-14 mb-6 flex items-center gap-4 scroll-mt-28"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-orange-500/10 rounded-xl border border-orange-500/30">
              <i className="fa-solid fa-camera text-orange-500"></i>
            </span>
            {title}
          </h2>
        );
      }

      return (
        <p
          key={`p-${index}`}
          className="text-neutral-300 leading-relaxed mb-6 text-lg"
        >
          {block}
        </p>
      );
    });
  };

  return (
    <>
      <article className="bg-dark min-h-screen">
        <div className="relative h-[60vh] min-h-125 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-dark/30 to-transparent"></div>
          <div className="absolute top-8 right-8 left-8">
            <nav className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-sm border border-white/10">
              <Link
                to={"/"}
                className="text-white/70 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-home"></i>
              </Link>
              <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
              <Link
                className="text-white/70 hover:text-white transition-colors"
                to={"/blog"}
              >
                المدونة
              </Link>
              <i className="fa-solid fa-chevron-left text-white/30 text-xs"></i>
              <span className="text-orange-400 font-medium truncate max-w-50">
                {post.category}
              </span>
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors"
                  to={`/blog?category=${post.category}`}
                >
                  {post.category}
                </Link>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar"></i>
                    {formattedDate(post.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="fa-regular fa-clock"></i>
                    {post.readTime}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="size-14 rounded-full object-cover ring-2 ring-orange-500/50"
                />
                <div>
                  <p className="font-bold text-white">{post.author.name}</p>
                  <p className="text-sm text-white/60">{post.author.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <div className="order-2 lg:order-1">
              <div className="p-6 bg-linear-to-r from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20 mb-10">
                <p className="text-lg text-neutral-200 leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
              <div className="prose-custom">{renderContent()}</div>
              <div className="mt-14 p-6 bg-dark-secondary rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                    <i className="fa-solid fa-tags text-orange-500"></i>
                  </div>
                  <h3 className="font-bold text-white">الوسوم</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span className="px-4 py-2 bg-dark-tertiary text-neutral-400 text-sm rounded-full border border-border hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-6 bg-dark-secondary rounded-2xl border border-border">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                      <i className="fa-solid fa-share-nodes text-orange-500"></i>
                    </div>
                    <h3 className="font-bold text-white">شارك المقال</h3>
                  </div>
                  <div className="flex gap-2">
                    {sharePlatforms.map((platform, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          platform.action(window.location.href, post.title)
                        }
                        aria-label={platform.name}
                        className={`w-11 h-11 bg-dark-tertiary border border-border rounded-xl flex items-center justify-center text-neutral-400 ${platform.hoverBg} hover:text-white hover:border-transparent transition-all duration-300`}
                      >
                        <i className={platform.icon}></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 p-8 bg-linear-to-br from-dark-card to-dark-secondary rounded-2xl border border-border">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="size-24 rounded-2xl object-cover ring-4 ring-orange-500/20"
                  />
                  <div className="text-center sm:text-right flex-1">
                    <span className="text-xs text-orange-500 font-semibold uppercase tracking-wider">
                      كاتب المقال
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {post.author.name}
                    </h3>
                    <p className="text-neutral-500 text-sm mb-3">
                      {post.author.role}
                    </p>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      مصور محترف شغوف بمشاركة المعرفة والخبرات في عالم التصوير
                      الفوتوغرافي.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {sections.length > 0 && (
              <aside className="order-1 lg:order-2">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <div className="p-6 bg-dark-secondary rounded-2xl border border-border">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="size-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/30">
                        <i className="fa-solid fa-list text-orange-500"></i>
                      </div>
                      <h3 className="font-bold text-white">محتويات المقال</h3>
                    </div>

                    <nav className="space-y-2">
                      {sections.map((sec, idx) => (
                        <Link
                          key={sec.id}
                          href={`#${sec.id}`}
                          onClick={(e) => handleScrollToSection(e, sec.id)}
                          className="flex items-center gap-3 p-3 rounded-xl text-neutral-400 hover:text-orange-500 hover:bg-orange-500/5 transition-all duration-300 group cursor-pointer"
                        >
                          <span className="flex items-center justify-center w-6 h-6 bg-dark-tertiary rounded-lg text-xs font-bold text-neutral-500 group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-colors">
                            {idx + 1}
                          </span>
                          <span className="text-sm">{sec.title}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-6 bg-dark-secondary rounded-2xl border border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-dark rounded-xl">
                        <i className="fa-regular fa-clock text-orange-500 text-xl mb-2"></i>
                        <p className="text-white font-bold">{post.readTime}</p>
                        <p className="text-neutral-500 text-xs">وقت القراءة</p>
                      </div>
                      <div className="text-center p-4 bg-dark rounded-xl">
                        <i className="fa-regular fa-calendar text-orange-500 text-xl mb-2"></i>
                        <p className="text-white font-bold text-sm">
                          {new Date(post.date).toLocaleDateString("ar-EG", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                        <p className="text-neutral-500 text-xs">تاريخ النشر</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-linear-to-br from-orange-500/10 to-yellow-500/5 rounded-2xl border border-orange-500/20">
                    <div className="text-center">
                      <div className="size-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-envelope text-orange-500 text-xl"></i>
                      </div>
                      <h3 className="font-bold text-white mb-2">
                        لا تفوّت جديدنا
                      </h3>
                      <p className="text-neutral-400 text-sm mb-4">
                        اشترك للحصول على أحدث المقالات
                      </p>
                      <Link
                        className="block w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors text-center"
                        to={"/blog"}
                      >
                        تصفح المزيد
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
          <div className="mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <span className="size-12 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/30">
                  <i className="fa-solid fa-images text-orange-500 text-xl"></i>
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    مقالات قد تعجبك
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    استكشف المزيد من المحتوى المميز
                  </p>
                </div>
              </div>
              <Link
                className="hidden sm:flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors group"
                to={"/blog"}
              >
                عرض الكل
                <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  className="group relative bg-dark-secondary rounded-2xl overflow-hidden border border-border hover:border-orange-500/30 transition-all duration-500"
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-dark-secondary to-transparent"></div>
                    <span className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                      {relatedPost.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-3">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span className="flex items-center gap-2">
                        <img
                          src={relatedPost.author.avatar}
                          alt={relatedPost.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        {relatedPost.author.name}
                      </span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
