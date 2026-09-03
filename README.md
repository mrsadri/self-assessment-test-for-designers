# خودارزیابی سطح شغلی طراح محصول

یک ابزار وب استاتیک، عمومی و متن‌باز که یک طراح محصول را در برابر یک مدل شایستگی ترکیبی می‌سنجد و یک سطح شغلی، زیرسطح، تفکیک شایستگی‌ها و بازه‌ی حقوق (به تومان) برمی‌گرداند. چهل سوال، بدون ورود به حساب کاربری، بدون بک‌اند؛ نتیجه فقط در همان مرورگر محاسبه می‌شود.

**آدرس زنده:** https://mrsadri.github.io/self-assessment-test-for-designers/

## منشأ و اعتبار

- **ماتریس شایستگی و وزن‌های خوشه** از یک ماتریس داخلی و محرمانه‌ی یک شرکت محصولی گرفته شده و برای این ابزار عمومی، از حوزه‌ی تخصصی آن شرکت خارج و به فارسی بازنویسی شده است. نام شرکت و خودِ فایل منبع، هیچ‌کدام در این مخزن نیستند.
- **نام سطح‌ها، تعریف مالکیت/پیچیدگی/دامنه و همه‌ی ارقام حقوق** عیناً از `career_ladder_matrix.md` آمده‌اند؛ نویسنده‌ی این ابزار هیچ رقمی نساخته یا تخمین نزده است.
- **الگوریتم نمره‌دهی** (سطح‌بندی، زیرسطح، جایگاه حقوق، آستانه‌ی واگرایی) در این پروژه طراحی شده تا خروجی همان صفحه‌گسترده را با معماری «جواب می‌دهی، سطح می‌گیری» بازتولید کند؛ به‌طور کامل در [docs/02-scoring-model.md](docs/02-scoring-model.md) مستند و در [docs/02](docs/02-scoring-model.md) بخش ۱۰ با بردارهای تست تأیید شده است.
- مستندسازی کامل تصمیم‌ها، اصلاحات و منابع بیرونی در پوشه‌ی [docs/](docs/) است؛ از [docs/00-overview.md](docs/00-overview.md) شروع کنید.

این ابزار **چک‌لیست ارتقا نیست**. یک تخمین است از روی چهل انتخاب، نه یک ارزیابی رسمی.

## Product Designer Career Self-Assessment

A public, open-source, static web app that scores a product designer against a merged competency model and returns a career level, sub-level, competency breakdown, and salary range (in Toman). 40 questions, no login, no backend: the result is computed entirely in the browser.

**Live:** https://mrsadri.github.io/self-assessment-test-for-designers/

### Provenance

- The **competency matrix and cluster weights** come from a product company's confidential internal matrix, generalized out of that company's domain and rewritten in Persian for this public tool. Neither the company name nor the source file is in this repository.
- **Level names, the ownership/complexity/scope definitions, and every salary figure** come verbatim from `career_ladder_matrix.md`. No number here is invented or estimated by the author.
- The **scoring algorithm** (level resolution, sub-level, salary position, divergence threshold) was designed for this project to reproduce the source spreadsheet's own arithmetic under a "answers in, level out" architecture. Fully specified in [docs/02-scoring-model.md](docs/02-scoring-model.md) and verified against the test vectors in section 10 of that file.
- Full documentation of every decision, correction, and external source is in [docs/](docs/), starting at [docs/00-overview.md](docs/00-overview.md).

This tool **is not a promotion checklist**. It is an estimate from 40 choices, not a formal evaluation.

## Development

```bash
npm install
npm run dev        # local dev server
npm run typecheck
npm run test        # scoring engine + config invariants (Vitest)
npm run build        # production build to dist/
```

Stack: Vite, React, TypeScript, Tailwind CSS v4, shadcn/ui on Radix, React Router (`HashRouter`), Vitest. Deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Privacy

No answer, result, or timing is ever sent anywhere: there is no `fetch` call in the app. Saving your in-progress run to `localStorage` is opt-in and off by default; the result screen has a control to clear it.

## License

MIT, see [LICENSE](LICENSE). The competency content is derived from a company's internal matrix as described above; the code and this documentation set are MIT-licensed.
