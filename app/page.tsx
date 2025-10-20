"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Menu,
  X,
  ChevronRight,
  Bot,
  Dumbbell,
  Activity,
  FlaskConical,
  Moon,
  MapPin,
  Clock,
  Phone,
  User,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Star,
  QrCode,
  Copy,
  Check,
  PersonStanding,
  Brain,
} from "lucide-react";

import QRCodeComponent from "./components/QRCode";
import { Hanuman } from "next/font/google";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipPlan: "basic",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user is on mobile device
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    setIsMobile(mobile);

    // Load any existing form data
    const savedData = localStorage.getItem("membershipData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleJoinNowClick = () => {
    setShowMembershipForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store data locally (in a real app, you would send this to a server)
    localStorage.setItem("membershipData", JSON.stringify(formData));
    setShowMembershipForm(false);
    setShowPayment(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getMembershipDetails = () => {
    switch (formData.membershipPlan) {
      case "basic":
        return { name: "Basic", price: 1499 };
      case "pro":
        return { name: "Pro", price: 3499 };
      case "elite":
        return { name: "Elite", price: 6999 };
      default:
        return { name: "Basic", price: 1499 };
    }
  };

  const handlePayNow = () => {
    const { price, name } = getMembershipDetails();
    // Map the membership plan to the new plan keys
    const planMap: Record<string, string> = {
      basic: "3month",
      pro: "6month",
      elite: "12month",
    };
    const planKey = planMap[formData.membershipPlan] || "3month";

    // Redirect to the new payment page
    window.location.href = `/payment?plan=${planKey}`;
  };

  const copyToClipboard = () => {
    const { price, name } = getMembershipDetails();
    const upiId = process.env.NEXT_PUBLIC_UPI_ID || "your-upi-id@upi";
    const upiUrl = `upi://pay?pa=${upiId}&pn=GymPire&am=${price}&cu=INR&tn=GymPire ${name} Membership`;

    navigator.clipboard.writeText(upiUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>GTMPIRE - Futuristic Fitness Experience</title>
        <meta
          name="description"
          content="Experience the future of fitness at GTMPIRE"
        />
      </Head>

      {/* Header/Navigation */}
      <header className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            GTMPIRE
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">
              Home
            </a>
            <a
              href="#services"
              className="hover:text-cyan-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#membership"
              className="hover:text-cyan-400 transition-colors"
            >
              Membership
            </a>
            <a
              href="#reviews"
              className="hover:text-cyan-400 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#location"
              className="hover:text-cyan-400 transition-colors"
            >
              Location
            </a>
          </nav>

          <button
            className="hidden md:block bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
            onClick={handleJoinNowClick}
          >
            Join Now
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <a
                href="#hero"
                className="py-2 hover:text-cyan-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#services"
                className="py-2 hover:text-cyan-400 transition-colors"
              >
                Services
              </a>
              <a
                href="#membership"
                className="py-2 hover:text-cyan-400 transition-colors"
              >
                Membership
              </a>
              <a
                href="#reviews"
                className="py-2 hover:text-cyan-400 transition-colors"
              >
                Reviews
              </a>
              <a
                href="#location"
                className="py-2 hover:text-cyan-400 transition-colors"
              >
                Location
              </a>
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-semibold mt-2"
                onClick={handleJoinNowClick}
              >
                Join Now
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Membership Form Modal */}
        {showMembershipForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Join GymPire</h3>
                <button
                  onClick={() => setShowMembershipForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-gray-300 mb-2"
                    htmlFor="membershipPlan"
                  >
                    Membership Plan
                  </label>
                  <select
                    id="membershipPlan"
                    name="membershipPlan"
                    value={formData.membershipPlan}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="basic">Basic - 1499/month</option>
                    <option value="pro">Pro - 3499/6 month</option>
                    <option value="elite">Elite - 6999/12 month</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Complete Payment</h3>
                <button
                  onClick={() => setShowPayment(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold mb-2">Membership Details</h4>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span>Plan:</span>
                    <span className="font-bold">
                      {getMembershipDetails().name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-bold">
                      ₹{getMembershipDetails().price}
                      {formData.membershipPlan === "basic" && "/month"}
                      {formData.membershipPlan === "pro" && "/6 month"}
                      {formData.membershipPlan === "elite" && "/12 month"}
                    </span>
                  </div>
                </div>
              </div>

              {isMobile ? (
                <div className="text-center">
                  <p className="mb-4">Click below to pay via UPI</p>
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center"
                  >
                    Pay with UPI
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4">Scan the QR code to pay via UPI</p>
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <QRCodeComponent
                      value={`upi://pay?pa=${
                        process.env.NEXT_PUBLIC_UPI_ID ||
                        "sinumathew2-2@okicici"
                      }&pn=GymPire&am=${
                        getMembershipDetails().price
                      }&cu=INR&tn=GymPire ${
                        getMembershipDetails().name
                      } Membership`}
                      size={200}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? "Copied!" : "Copy UPI Link"}
                    </button>
                  </div>
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                  >
                    Pay with UPI App
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section
          id="hero"
          className="pt-32 pb-20 px-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/10"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent"></div>

          <div className="container mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    FORGE YOUR
                  </span>
                  <br />
                  FUTURE BODY
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                  Experience the next generation of fitness at GTMPIRE. Our
                  cutting-edge technology and expert trainers will transform
                  your body and mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105"
                    onClick={handleJoinNowClick}
                  >
                    START YOUR JOURNEY
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="absolute inset-0 border border-cyan-500/20 rounded-2xl animate-pulse"></div>
                  <div className="text-center p-8">
                    <div className="text-5xl font-bold mb-2">GTMPIRE</div>
                    <div className="text-cyan-400 text-xl">
                      FUTURISTIC FITNESS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-gray-800/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">SERVICES WE OFFER</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Our state-of-the-art facilities and innovative programs are
                designed to maximize your results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <>
                    <PersonStanding className="text-cyan-400" />
                  </>
                </div>
                <h3 className="text-2xl font-bold mb-3">PERSONAL TRAINERS</h3>
                <p className="text-gray-400 mb-4">
                  Our trainers adapt to your progress and provide real-time
                  feedback for optimal workouts.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="bg-cyan-400/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <Dumbbell className="text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  VIRTUAL REALITY WORKOUTS
                </h3>
                <p className="text-gray-400 mb-4">
                  Immerse yourself in virtual environments that make exercise
                  exciting and engaging.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <Activity />
                </div>
                <h3 className="text-2xl font-bold mb-3">BIOMETRIC TRACKING</h3>
                <p className="text-gray-400 mb-4">
                  Real-time monitoring of vital stats to optimize performance
                  and recovery.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <FlaskConical />
                </div>
                <h3 className="text-2xl font-bold mb-3">NUTRITION ANALYSIS</h3>
                <p className="text-gray-400 mb-4">
                  Personalized nutrition plans based on DNA analysis and
                  metabolic profiling.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>

              {/* Service 5 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <Moon />
                </div>
                <h3 className="text-2xl font-bold mb-3">RECOVERY PODS</h3>
                <p className="text-gray-400 mb-4">
                  Advanced cryotherapy and massage systems for optimal muscle
                  recovery.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>

              {/* Service 6 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <Brain />
                </div>
                <h3 className="text-2xl font-bold mb-3">SMART EQUIPMENT</h3>
                <p className="text-gray-400 mb-4">
                  IoT-enabled machines that track your progress and adjust
                  resistance automatically.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn More</span>
                  <ChevronRight className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section id="membership" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">MEMBERSHIP PLANS</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Choose the plan that fits your lifestyle and fitness goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">BASIC</h3>
                  <div className="text-4xl font-bold mb-6">
                    <span className="text-2xl align-top">₹</span>
                    1499
                    <span className="text-lg">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Access to gym facilities</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Basic equipment training</span>
                    </li>
                    <li className="flex items-center opacity-50">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span className="line-through">
                        Personal training sessions
                      </span>
                    </li>
                    <li className="flex items-center opacity-50">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span className="line-through">
                        Nutrition consultation
                      </span>
                    </li>
                  </ul>
                  <button
                    className="w-full border-2 border-cyan-500 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500/10 transition-all"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        membershipPlan: "basic",
                      }));
                      handleJoinNowClick();
                    }}
                  >
                    GET STARTED
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-6">
                    <span className="text-2xl align-top">₹</span>
                    3599
                    <span className="text-lg">/6 month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>24/7 gym access</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Unlimited personal training</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Premium nutrition program</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Priority access to recovery pods</span>
                    </li>
                  </ul>
                  <button
                    className="w-full border-2 border-cyan-500 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500/10 transition-all"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        membershipPlan: "pro",
                      }));
                      handleJoinNowClick();
                    }}
                  >
                    GET STARTED
                  </button>
                </div>
              </div>
              {/* Eliete Plan */}
              <div className="bg-gradient-to-br from-gray-800 to-cyan-900/20 border-2 border-cyan-500 rounded-xl p-8 relative transform scale-105 z-10 shadow-xl shadow-cyan-500/10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Elite</h3>
                  <div className="text-4xl font-bold mb-6">
                    <span className="text-2xl align-top">₹</span>
                    6999
                    <span className="text-lg">/12 month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Unlimited gym access</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>4 personal training sessions/month</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-cyan-400 mr-2">✓</span>
                      <span>Nutrition consultation</span>
                    </li>
                    <li className="flex items-center opacity-50">
                      <span className="text-gray-600 mr-2">✗</span>
                      <span className="line-through">Recovery pods</span>
                    </li>
                  </ul>
                  <button
                    className="w-full border-2 border-cyan-500 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500/10 transition-all"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        membershipPlan: "elite",
                      }));
                      handleJoinNowClick();
                    }}
                  >
                    GET STARTED
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 px-4 bg-gray-800/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">WHAT OUR MEMBERS SAY</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Hear from our community of fitness enthusiasts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Review 1 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 text-xl mr-1 flex">
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "The trainers completely transformed my workout routine. I've
                  seen results in just 6 weeks that I never achieved in years at
                  other gyms."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-bold">Tejas D.</div>
                    <div className="text-gray-400 text-sm">
                      Member for 8 months
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 text-xl mr-1 flex">
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "The workout classes are incredible! I actually look forward
                  to exercising now. The variety keeps me motivated and
                  challenged."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <User className="text-gray-400" />
                  </div>
                  <div>
                    <div className="font-bold">Manush.</div>
                    <div className="text-gray-400 text-sm">
                      Member for 1 year
                    </div>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 text-xl mr-1 flex">
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                    <Star fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "The biometric tracking helped me optimize my workouts like
                  never before. My trainer uses the data to personalize every
                  session perfectly."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <User className="text-gray-400" />
                  </div>
                  <div>
                    <div className="font-bold">Akash.</div>
                    <div className="text-gray-400 text-sm">
                      Member for 2 years
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">FIND US</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Visit our state-of-the-art facility located in the heart of the
                city
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6">LOCATION DETAILS</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-cyan-400 text-xl mr-4 mt-1">
                      <MapPin />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Address</h4>
                      <p className="text-gray-400">
                        4th Cross Rd, 1st Block,
                        <br />
                        Viwapriya Layout, Begur, Bengaluru, Karnataka 560114
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-cyan-400 text-xl mr-4 mt-1">
                      <Clock />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Hours</h4>
                      <p className="text-gray-400">
                        Monday-Friday: 5:00 AM - 11:00 PM
                        <br />
                        Saturday-Sunday: 6:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-cyan-400 text-xl mr-4 mt-1">
                      <Phone />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Contact</h4>
                      <p className="text-gray-400">
                        Phone: (+91) 6360931402
                        <br />
                        Name : Varunesh
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/place/GYMPIRE/@12.8821535,77.6266436,19z/data=!4m6!3m5!1s0x3bae1559ebfbfa49:0xb5f4d9bd1135f6bb!8m2!3d12.8818803!4d77.627266!16s%2Fg%2F11wmrbh9l4?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  GET DIRECTIONS
                </a>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-0 h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.018895507443!2d77.6250749750949!3d12.88187529412394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1559ebfbfa49%3A0xb5f4d9bd1135f6bb!2sGTMPIRE!5e0!3m2!1sen!2sin!4v1702456890964!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GTMPIRE Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                GTMPIRE
              </div>
              <p className="text-gray-400 mb-4">
                The future of fitness is here. Experience the next generation of
                health and wellness.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Facebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Twitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Youtube />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#hero"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#membership"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Membership
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="#location"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Location
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Personal Training
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    HIIT Training Workouts
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Biometric Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Nutrition Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    Nutrition
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get special offers and fitness tips
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-cyan-500"
                />
                <button className="bg-cyan-500 text-gray-900 font-bold px-4 py-2 rounded-r-lg">
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} GTMPIRE. All rights reserved. |
              Designed with ❤️ for the future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
