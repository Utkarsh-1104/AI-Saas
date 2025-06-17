"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    password?: string
  }>({})

  const validateForm = () => {
    const newErrors: {
      firstName?: string
      lastName?: string
      email?: string
      password?: string
    } = {}

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Signup attempt:", { firstName, lastName, email, password })
      setIsLoading(false)
      // Handle successful signup here
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">

        <div className="text-center">
          <h1 className="text-4xl font-light text-black mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-600">Join us to analyze your resume</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-black uppercase tracking-wide">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } focus:border-black focus:outline-none transition-colors`}
                placeholder="John"
                disabled={isLoading}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>


            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-black uppercase tracking-wide">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } focus:border-black focus:outline-none transition-colors`}
                placeholder="Doe"
                disabled={isLoading}
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>


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
              placeholder="john.doe@example.com"
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
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            <p className="text-xs text-gray-500">Must be 8+ characters with uppercase, lowercase, and number</p>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-3 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
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
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline transition-all">
              Sign in here
            </Link>
          </p>
        </div>


        <div className="text-center pt-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
            ← Back to AI Resume Analyzer
          </Link>
        </div>
      </div>
    </div>
  )
}
