import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <AuthForm type="sign-in" />
    </div>
  );
}
