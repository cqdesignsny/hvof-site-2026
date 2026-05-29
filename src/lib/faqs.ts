/**
 * Site-wide generic content from the May 29, 2026 team meeting.
 *
 * "What's included" and the FAQs are intentionally about HVOF as a company,
 * not product-specific. They are reused at the bottom of every category page
 * (a short preview + "See more FAQs" button) and in full on the /faq page.
 *
 * Warranty questions are deliberately omitted until John provides official
 * language (liability). Do not reintroduce product-specific warranty claims.
 */

export const WHATS_INCLUDED: string[] = [
  "Forty-plus years of experience helping you select the right fit for every space.",
  "Product available in as little as one week, delivered and assembled.",
  "Our own in-house delivery team, never third-party labor.",
  "Free assembly and installation.",
  "End-to-end white-glove service, start to finish.",
  "Access to our 37,000 square foot showroom for in-person product trials.",
  "A dedicated sales representative assigned to your project.",
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const GENERIC_FAQS: FAQItem[] = [
  {
    question: "How long does it take to get my furniture?",
    answer:
      "Our most popular items are in stock for immediate delivery, and thousands of additional items are available in one week or less. Special-order and custom pieces typically arrive in about four to six weeks.",
  },
  {
    question: "Is your showroom open to the public?",
    answer:
      "Yes. Our 37,000 square foot showroom in Wappingers Falls is open to the public Monday through Friday, 8:30 to 5:00.",
  },
  {
    question: "How do I know if I qualify for New York State contract pricing?",
    answer:
      "Any organization that receives even one dollar of funding from the State of New York is eligible to buy at NYS contract pricing, the lowest pricing available through the state's collective purchasing power. Municipalities, fire departments, school districts, and nonprofits all qualify.",
  },
  {
    question: "I'm moving into a new space and don't have a plan. Can someone help?",
    answer:
      "Yes. We built our business on helping you plan the space. We produce full layouts and work with your architect or designer, or design it with our own in-house team, whatever you need.",
  },
  {
    question: "Can you match our brand colors or add our logo?",
    answer:
      "Yes. We can design furniture around your logo, brand colors, theme, or scheme. We have put corporate logos on chairs and conference tables and matched color palettes across the many manufacturers we represent.",
  },
  {
    question: "Do you remove our existing furniture?",
    answer:
      "On a case-by-case basis, depending on the scale of the project. We will work with you to find the most cost-effective way to handle your existing furniture.",
  },
  {
    question: "Do you sell pre-owned office furniture?",
    answer:
      "Yes. We have an entire showroom of pre-owned furniture in Wappingers Falls, with hundreds of desks, chairs, filing cabinets, bookcases, and conference tables on display.",
  },
  {
    question: "Is there a minimum order?",
    answer:
      "No. We serve everyone from a single person working out of a home office to multinational corporations outfitting entire suites of furniture.",
  },
  {
    question: "Are there geographic limitations?",
    answer:
      "No. While we are based in the Hudson Valley, we have completed projects in California, Texas, Florida, and Georgia. We are here to fill your need wherever you are.",
  },
  {
    question: "Does the furniture ship assembled, or do I have to put it together?",
    answer:
      "Full white-glove service, delivered and installed, is our standard. You stand and watch while we bring everything in and place it. If you prefer the lowest possible price, we can also deliver it unassembled.",
  },
];

/**
 * The most universal questions, shown at the bottom of each page with a
 * "See more FAQs" button linking to the full /faq page.
 */
export const FAQ_PREVIEW: FAQItem[] = [
  GENERIC_FAQS[0], // lead time
  GENERIC_FAQS[1], // showroom hours
  GENERIC_FAQS[2], // NYS eligibility
  GENERIC_FAQS[3], // space planning
];
