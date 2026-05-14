"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function AdminSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<"loading" | "success" | "error" | "unauthenticated">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function setup() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setStatus("unauthenticated");
        setMessage("Debes iniciar sesión primero.");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name ?? user.email,
        is_admin: true,
      }, { onConflict: "id" });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setMessage("¡Ahora eres administrador!");

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    }

    setup();
  }, [supabase, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E10] px-4">
      <div className="card-dark w-full max-w-sm rounded-[24px] p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#F5C53D]" />
            <h1 className="mt-4 text-lg font-semibold text-white">Configurando acceso admin...</h1>
            <p className="mt-2 text-sm text-[#A8AAAE]">Esto tomará solo un segundo</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-[#C4E27A]" />
            <h1 className="mt-4 text-lg font-semibold text-white">¡Listo!</h1>
            <p className="mt-2 text-sm text-[#A8AAAE]">{message}</p>
            <p className="mt-4 text-xs text-[#A8AAAE]/60">Redirigiendo al panel admin...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-[#F04A8A]" />
            <h1 className="mt-4 text-lg font-semibold text-white">Error</h1>
            <p className="mt-2 text-sm text-[#A8AAAE]">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 rounded-full bg-[#F5C53D] px-6 py-2 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
            >
              Volver al inicio
            </button>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            <Shield className="mx-auto h-12 w-12 text-[#F5C53D]" />
            <h1 className="mt-4 text-lg font-semibold text-white">Acceso admin</h1>
            <p className="mt-2 text-sm text-[#A8AAAE]">{message}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-6 rounded-full bg-[#F5C53D] px-6 py-2 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
            >
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}
