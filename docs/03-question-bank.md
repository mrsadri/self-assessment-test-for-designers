# 03 - Question Bank

## Purpose

This file contains all 40 questions in full Persian, with their four options, the competency each question measures, and the anchor score each option produces. Thirty are self-assessment questions whose four options are concrete behaviours drawn from four adjacent columns of the competency matrix. Ten are scenario questions that put the respondent in a realistic situation where no option is visibly correct. Every option carries the matrix column it was derived from, so any claim in the instrument can be traced back to a cell in the source spreadsheet.

---

## 1. How to read this file

Each question is a heading with an id. Under it: the competency tag, the Persian question text, and a table of four options.

| Column | Meaning |
| :--- | :--- |
| گزینه | The Persian option text, exactly as it appears in the UI |
| score | The anchor score `a` this option produces, 1 to 4 |
| Source column | The matrix column the behaviour was derived from |

Anchor convention, fixed globally and defined in [02-scoring-model.md](02-scoring-model.md):

| score | Matrix column | Career-ladder rung |
| :-- | :--- | :--- |
| 1 | Junior | Rising |
| 2 | Mid-Level | Formed |
| 3 | Senior | Mature |
| 4 | Staff (IC) or Lead (Management) | Valiant |

Self-assessment options are listed and rendered in ascending score order. Scenario options are listed and rendered in the shuffled order shown here, which is fixed in the config and must not be re-sorted.

## 2. Coverage

### 2.1 Distribution by competency

| Cluster | Competency | Self-assessment | Scenario | Total |
| :--- | :--- | :-: | :-: | :-: |
| Clarity & Trust | complexity-translation | SA01, SA02 | SC01 | 3 |
| | problem-definition | SA03, SA04 | SC02 | 3 |
| | strategic-alignment | SA05, SA06 | SC03 | 3 |
| Insight & Data | product-thinking | SA07, SA08 | none | 2 |
| | evidence-based-design | SA09, SA10 | SC04 | 3 |
| | discovery-execution | SA11, SA12 | SC05 | 3 |
| | solution-accountability | SA13, SA14 | SC06 | 3 |
| Consistency & Excellence | craftsmanship | SA15, SA16 | SC07 | 3 |
| | system-stewardship | SA17, SA18 | SC08 | 3 |
| | shipping-design | SA19, SA20 | none | 2 |
| | technical-velocity | SA21, SA22 | none | 2 |
| Growth & Ownership | chapter-contribution | SA23, SA24 | none | 2 |
| | learning-growth | SA25, SA26 | none | 2 |
| | adaptability | SA27, SA28 | SC10 | 3 |
| | mentorship | SA29, SA30 | SC09 | 3 |
| **Total** | **15 competencies** | **30** | **10** | **40** |

Self-assessment coverage is exactly 2 per competency, all 15 covered. Scenario coverage is 10 of 15.

### 2.2 Distribution by cluster

| Cluster | Competencies | Self-assessment Q | Scenario Q | Scenario coverage |
| :--- | :-: | :-: | :-: | :--- |
| Clarity & Trust | 3 | 6 | 3 | all 3 competencies |
| Insight & Data | 4 | 8 | 3 | 3 of 4, `product-thinking` not covered |
| Consistency & Excellence | 4 | 8 | 2 | 2 of 4, `shipping-design` and `technical-velocity` not covered |
| Growth & Ownership | 4 | 8 | 2 | 2 of 4, `chapter-contribution` and `learning-growth` not covered |

**Decision:** all three Clarity and Trust competencies get a scenario, and the four uncovered ones are `product-thinking`, `shipping-design`, `technical-velocity`, `chapter-contribution`, `learning-growth`. **Reason:** Clarity and Trust carries the largest weight at Mature and above (0.25 to 0.35), so scenario-only mode must measure it completely or its cluster mean becomes unreliable exactly where it matters most. The five uncovered competencies are the ones whose behaviour is hardest to compress into a single realistic situation without the option set collapsing into an obvious ranking.

These 10 scenario-covered competencies are the **shared set** used for the divergence statistic in [02](02-scoring-model.md) section 7.2:

```
complexity-translation, problem-definition, strategic-alignment,
evidence-based-design, discovery-execution, solution-accountability,
craftsmanship, system-stewardship, adaptability, mentorship
```

### 2.3 Domain generalisation

**Decision:** every question is generalised out of the source company's domain. **Reason:** the source matrix is written in that company's own product specifics, down to named checkout flows, pricing mechanics and product counts. A public instrument asking those questions would only be answerable by that one company's designers. The behaviour is preserved verbatim in substance; only the domain nouns change.

---

# Part A: Self-assessment questions (SA01 to SA30)

## Cluster: شفافیت و اعتماد

### SA01
**Competency:** `complexity-translation`

> وقتی یک بریف پیچیده به دستت می‌رسد، کارت معمولاً از کجا شروع می‌شود؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| عناصر پیچیده را در بریف پیدا می‌کنم و با الگوهای استاندارد UI بار ذهنی کاربر را کم می‌کنم. | 1 | Junior, "Component & Task Clarity" |
| منطق پنهان محصول، مثل نحوه‌ی محاسبه‌ها یا استثناها، را به بازخورد بصری و زبان ساده ترجمه می‌کنم. | 2 | Mid-Level, "Flow & Logic Simplification" |
| کل روایت را در طول یک مسیر end-to-end می‌چینم تا feature های فنی به مدل ذهنی کاربر وصل شوند. | 3 | Senior, "Experience Orchestration" |
| framework می‌سازم تا مدل ذهنی واحد در چند محصول حفظ شود، یا استاندارد شفافیت را برای کل تیم تعریف می‌کنم. | 4 | Staff "Cross-Vertical Architecture" / Lead "Quality & Craft Mentorship" |

### SA02
**Competency:** `complexity-translation` (information architecture facet, see [01](01-competency-model.md) section 3)

> ساختار اطلاعات یک بخش تازه را چطور تعیین می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| از ساختار و naming موجود محصول پیروی می‌کنم و همان الگو را ادامه می‌دهم. | 1 | Junior, extended facet |
| وقتی می‌بینم دسته‌بندی فعلی جواب نمی‌دهد، ساختار را بازچینی می‌کنم و دلیلش را مستند می‌کنم. | 2 | Mid-Level, extended facet |
| information architecture را پیش از طراحی هر screen ای با روش‌هایی مثل Tree Test می‌سنجم. | 3 | Senior, extended facet (tree test is named in the source `discovery-execution` Senior cell) |
| یک IA مرجع برای کل پلتفرم تعریف می‌کنم که تیم‌های دیگر رویش بنا کنند. | 4 | Staff, extended facet |

### SA03
**Competency:** `problem-definition`

> وقتی یک درخواست مشخص از سمت Product می‌آید، مثلاً «این دکمه را اضافه کن»، چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| هدف اصلی و کاربر هدف آن task را می‌پرسم تا مطمئن شوم درست فهمیده‌ام. | 1 | Junior, "Goal Clarity" |
| زیر لایه‌ی درخواست را می‌کاوم تا محدودیت پنهان یا هدف متناقض پیدا کنم، و تا شفاف نشدن مسئله وارد high-fidelity نمی‌شوم. | 2 | Mid-Level, "Assumption Testing" |
| یک Problem Statement می‌نویسم که squad را هم‌سو کند و جلوی scope creep را بگیرد. | 3 | Senior, "Framing & Scoping" |
| همان اصطکاک را در چند محصول دنبال می‌کنم و مسئله را در سطح ساختار تجربه تعریف می‌کنم، یا به تیم یاد می‌دهم چطور بریف ضعیف را پس بزند. | 4 | Staff "Meta-Problem Identification" / Lead "Methodological Framing" |

### SA04
**Competency:** `problem-definition`

> نسبتت با چارچوب‌های تعریف مسئله مثل 5 Whys یا Jobs to be Done چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| وقتی کسی پیشنهاد بدهد از آن‌ها استفاده می‌کنم. | 1 | Junior |
| خودم تشخیص می‌دهم کدام چارچوب به این مسئله می‌خورد و به کارش می‌برم. | 2 | Mid-Level |
| برای پروژه‌های بزرگ چارچوب را انتخاب می‌کنم و خروجی‌اش را برای تیم مستند می‌کنم. | 3 | Senior |
| چارچوب تعریف مسئله را در تیم جا می‌اندازم و روی مسائل چندمحصولی به کارش می‌برم. | 4 | Lead, "Methodological Framing" |

### SA05
**Competency:** `strategic-alignment`

> رابطه‌ی کارت با اهداف بیرون از تیم را چطور توصیف می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| می‌دانم task ام به هدف فوری squad چه ربطی دارد و می‌توانم توضیحش بدهم. | 1 | Junior, "Contextual Awareness" |
| زودتر از موعد با Engineering و Product هماهنگ می‌کنم تا طرح در همین sprint شدنی باشد. | 2 | Mid-Level, "Cross-Functional Coordination" |
| با stakeholder های ارشد رابطه می‌سازم و با design روی roadmap اثر می‌گذارم. | 3 | Senior, "Roadmap Influence" |
| چند squad یا خط محصول را حول یک مسیر استراتژیک واحد هم‌سو می‌کنم، یا فرایندهای تیم را با سرعت و محدودیت‌های شرکت تنظیم می‌کنم. | 4 | Staff "Domain Synthesis" / Lead "Operational Alignment" |

### SA06
**Competency:** `strategic-alignment`

> در گفت‌وگو با بیزنس معمولاً کجای میز نشسته‌ای؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| KPI هایی که کارم رویشان اثر دارد را می‌شناسم. | 1 | Junior |
| طرحم را با زبان trade-off فنی و زمانی دفاع می‌کنم. | 2 | Mid-Level |
| با prototype و روایت، تصمیم stakeholder را جابه‌جا می‌کنم. | 3 | Senior, "Vision Prototype" |
| به بقیه یاد می‌دهم چطور به زبان بیزنس حرف بزنند و کارشان را به سود و نگه‌داشت کاربر وصل کنند. | 4 | Lead, "Operational Alignment" |

## Cluster: بینش و داده

### SA07
**Competency:** `product-thinking`

> نگاهت به محصولی که رویش کار می‌کنی چقدر عمیق است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| value proposition محصول را می‌فهمم و می‌توانم مسیر کاربر از ورود تا خرید را ترسیم کنم. | 1 | Junior, "User Intent & Journey" |
| می‌دانم محصول از کجا درآمد دارد و feature را طوری طراحی می‌کنم که این اهرم‌ها بدون آسیب به UX بهتر شوند. | 2 | Mid-Level, "Business Value & Mechanics" |
| شریک واقعی PM هستم، رقبا را می‌شناسم و شکاف‌های محصولی قابل پر شدن را پیدا می‌کنم. | 3 | Senior, "Vertical Market Fit" |
| تعامل همه‌ی خطوط محصول را می‌بینم و framework هایی می‌سازم که cross-selling و LTV را در کل پلتفرم بالا ببرد. | 4 | Staff, "Ecosystem Thinking" |

### SA08
**Competency:** `product-thinking`

> وقتی طرح تو با هدف کوتاه‌مدت بیزنس تعارض پیدا می‌کند؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| تعارض را به PM می‌گویم و منتظر تصمیم او می‌مانم. | 1 | Junior |
| یک گزینه‌ی میانه پیشنهاد می‌دهم که هر دو طرف را تا حدی راضی کند. | 2 | Mid-Level |
| هزینه‌ی هر طرف را با داده تخمین می‌زنم و پیشنهادم را روی همان بنا می‌کنم. | 3 | Senior |
| مسئله را به مدل کسب‌وکار برمی‌گردانم و نشان می‌دهم کدام انتخاب در بلندمدت ارزش بیشتری می‌سازد. | 4 | Staff, adjacent to `solution-accountability` "Business Model Integrity" |

### SA09
**Competency:** `evidence-based-design`

> نسبتت با طرح خودت چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| می‌دانم طرحم یک فرضیه است نه پاسخ نهایی، و دنبال چراییِ رفتار کاربر می‌گردم. | 1 | Junior, "Humility & Inquiry" |
| سیگنال‌های مختلف را به هم وصل می‌کنم تا جهت طراحی محکم‌تری بسازم. | 2 | Mid-Level, "Pattern Recognition & Triangulation" |
| شواهد را طوری می‌سازم که جلوی اشتباه‌های پرهزینه را بگیرد، نه اینکه فقط شواهد موجود را پیدا کنم. | 3 | Senior, "Risk Mitigation" |
| حقیقت‌های رفتاری‌ای استخراج می‌کنم که برای همه‌ی محصولات اصل الزام‌آور می‌شوند، یا فرهنگ «از کجا می‌دانیم درست است؟» را در تیم جا می‌اندازم. | 4 | Staff "Synthesizing Systemic Truths" / Lead "The Culture of Inquiry" |

### SA10
**Competency:** `evidence-based-design`

> وقتی داده با شهودت مخالف است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| داده را می‌پذیرم و طرح را عوض می‌کنم. | 1 | Junior |
| اول کیفیت و روش جمع‌آوری داده را بررسی می‌کنم و بعد تصمیم می‌گیرم. | 2 | Mid-Level |
| یک سنجش کوچک طراحی می‌کنم که مشخصاً همین اختلاف را حل کند. | 3 | Senior |
| تعارض را به یک بحث روشمند در تیم تبدیل می‌کنم تا معیار مشترکی برای «شاهد قابل قبول» ساخته شود. | 4 | Lead, "The Culture of Inquiry" |

### SA11
**Competency:** `discovery-execution`

> تحقیق کاربر را در چه سطحی اجرا می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| تست‌های ساده و ارزیابانه مثل 5-second test یا unmoderated usability را اجرا می‌کنم و بدون سوگیری گزارش می‌دهم. | 1 | Junior, "Assisted Execution" |
| مصاحبه یا usability session را از صفر تا صد خودم برنامه‌ریزی و اجرا می‌کنم و اسکریپت غیرجهت‌دار می‌نویسم. | 2 | Mid-Level, "Independent Discovery" |
| می‌دانم برای هر مسئله کدام روش را انتخاب کنم و آزمایش‌هایی طراحی می‌کنم که با کم‌ترین هزینه بیشترین اطمینان را بدهند. | 3 | Senior, "Multi-Method Validation" |
| با ترکیب روش‌ها رفتارهای عمیق و غیربدیهی را پیدا می‌کنم، یا toolkit تحقیق را می‌سازم تا بقیه سریع‌تر و دقیق‌تر آزمایش کنند. | 4 | Staff "Behavioral Insights" / Lead "Discovery Enablement" |

### SA12
**Competency:** `discovery-execution`

> وقتی برای تحقیق وقت کافی نیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| بدون تحقیق پیش می‌روم و بعد از انتشار بازخورد جمع می‌کنم. | 1 | Junior |
| کوچک‌ترین نسخه‌ی ممکن از روش را اجرا می‌کنم تا دست‌کم یک سیگنال داشته باشم. | 2 | Mid-Level |
| ریسک هر مسیر را می‌سنجم و فقط پرریسک‌ترین فرض را می‌سنجم. | 3 | Senior |
| کاری می‌کنم زمان discovery از ابتدا در برنامه‌ریزی پروژه دیده شود، نه اینکه هر بار قربانی deadline شود. | 4 | Manager-adjacent, "Democratizing Discovery"; rendered at Lead altitude |

### SA13
**Competency:** `solution-accountability`

> بعد از انتشار، چقدر کار را دنبال می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| عملکرد طرحم را دنبال می‌کنم و می‌توانم بگویم هدف فوری محقق شده یا نه. | 1 | Junior, "Outcome Awareness" |
| در مرحله‌ی طراحی success signal تعریف می‌کنم و خودم عملکرد را ممیزی می‌کنم. | 2 | Mid-Level, "Performance Monitoring" |
| سلامت کل یک خط محصول را برمی‌دارم و تیم را در چرخه‌های build-measure-learn جلو می‌برم تا KPI برسد. | 3 | Senior, "Post-Launch Iteration Strategy" |
| پاسخ‌گوی متریک‌هایی هستم که چند محصول را در بر می‌گیرد و می‌بینم کجا بهینه‌سازی محلی به تجربه‌ی کلی ضربه می‌زند. | 4 | Staff, "Ecosystem Health" |

### SA14
**Competency:** `solution-accountability`

> وقتی طرحت جواب نداده است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| منتظر می‌مانم تیم تصمیم بگیرد چه کار کنیم. | 1 | Junior |
| خودم یک iteration کوچک پیشنهاد می‌دهم. | 2 | Mid-Level |
| علت شکست را مستند می‌کنم و آن را وارد تصمیم بعدی تیم می‌کنم. | 3 | Senior |
| post-mortem را به آیین تیمی تبدیل می‌کنم که در آن اعتراف به شکست امن است. | 4 | Lead, "Accountability Culture" |

## Cluster: یکپارچگی و کیفیت

### SA15
**Competency:** `craftsmanship`

> کیفیت اجرای بصری کارت را چطور توصیف می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| layout تمیز و متوازن می‌سازم و سلسله‌مراتب بصری و brand guideline را رعایت می‌کنم. | 1 | Junior, "Visual Fundamentals" |
| روی micro-interaction و state ها مثل hover و error و active مسلطم و طرح را برای کاربران متنوع در دسترس نگه می‌دارم. | 2 | Mid-Level, "Interaction & Refinement" |
| زبان بصری محصول و استاندارد فنی آن را خودم تعیین می‌کنم. | 3 | Senior, "Visual Storytelling & Polish" |
| مسائل بصری پیچیده را در سطح کل اکوسیستم حل می‌کنم، مثل framework دسترس‌پذیری یا کتابخانه‌ی motion، یا آیین critique و visual audit را برای تیم می‌گذارم. | 4 | Staff "Platform-Level Craft Architecture" / Lead "Quality Assurance & Mentorship" |

### SA16
**Competency:** `craftsmanship` (technical writing facet, see [01](01-competency-model.md) section 3)

> متن داخل محصول را چطور می‌نویسی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| متن‌ها را همان‌طور که به دستم می‌رسد استفاده می‌کنم و اگر مبهم بود می‌پرسم. | 1 | Junior, extended facet |
| خودم متن UI را می‌نویسم و بازنویسی می‌کنم تا کوتاه و دقیق و بدون واژه‌ی تخصصی اضافه باشد. | 2 | Mid-Level, extended facet |
| برای محصول لحن و الگوی نوشتاری تعریف می‌کنم و error و empty state ها را با همان الگو می‌نویسم. | 3 | Senior, extended facet |
| استاندارد زبان محصول را در سطح سازمان جا می‌اندازم و سرش با تیم‌های حقوقی یا محتوا مذاکره می‌کنم. | 4 | Lead, derived from "Jargon-Busting" and the Plain Language Policy in `complexity-translation` |

### SA17
**Competency:** `system-stewardship`

> نسبتت با Design System چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| از library صد در صد درست استفاده می‌کنم و component های ناقص یا خراب را گزارش می‌دهم. | 1 | Junior, "Component Adoption" |
| شکاف‌های library را پیدا می‌کنم و component تازه‌ی قابل استفاده‌ی مجدد با مستندات می‌سازم. | 2 | Mid-Level, "Component Creation & Docs" |
| استراتژی رشد سیستم را جلو می‌برم تا منظم و قابل اتکا و مقیاس‌پذیر بماند. | 3 | Senior, "System Evolution & Governance" |
| با Engineering یک single source of truth می‌سازم که Figma و code دقیقاً هم‌تراز باشند، یا تیم را روی استفاده‌ی درست از سیستم آموزش می‌دهم. | 4 | Staff "Code-to-Design Synchronization" / Lead "System Adoption & Training" |

### SA18
**Competency:** `system-stewardship`

> وقتی component موجود جواب نیازت را نمی‌دهد؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| instance را detach می‌کنم و نسخه‌ی سفارشی می‌سازم. | 1 | Junior, the negative of "without detaching instances" |
| اول با صاحب سیستم چک می‌کنم و اگر لازم بود درخواست تغییر ثبت می‌کنم. | 2 | Mid-Level |
| تصمیم می‌گیرم این یک استثنا است یا الگویی تکرارشونده، و بر همان اساس سیستم را عوض می‌کنم. | 3 | Senior, "System Evolution & Governance" |
| قاعده‌ی روشنی می‌گذارم که تیم بداند کِی حق دارد از سیستم خارج شود و کِی نه. | 4 | Lead, "System Adoption & Training" |

### SA19
**Competency:** `shipping-design`

> تحویل کار به Engineering در تیم تو چه شکلی است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| فایل مرتب و named و ساختارمند تحویل می‌دهم و استاندارد layer و page تیم را رعایت می‌کنم. | 1 | Junior, "File Hygiene" |
| همه‌ی edge case ها را مستند می‌کنم: error و loading و empty state. | 2 | Mid-Level, "State Documentation" |
| در حین build کنار مهندس‌ها می‌مانم و محصول کدشده را با هدف طراحی تطبیق می‌دهم. | 3 | Senior, "Implementation QA" |
| پل فنی بین design و code را می‌سازم، مثلاً Variables که یک‌به‌یک به token های CSS بخورد، یا استاندارد handoff تیم را تعریف می‌کنم. | 4 | Staff "Handoff Systems" / Lead "Execution Workflow" |

### SA20
**Competency:** `shipping-design`

> وقتی نسخه‌ی live با طرح فرق دارد؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| مورد را گزارش می‌دهم و منتظر اصلاح می‌مانم. | 1 | Junior |
| لیست تفاوت‌ها را با اولویت به مهندس می‌دهم. | 2 | Mid-Level |
| با ابزار inspect خودم علت را پیدا می‌کنم و راه‌حل قابل اجرا پیشنهاد می‌دهم. | 3 | Senior, "Design Scrub" |
| کاری می‌کنم این اختلاف ساختاری حل شود تا دفعه‌ی بعد اصلاً پیش نیاید. | 4 | Lead, "Execution Workflow" |

### SA21
**Competency:** `technical-velocity`

> AI کجای کارت نشسته است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| برای کارهای پایه استفاده می‌کنم: خلاصه کردن مصاحبه یا تولید متن اولیه به جای Lorem Ipsum. | 1 | Junior, "AI Assistance" |
| در جریان روزانه‌ام جا داده‌ام: thematic analysis روی داده‌ها و ساخت سریع چند concept تعاملی. | 2 | Mid-Level, "Integration & Synthesis" |
| چرخه‌ی کامل آزمایش را با AI هماهنگ می‌کنم، از تحلیل حجم زیاد داده تا prototype منطق‌دار برای اعتبارسنجی. | 3 | Senior, "Methodology Acceleration" |
| workflow یا ابزار داخلی می‌سازم که مسیر research-to-design تیم را نیمه‌خودکار کند، یا قاعده‌ی استفاده‌ی مسئولانه از AI را برای تیم تعریف می‌کنم. | 4 | Staff "Custom Workflows" / Lead "Strategy & Governance" |

### SA22
**Competency:** `technical-velocity`

> نسبتت با code چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| محدودیت‌های فنی را از مهندس‌ها می‌پرسم. | 1 | Junior |
| HTML و CSS را در حدی می‌فهمم که بدانم چه چیزی گران است. | 2 | Mid-Level |
| خودم prototype کارکردنی می‌سازم تا تصمیم را زودتر بسنجم. | 3 | Senior, "Vibe Coding" |
| تصمیم‌های طراحی را با اثرشان روی performance و مقیاس‌پذیری پلتفرم می‌سنجم. | 4 | Staff, "Platform Performance Architecture" from `shipping-design` |

## Cluster: رشد و حس مالکیت

### SA23
**Competency:** `chapter-contribution`

> بیرون از پروژه‌هایت، نقشت در تیم چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| در آیین‌های تیم شرکت می‌کنم و ماهی دست‌کم یک منبع یا نکته در فضای مشترک می‌گذارم. | 1 | Junior, "Ritual Participation" |
| یک نقطه‌ی اصطکاک در نحوه‌ی همکاری تیم را پیدا می‌کنم و راه بهتری پیشنهاد می‌دهم. | 2 | Mid-Level, "Process Improvement" |
| استانداردهای داخلی را می‌سازم و پایگاه دانش تیم را به‌روز نگه می‌دارم. | 3 | Senior, "Standard Setting" |
| چارچوب‌های اجتماعی و عملیاتی طراحی می‌کنم که هوش جمعی تیم را بالا ببرد، یا سلامت و امنیت روانی آیین‌های تیم را تضمین می‌کنم. | 4 | Staff "Systemic Culture & Ritual Architecture" / Lead "Chapter Health & Ritual Governance" |

### SA24
**Competency:** `chapter-contribution`

> وقتی فرایند تیم کند یا ناکارآمد است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| خودم را با فرایند تطبیق می‌دهم. | 1 | Junior |
| مشکل را در retro مطرح می‌کنم. | 2 | Mid-Level |
| یک جایگزین مشخص پیشنهاد می‌دهم و اجرای آزمایشی‌اش را جلو می‌برم. | 3 | Senior |
| مسئولیت طراحی و جا انداختن فرایند جدید را در کل تیم برمی‌دارم. | 4 | Lead |

### SA25
**Competency:** `learning-growth`

> یادگیری‌ات چطور جلو می‌رود؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| فعالانه بازخورد می‌گیرم و برای یک مهارت فنی مشخص برنامه‌ی بهبود دارم. | 1 | Junior, "Skill Gap Identification" |
| موضوعی بیرون از طراحی خالص یاد می‌گیرم، مثل تحلیل داده، تا کارم دقیق‌تر شود. | 2 | Mid-Level, "Domain Mastery" |
| دانشم را با تیم به اشتراک می‌گذارم و مهارت‌های لازم آینده را زودتر برمی‌دارم. | 3 | Senior, "Cross-Disciplinary Learning" |
| در یک حوزه به مرجع تیم تبدیل شده‌ام، یا برای شکاف‌های مهارتی کل تیم مسیر یادگیری طراحی می‌کنم. | 4 | Staff "Deep Domain Expertise" / Lead "Curriculum Design" |

### SA26
**Competency:** `learning-growth`

> وقتی با چیزی روبه‌رو می‌شوی که بلد نیستی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| از کسی که بلد است می‌پرسم. | 1 | Junior |
| خودم می‌روم یاد می‌گیرم و بعد سراغ کار می‌آیم. | 2 | Mid-Level |
| هم‌زمان با یاد گرفتن کار را جلو می‌برم و ریسک ندانستنم را مدیریت می‌کنم. | 3 | Senior |
| آنچه یاد گرفته‌ام را به شکل قابل استفاده برای بقیه درمی‌آورم. | 4 | Lead |

### SA27
**Competency:** `adaptability`

> واکنشت به تغییر ناگهانی اولویت‌ها چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| بین موضوع‌ها جابه‌جا می‌شوم بدون اینکه کیفیت کارم بیفتد. | 1 | Junior, "Task Resilience" |
| با بریف ۶۰ درصدی هم شروع می‌کنم و مسیر را در حین کار پیدا می‌کنم. | 2 | Mid-Level, "Handling Ambiguity" |
| در تغییرهای بزرگ نقطه‌ی ثبات تیم هستم و آن‌ها را از تغییر عبور می‌دهم. | 3 | Senior, "Pivot Leadership" |
| سیستم‌ها را طوری می‌سازم که ذاتاً انعطاف‌پذیر باشند و چند سناریوی آینده را تاب بیاورند، یا تیم را از شوک تغییرهای پی‌درپی محافظت می‌کنم. | 4 | Staff "Scenario Architecture" / Lead "Team Resilience & Safety" |

### SA28
**Competency:** `adaptability`

> وقتی جهت پروژه وسط کار عوض می‌شود؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| کار جدید را شروع می‌کنم. | 1 | Junior |
| می‌پرسم چه بخشی از کار قبلی هنوز معتبر است و همان را برمی‌دارم. | 2 | Mid-Level |
| هزینه‌ی تغییر را شفاف می‌کنم و مسیر جدید را با کم‌ترین دورریز طراحی می‌کنم. | 3 | Senior |
| تصمیم می‌گیرم چه چیزی باید همین حالا عوض شود و چه چیزی باید ثابت بماند تا تیم دچار whiplash نشود. | 4 | Lead, "Team Resilience & Safety" |

### SA29
**Competency:** `mentorship`

> دانشت چطور به بقیه منتقل می‌شود؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| دانسته‌های عملی‌ام را با هم‌تیمی‌ها به اشتراک می‌گذارم تا وقتشان تلف نشود. | 1 | Junior, "Peer Sharing" |
| در design review بازخوردی می‌دهم که فقط مشکل را نشان ندهد، راه‌حل را هم یاد بدهد. | 2 | Mid-Level, "Constructive Critique" |
| یک یا چند طراح junior را زیر بال می‌گیرم و روی هدف‌های رشدشان کار می‌کنم. | 3 | Senior, "Direct Mentoring" |
| برای کل تیم جلسه‌های عمیق مهارتی می‌گذارم که سطح همه، حتی senior ها، را بالا ببرد، یا مسیر شغلی افراد را فعالانه مدیریت می‌کنم. | 4 | Staff "Craft Masterclasses" / Lead "Career Pathing" |

### SA30
**Competency:** `mentorship`

> وقتی کار یک نفر در تیم پایین‌تر از استاندارد است؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| خودم درستش می‌کنم. | 1 | Junior |
| به او می‌گویم کجا اشکال دارد. | 2 | Mid-Level |
| با او می‌نشینم تا خودش دلیل و راه‌حل را پیدا کند. | 3 | Senior |
| الگوی تکرارشونده را می‌بینم و آن را با آموزش یا تغییر فرایند در سطح تیم حل می‌کنم. | 4 | Lead |

---

# Part B: Scenario questions (SC01 to SC10)

Scenario options are deliberately not in score order. The order below is the render order and is stored in the config as written. No option is written to look wrong, and each is a defensible move that a real designer at that rung would make.

### SC01
**Competency:** `complexity-translation`

> یک flow پرداخت چندمرحله‌ای دارید و کاربران در مرحله‌ی آخر رها می‌کنند. تیم حقوقی اصرار دارد متن کامل شرایط در همان صفحه بماند. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| متن را در یک accordion جمع می‌کنم و خلاصه‌ی سه‌خطی بالایش می‌گذارم. | 2 | Mid-Level, "Flow & Logic Simplification" |
| با تیم حقوقی می‌نشینم تا معیار مشترکی برای «متن قابل فهم» تعریف کنیم و آن را به قاعده‌ی همه‌ی صفحه‌ها تبدیل کنم. | 4 | Lead, "Quality & Craft Mentorship" and the Plain Language Policy |
| متن را با تایپوگرافی بهتر خواناتر می‌کنم و از تیم حقوقی می‌خواهم اگر می‌شود کوتاهش کند. | 1 | Junior, "Component & Task Clarity" |
| کل مسیر را بازمی‌چینم تا شرایط در همان لحظه‌ای دیده شود که به تصمیم کاربر مربوط است، نه یک‌جا در آخر. | 3 | Senior, "Experience Orchestration" |

### SC02
**Competency:** `problem-definition`

> PM می‌گوید «نرخ استفاده از فیلتر پایین است، بیایید فیلتر را برجسته‌تر کنیم.» اولین کارت چیست؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| پیش از هر طراحی یک Problem Statement می‌نویسم و با PM سرش توافق می‌کنم که مسئله دیده نشدن است یا بی‌فایده بودن. | 3 | Senior, "Framing & Scoping" |
| فیلتر را برجسته‌تر می‌کنم و نتیجه را بعد از انتشار می‌بینم. | 1 | Junior, "Goal Clarity" not yet applied |
| همین الگو را در بخش‌های دیگر محصول هم می‌بینم و مسئله را در سطح ساختار جست‌وجو تعریف می‌کنم. | 4 | Staff, "Meta-Problem Identification" |
| اول داده‌ی رفتاری را نگاه می‌کنم تا بفهمم کاربران فیلتر را نمی‌بینند یا می‌بینند و رهایش می‌کنند. | 2 | Mid-Level, "Assumption Testing" |

### SC03
**Competency:** `strategic-alignment`

> دو squad هم‌زمان دو الگوی متفاوت برای یک تعامل مشابه طراحی کرده‌اند و هر دو تا sprint بعد deadline دارند. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| الگوی squad خودم را جلو می‌برم و موضوع را به لید گزارش می‌دهم. | 1 | Junior, "Contextual Awareness" |
| یک تصمیم مشترک بین دو squad می‌گیرم و مسیر واحدی تعریف می‌کنم که هر دو رویش بمانند. | 4 | Staff, "Domain Synthesis" |
| با طراح squad دیگر هماهنگ می‌کنم تا دست‌کم در این نسخه یکی از دو الگو حذف شود. | 2 | Mid-Level, "Cross-Functional Coordination" |
| هزینه‌ی واگرایی را برای stakeholder ها قابل دیدن می‌کنم و تصمیم را به سطح درست می‌برم. | 3 | Senior, "Roadmap Influence" |

### SC04
**Competency:** `evidence-based-design`

> نتیجه‌ی یک usability test با ۵ کاربر با داده‌ی analytics تناقض دارد. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| از این تناقض یک اصل مشترک برای تیم می‌سازم که از این به بعد بدانیم کدام سیگنال کجا حجت است. | 4 | Staff "Synthesizing Systemic Truths" / Lead "The Culture of Inquiry" |
| هر دو را کنار هم می‌گذارم و دنبال توضیحی می‌گردم که هر دو را پوشش بدهد. | 2 | Mid-Level, "Pattern Recognition & Triangulation" |
| به داده‌ی analytics تکیه می‌کنم چون حجم نمونه‌اش بیشتر است. | 1 | Junior, "Humility & Inquiry" not yet applied |
| یک سنجش کوچک طراحی می‌کنم که مشخصاً همین تناقض را حل کند. | 3 | Senior, "Risk Mitigation" |

### SC05
**Competency:** `discovery-execution`

> سه هفته تا launch مانده و هیچ تحقیقی روی این feature انجام نشده است. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| یک unmoderated test کوتاه روی prototype فعلی می‌گیرم. | 2 | Mid-Level, "Independent Discovery" |
| پرریسک‌ترین فرض را جدا می‌کنم و فقط همان را با مناسب‌ترین روش می‌سنجم. | 3 | Senior, "Multi-Method Validation" |
| launch می‌کنیم و بعد از انتشار بازخورد جمع می‌کنم. | 1 | Junior |
| هم حداقل سنجش را همین حالا اجرا می‌کنم، هم کاری می‌کنم زمان discovery از ابتدای پروژه‌ی بعدی در برنامه دیده شود. | 4 | Lead, "Discovery Enablement" |

### SC06
**Competency:** `solution-accountability`

> سه ماه از انتشار redesign تو گذشته و متریک هدف تکان نخورده است. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| منتظر می‌مانم تیم تصمیم بگیرد قدم بعدی چیست. | 1 | Junior |
| مالکیت funnel را برمی‌دارم و چند چرخه‌ی build-measure-learn را تا رسیدن به هدف جلو می‌برم. | 3 | Senior, "Post-Launch Iteration Strategy" |
| بررسی می‌کنم آیا بهینه‌سازی این بخش به بخش دیگری ضربه زده است و تصویر کلی را اصلاح می‌کنم. | 4 | Staff, "Ecosystem Health" |
| فرضیه‌های اولیه را بازبینی می‌کنم و یک variant تازه پیشنهاد می‌دهم. | 2 | Mid-Level, "Performance Monitoring" |

### SC07
**Competency:** `craftsmanship` (accessibility, see [01](01-competency-model.md) section 3)

> یک هفته تا انتشار مانده و متوجه می‌شوی contrast رنگ اصلی محصول استاندارد دسترس‌پذیری را رد نمی‌کند. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| رنگ را در همین صفحه اصلاح می‌کنم تا از استاندارد رد شود. | 2 | Mid-Level, "accessible to diverse users" |
| موضوع را به یک بازبینی دسترس‌پذیری در سطح Design System تبدیل می‌کنم و قاعده‌اش را می‌گذارم. | 4 | Staff, "global accessibility frameworks" |
| موضوع را ثبت می‌کنم تا در نسخه‌ی بعد اصلاح شود. | 1 | Junior |
| اثر تغییر را روی کل محصول می‌سنجم و یک اصلاح هماهنگ پیشنهاد می‌دهم. | 3 | Senior, "Visual Storytelling & Polish" |

### SC08
**Competency:** `system-stewardship`

> نصف تیم برای رسیدن به deadline از component های سیستم خارج شده‌اند و فایل‌ها پر از نسخه‌ی detach شده است. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| تصمیم می‌گیرم کدام‌ها استثنا هستند و کدام‌ها باید به سیستم برگردند، و سیستم را بر همان اساس عوض می‌کنم. | 3 | Senior, "System Evolution & Governance" |
| در فایل خودم همه چیز را با component استاندارد می‌سازم. | 1 | Junior, "Component Adoption" |
| قاعده‌ی روشنی می‌گذارم که تیم بداند کِی مجاز است از سیستم خارج شود، و آن را با Engineering هم‌تراز می‌کنم. | 4 | Staff "Code-to-Design Synchronization" / Lead "System Adoption & Training" |
| موارد تکراری را جمع می‌کنم و برایشان component تازه می‌سازم. | 2 | Mid-Level, "Component Creation & Docs" |

### SC09
**Competency:** `mentorship`

> یک طراح junior سه بار پشت سر هم طرحی آورده که مسئله را حل نمی‌کند و هر بار خودت اصلاحش کرده‌ای. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| این بار هم خودم اصلاح می‌کنم چون deadline نزدیک است. | 1 | Junior |
| می‌بینم این الگو در تیم تکرار می‌شود و با تغییر آیین critique یا آموزش، ریشه‌اش را می‌زنم. | 4 | Staff "Craft Masterclasses" / Lead "Career Pathing" |
| دقیق می‌گویم کجا اشکال دارد و چطور باید اصلاح شود. | 2 | Mid-Level, "Constructive Critique" |
| با او می‌نشینم تا خودش تشخیص بدهد کجای تعریف مسئله را جا انداخته است. | 3 | Senior, "Direct Mentoring" |

### SC10
**Competency:** `adaptability`

> وسط پروژه، مدیریت اعلام می‌کند اولویت شرکت عوض شده و کار سه هفته‌ی اخیر تیم فعلاً کنار می‌رود. چه می‌کنی؟

| گزینه | score | Source column |
| :--- | :-: | :--- |
| می‌پرسم چه بخشی از کار قبلی هنوز قابل استفاده است و همان را نگه می‌دارم. | 2 | Mid-Level, "Handling Ambiguity" |
| تصمیم می‌گیرم چه چیزی باید عوض شود و چه چیزی باید ثابت بماند تا تیم دچار whiplash نشود، و این را با تیم شفاف می‌کنم. | 4 | Lead, "Team Resilience & Safety" |
| کار جدید را شروع می‌کنم و منتظر جزئیات بیشتر می‌مانم. | 1 | Junior, "Task Resilience" |
| هزینه‌ی تغییر را شفاف می‌کنم و مسیر جدید را با کم‌ترین دورریز طراحی می‌کنم. | 3 | Senior, "Pivot Leadership" |

---

## 3. Content rules for anyone editing this bank

1. Every question has exactly four options, one per anchor score 1 to 4, with no ties and no gaps.
2. Every option names a behaviour, not a frequency and not an agreement. No option may begin with a quantifier such as «همیشه» or «معمولاً» carrying the load of the answer, because that turns a behaviourally anchored scale back into a Likert scale and reintroduces the leniency error the anchoring exists to avoid ([BARS](https://en.wikipedia.org/wiki/Behaviorally_anchored_rating_scales)).
3. Option 4 may be a two-clause option joined by «یا» so it covers both the Staff route and the Lead route. Options 1 to 3 must be single-clause.
4. Latin technical terms stay in Latin script, matching the source sheets: Figma, Design System, component, handoff, prototype, sprint, squad, roadmap, KPI, stakeholder, edge case, empty state, analytics, AI. Do not transliterate them.
5. Persian numerals in question text, Latin numerals in scores and ids.
6. A question may only be added if its competency's count is updated in the coverage table in section 2, and the scenario-covered shared set in section 2.2 is updated if a scenario is added or removed.
7. Changing an option's score changes the instrument's calibration. The uniform-answer test vectors in [02](02-scoring-model.md) section 10 must still pass afterwards.
