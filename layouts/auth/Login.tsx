"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { handleLogin } from "@/api/Auth/Login"
import { useRouter } from "next/navigation"
import { LoginData } from "@/types"

const Login = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const isSuccess = await handleLogin(formData, setErrors)
      if (isSuccess) router.push("/User/HomePage")
    } finally {
      setIsLoading(false)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  return (
    <section className="
      bg-white text-gray-900
      rounded-3xl p-8
      w-full lg:max-w-lg max-w-md
      shadow-xl
      min-h-155
      flex flex-col
    ">
      <header className="mb-6">
        <h1 className="text-[1.5rem] font-bold text-gray-800 leading-tight mb-1">
          Login
        </h1>
        <p className="text-[0.75rem] text-gray-400 font-medium">
          Your Social Campaign
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-y-4 flex-1">

        {/* Email */}
        <div className="flex flex-col gap-y-1">
          <label
            htmlFor="email"
            className="text-[0.75rem] font-bold text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`
              w-full px-3 py-2.5
              border rounded-xl
              text-[0.875rem] text-gray-800
              bg-gray-50 hover:bg-white
              outline-none
              transition-all duration-150
              ${errors.email
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                : 'border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10'
              }
            `}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-[0.75rem] text-red-500 leading-tight">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-[0.75rem] font-bold text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-[0.75rem] text-blue-600 font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`
                w-full pl-3 pr-10 py-2.5
                border rounded-xl
                text-[0.875rem] text-gray-800
                bg-gray-50 hover:bg-white
                outline-none
                transition-all duration-150
                ${errors.password
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10'
                }
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-gray-600
                transition-colors duration-150
                cursor-pointer
              "
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-[0.75rem] text-red-500 leading-tight">
              {errors.password}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 accent-blue-600 cursor-pointer"
          />
          <label htmlFor="terms" className="text-[0.75rem] text-gray-500 cursor-pointer">
            I accept the{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Terms & Conditions
            </a>
          </label>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-[0.6875rem] text-gray-400 font-bold tracking-wider">
            OR
          </span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-label="Sign in with Google"
            className="
              flex items-center justify-center gap-2
              p-2.5 rounded-xl
              border border-gray-200
              text-[0.75rem] font-bold text-gray-700
              hover:bg-gray-50
              active:scale-[0.98]
              transition-all duration-150
            "
          >
            <span>🔥</span> Google
          </button>
          <button
            type="button"
            aria-label="Sign in with Apple"
            className="
              flex items-center justify-center gap-2
              p-2.5 rounded-xl
              border border-gray-200
              text-[0.75rem] font-bold text-gray-700
              hover:bg-gray-50
              active:scale-[0.98]
              transition-all duration-150
            "
          >
            <span>🍎</span> Apple
          </button>
        </div>

        {/* General error */}
        {errors.form && (
          <p role="alert" className="text-[0.75rem] text-red-500 text-center leading-tight">
            {errors.form}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="
            w-full mt-auto
            bg-[#1877f2] hover:bg-[#1a6ed4]
            disabled:opacity-60 disabled:cursor-not-allowed
            text-white rounded-xl
            py-3
            font-bold text-[0.9375rem]
            shadow-lg shadow-blue-500/20
            active:scale-[0.98]
            transition-all duration-150
          "
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      

        <p className="text-center text-[0.75rem] text-gray-400 font-medium">
          Dont have an account?{" "}
          <Link href="/SignUp" className="text-blue-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>

      </form>
    </section>
  )
}

export default Login