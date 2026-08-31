import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../stores/auth";

const loginSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(40, "Name must be 40 characters or fewer.")
    .refine((value) => !/^\d+$/.test(value), "Name cannot be only numbers."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login("fake-token-123", { name: values.name });
    navigate("/");
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
