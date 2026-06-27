"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "AI TEXT هي الأداة الوحيدة التي تحوّل أفكاري الضبابية باستمرار إلى برومبتات تعمل فعلياً في Midjourney. مخرجات مستوى الخبراء لا تصدق.",
    name: "سارة ك.",
    role: "مديرة إبداعية، استوديو نوفا",
    avatar: "س",
    color: "from-pink-500 to-rose-500",
  },
  {
    quote: "شحنت ثلاث صفحات هبوط هذا الأسبوع بدأت كبرومبتات من AI TEXT. التنسيق المحسّن لـ ChatGPT أسرع بعشر مرات من الكتابة من الصفر.",
    name: "دانيال م.",
    role: "مؤسس مستقل",
    avatar: "د",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote: "كمسوّق غير تقني، فتح لي AI TEXT فئة كاملة من العمل. أستطيع الآن إعطاء المصممين برومبتات سيستخدمونها فعلاً.",
    name: "لينا أ.",
    role: "رئيسة النمو، نورثويند",
    avatar: "ل",
    color: "from-emerald-500 to-teal-500",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">محبوب من المبدعين</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            ماذا <span className="text-gradient">يقول الناس</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-shadow relative"
            >
              <Quote className="absolute top-5 left-5 h-7 w-7 text-primary/15" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed mb-5">"{t.quote}"</blockquote>
              <figcaption className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color} grid place-items-center text-white font-semibold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}