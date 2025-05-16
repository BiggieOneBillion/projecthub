import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./auth-modal";
import {
  Github,
  BarChart2,
  Users,
  CheckSquare,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">ProjectHub</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            How it works
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthModal
            type="signin"
            trigger={
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                Sign In
              </Button>
            }
          />
          <AuthModal
            type="signup"
            trigger={
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Sign Up
              </Button>
            }
          />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <div className="inline-block mb-8 px-4 py-1 border border-gray-200 rounded-full bg-white">
            <span className="text-sm text-gray-600">
              Project Management Reimagined
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-gray-900">
            Manage Projects <br />{" "}
            <span className="text-teal-600">With Ease</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-12">
            Seamlessly manage your projects, assign tasks, track progress, and
            collaborate with your team in one elegant workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <AuthModal
              type="signup"
              trigger={
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8"
                >
                  <span className="font-semibold">Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              }
            />
            {/* <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8">
              <Github className="mr-2 h-5 w-5" />
              Connect with GitHub
            </Button> */}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-1 text-gray-900">
                Key Features
              </h2>
              <p className="text-gray-600">
                Everything you need to manage your projects efficiently in one
                place.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <Github className="h-10 w-10 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  GitHub Integration
                </h3>
                <p className="text-gray-600">
                  Connect your GitHub repositories and manage your projects
                  directly from our platform.
                </p>
              </div>
              <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <Users className="h-10 w-10 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Team Collaboration
                </h3>
                <p className="text-gray-600">
                  Add team members, assign tasks, and collaborate efficiently on
                  your projects.
                </p>
              </div>
              <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                <CheckSquare className="h-10 w-10 text-teal-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Task Management
                </h3>
                <p className="text-gray-600">
                  Create, assign, and track tasks with our intuitive task
                  management system.
                </p>
              </div>
            </div>
          </div>
        </section>

          {/* How it Works Section - Redesigned */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">How It Works</h2>
              <p className="text-gray-600 text-lg">A simple process to get you started with ProjectHub</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-teal-100 hidden md:block" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-20">
                <div className="md:w-5/12 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Create Your Account</h3>
                  <p className="text-gray-600">
                    Sign up in seconds and set up your profile. Choose to connect with GitHub for seamless integration
                    or use ProjectHub as a standalone tool.
                  </p>
                </div>

                <div className="md:w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>

                <div className="md:w-5/12 md:pl-12">
                  <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-600"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Step 1</div>
                        <div className="font-medium">Create an account</div>
                      </div>
                    </div>
                    <div className="aspect-video bg-white rounded-lg border border-gray-100 flex items-center justify-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="160"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-200"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col md:flex-row-reverse items-center mb-20">
                <div className="md:w-5/12 mb-8 md:mb-0 md:pl-12">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Connect with GitHub</h3>
                  <p className="text-gray-600">
                    Link your GitHub repositories to ProjectHub. Import existing projects or create new ones that sync
                    automatically with your GitHub repos.
                  </p>
                </div>

                <div className="md:w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </div>
                </div>

                <div className="md:w-5/12 md:pr-12 md:text-right">
                  <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center mb-4 justify-end">
                      <div>
                        <div className="text-sm text-gray-500">Step 2</div>
                        <div className="font-medium">Connect GitHub</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-600"
                        >
                          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                        </svg>
                      </div>
                    </div>
                    <div className="aspect-video bg-white rounded-lg border border-gray-100 flex items-center justify-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="160"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-200"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 18v-6" />
                        <path d="m9 15 3 3 3-3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col md:flex-row items-center mb-20">
                <div className="md:w-5/12 mb-8 md:mb-0 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Create Projects & Teams</h3>
                  <p className="text-gray-600">
                    Set up your projects and invite team members to collaborate. Define roles and permissions for each
                    team member to streamline your workflow.
                  </p>
                </div>

                <div className="md:w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>

                <div className="md:w-5/12 md:pl-12">
                  <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-600"
                        >
                          <path d="M16.5 9.4 7.5 4.21" />
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                          <path d="M12 22.08V12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Step 3</div>
                        <div className="font-medium">Create projects</div>
                      </div>
                    </div>
                    <div className="aspect-video bg-white rounded-lg border border-gray-100 flex items-center justify-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="160"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-200"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h10" />
                        <path d="M7 12h10" />
                        <path d="M7 17h10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-5/12 mb-8 md:mb-0 md:pl-12">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Manage Tasks & Track Progress</h3>
                  <p className="text-gray-600">
                    Create tasks, assign them to team members, set deadlines, and track progress in real-time. Get
                    insights into your project&apos;s performance with detailed analytics.
                  </p>
                </div>

                <div className="md:w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg relative z-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 11-6 6v3h9l3-3" />
                      <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
                      <path d="m14 4 6 6" />
                      <path d="m21 3-6 6" />
                    </svg>
                  </div>
                </div>

                <div className="md:w-5/12 md:pr-12 md:text-right">
                  <div className="bg-[#f8f9fa] p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center mb-4 justify-end">
                      <div>
                        <div className="text-sm text-gray-500">Step 4</div>
                        <div className="font-medium">Manage tasks</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-teal-600"
                        >
                          <rect width="6" height="6" x="3" y="3" rx="1" />
                          <rect width="6" height="6" x="15" y="3" rx="1" />
                          <rect width="6" height="6" x="3" y="15" rx="1" />
                          <rect width="6" height="6" x="15" y="15" rx="1" />
                        </svg>
                      </div>
                    </div>
                    <div className="aspect-video bg-white rounded-lg border border-gray-100 flex items-center justify-center p-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="160"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-200"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-600 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-1">
              Ready to streamline your project management?
            </h2>
            <p className="text-teal-100 max-w-2xl mx-auto mb-10">
              Join thousands of teams who have already transformed how they
              manage projects.
            </p>
            <AuthModal
              type="signup"
              trigger={
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8"
                >
                  <span className="font-medium">Get Started for Free</span>
                </Button>
              }
            />
          </div>
        </section>
      </main>

      <footer className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <BarChart2 className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">ProjectHub</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ProjectHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
