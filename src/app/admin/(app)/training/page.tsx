import { TrainingForm } from "@/components/admin/training-form";

export const metadata = { title: "Agent Training" };

export default function TrainingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-10 md:py-12 lg:px-14">
      <TrainingForm />
    </div>
  );
}
