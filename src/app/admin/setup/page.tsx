"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  LogIn,
  ExternalLink,
  User,
  Mail,
  Settings2,
  Database,
} from "lucide-react";

type Status = "loading" | "unauthenticated" | "checking" | "not_admin" | "admin" | "error";

export default function AdminSetupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<Status>("loading");
  const [userData, setUserData] = useState<{
    id: string;
    email?: string;
    name?: string;
    profile: any | null;
  } | null>(null);
  const [actionStatus, setActionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    setStatus("loading");
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setStatus("unauthenticated");
      return;
    }

    setStatus("checking");
    setUserData({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name ?? user.email,
      profile: null,
    });

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      setStatus("error");
      return;
    }

    setUserData((prev) => ({ ...prev!, profile }));

    if (profile?.is_admin) {
      setStatus("admin");
    } else {
      setStatus("not_admin");
    }
  }

  async function makeAdmin() {
    if (!userData) return;
    setActionStatus("loading");
    setActionMessage("");

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userData.id,
        full_name: userData.name,
        is_admin: true,
      },
      { onConflict: "id" }
    );

    if (error) {
      setActionStatus("error");
      setActionMessage(error.message);
      return;
    }

    setActionStatus("success");
    setActionMessage("¡Ahora eres administrador de Kapitalizando!");
    setStatus("admin");

    setTimeout(() => {
      router.push("/admin");
    }, 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E10] p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5C53D]/10">
            <Shield className="h-7 w-7 text-[#F5C53D]" />
          </div>
          <h1 className="text-xl font-bold text-white">Configuración de Administrador</h1>
          <p className="mt-1 text-sm text-[#A8AAAE]">Panel de diagnóstico y activación</p>
        </div>

        {/* Loading state */}
        {status === "loading" && (
          <div className="card-dark flex flex-col items-center gap-4 rounded-[24px] p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#F5C53D]" />
            <p className="text-sm text-[#A8AAAE]">Verificando tu sesión...</p>
          </div>
        )}

        {/* Unauthenticated */}
        {status === "unauthenticated" && (
          <div className="card-dark rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-red-500/10 p-3">
              <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
              <p className="text-sm text-red-300">No has iniciado sesión</p>
            </div>

            <button
              onClick={() => router.push("/auth/login")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
            >
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </button>
          </div>
        )}

        {/* Checking */}
        {status === "checking" && (
          <div className="card-dark flex flex-col items-center gap-4 rounded-[24px] p-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#F5C53D]" />
            <p className="text-sm text-[#A8AAAE]">Consultando tu perfil en Supabase...</p>
          </div>
        )}

        {/* Not admin - can activate */}
        {status === "not_admin" && userData && (
          <div className="card-dark rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-amber-500/10 p-3">
              <Settings2 className="h-5 w-5 flex-shrink-0 text-amber-400" />
              <p className="text-sm text-amber-300">No eres administrador aún</p>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#A8AAAE]" />
                  <span className="text-xs text-[#A8AAAE]">Usuario</span>
                </div>
                <span className="text-sm text-white">{userData.name}</span>
              </div>
              <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#A8AAAE]" />
                  <span className="text-xs text-[#A8AAAE]">Email</span>
                </div>
                <span className="text-sm text-white">{userData.email}</span>
              </div>
              <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-[#A8AAAE]" />
                  <span className="text-xs text-[#A8AAAE]">ID</span>
                </div>
                <span className="text-xs text-[#A8AAAE]">{userData.id.slice(0, 12)}...</span>
              </div>
              <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#A8AAAE]" />
                  <span className="text-xs text-[#A8AAAE]">Admin</span>
                </div>
                <span className="text-xs font-medium text-amber-400">false</span>
              </div>
            </div>

            {actionStatus === "error" && (
              <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-red-500/10 p-3">
                <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-xs text-red-300">{actionMessage}</p>
              </div>
            )}

            {actionStatus === "success" && (
              <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-green-500/10 p-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#C4E27A]" />
                <div>
                  <p className="text-sm font-medium text-[#C4E27A]">¡Activado!</p>
                  <p className="text-xs text-[#C4E27A]/80">{actionMessage}</p>
                </div>
              </div>
            )}

            <button
              onClick={makeAdmin}
              disabled={actionStatus === "loading" || actionStatus === "success"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F26A2E] py-3 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 disabled:opacity-50"
            >
              {actionStatus === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Activando...
                </>
              ) : actionStatus === "success" ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Redirigiendo al panel...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Hacerme administrador
                </>
              )}
            </button>
          </div>
        )}

        {/* Already admin */}
        {status === "admin" && (
          <div className="card-dark rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-green-500/10 p-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#C4E27A]" />
              <p className="text-sm font-medium text-[#C4E27A]">Ya eres administrador ✅</p>
            </div>

            {userData && (
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                  <span className="text-xs text-[#A8AAAE]">Usuario</span>
                  <span className="text-sm text-white">{userData.name}</span>
                </div>
                <div className="flex items-center justify-between rounded-[12px] bg-white/5 px-4 py-2.5">
                  <span className="text-xs text-[#A8AAAE]">Admin</span>
                  <span className="text-xs font-medium text-[#C4E27A]">true</span>
                </div>
              </div>
            )}

            <button
              onClick={() => router.push("/admin")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
            >
              <ExternalLink className="h-4 w-4" />
              Ir al panel de administración
            </button>

            <button
              onClick={() => router.push("/")}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-medium text-[#A8AAAE] transition-colors hover:bg-white/20"
            >
              Volver al inicio
            </button>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="card-dark rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-3 rounded-[16px] bg-red-500/10 p-3">
              <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
              <p className="text-sm text-red-300">Error al verificar tu perfil</p>
            </div>

            <button
              onClick={checkStatus}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#F5C53D] py-3 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
            >
              <Loader2 className="h-4 w-4" />
              Reintentar
            </button>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-[#A8AAAE]/50">
          Esta página es temporal. Se eliminará en producción.
        </p>
      </div>
    </div>
  );
}
