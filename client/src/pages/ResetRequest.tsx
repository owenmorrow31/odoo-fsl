import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const Schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof Schema>;

export default function ResetRequest() {
  const { register, handleSubmit, formState:{ errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(values: FormData) {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${location.origin}/update-password`
    });
    if (error) return toast.error(error.message);
    toast.success("Password reset email sent.");
  }

  return (
    <div style={{ maxWidth: 380, margin:"48px auto", padding:24, border:"1px solid #eee", borderRadius:12 }}>
      <h2>Reset password</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display:"grid", gap:12 }}>
        <label>
          <span>Email</span>
          <input type="email" {...register("email")} />
          {errors.email && <small style={{ color:"#b00020" }}>{errors.email.message}</small>}
        </label>
        <button type="submit">{isSubmitting ? "Sending..." : "Send reset link"}</button>
      </form>
    </div>
  );
}
