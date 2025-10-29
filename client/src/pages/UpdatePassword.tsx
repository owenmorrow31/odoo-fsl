import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Schema = z.object({
  password: z.string().min(8, "Use 8+ characters").regex(/[0-9]/, "Include a number"),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, { path:["confirm"], message:"Passwords do not match" });

type FormData = z.infer<typeof Schema>;

export default function UpdatePassword() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const { register, handleSubmit, formState:{ errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Schema) });

  // After clicking the email link, Supabase creates a temporary session.
  useEffect(() => {
    supabase.auth.getSession().then(() => setReady(true));
  }, []);

  async function onSubmit(values: FormData) {
    const { error } = await supabase.auth.updateUser({ password: values.password });
    if (error) return toast.error(error.message);
    toast.success("Password updated. Please sign in.");
    nav("/login", { replace: true });
  }

  if (!ready) return null;
  return (
    <div style={{ maxWidth: 380, margin:"48px auto", padding:24, border:"1px solid #eee", borderRadius:12 }}>
      <h2>Set a new password</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display:"grid", gap:12 }}>
        <label>
          <span>New password</span>
          <input type="password" {...register("password")} />
          {errors.password && <small style={{ color:"#b00020" }}>{errors.password.message}</small>}
        </label>
        <label>
          <span>Confirm</span>
          <input type="password" {...register("confirm")} />
          {errors.confirm && <small style={{ color:"#b00020" }}>{errors.confirm.message}</small>}
        </label>
        <button type="submit">{isSubmitting ? "Updating..." : "Update password"}</button>
      </form>
    </div>
  );
}
