import AuthCard from "@/src/components/auth/auth-card";
import LoginForm from "@/src/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthCard>
      <h1 className="mb-6 text-center text-2xl font-bold text-primary">
        Welcome back 👋
      </h1>
      <LoginForm />
    </AuthCard>
  );
}
