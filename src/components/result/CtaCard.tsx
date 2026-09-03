import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CTA } from '@/config/copy';

export function CtaCard() {
  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="text-xl">{CTA.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm leading-relaxed">
        <p>{CTA.paragraph1}</p>
        <p>{CTA.paragraph2}</p>
        <p className="font-semibold">{CTA.price}</p>
        <p>
          {CTA.emailIntro}{' '}
          <span lang="en" dir="ltr" className="font-medium underline">
            {CTA.email}
          </span>{' '}
          {CTA.emailInstruction}
        </p>
        <ol className="list-inside list-decimal">
          {CTA.emailItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p>{CTA.closing}</p>
      </CardContent>
    </Card>
  );
}
