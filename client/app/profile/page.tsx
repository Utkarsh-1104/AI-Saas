"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUser } from "../context/UserContext"
import axios from "axios"

export default function Profile() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { user, logout } = useUser()

    const validateForm = () => {
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long")
            return false
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match")
            return false
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
            setError("Password must contain uppercase, lowercase, and number")
            return false
        }

        return true
    }

    const handleLogout = () => {
        logout()
        router.push("/login")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const token = localStorage.getItem("user")
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
                newPassword: newPassword,
                email: user?.email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const res = await response.data
            console.log(res)

            if (res.status === 200) {
                alert("Password updated successfully. Please log in again.")
                localStorage.removeItem("user")
                logout()
                router.push("/login")
            } else {
                setError(res.message || "An error occurred. Please try again.")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
    <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-4xl font-light text-black tracking-tight">Account Settings</h1>
                <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
                >
                ← Back to Dashboard
                </Link>
            </div>

            {user ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 p-6 flex flex-col space-y-6">
                            <h2 className="text-lg font-medium text-black uppercase tracking-wide mb-6">Profile Info</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                                    <p className="text-lg font-light"> {user?.firstName} {user?.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                                    <p className="text-sm text-gray-700">{user?.email}</p>
                                </div>
                            </div>
                            <button className="flex-1 px-4 py-1 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>

                    {/* Change Password Form */}
                    <div className="lg:col-span-2">
                        <div className="border border-gray-200 p-8">
                            <h2 className="text-2xl font-light text-black tracking-tight mb-8">Change Password</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2"> New Password </label>
                                    <input
                                        id="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Enter your new password"
                                        disabled={isLoading}
                                    />
                                    <p className="text-xs text-gray-500 mt-2"> Must be at least 8 characters with uppercase, lowercase, and number.</p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2"> Confirm New Password </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Confirm your new password"
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-6 py-3 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Updating...
                                            </>
                                        ) : (
                                            "Update Password"
                                        )}
                                    </button>
                                    <Link href="/dashboard" className="flex-1 px-6 py-3 border border-gray-300 text-black text-center font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors"> Cancel </Link>
                                </div>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Security Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Use a unique password you don't use elsewhere</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Include a mix of letters, numbers, and special characters</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Avoid using personal information in your password</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Consider using a password manager for better security</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ): (
                <div className="p-4 bg-yellow-50 border border-yellow-200 mb-8">
                    <p className="text-sm text-yellow-700"> Loading user information... </p>
                </div>
            )}
        </div>
    </div>
)}
