import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { askAi } from "../api/client";
import { reviewFormSchema, type ReviewFormValues } from "../schemas/reviewSchema";
import type { AiReview } from "../types";

const READINESS_STYLE: Record<AiReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  almost: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  "not-yet": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export default function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });

  const review = useMutation({ mutationFn: askAi });

  const onSubmit = (values: ReviewFormValues) => {
    review.mutate(values.prompt);
  };

  return (
    <section className="max-w-2xl">
      <h2 className="mb-1 text-2xl font-bold">AI Review</h2>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Describe your project and get feedback before you submit it.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="prompt">Project description</Label>
          <textarea
            id="prompt"
            rows={6}
            aria-invalid={Boolean(errors.prompt)}
            aria-describedby={errors.prompt ? "prompt-error" : undefined}
            placeholder="What it does, how it is built, and where it runs..."
            className="rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            {...register("prompt")}
          />
          {errors.prompt && (
            <p id="prompt-error" role="alert" className="text-sm text-red-600">
              {errors.prompt.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={review.isPending}
          className="justify-self-start"
        >
          {review.isPending ? "Reviewing..." : "Review my project"}
        </Button>
      </form>

      {review.isError && (
        <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-300">
          {review.error.message}
        </p>
      )}

      {review.data && (
        <div className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <span
            className={`justify-self-start rounded px-2 py-0.5 text-sm font-semibold ${READINESS_STYLE[review.data.readiness]}`}
          >
            {review.data.readiness}
          </span>
          <p>{review.data.summary}</p>

          <div>
            <h3 className="font-semibold">Strengths</h3>
            <ul className="list-disc pl-5 text-sm">
              {review.data.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Before you submit</h3>
            <ul className="list-disc pl-5 text-sm">
              {review.data.improvements.map((improvement) => (
                <li key={improvement}>{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
