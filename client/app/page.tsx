'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";
import Image from "next/image";
import res from "../public/res.jpg"

export default function Home() {
  const router = useRouter();
  const { user } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
        <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-light tracking-tight">AI Resume</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm uppercase tracking-wide hover:text-gray-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm uppercase tracking-wide hover:text-gray-600 transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-sm uppercase tracking-wide hover:text-gray-600 transition-colors">
              Benefits
            </a>
            <a href="#faq" className="text-sm uppercase tracking-wide hover:text-gray-600 transition-colors">
              FAQ
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm uppercase tracking-wide hover:text-gray-600 transition-colors">
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-black text-white text-sm uppercase tracking-wide font-medium hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
              <p className="text-sm uppercase tracking-wider text-gray-700">Powered by Advanced AI Technology</p>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-light leading-tight tracking-tighter text-black animate-fade-in">
              Your Resume,
              <br />
              Perfected.
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-delayed">
              Get instant AI-powered analysis of your resume against job descriptions. Discover strengths, identify
              gaps, and land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-delayed-2">
              <Link
                href="/signup"
                className="px-8 py-4 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Start Free Analysis
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 border-2 border-black text-black font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            <div className="pt-12 text-sm text-gray-600 uppercase tracking-wide">
              No credit card required. Analyze 3 resumes free.
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-light">50K+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Resumes Analyzed</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-light">92%</p>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Success Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-light">10K+</p>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Happy Users</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-light">180</p>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Everything you need to optimize your resume and stand out to recruiters
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">①</span>
              </div>
              <h3 className="text-2xl font-light">Instant Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive analysis of your resume within seconds. Identify strengths, weaknesses, and areas for
                improvement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">②</span>
              </div>
              <h3 className="text-2xl font-light">Keyword Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithm detects important keywords from job descriptions and shows exactly what's missing
                from your resume.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">③</span>
              </div>
              <h3 className="text-2xl font-light">Deep Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Unlock detailed analysis with keyword gap analysis, visual charts, and actionable improvement points
                tailored to each job.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">④</span>
              </div>
              <h3 className="text-2xl font-light">Track History</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep all your analyses organized in one dashboard. Revisit insights and track improvements over time.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">⑤</span>
              </div>
              <h3 className="text-2xl font-light">Match Scoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Get an objective match percentage that shows how well your resume aligns with the job requirements.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group space-y-6 p-8 border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-light text-lg">⑥</span>
              </div>
              <h3 className="text-2xl font-light">Actionable Tips</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized recommendations and best practices to strengthen your application and increase your
                chances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Simple, fast, and effective. Get started in three easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl font-light">
                  1
                </div>
                <h3 className="text-2xl font-light">Paste Resume</h3>
                <p className="text-gray-600 leading-relaxed">
                  Copy and paste your resume content along with the job description you're targeting.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 left-[calc(100%+20px)] w-12 h-1 bg-gray-300"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl font-light">
                  2
                </div>
                <h3 className="text-2xl font-light">AI Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI analyzes your resume and provides comprehensive insights within seconds.
                </p>
              </div>
              <div className="hidden md:block absolute top-10 left-[calc(100%+20px)] w-12 h-1 bg-gray-300"></div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl font-light">
                  3
                </div>
                <h3 className="text-2xl font-light">Improve & Apply</h3>
                <p className="text-gray-600 leading-relaxed">
                  Follow actionable recommendations to strengthen your resume and ace your job applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-light leading-tight">Why Choose AI Resume Analyzer?</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">99% Accuracy Rate</h4>
                    <p className="text-gray-600">Our AI uses advanced machine learning to ensure accurate analysis</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Save Time</h4>
                    <p className="text-gray-600">
                      Get professional-level analysis in seconds instead of hours of manual work
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Increase Success Rate</h4>
                    <p className="text-gray-600">
                      Users report 3x higher callback rates after implementing recommendations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Always Updated</h4>
                    <p className="text-gray-600">Our AI stays current with latest industry trends and requirements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src={res} alt="Resume Analysis" />
              </div>
              <div className="absolute top-4 right-4 w-32 h-32 bg-gray-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Is my data private and secure?",
                a: "Yes, we use industry-standard encryption and never share your data with third parties. Your resume and analysis are completely confidential.",
              },
              {
                q: "How accurate is the AI analysis?",
                a: "Our AI has been trained on thousands of successful job applications and achieves 99% accuracy in identifying resume-job matches.",
              },
              {
                q: "Can I analyze multiple job descriptions?",
                a: "You can analyze your resume against unlimited job descriptions and track all your analyses in your personal dashboard.",
              },
              {
                q: "What if I need help implementing the recommendations?",
                a: "We provide detailed explanations and best practices for each recommendation. You can also reach out to our support team for guidance.",
              },
              {
                q: "Is there a limit to how many analyses I can do?",
                a: "Free users get 3 analyses per month. Premium subscribers get unlimited analyses and additional features.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied with our service. No questions asked.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 p-6 hover:border-black transition-colors">
                <h3 className="text-lg font-medium mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-light leading-tight">Ready to Optimize Your Resume?</h2>
          <p className="text-xl text-gray-600 font-light">
            Join thousands of job seekers who are landing their dream jobs with AI Resume Analyzer.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <p className="font-light text-lg">AI Resume</p>
              <p className="text-sm text-gray-600">Optimize your resume and land your dream job.</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide">Product</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide">Company</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wide">Legal</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2025 AI Resume Analyzer. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-black transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-black transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-black transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
