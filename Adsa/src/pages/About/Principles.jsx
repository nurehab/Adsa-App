import React from "react";

const values = [
  {
    icon: "fa-bullseye",
    fTitle: "الجودة أولاً",
    sTitle: "محتوى مدروس ومكتوب بخبرة",
  },
  {
    icon: "fa-bolt",
    fTitle: "تركيز عملي",
    sTitle: "أمثلة واقعية يمكنك تطبيقها اليوم",
  },
  { icon: "fa-handshake", fTitle: "المجتمع", sTitle: "تعلم مع آلاف المصورين" },
  {
    icon: "fa-arrows-rotate",
    fTitle: "دائماً محدث",
    sTitle: "أحدث الاتجاهات وأفضل الممارسات",
  },
];
export default function Principles() {
  return (
    <>
      <section className="py-20 bg-dark-secondary border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <span className="w-1.5 h-8 bg-linear-to-b from-orange-500 to-yellow-500 rounded-full"></span>
              قيمنا
              <span className="w-1.5 h-8 bg-linear-to-b from-yellow-500 to-orange-500 rounded-full"></span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              المبادئ التي توجه كل ما نقوم بإنشائه
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div className="group p-6 bg-dark-card rounded-2xl border border-border hover:border-orange-500/30 transition-all duration-300 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative">
                  <i
                    className={`fa-solid ${value.icon} text-4xl text-orange-500 mb-4 block`}
                  ></i>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {value.fTitle}
                  </h3>

                  <p className="text-neutral-400 text-sm">{value.sTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
