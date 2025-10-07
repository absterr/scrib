import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const FAQ = ({ question, answer }: { question: string; answer: string }) => (
  <Collapsible key={question} className="bg-neutral-100 p-5 rounded-2xl w-full">
    <CollapsibleTrigger className="w-full flex justify-between items-center group">
      <span className="font-semibold text-lg">{question}</span>
      <div className="pt-0.5">
        <Plus className="w-5 group-aria-expanded:rotate-45 transition-transform duration-150" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent
      className={cn(
        "pt-4 text-sm font-semibold text-neutral-600 overflow-hidden",
        "transition-all duration-150 ease-in-out",
        "data-[state=closed]:animate-collapsible-up",
        "data-[state=open]:animate-collapsible-down"
      )}
    >
      {answer}
    </CollapsibleContent>
  </Collapsible>
);

export default FAQ;
