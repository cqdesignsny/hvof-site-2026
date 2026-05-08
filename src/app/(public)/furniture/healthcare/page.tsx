import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Healthcare Furniture",
  description:
    "Patient seating, exam rooms, waiting areas, nurse stations, and clinical case goods. Antimicrobial fabrics, vinyl-wrapped surfaces, bariatric-rated seating.",
};

export default function HealthcarePage() {
  return (
    <CategoryTemplate
      category="healthcare"
      eyebrow="Furniture, Healthcare"
      title="Furniture for the rooms where people heal."
      intro="Patient rooms, exam rooms, waiting areas, and nurse stations. Antimicrobial finishes, cleanable surfaces, bariatric ratings, and the comfort that long days demand."
      heroImage={IMG.marshallSterling.gallery[4]}
      heroAlt="HVOF healthcare-style install"
      breadcrumb="Healthcare"
      href="/furniture/healthcare"
      subCategories={[
        { name: "Patient seating", description: "Recliner-style and chair-side seating in vinyl and Crypton fabric. Bariatric ratings up to 750 lb.", startingPrice: "From $899" },
        { name: "Exam-room seating", description: "Stools, exam tables, and side seating for clinicians. Easy-clean and antimicrobial.", startingPrice: "From $349" },
        { name: "Waiting-room seating", description: "Lounge, modular bench, and tandem seating for high-traffic waiting areas.", startingPrice: "From $499" },
        { name: "Nurse stations", description: "ADA-compliant stations with integrated power, lockable storage, and quiet acoustics.", startingPrice: "From $3,499" },
        { name: "Casegoods + storage", description: "Tilt-bins, mobile carts, file-room and central-supply storage units.", startingPrice: "From $899" },
        { name: "Behavioral health seating", description: "Tamper-resistant, weighted, and ligature-resistant options for behavioral environments.", startingPrice: "From $1,099" },
      ]}
      features={[
        "Antimicrobial and bleach-cleanable upholstery on every healthcare model.",
        "Bariatric ratings to 600 lb on most lounge models, up to 750 lb on heavy-duty lines.",
        "Field-measured patient-room layouts and ADA review included with the quote.",
        "Coordination with your IPC team on finish materials and cleaning protocols.",
      ]}
      faqs={[
        {
          question: "Do you carry behavioral-health rated furniture?",
          answer: "Yes. We carry tamper-resistant and ligature-resistant lines with weighted bases and through-bolt mounting designed for behavioral environments.",
        },
        {
          question: "What is the lead time on patient-room furniture?",
          answer: "Stock patient seating ships in 2 to 4 weeks. Custom Crypton or specialty-rated finishes typically run 6 to 10 weeks.",
        },
        {
          question: "Can you handle the install during off-hours?",
          answer: "Yes. We frequently install nights and weekends in clinical environments. We work around your patient-flow schedule.",
        },
      ]}
    />
  );
}
