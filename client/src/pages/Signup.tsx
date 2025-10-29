// Removed duplicate import
// ...existing code...
// ...existing code...
import type { ReactNode, FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Use 8+ characters").regex(/[0-9]/, "Include a number"),
  confirm: z.string()
}).refine(d => d.password === d.confirm, { path:["confirm"], message:"Passwords do not match" });

type FormData = z.infer<typeof Schema>;

export default function Signup() {
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } =
    useForm<FormData>({ resolver: zodResolver(Schema) });

  async function onSubmit(values: FormData) {
    const { error } = await supabase.auth.signUp({ email: values.email, password: values.password });
    if (error) return toast.error(error.message);
    toast.success("Check your email to confirm your account.");
    reset({ email: values.email, password: "", confirm: "" });
  }

  return (
    <AuthCard
      title="Create your account"
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={isSubmitting ? "Creating..." : "Sign up"}
    >
      <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
      <Input label="Confirm password" type="password" error={errors.confirm?.message} {...register("confirm")} />
      <div style={{ textAlign:"right" }}>
        <Link to="/login">Already have an account?</Link>
      </div>
    </AuthCard>
  );
}

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
Input.displayName = "Input";
type AuthCardProps = {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel: string;
  children: ReactNode;
};
function AuthCard(props: AuthCardProps) {
  return (
    <div style={{ maxWidth: 380, margin:"48px auto", padding:24, border:"1px solid #eee", borderRadius:12 }}>
      <h2 style={{ margin:0 }}>{props.title}</h2>
      <form onSubmit={props.onSubmit} style={{ display:"grid", gap:12 }}>
        {props.children}
        <button type="submit" style={{ padding:"10px 12px" }}>{props.submitLabel}</button>
      </form>
    </div>
  );
}
