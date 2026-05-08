import type { Metadata } from "next";
import { CategoryTemplate } from "@/components/sections/category-template";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Pods + Phonebooths",
  description:
    "Acoustic privacy spaces for the open office. Phonebooths, meeting pods, and focus rooms with integrated lighting, ventilation, and AV-ready power.",
};

export default function PodsPage() {
  return (
    <CategoryTemplate
      eyebrow="Furniture, Pods + Phonebooths"
      title="Quiet rooms, dropped wherever you need them."
      intro="Acoustic phonebooths and meeting pods that turn open-plan square footage into focus space. Pre-wired, ventilated, and ready for video calls."
      heroImage={IMG.marshallSterling.gallery[3]}
      heroAlt="HVOF acoustic pod installation"
      breadcrumb="Pods + Phonebooths"
      href="/furniture/pods"
      subCategories={[
        { name: "Single-person phonebooths", description: "30 NRC sound rating, integrated power-USB, stand-or-sit. Most popular: Frame, Loop, Q-Series.", startingPrice: "From $5,499" },
        { name: "Two-person huddle pods", description: "Side-by-side meeting pods with shared screen mount and acoustic glass.", startingPrice: "From $8,999" },
        { name: "Four-person meeting pods", description: "Soft-seating arrangements for video calls and quick syncs.", startingPrice: "From $14,999" },
        { name: "Six-person conference pods", description: "Full conference rooms inside the floor plate. AV-ready, lighting, ventilation.", startingPrice: "From $24,999" },
        { name: "Open-air booths", description: "Lower-cost privacy with sound-absorbing fabric and partial enclosure.", startingPrice: "From $2,899" },
      ]}
      features={[
        "ADA-compliant configurations available on every model.",
        "Plug-and-play install. Standard 110V outlet, no construction required.",
        "Custom branding on the exterior wrap available.",
        "Most pods relocate easily for floor reconfigurations.",
      ]}
      faqs={[
        {
          question: "How loud is the room from the outside of the booth?",
          answer: "Phonebooths block roughly 30 NRC of sound, comparable to a typical drywall office wall. You hear the booth user as a low murmur from outside.",
        },
        {
          question: "Do they need to be hardwired for power?",
          answer: "No. All booths run on a single 110V outlet. We coordinate placement near existing power, or recommend the floor coring if you want a permanent install.",
        },
        {
          question: "Can the booths be moved later?",
          answer: "Yes. Most lines are designed to relocate. We disassemble, transport, and reassemble for floor reconfigurations.",
        },
      ]}
    />
  );
}
