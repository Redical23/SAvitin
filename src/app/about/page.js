import { Scale, Users, BookOpen, MessageCircle, Briefcase, Newspaper } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Kanooni Karwayahi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Bridging the gap between legal professionals, students, and clients through innovative technology and
              seamless connections.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-0 p-8">
            <div className="text-center pb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">My Mission</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                As a solo developer passionate about legal technology, I created this platform to democratize access to
                legal services and opportunities.
              </p>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">The Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    I believe that finding the right lawyer, legal internship, or case reference shouldn't be
                    complicated. My platform simplifies these connections, making legal services more accessible to
                    everyone.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">The Journey</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Starting as a solo developer, I've built this platform from the ground up, focusing on user
                    experience and real-world solutions that address genuine needs in the legal community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to serve clients, legal professionals, and students alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Lawyers</h3>
              <p className="text-gray-600">
                Connect with qualified legal professionals based on your specific needs and location.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Internships</h3>
              <p className="text-gray-600">
                Discover internship opportunities at law firms and legal organizations for aspiring lawyers.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest Legal News</h3>
              <p className="text-gray-600">
                Stay updated with the latest legal developments, court decisions, and industry news.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Case References</h3>
              <p className="text-gray-600">
                Access a comprehensive database of legal cases and precedents for research and reference.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Support</h3>
              <p className="text-gray-600">Get instant help and guidance through our integrated chat system.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Join a growing community of legal professionals, students, and clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-0 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Behind the Platform</h2>
            </div>
            <div className="space-y-6">
              <div className="text-gray-600 space-y-6">
                <p className="text-lg leading-relaxed">
                  As a solo developer with a passion for solving real-world problems, I recognized the challenges people
                  face when trying to navigate the legal landscape. Whether it's finding the right lawyer, securing an
                  internship, or staying informed about legal developments, these processes were often fragmented and
                  difficult.
                </p>
                <p className="text-lg leading-relaxed">
                  Kanooni Karwayahi represents my commitment to creating technology that serves people. Every feature
                  has been carefully designed based on real user needs, and I continue to iterate and improve based on
                  community feedback.
                </p>
                <p className="text-lg leading-relaxed">
                  While I may be a team of one, I'm supported by an amazing community of users who help shape the
                  direction of this platform. Together, we're making legal services more accessible and transparent for
                  everyone.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Solo Developer
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Legal Tech
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Community Driven
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  User Focused
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section 
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Impact</h2>
            <p className="text-lg text-gray-600">
              Growing numbers that reflect our commitment to serving the legal community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Lawyers Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Internships Posted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Case References</div>
            </div>
          </div>
        </div>
      </section>
*/}
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already benefiting from Kanooni Karwayahi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-8 h-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold">Kanooni Karwayahi</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making legal services accessible to everyone, one connection at a time.
            </p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500">© 2024 Kanooni Karwayahi. Built with passion by a solo developer.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
