import { Check } from "lucide-react";

type Plan =
  | { name: "Hobby"; price: "$0" }
  | {
      name: "Pro";
      price: {
        monthly: "$12";
        yearly: "$10";
      };
    };

export type Detail = Plan & {
  button: string;
  variant: "default" | "outline";
  highlight?: boolean;
};

export type CardDetail = Detail & {
  description: string;
  features: string[];
  extra: string;
};

export type TableSection = {
  title: string;
  rows: {
    label: string;
    hobby: string | React.ReactNode;
    pro: string | React.ReactNode;
  }[];
};

export const details: Detail[] = [
  {
    name: "Hobby",
    price: "$0",
    button: "Join for free",
    variant: "default",
  },
  {
    name: "Pro",
    price: {
      monthly: "$12",
      yearly: "$10",
    },
    button: "Get started",
    variant: "outline",
    highlight: true,
  },
];

export const cardDetails: CardDetail[] = [
  {
    ...(details.find((d) => d.name === "Hobby") as Detail),
    description: "For individuals looking to organise their personal projects",
    features: [
      "Real-time editing and collaboration",
      "Up to 5 notes",
      "5 collaborators per note",
    ],
    extra: "Scrib AI trial",
  },
  {
    ...(details.find((d) => d.name === "Pro") as Detail),
    description: "For professionals and teams looking to work together",
    features: [
      "Real-time editing and collaboration",
      "Up to 50 notes",
      "50 collaborators per note",
    ],
    extra: "Scrib AI full access",
  },
];

export const tableSections: TableSection[] = [
  {
    title: "Features",
    rows: [
      { label: "Real-time editing", hobby: <Check />, pro: <Check /> },
      { label: "Notes", hobby: "Up to 5", pro: "Up to 50" },
    ],
  },
  {
    title: "Collaboration",
    rows: [
      { label: "Real-time collaboration", hobby: <Check />, pro: <Check /> },
      { label: "Collaborators", hobby: "Up to 5", pro: "Up to 50" },
    ],
  },
  {
    title: "Other",
    rows: [{ label: "Scrib AI", hobby: "Trial", pro: "Full access" }],
  },
];

export const pricingFAQs = [
  {
    question: "What is Scrib?",
    answer: `
        Scrib is a real-time collaborative document and note-taking app
        that helps individuals and teams capture ideas, organize
        thoughts, and build projects together. Designed for both
        productivity and creativity, it makes it easy to brainstorm,
        write, and refine content while staying in sync with others,
        whether you're drafting notes, planning, or exploring new
        ideas.
    `,
  },
  {
    question: "What can I use Scrib for?",
    answer: `
        You can use Scrib for everything from quick notes and 
        brainstorming sessions to detailed project documentation, 
        meeting minutes, editing study materials or creative writing.
    `,
  },
  {
    question: "Do you offer discounts for students and educators?",
    answer: `
       No, we currently do not offer discounts for students or educators.
       Discount programs are under consideration and may be introduced in the future.
    `,
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept payments made with all major credit and debit cards.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: `
      Yes. Subscriptions can be canceled at any time. After cancellation, you will 
      continue to have access to Pro features until the end of the current billing cycle.
    `,
  },
  {
    question: "What is your refund policy?",
    answer: `
        We do not offer refunds. If you cancel your subscription, you will retain access to 
        Pro features until the current billing cycle ends.
    `,
  },
];
