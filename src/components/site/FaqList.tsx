/** @jsxImportSource @/lib/tx */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faq } from "@/config/faq";

export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faq.slice(0, limit) : faq;
  return (
    <Accordion type="single" collapsible className="divide-y divide-border rounded-3xl border border-border bg-card px-5 shadow-card sm:px-8">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`q-${i}`} className="border-0">
          <AccordionTrigger className="gap-4 py-6 text-left font-display text-lg font-medium text-foreground hover:no-underline data-[state=open]:text-primary sm:text-xl">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
