# 02 - Scoring Model

## Purpose

This file defines the scoring algorithm end to end, with no step left to the implementer's judgement. It states how a chosen option becomes a competency score, how cluster scores are formed, how the level-dependent cluster weights are resolved when the level is not yet known, how the weighted score maps to a career-ladder level, how the X.1 / X.2 / X.3 sub-level is derived, how the salary position inside a band is computed, and when the self-assessment and scenario results are shown side by side instead of merged. It ends with one fully worked numeric example carried through every step.

---

## 1. The circularity, named before it is solved

The source model has a circularity that is deeper than the weights.

Sheet `Scoring` defines the 1 to 4 scale **relative to a level**: 3 means "consistently demonstrates this competency independently", 4 means "operates beyond the current level expectations". You cannot rate someone 3 without already knowing which level's expectations you are rating against. The cluster weights then compound this, because they also differ per level. And the sub-level bands (X.1 Entry, X.2 Core, X.3 Advanced) are likewise level-relative: "mostly Developing", "mostly Meeting", "mostly Exceeding".

So the spreadsheet's model is: **level in, score out.** A manager knows the designer is a Senior, rates them against Senior expectations, and the score tells them whether the designer is Senior X.1, X.2 or X.3.

This product needs the opposite: **answers in, level and sub-level out.**

The resolution is to separate the two things the source conflates into two distinct scores.

| Score | Scale | Source status | Determines |
| :--- | :--- | :--- | :--- |
| **Anchor score** `a` | 1 to 4, where the number *is* the matrix column | AUTHORED layer | the **level** |
| **Relative rating** `r` | 1 to 4, exactly the source's Not Meeting / Developing / Meeting / Exceeding | SOURCED, verbatim | the **sub-level** |

`r` is computed from `a` once the level is known, so the source's arithmetic runs unchanged on `r` and the spreadsheet's own worked example remains a valid computation in this system. Section 8 verifies that.

## 2. Step 1: option to anchor score

Every question has four options. Every option is a concrete behaviour lifted from one specific column of the competency matrix. The four options of any question are anchored to the same four columns, in this fixed global order:

| Option anchor | Matrix column | Career-ladder rung | Anchor score `a` |
| :-- | :--- | :--- | :-- |
| 1 | Junior | Rising | 1 |
| 2 | Mid-Level | Formed | 2 |
| 3 | Senior | Mature | 3 |
| 4 | Staff (IC) or Lead (Management) | Valiant | 4 |

The anchor score of a question is the score of the option the respondent chose. This is not a Likert rating and there is no "how strongly do you agree" step: the number is a claim about which column of the matrix the respondent's behaviour sits in.

**Decision:** option 4 is phrased to admit both the Staff route (systems, platform, architecture) and the Lead route (people, standards, rituals), usually as a two-clause option. **Reason:** one option cannot be two different behaviours, and splitting the question by track would double the content for a distinction the respondent has already declared. The cost, stated plainly: the instrument cannot tell an IC-flavoured Valiant from a Management-flavoured one from the answers, and takes the respondent's word for the track.

**Decision:** self-assessment options are presented in ascending anchor order; scenario options are presented in a fixed shuffled order stored in the config. **Reason:** in behaviourally anchored self-assessment the gradient is visible whatever the order, so ascending order reduces reading load; in scenarios the whole point is that no option looks correct, so the ordering must not signal seniority.

### Per-competency anchor when a competency is asked more than once

Each competency has exactly 2 self-assessment questions and at most 1 scenario question. The competency anchor is the arithmetic mean of the anchors of the questions answered **within the mode being scored**:

```
a(competency) = mean( anchors of that competency's questions in this mode )
```

So in self-assessment-only mode this is the mean of 2 values and can be a half-integer. In scenario-only mode it is a single value. In combined mode see section 7.

## 3. Step 2: cluster score

Sourced from sheet `Example`, which averages the competency scores inside a cluster before applying the cluster weight, with no per-competency weighting.

```
C(k) = mean( a(competency) for every competency in cluster k that this mode measured )
```

Cluster sizes are 3, 4, 4, 4. In scenario-only mode the measured subset is smaller (see the coverage table in [03](03-question-bank.md)); the mean is taken over the measured members only, and the result screen names the competencies that were not measured.

## 4. Step 3: cluster weights and the level they depend on

The weights, verbatim from sheet `Scoring`. Every column sums to 1.000, which was verified.

| Cluster | Junior | Mid-Level | Senior | Staff | Lead | Principal | Manager |
| :--- | --: | --: | --: | --: | --: | --: | --: |
| Clarity & Trust | 0.10 | 0.15 | 0.25 | 0.30 | 0.35 | 0.35 | 0.35 |
| Insight & Data | 0.15 | 0.25 | 0.30 | 0.25 | 0.20 | 0.30 | 0.25 |
| Consistency & Excellence | 0.55 | 0.40 | 0.25 | 0.20 | 0.10 | 0.10 | 0.05 |
| Growth & Ownership | 0.20 | 0.20 | 0.20 | 0.25 | 0.35 | 0.25 | 0.35 |
| **sum** | **1.00** | **1.00** | **1.00** | **1.00** | **1.00** | **1.00** | **1.00** |

Only four of these columns are reachable, because the assessable range is Rising to Valiant (see [01](01-competency-model.md) section 2.4):

| Rung | Level | Weight column, IC track | Weight column, Management track |
| :-- | :--- | :--- | :--- |
| 1 | Rising | Junior | Junior |
| 2 | Formed | Mid-Level | Mid-Level |
| 3 | Mature | Senior | Senior |
| 4 | Valiant | Staff | Lead |

The weighted score for a candidate level `L`:

```
F_abs(L) = SUM over k of  w(k, L) * C(k)
```

### 4.1 Resolving the circularity: self-consistent level selection

`F_abs` depends on `L`, and `L` is what we are trying to find. The algorithm evaluates all four candidates and keeps the ones that agree with themselves.

Level bands on `F_abs`, rounded to one decimal place:

| `F_abs` rounded to 1dp | Level |
| :--- | :--- |
| 1.0 to 1.4 | Rising |
| 1.5 to 2.4 | Formed |
| 2.5 to 3.4 | Mature |
| 3.5 to 4.0 | Valiant |

**Decision:** the band cut points are 1.5, 2.5 and 3.5. **Reason:** the anchor scale is ordinal and equally spaced by construction (1 = Rising column, 2 = Formed column, 3 = Mature column, 4 = Valiant column), so converting a continuous position on it to a discrete rung is ordinary midpoint rounding. No constant is invented; the cut points are forced by the scale.

The resolution procedure, which is deterministic and always terminates:

```
1. Compute C(k) for the four clusters.
2. For each L in [Rising, Formed, Mature, Valiant]:
       F(L)    = SUM_k w(k, L) * C(k)     rounded to 1dp
       band(L) = the level whose band contains F(L)
3. S = { L : band(L) == L }                 the self-consistent set
4. If |S| >= 1  ->  L* = the LOWEST level in S
5. If |S| == 0  ->  L* = the L minimising the distance from F(L) to the
                    nearest edge of L's own band; ties broken to the lower L
```

**Decision:** when several levels are self-consistent, take the lowest. **Reason:** the instrument is self-administered and self-report inflates (Mabe and West 1982, mean r = .29; Kruger and Dunning 1999). The lowest self-consistent level is the one the answers support without assuming seniority, and the source's own scale gives a designer who is beating that level a way to say so: they land at X.3, which the source defines as "consistently performing above their current level and is a candidate for promotion".

**Frequency of each branch, measured.** The four-dimensional cluster-mean space was swept exhaustively at 1/12 resolution over both tracks, 3.7 million profiles:

| Case | IC track | Management track |
| :--- | --: | --: |
| exactly one self-consistent level | 86.0% | 84.9% |
| two self-consistent levels, lowest taken | 7.5% | 8.4% |
| none self-consistent, fallback used | 6.5% | 6.7% |
| three or more self-consistent levels | 0 | 0 |

The fallback is not a rare theoretical branch, it fires on about one profile in fifteen, so it must be implemented exactly as written and covered by a test.

### 4.2 Calibration check

A respondent who picks the same option on every question must land on that option's rung. Verified on both tracks:

| All answers | `F_abs` | Level | `F_rel` | Sub-level |
| :--- | --: | :--- | --: | :--- |
| option 1 | 1.0 | Rising | 3.0 | X.2 Core |
| option 2 | 2.0 | Formed | 3.0 | X.2 Core |
| option 3 | 3.0 | Mature | 3.0 | X.2 Core |
| option 4 | 4.0 | Valiant | 3.0 | X.2 Core |

A perfectly consistent respondent is a solid performer at their own level, which is exactly what the source says X.2 Core means.

## 5. Step 4: the sub-level

Once `L*` is known, convert each competency anchor into the source's level-relative rating:

```
r(competency) = clamp( a(competency) - idx(L*) + 3 , 1 , 4 )

where idx: Rising = 1, Formed = 2, Mature = 3, Valiant = 4
```

This reproduces the source's operational definitions exactly:

| Relation of `a` to the level | `r` | Sheet `Scoring` label | Sheet `Scoring` definition |
| :--- | :-- | :--- | :--- |
| two or more rungs below | 1 | Not Meeting | "Does not yet demonstrate proficiency in this area or requires constant supervision and guidance." |
| one rung below | 2 | Developing | "Currently in the learning phase; shows occasional success but lacks consistency in execution." |
| at the level | 3 | Meeting | "Consistently demonstrates this competency independently and without the need for follow-up." |
| one or more rungs above | 4 | Exceeding | "Operates beyond the current level expectations and consistently demonstrates behaviors associated with a higher level." |

Then the source's arithmetic runs unchanged:

```
R(k)   = mean( r(competency) for competencies in cluster k )
F_rel  = SUM_k w(k, L*) * R(k)          rounded to 1dp
```

Sub-level bands, verbatim from sheet `Scoring`:

| `F_rel` rounded to 1dp | Sub-level | Sheet `Scoring` description |
| :--- | :--- | :--- |
| 0.2 to 2.6 | **X.1 Entry** | "The designer is new to the role and finding their footing." |
| 2.7 to 3.4 | **X.2 Core** | "The designer is a solid, reliable performer at this level." |
| 3.5 to 4.0 | **X.3 Advanced** | "The designer is consistently performing above their current level and is a candidate for promotion." |

**Decision:** `F_rel` is rounded to one decimal place before banding. **Reason:** the source bands leave gaps between 2.6 and 2.7 and between 3.4 and 3.5. At one decimal place those bands are exhaustive and no cut point has to be invented. The source's own worked example, 2.875, rounds to 2.9 and lands in X.2, which is where the source puts it.

Displayed sub-level label is `idx(L*).1`, `idx(L*).2` or `idx(L*).3`. Mature X.2 displays as **3.2**.

### 5.1 Two properties of the sub-level, stated rather than hidden

**The sub-level measures consistency, not height.** Because the level is resolved to the profile's own weighted centre, `F_rel` is close to 3.0 whenever the profile is even, and drops toward X.1 when the profile is ragged. That is intentional and it matches the source's language: the bands are labelled "mostly Developing", "mostly Meeting", "mostly Exceeding". The asymmetry that produces it is also the source's: from Meeting you can rise one step to Exceeding but fall two steps to Not Meeting, so a profile scattered symmetrically around its own centre scores below 3.0. Inconsistency is penalised, which is the normal behaviour of a behaviourally anchored scale.

**X.3 is rare, and Valiant X.3 is unreachable.** Over 200,000 random profiles, X.3 occurred on 0.02% of them. Valiant X.3 cannot occur at all, because reaching it would require behaviour above the Valiant column and the instrument's top option is anchored to the Valiant column. That is the same statement as "the ceiling is Valiant", not a separate defect. The result screen says so where it applies.

## 6. Step 5: salary position inside the band

The level gives the band; the sub-level gives the position inside it. Bands are the Toman figures from `career_ladder_matrix.md`, unchanged.

```
if   F_rel <= 2.6   then t = 0 ; u = (F_rel - 0.2) / 2.4     X.1
elif F_rel <= 3.4   then t = 1 ; u = (F_rel - 2.7) / 0.7     X.2
else                     t = 2 ; u = (F_rel - 3.5) / 0.5     X.3

p     = clamp( (t + u) / 3 , 0 , 1 )
point = min + (max - min) * p
```

`t` places the respondent in the lower, middle or upper third of the band according to the sub-level, which is what the brief asks for. `u` positions them continuously inside that third according to where `F_rel` sits in its own band, so two people at X.2 are not given identical numbers. The result screen shows the whole band with a marker at `point`, never `point` alone.

| `F_rel` | `p` | Meaning |
| --: | --: | :--- |
| 2.0 | 0.250 | low X.1, lower third |
| 2.6 | 0.333 | top of X.1 |
| 2.7 | 0.333 | bottom of X.2, continuous across the boundary |
| 3.0 | 0.476 | mid X.2, near the middle of the band |
| 3.4 | 0.667 | top of X.2 |
| 3.7 | 0.800 | mid X.3, upper third |
| 4.0 | 1.000 | band maximum |

## 7. The two instruments and the divergence rule

### 7.1 What each mode scores

| Mode | Competencies measured | Score |
| :--- | :--- | :--- |
| self-assessment only | all 15 | full pipeline over 15 |
| scenario only | the 10 with a scenario question | full pipeline over those 10, result screen names the 5 that were not measured |
| both | all 15 | see below |

In **both** mode the app computes three things:

1. `F_self` over all 15 competencies, self-assessment answers only.
2. `F_scen` over the 10 scenario-covered competencies, scenario answers only.
3. `F_comb` over all 15, where a competency covered by both takes the mean of its self and scenario anchors.

`F_comb` resolves the level `L_comb`, and `w(k, L_comb)` is the weight vector used for the comparison.

### 7.2 The divergence statistic

**Decision:** the divergence is computed on the 10 competencies both instruments cover, with a single common weight vector. **Reason:** comparing a 15-competency score against a 10-competency score would confound the instrument difference with a coverage difference, and letting each side use its own resolved level's weights would confound it with a weight difference. Restricting to the shared 10 and fixing the weights makes the difference a pure instrument difference.

```
delta = F_self(shared 10, w at L_comb) - F_scen(shared 10, w at L_comb)
```

### 7.3 When both results are shown

Show both, side by side, when **either** condition holds:

- **(a)** the level resolved from `F_self` differs from the level resolved from `F_scen`; or
- **(b)** `|delta| >= 0.5`

Otherwise show one result, computed from `F_comb`.

**Decision:** the threshold is 0.5. **Reason:** the anchor scale's rungs are 1.0 apart and the level bands round at midpoints, so 0.5 is exactly the smallest difference that can move the resolved rung. Below it the two instruments agree on the rung and showing two numbers would be false precision. The threshold is derived from the band geometry, not chosen. Condition (a) exists because a difference of 0.3 that straddles 2.5 still changes the answer, and the answer is what the respondent came for.

**Why divergence is expected rather than exceptional:** self-evaluation of ability correlates with measured performance at about r = .29 ([Mabe and West 1982](https://doi.org/10.1037/0021-9010.67.3.280)), while situational judgment tests predict job performance at about rho = .34 ([McDaniel et al. 2001](https://pubmed.ncbi.nlm.nih.gov/11519656/)). Two instruments that weakly predict the same thing will frequently disagree. The product treats the gap as a finding, not an error.

### 7.4 What each direction means, in Persian

**`delta` > 0, self-assessment above scenario:**

> در توصیف کارت، رفتار سطح بالاتری را انتخاب کرده‌ای تا در موقعیت واقعی. این معمولاً یعنی زبان و چارچوب سطح بالاتر را می‌شناسی، ولی وقتی فشار زمان و ابهام وارد می‌شود به حرکت‌های آشناتر و کم‌ریسک‌تر برمی‌گردی. فاصله‌ی بین این دو عدد همان چیزی است که در مصاحبه‌ی سطح‌بندی دیده می‌شود، چون آنجا سوال «چه کار می‌کنی» نیست، «بار آخر چه کردی» است.

**`delta` < 0, scenario above self-assessment:**

> در موقعیت‌های واقعی رفتار سطح بالاتری انتخاب کرده‌ای تا وقتی خودت را توصیف می‌کنی. این الگو بین کسانی که تازه دامنه‌ی کارشان بزرگ شده رایج است: کار را در سطح جدید انجام می‌دهند ولی هنوز خودشان را با معیار نقش قبلی می‌سنجند. اگر برای ارتقا یا مذاکره‌ی حقوق آماده می‌شوی، عدد سناریو به واقعیت کارت نزدیک‌تر است تا عدد خودارزیابی.

Neither text tells the respondent which number is correct, because the instrument cannot know.

## 8. Fully worked numeric example

A designer takes **both** modes on the **IC** track.

### 8.1 Answers, as per-competency anchors

Self-assessment anchors are the mean of that competency's two questions, so halves appear.

| Cluster | Competency | self `a` | scenario `a` |
| :--- | :--- | --: | --: |
| Clarity & Trust | complexity-translation | 3.0 | 3 |
| | problem-definition | 3.5 | 3 |
| | strategic-alignment | 2.5 | 2 |
| Insight & Data | product-thinking | 3.0 | not asked |
| | evidence-based-design | 2.5 | 2 |
| | discovery-execution | 2.0 | 2 |
| | solution-accountability | 3.0 | 2 |
| Consistency & Excellence | craftsmanship | 4.0 | 3 |
| | system-stewardship | 3.5 | 3 |
| | shipping-design | 3.5 | not asked |
| | technical-velocity | 3.0 | not asked |
| Growth & Ownership | chapter-contribution | 2.5 | not asked |
| | learning-growth | 3.5 | not asked |
| | adaptability | 3.0 | 3 |
| | mentorship | 3.0 | 2 |

### 8.2 Self-assessment run, all 15 competencies

Cluster means:

```
C(clarity)     = (3.0 + 3.5 + 2.5) / 3           = 3.000
C(insight)     = (3.0 + 2.5 + 2.0 + 3.0) / 4     = 2.625
C(consistency) = (4.0 + 3.5 + 3.5 + 3.0) / 4     = 3.500
C(growth)      = (2.5 + 3.5 + 3.0 + 3.0) / 4     = 3.000
```

`F_abs` under each candidate level's weights:

| Candidate | Weight column | Arithmetic | `F_abs` | Band of that score | Self-consistent |
| :--- | :--- | :--- | --: | :--- | :--- |
| Rising | Junior | 0.10(3.000) + 0.15(2.625) + 0.55(3.500) + 0.20(3.000) | 3.2 | Mature | no |
| Formed | Mid-Level | 0.15(3.000) + 0.25(2.625) + 0.40(3.500) + 0.20(3.000) | 3.1 | Mature | no |
| **Mature** | **Senior** | 0.25(3.000) + 0.30(2.625) + 0.25(3.500) + 0.20(3.000) | **3.0** | **Mature** | **yes** |
| Valiant | Staff | 0.30(3.000) + 0.25(2.625) + 0.20(3.500) + 0.25(3.000) | 3.0 | Mature | no |

`|S| = 1`, so **L\* = Mature**, rung index 3, weight column `Senior`.

Relative ratings, `r = clamp(a - 3 + 3, 1, 4) = clamp(a, 1, 4)`, so at Mature the two scales coincide:

```
R(clarity) = 3.000   R(insight) = 2.625   R(consistency) = 3.500   R(growth) = 3.000
F_rel = 0.25(3.000) + 0.30(2.625) + 0.25(3.500) + 0.20(3.000) = 2.9875  ->  3.0
```

`F_rel = 3.0` falls in 2.7 to 3.4, so **X.2 Core**. Displayed level: **Mature 3.2**.

Salary: Mature band is 72,425,600 to 97,147,520 Toman. `F_rel = 3.0` gives `t = 1`, `u = (3.0 - 2.7)/0.7 = 0.4286`, `p = (1 + 0.4286)/3 = 0.4762`, point = 72,425,600 + 24,721,920 x 0.4762 = **84,197,943 Toman**.

### 8.3 Scenario run, the 10 covered competencies

```
C(clarity)     = (3 + 3 + 2) / 3       = 2.667
C(insight)     = (2 + 2 + 2) / 3       = 2.000
C(consistency) = (3 + 3) / 2           = 3.000
C(growth)      = (3 + 2) / 2           = 2.500
```

| Candidate | `F_abs` | Band | Self-consistent |
| :--- | --: | :--- | :--- |
| Rising | 2.7 | Mature | no |
| Formed | 2.6 | Mature | no |
| **Mature** | **2.5** | **Mature** | **yes** |
| Valiant | 2.5 | Mature | no |

**L\* = Mature** again. `F_rel = 2.5`, which falls in 0.2 to 2.6, so **X.1 Entry**. Displayed: **Mature 3.1**. Salary point: `t = 0`, `u = (2.5 - 0.2)/2.4 = 0.9583`, `p = 0.3194`, point = **80,322,880 Toman**.

### 8.4 Divergence

Combined anchors resolve to Mature as well, so the common weight column is `Senior`.

Self-assessment restricted to the shared 10 competencies, under `Senior` weights:

```
C(clarity) = 3.000   C(insight) = 2.500   C(consistency) = 3.750   C(growth) = 3.000
F_self(shared) = 0.25(3.000) + 0.30(2.500) + 0.25(3.750) + 0.20(3.000) = 3.0
F_scen(shared) = 0.25(2.667) + 0.30(2.000) + 0.25(3.000) + 0.20(2.500) = 2.5

delta = 3.0 - 2.5 = +0.5
```

`|delta| >= 0.5`, so **condition (b) fires and both results are shown side by side**, even though both resolved to Mature. The screen shows Mature 3.2 from self-assessment against Mature 3.1 from scenarios, and the `delta > 0` explanation text from section 7.4.

### 8.5 Combined result, shown only if the divergence rule had not fired

```
C(clarity) = 2.833   C(insight) = 2.438   C(consistency) = 3.313   C(growth) = 2.875
F_abs(Senior weights) = 2.8  ->  Mature,  F_rel = 2.8  ->  X.2 Core  ->  Mature 3.2
salary point = 81,843,474 Toman
```

## 9. Reference implementation, in order

```
resolveResult(answers, track, mode):
  1  anchors      = per-competency mean of chosen option scores, within mode
  2  C[k]         = mean of anchors in cluster k, over measured competencies only
  3  for L in [Rising, Formed, Mature, Valiant]:
         F[L] = round1( sum_k w[k][column(L, track)] * C[k] )
  4  S = [ L for L in levels if bandLevel(F[L]) == L ]
  5  Lstar = S[0] if S else argmin_L ( distanceToOwnBand(F[L]), idx(L) )
  6  r[c]  = clamp(anchors[c] - idx(Lstar) + 3, 1, 4)
  7  R[k]  = mean of r in cluster k
  8  Frel  = round1( sum_k w[k][column(Lstar, track)] * R[k] )
  9  sub   = bandSub(Frel)
 10  p     = salaryPosition(Frel)
 11  point = band.min + (band.max - band.min) * p
```

Rounding rule, applied once and only once: `round1(x)` rounds half away from zero to one decimal place. Do not round intermediate cluster means.

## 10. Test vectors the implementation must reproduce

| # | Input | Expected |
| :-- | :--- | :--- |
| 1 | Sheet `Example` cluster scores 3.000 / 2.500 / 3.000 / 3.000 under `Mid-Level` weights | `F = 2.875`, sub-level X.2. Reproduces the spreadsheet exactly. |
| 2 | Every answer option 1, IC | Rising, `F_abs` 1.0, `F_rel` 3.0, X.2, displayed 1.2 |
| 3 | Every answer option 2, IC | Formed, `F_abs` 2.0, `F_rel` 3.0, X.2, displayed 2.2 |
| 4 | Every answer option 3, IC | Mature, `F_abs` 3.0, `F_rel` 3.0, X.2, displayed 3.2 |
| 5 | Every answer option 4, IC | Valiant, `F_abs` 4.0, `F_rel` 3.0, X.2, displayed 4.2 |
| 6 | Same five, Management track | identical levels and sub-levels |
| 7 | `C` = 1.000 / 1.000 / 1.167 / 2.833, IC | `|S| = 0`, fallback fires, resolves to Rising |
| 8 | The section 8 worked example | self Mature 3.2 and 84,197,943 T, scenario Mature 3.1 and 80,322,880 T, `delta` = +0.5, both shown |
