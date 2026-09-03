import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CLUSTERS } from '@/config/clusters';
import { RESULT, toFaDigits } from '@/config/copy';
import type { ClusterResult } from '@/types';

export function ClusterTable({ clusters }: { clusters: readonly ClusterResult[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">{RESULT.clusterTable.cluster}</TableHead>
          <TableHead scope="col">{RESULT.clusterTable.score}</TableHead>
          <TableHead scope="col">{RESULT.clusterTable.weight}</TableHead>
          <TableHead scope="col">{RESULT.clusterTable.contribution}</TableHead>
          <TableHead scope="col">{RESULT.clusterTable.coverage}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clusters.map((c) => {
          const cluster = CLUSTERS.find((x) => x.id === c.cluster)!;
          const contribution = c.weight * c.score;
          return (
            <TableRow key={c.cluster}>
              <TableCell className="whitespace-normal">{cluster.fa}</TableCell>
              <TableCell className="tabular-fa">{c.score.toFixed(1)}</TableCell>
              <TableCell className="tabular-fa">{c.weight.toFixed(2)}</TableCell>
              <TableCell className="tabular-fa">{contribution.toFixed(2)}</TableCell>
              <TableCell>
                {toFaDigits(c.measuredCount)} از {toFaDigits(c.totalCount)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
