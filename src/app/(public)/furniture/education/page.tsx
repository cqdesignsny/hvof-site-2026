import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Education Furniture",
  description:
    "Classroom furniture, lecture-hall seating, faculty offices, library and study commons, and student lounge spaces. Authorized vendor on multiple NYS BOCES contracts.",
};

export default function EducationPage() {
  return (
    <CategoryTemplate
      category="education"
      eyebrow="Furniture, Education"
      title="Classrooms, faculty offices, and the library."
      intro="From classrooms and lecture halls to faculty offices, libraries, student lounges, and collaborative learning spaces, we provide furniture solutions that support teaching, learning, and connection."
      heroImage={IMG.marist.two}
      heroAlt="HVOF education installation, Marist College"
      breadcrumb="Education"
      href="/furniture/education"
      subCategories={[
        { name: "Classroom seating", description: "Tablet-arm, sled-base, and stack-chair classroom seating in matched sets.", startingPrice: "From $169" },
        { name: "Lecture-hall seating", description: "Fixed and tiered lecture-hall seating with tablet arms and technology integration.", startingPrice: "From $599 per seat" },
        { name: "Faculty offices", description: "Single and shared faculty workstations with bookcase storage and tackable surfaces.", startingPrice: "From $1,899" },
        { name: "Student commons", description: "Soft-seating clusters, modular benching, and study-pod environments.", startingPrice: "From $1,499" },
        { name: "Library tables + carrels", description: "Quiet-study carrels, reading tables, and group-study booths.", startingPrice: "From $899" },
        { name: "Maker + STEM rooms", description: "Mobile, height-adjustable workstations for STEM and maker spaces.", startingPrice: "From $1,099" },
      ]}
      features={[
        "Authorized vendor on multiple NYS BOCES and OGS education contracts.",
        "All seating BIFMA-rated for institutional use, with 10 to 15 year warranties.",
        "Custom finishes match school colors and existing palettes.",
        "Summer and winter-break installation windows scheduled in advance.",
      ]}
      faqs={[
        {
          question: "Do you handle BOCES-bid projects?",
          answer: "Yes, all the time. We are an authorized vendor on multiple BOCES and OGS contracts. We can submit on-contract pricing in your procurement portal.",
        },
        {
          question: "Can you install during summer break?",
          answer: "Absolutely. Most education installs happen between June and August. We schedule and staff for the window.",
        },
        {
          question: "Do you carry stack chairs in volume?",
          answer: "Yes. We can quote 50, 100, or 500-chair classroom packages with matched colors and stack-cart accessories.",
        },
      ]}
    />
  );
}
