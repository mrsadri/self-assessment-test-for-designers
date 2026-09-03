import type { Level } from '@/types';

/** The 6 career-ladder levels. See docs/01 section 2 and docs/04 section 5. */
export const LEVELS: readonly Level[] = [
  {
    id: 'rising', ordinal: 1, name: 'Rising', fa: 'Rising',
    faSummary: 'کارهای پایه‌ای و تعریف‌شده را مستقل انجام می‌دهد و در حال یادگیری حوزه‌ی تخصصی است.',
    column: { ic: 'junior', mgmt: 'junior' }, assessable: true,
  },
  {
    id: 'formed', ordinal: 2, name: 'Formed', fa: 'Formed',
    faSummary: 'یک دامنه‌ی کوچک و مشخص را نگه می‌دارد و برای مسائل غیرتکراری خودش تحقیق می‌کند.',
    column: { ic: 'mid-level', mgmt: 'mid-level' }, assessable: true,
  },
  {
    id: 'mature', ordinal: 3, name: 'Mature', fa: 'Mature',
    faSummary: 'استراتژی یک دامنه و نتایج کلیدی آن را هدایت می‌کند و می‌تواند منتور دیگران باشد.',
    column: { ic: 'senior', mgmt: 'senior' }, assessable: true,
  },
  {
    id: 'valiant', ordinal: 4, name: 'Valiant', fa: 'Valiant',
    faSummary: 'تصمیم‌ها و استراتژی‌ای را هدایت می‌کند که موفقیت بخش بزرگی از سازمان را تضمین می‌کند.',
    column: { ic: 'staff', mgmt: 'lead' }, assessable: true,
  },
  {
    id: 'heroic', ordinal: 5, name: 'Heroic', fa: 'Heroic',
    faSummary: 'با دانش تخصصی خود عملکرد چند حوزه را هم‌سو و بهتر می‌کند.',
    column: { ic: 'principal', mgmt: 'manager' }, assessable: false,
    faOutOfRange: 'سنجش این سطح به شواهد سازمانی نیاز دارد که یک تست ۴۰ سوالی نمی‌تواند جمع کند.',
  },
  {
    id: 'grandmaster', ordinal: 6, name: 'Grandmaster', fa: 'Grandmaster',
    faSummary: 'چشم‌انداز جهانی سازمان را تنظیم و هدایت می‌کند. در ماتریس اصلی معادلی ندارد.',
    column: { ic: null, mgmt: null }, assessable: false,
    faOutOfRange: 'این سطح در ماتریس شایستگی مرجع ستونی ندارد و بیرون از دامنه‌ی این تست است.',
  },
] as const satisfies readonly Level[];
