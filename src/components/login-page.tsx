"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 font-sans">
            <Card className="w-full max-w-[400px] shadow-lg border-none bg-white rounded-2xl overflow-hidden">
                <CardHeader className="text-center pt-8 pb-2 flex flex-col items-center">
                    <div className="mb-4">
                        <Image
                            src="/logo.png"
                            alt="Cooltracer Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 mb-1">
                        Iniciar sesión
                    </h1>
                    <p className="text-xs text-slate-400 font-normal">
                        ingresá tus credenciales para continuar
                    </p>
                </CardHeader>

                <CardContent className="px-8 pb-10 pt-4">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="username" className="text-xs font-normal text-slate-600 ml-0.5">
                                Usuario
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    className="pl-9 h-10 bg-gray-100/50 border-gray-200 rounded-md focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 text-sm shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-xs font-normal text-slate-600 ml-0.5">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    className="pl-9 pr-9 h-10 bg-gray-100/50 border-gray-200 rounded-md focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-sm mt-2 shadow-sm transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? "Ingresando..." : "Ingresar"}
                        </Button>

                        <div className="text-center pt-2">
                            <a href="#" className="text-[11px] text-blue-500 hover:text-blue-600 font-normal">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
