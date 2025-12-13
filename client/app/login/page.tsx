"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useUser } from "../context/UserContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { user, setUser } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/resume-match-jd')
    }
  }, [user, router])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { email, password })
    console.log(response)
    if (response.data.status === 200) {
      localStorage.setItem("user", response.data.token)
      setUser(response.data.user)
      router.push('/resume-match-jd')
    } else if(response.data.status === 400) {
      alert("Invalid credentials")
    } else {
      alert("Internal server error")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-light text-black mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-black uppercase tracking-wide">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-black focus:outline-none transition-colors`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-black uppercase tracking-wide">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-black focus:outline-none transition-colors`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-3 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 uppercase tracking-wide">Or</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="text-black font-medium hover:underline transition-all">
              Create one here
            </Link>
          </p>
        </div>

        {/* <div className="text-center pt-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
            ← Back to AI Resume Analyzer
          </Link>
        </div> */}
      </div>
    </div>
  )
}
