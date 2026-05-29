import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Conference Furniture",
  description:
    "Boardroom tables, training-room tables, technology-integrated meeting spaces, conference seating in matched suites. From four-person huddle rooms to thirty-seat boardrooms.",
};

export default function ConferencePage() {
  return (
    <CategoryTemplate
      category="conference"
      eyebrow="Furniture, Conference"
      title="Boardrooms, training rooms, and the spaces between."
      intro="Boardroom tables, training rooms, Zoom rooms, and technology-integrated meeting spaces."
      heroImage={IMG.marshallSterling.gallery[2]}
      heroAlt="HVOF conference room installation"
      breadcrumb="Conference"
      href="/furniture/conference"
      subCategories={[
        { name: "Boardroom tables", description: "Boat-shape, racetrack, rectangular. 8 to 30 ft. Walnut, oak, cypress, and laminate finishes.", startingPrice: "From $2,499" },
        { name: "Training-room tables", description: "Mobile flip-top tables that nest. Single-user, 2-user, and 4-user configurations.", startingPrice: "From $649" },
        { name: "Huddle and meeting", description: "4 to 6 person collaboration tables. Round, rectangular, and L-shape options.", startingPrice: "From $549" },
        { name: "Conference seating", description: "Matched suites of mid- and high-back conference chairs. Leather, mesh, fabric.", startingPrice: "From $349" },
        { name: "Technology integration", description: "Tabletop power-data, wireless charging, video grommets, and integrated technology bezels.", startingPrice: "Quoted with table" },
        { name: "Credenzas + storage", description: "Matching credenzas, presentation walls, and technology cabinets sized to the room.", startingPrice: "From $1,099" },
      ]}
      features={[
        "Custom-cut tabletops with power, data, and technology integration.",
        "Matched chair suites in any quantity, custom upholstery available.",
        "Field measurement, room-fit verification, and CAD layout included with every quote.",
        "Site-built solid-wood tops available for boardroom centerpiece projects.",
      ]}
      faqs={[
        {
          question: "How long is the lead time on a custom boardroom?",
          answer: "Stock tabletops with stock chairs ship in 3 to 4 weeks. Custom finishes, custom power configurations, or matched veneers typically run 8 to 12 weeks.",
        },
        {
          question: "Can you cut power and data into the tabletop?",
          answer: "Yes. We pre-cut grommets and integrate power-data modules from manufacturers including Mho, Byrne, and Doug Mockett.",
        },
        {
          question: "Do you set up the technology?",
          answer: "We install the furniture and coordinate with your technology integrator on cable routing. Some manufacturers include Crestron / Logitech-ready cutouts on the table.",
        },
      ]}
    />
  );
}
