import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "At least 6 characters"),
});
type FormData = z.infer<typeof Schema>;

export default function Login() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(values: FormData) {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      toast.error(error.message);
      return;
    }
    const redirect = params.get("next") || "/app";
    nav(redirect, { replace: true });
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue"
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={isSubmitting ? "Signing in..." : "Sign in"}
    >
      <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
      <div style={{ display:"flex", justifyContent:"space-between", marginTop: 8 }}>
        <Link to="/signup">Create account</Link>
        <Link to="/reset">Forgot password?</Link>
      </div>
    </AuthCard>
  );
}

/* Shared little components */
import { forwardRef } from "react";
const Input = forwardRef<HTMLInputElement, { label:string; error?:string } & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ label, error, ...props }, ref) => (
    <label style={{ display:"grid", gap:6 }}>
      <span>{label}</span>
      <input ref={ref} {...props} style={{ padding:10, border:"1px solid #ddd", borderRadius:8 }} />
      {error && <small style={{ color:"#b00020" }}>{error}</small>}
    </label>
  )
);
function AuthCard(props: { title:string; subtitle?:string; children: React.ReactNode; onSubmit:(e:React.FormEvent)=>void; submitLabel:string }) {
  return (
    <div style={{ maxWidth: 380, margin:"48px auto", padding:24, border:"1px solid #eee", borderRadius:12 }}>
      <h2 style={{ margin:0 }}>{props.title}</h2>
      {props.subtitle && <p style={{ opacity:.7 }}>{props.subtitle}</p>}
      <form onSubmit={props.onSubmit} style={{ display:"grid", gap:12 }}>
        {props.children}
        <button type="submit" style={{ padding:"10px 12px" }}>{props.submitLabel}</button>
      </form>
    </div>
  );
}
