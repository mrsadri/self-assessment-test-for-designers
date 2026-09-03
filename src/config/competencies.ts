import type { Competency } from '@/types';

/** The 15 competencies, 4 clusters. See docs/01 section 1. */
export const COMPETENCIES: readonly Competency[] = [
  // Clarity & Trust
  {
    id: 'complexity-translation', cluster: 'clarity-trust',
    en: 'Complexity Translation', fa: 'ساده‌سازی منطق و پیچیدگی',
    faShort: 'تبدیل منطق پیچیده‌ی محصول به تجربه‌ای که کاربر بدون توضیح می‌فهمد',
    foldedFacets: ['information-architecture'],
  },
  {
    id: 'problem-definition', cluster: 'clarity-trust',
    en: 'Problem Definition', fa: 'تعریف مسئله',
    faShort: 'تشخیص مسئله‌ی واقعی پشت یک درخواست و چارچوب‌بندی آن پیش از طراحی',
  },
  {
    id: 'strategic-alignment', cluster: 'clarity-trust',
    en: 'Alignment / Strategic Alignment', fa: 'هم‌سویی استراتژیک',
    faShort: 'هم‌سو کردن کار طراحی با اهداف بیزنس و roadmap فراتر از تیم خودش',
  },
  // Insight & Data
  {
    id: 'product-thinking', cluster: 'insight-data',
    en: 'Product Thinking', fa: 'تفکر محصولی',
    faShort: 'درک عمیق محصول، مدل درآمد آن و جایگاهش در بازار',
  },
  {
    id: 'evidence-based-design', cluster: 'insight-data',
    en: 'Evidence-Based Design', fa: 'طراحی مبتنی بر شواهد',
    faShort: 'ساختن و استفاده از شواهد رفتاری برای اعتبارسنجی طرح، نه فقط پیدا کردن تاییدیه',
  },
  {
    id: 'discovery-execution', cluster: 'insight-data',
    en: 'Discovery Execution', fa: 'اجرای فرایند کشف',
    faShort: 'انتخاب و اجرای روش درست تحقیق برای مسئله‌ای که روی میز است',
  },
  {
    id: 'solution-accountability', cluster: 'insight-data',
    en: 'Solution Accountability', fa: 'مسئولیت‌پذیری در برابر راهکار',
    faShort: 'پیگیری عملکرد طرح بعد از انتشار و مسئولیت‌پذیری در برابر نتیجه‌ی واقعی آن',
  },
  // Consistency & Excellence
  {
    id: 'craftsmanship', cluster: 'consistency-excellence',
    en: 'Craftsmanship', fa: 'استادی در اجرا',
    faShort: 'کیفیت اجرای بصری و تعاملی، از سلسله‌مراتب و state ها تا متن و دسترس‌پذیری',
    foldedFacets: ['technical-writing', 'accessibility'],
  },
  {
    id: 'system-stewardship', cluster: 'consistency-excellence',
    en: 'System Stewardship', fa: 'پاسداری از سیستم',
    faShort: 'نگه‌داری و رشد Design System به شکلی منظم، قابل اتکا و هم‌تراز با کد',
  },
  {
    id: 'shipping-design', cluster: 'consistency-excellence',
    en: 'Shipping Design', fa: 'نهایی‌سازی و انتشار',
    faShort: 'تحویل تمیز و بدون افت کیفیت کار طراحی به Engineering تا انتشار نهایی',
  },
  {
    id: 'technical-velocity', cluster: 'consistency-excellence',
    en: 'Technical Velocity', fa: 'سرعت فنی و هوش مصنوعی',
    faShort: 'استفاده از AI و دانش فنی برای سریع‌تر و دقیق‌تر جلو بردن کار طراحی',
  },
  // Growth & Ownership
  {
    id: 'chapter-contribution', cluster: 'growth-ownership',
    en: 'Chapter Contribution', fa: 'مشارکت در چپتر دیزاین',
    faShort: 'مشارکت در بهتر شدن فرایند، دانش مشترک و آیین‌های تیم طراحی، فراتر از پروژه‌های خودش',
  },
  {
    id: 'learning-growth', cluster: 'growth-ownership',
    en: 'Learning & Growth', fa: 'یادگیری و رشد',
    faShort: 'یادگیری فعال و هدفمند برای رشد مهارتی خودش و انتقال آن به تیم',
  },
  {
    id: 'adaptability', cluster: 'growth-ownership',
    en: 'Adaptability', fa: 'سازگاری',
    faShort: 'حفظ کیفیت کار و آرامش تیم وقتی اولویت‌ها یا جهت پروژه ناگهان عوض می‌شود',
  },
  {
    id: 'mentorship', cluster: 'growth-ownership',
    en: 'Mentorship', fa: 'مربی‌گری و انتقال دانش',
    faShort: 'انتقال دانش و بازخورد سازنده به بقیه‌ی تیم، از peer sharing تا مربی‌گری مستقیم',
  },
] as const satisfies readonly Competency[];
