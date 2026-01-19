import AuthLayout from "@/src/components/auth/auth-card";
import RegisterForm from "@/src/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Create your account ✨
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Start learning English effectively today
      </p>

      <RegisterForm />
    </AuthLayout>
  );
}
