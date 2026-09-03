import type { MatrixColumn, Mode, SubLevel, Track } from '@/types';

/** Latin display label for each matrix column. Kept in Latin script, not transliterated. */
export const MATRIX_COLUMN_LABEL: Record<MatrixColumn, string> = {
  junior: 'Junior',
  'mid-level': 'Mid-Level',
  senior: 'Senior',
  staff: 'Staff',
  lead: 'Lead',
  principal: 'Principal',
  manager: 'Manager',
};

export const INTRO = {
  title: 'خودارزیابی سطح شغلی طراح محصول',
  whatItIs:
    'یک تست ۴۰ سوالی که از روی رفتارهای واقعی‌ات، یک تخمین از سطح شغلی و بازه‌ی حقوق می‌سازد. سوال‌ها از یک ماتریس شایستگی واقعی گرفته شده‌اند و به فارسی بازنویسی شده‌اند.',
  whatItIsNot:
    'این ابزار جای مصاحبه‌ی سطح‌بندی یا ارزیابی مدیر مستقیمت را نمی‌گیرد و چک‌لیست ارتقا نیست. یک تخمین است، نه حکم.',
  privacy:
    'هیچ جواب و نتیجه‌ای از مرورگر تو بیرون نمی‌رود. این سایت backend ندارد و چیزی را ذخیره نمی‌کند مگر خودت بخواهی.',
  start: 'شروع',
  persistLabel: 'پیشرفتم در همین مرورگر ذخیره شود',
  persistHelper: 'فقط در همین دستگاه و همین مرورگر می‌ماند و هر وقت خواستی از نتیجه پاکش می‌کنی.',
} as const;

export const MODE_LABEL: Record<Mode, string> = {
  both: 'هر دو',
  self: 'فقط خودارزیابی',
  scenario: 'فقط سناریو',
};

export const MODE_DESCRIPTION: Record<Mode, string> = {
  both: '۴۰ سوال. دو نمره‌ی مستقل می‌گیری و فاصله‌شان خودش یک نتیجه است.',
  self: '۳۰ سوال درباره‌ی رفتار روزمره‌ات. پوشش کامل هر ۱۵ شایستگی.',
  scenario: '۱۰ موقعیت واقعی. سریع‌تر و کمتر تحت تاثیر تصویری که از خودت داری.',
};

export const MODE_QUESTION_COUNT: Record<Mode, number> = {
  both: 40,
  self: 30,
  scenario: 10,
};

/** Render order on the setup screen, `both` first and marked recommended. */
export const MODE_ORDER: readonly Mode[] = ['both', 'self', 'scenario'];
export const MODE_RECOMMENDED: Mode = 'both';

export const TRACK_LABEL: Record<Track, string> = {
  ic: 'مسیر تخصصی (IC)',
  mgmt: 'مسیر مدیریتی',
};

export const TRACK_NOT_SURE_LABEL = 'هنوز مشخص نیست';

export const TRACK_HELPER =
  'این انتخاب فقط وقتی روی نتیجه اثر می‌گذارد که در سطح Valiant یا بالاتر بایستی. اگر مطمئن نیستی، گزینه‌ی سوم را بزن؛ محاسبه با وزن‌های مسیر تخصصی انجام می‌شود و در نتیجه هم همین نوشته می‌شود.';

export const TRACK_NOT_DECLARED_NOTE =
  'مسیر مشخص نشده بود، محاسبه با وزن‌های مسیر تخصصی (IC) انجام شده است.';

export const SETUP = {
  modeQuestion: 'کدام حالت را می‌خواهی؟',
  trackQuestion: 'مسیر شغلی‌ات کدام است؟',
  start: 'شروع تست',
} as const;

export const QUESTION_SCREEN = {
  progress: (n: number, total: number) => `سوال ${toFaDigits(n)} از ${toFaDigits(total)}`,
  next: 'بعدی',
  back: 'قبلی',
} as const;

export const SUB_LEVEL_LABEL: Record<SubLevel, string> = {
  x1: 'ورودی',
  x2: 'هسته',
  x3: 'پیشرفته',
};

export const SUB_LEVEL_DESCRIPTION: Record<SubLevel, string> = {
  x1: 'تازه وارد این سطح شده‌ای و هنوز جای پایت را پیدا می‌کنی.',
  x2: 'در این سطح عملکرد پایدار و قابل اتکایی داری.',
  x3: 'مدام بالاتر از سطح فعلی‌ات کار می‌کنی و کاندیدای ارتقا هستی.',
};

export const CEILING_NOTICE =
  'این تست سقف Valiant دارد. چهار گزینه‌ی هر سوال به چهار ستون پشت سر هم ماتریس شایستگی وصل است و بالاتر از آن را نمی‌سنجد. سطح‌های Heroic و Grandmaster با شواهد سازمانی سنجیده می‌شوند، نه با یک تست ۴۰ سوالی.';

export const RESULT = {
  clusterTable: {
    cluster: 'خوشه',
    score: 'نمره',
    weight: 'وزن در این سطح',
    contribution: 'سهم در نمره‌ی نهایی',
    coverage: 'پوشش',
  },
  competencyNotMeasured: 'سنجیده نشد',
  competencyColumnLabel: (column: string) => `در حد ستون ${column}`,
  strongestTitle: 'قوی‌ترین‌ها',
  strongestLine: 'این‌ها را می‌توانی در مصاحبه و مذاکره‌ی حقوق مستقیماً روی میز بگذاری.',
  weakestTitle: 'ضعیف‌ترین‌ها',
  weakestLine:
    'این‌ها لزوماً ضعف نیستند، ممکن است هنوز فرصتش پیش نیامده باشد. ولی اگر می‌خواهی یک سطح بالاتر بروی، معمولاً همین‌ها گلوگاه هستند.',
  salaryBandLabel: (levelNameLatin: string) => `بازه‌ی حقوق سطح ${levelNameLatin}`,
  salaryPositionLabel: (formattedToman: string) => `جایگاه تخمینی تو در این بازه: حدود ${formattedToman}`,
  salaryOpenCeiling: 'سقف باز',
  salaryCaveat:
    'این عدد از زیرسطح تو در همین بازه محاسبه شده است. بازه از فایل مرجع نردبان شغلی می‌آید و بازار، اندازه‌ی شرکت و مذاکره‌ی خودت در آن دخالتی ندارند.',
  toman: 'تومان',
  scenarioUnmeasuredNote: (names: string) => `این شایستگی‌ها در حالت فقط‌سناریو سنجیده نمی‌شوند: ${names}`,
} as const;

export const DIVERGENCE = {
  header:
    'دو نمره‌ی مستقل گرفتی و فاصله‌شان به اندازه‌ای هست که ارزش دیدن دارد. هیچ‌کدام «درست» نیست. فاصله خودش داده است.',
  selfCardTitle: 'خودارزیابی',
  scenarioCardTitle: 'سناریو',
  deltaLabel: 'فاصله',
  selfHigher:
    'در توصیف کارت، رفتار سطح بالاتری را انتخاب کرده‌ای تا در موقعیت واقعی. این معمولاً یعنی زبان و چارچوب سطح بالاتر را می‌شناسی، ولی وقتی فشار زمان و ابهام وارد می‌شود به حرکت‌های آشناتر و کم‌ریسک‌تر برمی‌گردی. فاصله‌ی بین این دو عدد همان چیزی است که در مصاحبه‌ی سطح‌بندی دیده می‌شود، چون آنجا سوال «چه کار می‌کنی» نیست، «بار آخر چه کردی» است.',
  scenarioHigher:
    'در موقعیت‌های واقعی رفتار سطح بالاتری انتخاب کرده‌ای تا وقتی خودت را توصیف می‌کنی. این الگو بین کسانی که تازه دامنه‌ی کارشان بزرگ شده رایج است: کار را در سطح جدید انجام می‌دهند ولی هنوز خودشان را با معیار نقش قبلی می‌سنجند. اگر برای ارتقا یا مذاکره‌ی حقوق آماده می‌شوی، عدد سناریو به واقعیت کارت نزدیک‌تر است تا عدد خودارزیابی.',
} as const;

export const FOOTER = {
  restart: 'دوباره از اول',
  clearSaved: 'پاک کردن اطلاعات ذخیره‌شده',
  privacy: 'هیچ جواب و نتیجه‌ای از مرورگر تو بیرون نمی‌رود. این سایت backend ندارد.',
  repoLinkLabel: 'مخزن کد',
  methodologyLinkLabel: 'روش‌شناسی',
  scopeLine:
    'این ابزار چک‌لیست ارتقا نیست و جای گفت‌وگو با مدیرت را نمی‌گیرد. یک تخمین است از روی رفتارهایی که خودت انتخاب کرده‌ای.',
} as const;

export const CTA = {
  title: 'نتیجه‌ی دقیق‌تر می‌خواهی؟',
  paragraph1:
    'این تست از روی چهل انتخاب، یک تخمین می‌سازد. چیزی که نمی‌تواند بسنجد، پشت هر انتخاب است: بار آخر واقعاً چه کردی، کجا کوتاه آمدی، و وقتی تصمیمت اشتباه از آب درآمد چه شد.',
  paragraph2:
    'یک مصاحبه‌ی آزمایشی یک‌ساعته می‌گیرم، دقیقاً به همان شکلی که مصاحبه‌ی سطح‌بندی در تیم‌های محصول برگزار می‌شود. بعدش می‌گویم به نظرم کجای این نردبان ایستاده‌ای، چه چیزی تو را از سطح بعد جدا می‌کند، و برای رسیدن به آن دقیقاً روی چه چیزی باید کار کنی.',
  price: 'هزینه: ۲۵ دلار، به‌صورت Apple Gift Card.',
  emailIntro: 'برای هماهنگی ایمیل بزن به',
  email: 'sadri.masih@gmail.com',
  emailInstruction: 'و در ایمیل این سه چیز را بنویس:',
  emailItems: [
    'نتیجه‌ای که همین حالا گرفتی (سطح و زیرسطح)',
    'عنوان شغلی فعلی‌ات و چند سال است طراحی محصول کار می‌کنی',
    'اینکه دنبال ارتقا هستی، تغییر شرکت، یا فقط می‌خواهی بدانی کجا ایستاده‌ای',
  ] as const,
  closing: 'جواب می‌دهم و اگر به نظرم این جلسه به دردت نمی‌خورد، همان‌جا می‌گویم.',
} as const;

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Converts Latin digits in a number to Persian digits. */
export function toFaDigits(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Formats a Toman amount with Persian digits and thousands separators. */
export function formatToman(amount: number): string {
  return new Intl.NumberFormat('fa-IR').format(amount);
}
