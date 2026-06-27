"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "هل أحتاج أي معرفة تقنية لاستخدام AI TEXT؟",
    a: "لا. الفكرة كلها هي إزالة الحاجز التقني. تجيب على بعض الأسئلة الودية ونولّد لك برومبتات احترافية وعلى مستوى الخبراء — جاهزة تماماً للصق في أي أداة AI.",
  },
  {
    q: "ما هي منصات AI المدعومة؟",
    a: "ندعم ChatGPT و Gemini و Claude و Midjourney و GPT Image و Flux و Veo و Kling و Runway و Leonardo AI — مع التنسيق والنبرة وأفضل الممارسات الخاصة بكل منصة مدمجة في كل مخرجات.",
  },
  {
    q: "ما الفرق بين برومبت أساسي واحترافي وخبير؟",
    a: "الأساسي قصير ومباشر — مثالي للتجارب السريعة. الاحترافي يضيف البنية وتحديد الدور والقيود للاستخدام الإنتاجي. الخبير شامل: يتضمن بروتوكولات التفكير والمخرجات ومعايير القبول والأنماط التي يجب تجنبها.",
  },
  {
    q: "هل يمكنني تعديل أو تحسين البرومبتات بعد التوليد؟",
    a: "بالتأكيد. كل برومبت ملكك. يمكنك النسخ والتعديل والترجمة بين العربية والإنجليزية وإعادة التوليد أو تشغيل مُحسّن AI المدمج 'تحسين' لجولة ثانية.",
  },
  {
    q: "هل بياناتي خاصة؟",
    a: "نعم. جميع الحسابات والبرومبتات والمفضلات تُخزّن محلياً على جهازك افتراضياً. لا نبيع بياناتك. أبداً.",
  },
  {
    q: "هل تقدمون API؟",
    a: "وصول API في خطتنا المستقبلية. حالياً، المنتج قابل للاستخدام بالكامل عبر واجهة الويب.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">الأسئلة الشائعة</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            أسئلة، <span className="text-gradient">بإجابات</span>.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden transition-colors",
                  isOpen ? "border-primary/40 shadow-lg shadow-primary/5" : "border-border"
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-right"
                >
                  <span className="font-semibold text-sm md:text-base">{item.q}</span>
                  <span
                    className={cn(
                      "grid place-items-center h-7 w-7 rounded-full border border-border shrink-0 transition-colors",
                      isOpen && "bg-primary text-primary-foreground border-primary"
                    )}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}