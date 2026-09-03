import type { Cluster } from '@/types';

/**
 * The 4 clusters and the cluster weight table, verbatim from sheet `Scoring`.
 * Every MatrixColumn's weights sum to 1.000 across the four clusters, see docs/02 section 4.
 */
export const CLUSTERS: readonly Cluster[] = [
  {
    id: 'clarity-trust', en: 'Clarity & Trust', fa: 'شفافیت و اعتماد', faAuthored: true,
    weights: {
      junior: 0.10, 'mid-level': 0.15, senior: 0.25, staff: 0.30,
      lead: 0.35, principal: 0.35, manager: 0.35,
    },
  },
  {
    id: 'insight-data', en: 'Insight & Data', fa: 'بینش و داده',
    weights: {
      junior: 0.15, 'mid-level': 0.25, senior: 0.30, staff: 0.25,
      lead: 0.20, principal: 0.30, manager: 0.25,
    },
  },
  {
    id: 'consistency-excellence', en: 'Consistency & Excellence', fa: 'یکپارچگی و کیفیت',
    weights: {
      junior: 0.55, 'mid-level': 0.40, senior: 0.25, staff: 0.20,
      lead: 0.10, principal: 0.10, manager: 0.05,
    },
  },
  {
    id: 'growth-ownership', en: 'Growth & Ownership', fa: 'رشد و حس مالکیت',
    weights: {
      junior: 0.20, 'mid-level': 0.20, senior: 0.20, staff: 0.25,
      lead: 0.35, principal: 0.25, manager: 0.35,
    },
  },
] as const satisfies readonly Cluster[];
