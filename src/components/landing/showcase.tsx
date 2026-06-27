"use client";
import { motion } from "framer-motion";
import { Copy, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EXAMPLES = [
  {
    title: "بورتريه سينمائي",
    platform: "Midjourney",
    color: "from-purple-500 to-pink-500",
    prompt: "بحار متجعد يقف على رصيف ميناء ضبابي عند الفجر، تجاعيد عميقة، سترة عليها بقع ملح، إضاءة خلفية ذهبية ناعمة، عمق ميدان سينمائي، مصور بـ 35mm، 8K، واقعي تصويري --ar 16:9 --v 6 --style raw",
  },
  {
    title: "صفحة هبوط SaaS",
    platform: "ChatGPT",
    color: "from-blue-500 to-cyan-500",
    prompt: "صمم صفحة هبوط حديثة وبسيطة لتطبيق ملاحظات AI يستهدف الطلاب. الأقسام: هيرو بتدرج متحرك، شبكة ميزات من 6، تسعير بثلاث فئات، أسئلة شائعة، فوتر. الأسلوب: زجاجي بحركة خفيفة. الألوان: نيلي + أبيض. المخرجات: HTML كامل + Tailwind.",
  },
  {
    title: "فيديو إطلاق منتج",
    platform: "Veo",
    color: "from-rose-500 to-red-500",
    prompt: "فيديو 30 ثانية لإطلاق زجاجة ماء ذكية. لقطة درون دائرية فوق بحيرة جبلية ضبابية عند الشروق، لقطة قريبة ل قطرات تكثف، يد ترفع الزجاجة، صب بالحركة البطيئة، كشف الشعار في النهاية. الموسيقى: إلكترونية محيطية.",
  },
];

export function Showcase() {
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
          <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">نماذج</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">برومبتات حقيقية.</span> نتائج حقيقية.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            مولّدة في أقل من 10 ثوانٍ باستخدام AI TEXT.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {EXAMPLES.map((ex, i) => (
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className={`h-32 bg-gradient-to-br ${ex.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                <Sparkles className="absolute top-4 left-4 h-6 w-6 text-white/90" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{ex.title}</h3>
                  <Badge variant="outline" className="text-[10px]">{ex.platform}</Badge>
                </div>
                <pre className="text-xs leading-relaxed text-muted-foreground font-mono whitespace-pre-wrap break-words max-h-40 overflow-hidden" dir="ltr">
                  {ex.prompt}
                </pre>
                <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="h-3.5 w-3.5" /> نسخ
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}