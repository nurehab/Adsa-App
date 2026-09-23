import React from "react";

export default function Info() {
  const optmise = [
    { icon: "fa-users", fTitle: "+2مليون", sTitle: "قارئ شهرياً" },
    { icon: "fa-newspaper", fTitle: "+500", sTitle: "مقالة منشورة" },
    { icon: "fa-pen-nib", fTitle: "+50", sTitle: "كاتب خبير" },
    { icon: "fa-book-open", fTitle: "+15", sTitle: "تصنيف" },
  ];

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-dark"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-size-[60px_60px]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label inline-flex items-center gap-2 mb-6">
            <span className="size-2 bg-orange-500 rounded-full animate-pulse"></span>
            من نحن
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            مهمتنا هي
            <span className="gradient-text"> الإعلام والإلهام</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-12">
            مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين
            ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة
            المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {optmise.map((opt) => (
              <div className="glass-card p-6">
                <i
                  className={`fa-solid ${opt.icon} text-2xl text-orange-500 mb-2 block`}
                ></i>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {opt.fTitle}
                </div>
                <div className="text-sm text-neutral-500">{opt.sTitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
