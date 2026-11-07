export type WorkGroup = "shipped" | "study" | "experiment";

export type WorkItem = {
  name: string;
  summary: string;
  meta: string;
  group: WorkGroup;
  href: string;
};

export type StudioCard = {
  index: string;
  title: string;
  summary: string;
  points: string[];
};

export type Milestone = {
  year: string;
  title: string;
  text: string;
};

export type NoteSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type Note = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  excerpt: string;
  sections: NoteSection[];
};

export const profile = {
  name: "Sharukh",
  location: "Lisbon",
  since: "2019",
  statement: "Read Write And Repeat",
  lede: "Hey There, Its Nice To see You here. Myself Sharukh, i love building New website and app. exploring Web3 world. Not a financial advisor.",
  now: "Setting type for a long note about maintenance.",
  hours: "Tue–Thu, by appointment",
};

export const stats = [
  { value: "14", label: "tools still running" },
  { value: "36", label: "field notes" },
  { value: "7", label: "years at one desk" },
];

export const work: WorkItem[] = [
  {
    name: "Ledger Line",
    summary: "A ledger for studios that still send invoices as documents.",
    meta: "Live · 2024",
    group: "shipped",
    href: "/#studio",
  },
  {
    name: "Room Tone",
    summary: "A recorder that keeps the room and lets the noise go.",
    meta: "Live · 2025",
    group: "shipped",
    href: "/#studio",
  },
  {
    name: "Margin",
    summary: "Reading widths for long essays, as a small extension.",
    meta: "Live · 2023",
    group: "shipped",
    href: "/notes/quiet-tools",
  },
  {
    name: "Desk Clock",
    summary: "One clock for the hours a tool is actually opened.",
    meta: "Live · 2022",
    group: "shipped",
    href: "/#studio",
  },
  {
    name: "Index Card",
    summary: "A local index for notes that should stay on the machine.",
    meta: "Live · 2021",
    group: "shipped",
    href: "/notes/quiet-tools",
  },
  {
    name: "Quiet tools",
    summary: "What gets removed before anything new is added.",
    meta: "Essay",
    group: "study",
    href: "/notes/quiet-tools",
  },
  {
    name: "Shipping alone",
    summary: "A practice that still fits at one desk.",
    meta: "Essay",
    group: "study",
    href: "/notes/shipping-alone",
  },
  {
    name: "A maintenance week",
    summary: "The release was the smaller part of the work.",
    meta: "Essay",
    group: "study",
    href: "/notes/maintenance-week",
  },
  {
    name: "Paper Route",
    summary: "A short letter set in the same type as the product.",
    meta: "Bench",
    group: "experiment",
    href: "/#path",
  },
  {
    name: "Threshold",
    summary: "An empty state that explains the next step in one sentence.",
    meta: "Bench",
    group: "experiment",
    href: "/notes/quiet-tools",
  },
  {
    name: "Winter Log",
    summary: "A private log of bugs that only appear in January.",
    meta: "Bench",
    group: "experiment",
    href: "/notes/maintenance-week",
  },
];

export const studio: StudioCard[] = [
  {
    index: "01",
    title: "Research",
    summary:
      "The first drawing is of the day the tool has to survive. Who opens it, what they already know, and which part they will still trust a year from now.",
    points: ["A written brief before a screen", "One primary task", "A list of what was refused"],
  },
  {
    index: "02",
    title: "Product",
    summary:
      "The tool is small enough to finish and plain enough to repair. The same person carries it from the first visit through the first season of use.",
    points: ["One person carries it", "Details a stranger can mend", "A version that can sit still"],
  },
  {
    index: "03",
    title: "Notes",
    summary:
      "The note is published while the work is still warm. It says what changed, what failed, and what is worth repeating on the next desk.",
    points: ["Written beside the release", "Short enough to finish", "Linked from the menu"],
  },
];

export const milestones: Milestone[] = [
  {
    year: "2019",
    title: "The desk opens",
    text: "Left a product team and started a practice that had to fit in one room in Lisbon.",
  },
  {
    year: "2021",
    title: "Index Card",
    text: "The first tool that is still in daily use. It holds these notes, on the machine, with no account.",
  },
  {
    year: "2023",
    title: "The note ships too",
    text: "A release and its field note go out in the same week. The note is part of the work, not a postscript.",
  },
  {
    year: "2025",
    title: "Room Tone, then winter",
    text: "Shipped the recorder, then spent the cold months on maintenance instead of a launch.",
  },
  {
    year: "2026",
    title: "This public desk",
    text: "The practice is gathered in one scroll. The menu at the top is yours to edit.",
  },
];

export const places = ["Lisbon", "Porto", "Oslo", "Kyoto", "Glasgow", "Oaxaca", "Montreal"];

export const faqs = [
  {
    question: "Who is the work for?",
    answer:
      "Small teams and solo practices that want software they can understand without a tour. The tools stay small on purpose.",
  },
  {
    question: "Do you take commissions?",
    answer:
      "A few each year, usually when the brief can be held by one person. The form on this page keeps the note here, because the site is a demonstration.",
  },
  {
    question: "How do I change the menu?",
    answer:
      "Edit src/config/navigation.ts. You can rename links, point them at sections or pages, reorder them, nest a dropdown, and hide any item. Reload the page after saving the file.",
  },
  {
    question: "What on this site is real?",
    answer:
      "The site is a working demonstration, so the navigation, motion, and scroll can be tried on their own.",
  },
];

export const notes: Note[] = [
  {
    slug: "quiet-tools",
    title: "Quiet tools",
    kicker: "Interfaces",
    date: "March 2026",
    excerpt: "A tool should explain itself at the size of a glance, then get out of the way.",
    sections: [
      {
        id: "opening",
        heading: "The glance",
        paragraphs: [
          "I judge an interface by what it does in the first second. The person already knows why they opened it. The screen’s job is to confirm that, and then to wait.",
          "Margin, the reading extension, has one control. The rest of the chrome was a list of good ideas that made the sentence harder to see. They left the build.",
        ],
      },
      {
        id: "later",
        heading: "What stays",
        paragraphs: [
          "What stays is usually a dimension, a default, and a way to undo. If a feature needs a tour, it is not ready for this desk.",
          "Quiet is not the same as empty. Empty is a room with no chair. Quiet is a room where the chair is already in the light.",
        ],
      },
    ],
  },
  {
    slug: "shipping-alone",
    title: "Shipping alone",
    kicker: "Practice",
    date: "November 2025",
    excerpt: "A practice of one is a constraint, and the constraint is the design.",
    sections: [
      {
        id: "opening",
        heading: "The size of the desk",
        paragraphs: [
          "I take work that one person can hold from the first conversation to the first winter. That rule removes more briefs than it accepts. It also keeps the software repairable.",
          "There is no handoff. The person who heard the complaint is the person who changes the file. The notes exist so a future reader can join without a meeting.",
        ],
      },
      {
        id: "later",
        heading: "A calendar with edges",
        paragraphs: [
          "Commissions sit on Tuesday through Thursday. Monday is for the tools that already have users. Friday is for the note.",
          "The edges are how the work stays small. A desk without edges starts collecting features the way a hallway collects coats.",
        ],
      },
    ],
  },
  {
    slug: "maintenance-week",
    title: "A maintenance week",
    kicker: "Upkeep",
    date: "January 2026",
    excerpt: "The useful week was the one with no launch.",
    sections: [
      {
        id: "opening",
        heading: "After the scaffold",
        paragraphs: [
          "Room Tone shipped in the autumn. In January I went back with a list and no new idea. Drafts collected at a door I had called finished. A meter ran long on machines that sleep.",
          "None of it would have made a launch post. All of it changed whether the tool is still pleasant in week twelve.",
        ],
      },
      {
        id: "later",
        heading: "What I wrote down",
        paragraphs: [
          "I keep a winter log now: bugs that appear only when the room is cold, the network is poor, or the person is tired. The log is private. The lesson is not.",
          "Maintenance is a feature with a date on it. If it is not on the calendar, the next release will pretend the last one was done.",
        ],
      },
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
