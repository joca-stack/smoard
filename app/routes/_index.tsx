import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "SaveMyBoard - 90-Day Warranty Electronics Repair" },
    { name: "description", content: "Expert electronics repair with 90-day warranty. Free pickup in SanTan Valley, Queen Creek, Florence, Gilbert, Chandler. Certified microsoldering specialists." },
    { name: "keywords", content: "electronics repair near me, computer repair near me, phone repair SanTan Valley, device repair Queen Creek, microsoldering Arizona, motherboard repair Florence, hardware upgrades Gilbert, trace repair Chandler" }
  ];
};

// Define types for our form data
interface FormData {
  name: string;
  phone: string;
  email: string;
  service_area: string;
  device_type: string;
  device_model: string;
  issue_description: string;
  pickup_address: string;
  pickup_date: string;
  pickup_time: string;
  rush_service: boolean;
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocalProcess, setShowLocalProcess] = useState(true);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [mailInModalOpen, setMailInModalOpen] = useState(false);
  const [ticketLookup, setTicketLookup] = useState("");
  const [showTicketDisplay, setShowTicketDisplay] = useState(false);

  // East Valley cities for dropdown
  const eastValleyCities = [
    "SanTan Valley",
    "Queen Creek",
    "Florence",
    "Gilbert",
    "Chandler",
    "Mesa",
    "Tempe",
    "Apache Junction",
    "Casa Grande",
    "Maricopa",
    "Coolidge"
  ];

  // Device types for dropdown
  const deviceTypes = [
    "iPhone",
    "Android Phone",
    "iPad",
    "Android Tablet",
    "MacBook",
    "Windows Laptop",
    "Gaming Console",
    "Custom PC",
    "Motherboard",
    "GPU",
    "Other"
  ];

  // Generate a ticket number
  const generateTicketNumber = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `SMB-${randomNum}-${year}${month}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent, serviceType: string) => {
    e.preventDefault();
    const ticketNumber = generateTicketNumber();
    alert(`Demo form submitted!\n\nService Type: ${serviceType}\nYour ticket number: ${ticketNumber}\n\nIn the live website, you would receive:\n• Email confirmation\n• SMS updates\n• Printable repair ticket\n• Tracking information`);
    
    if (serviceType === "Local Pickup") {
      setPickupModalOpen(false);
    } else {
      setMailInModalOpen(false);
    }
  };

  // Lookup ticket function
  const handleTicketLookup = () => {
    if (ticketLookup.match(/^SMB-\d{4}-\d{4}$/)) {
      setShowTicketDisplay(true);
    } else {
      alert('Please enter a valid ticket number (format: SMB-XXXX-XXXX)');
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-navy to-teal rounded-lg flex items-center justify-center circuit-pattern glow-effect">
                    <span className="text-accent-yellow font-orbitron font-bold text-lg">SMB</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-yellow rounded-full flex items-center justify-center">
                    <span className="text-navy text-xs">⚡</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-xl font-orbitron font-bold text-navy">SaveMyBoard</div>
                  <div className="text-xs text-teal font-medium">Electronics Repair Specialists</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#services" className="text-charcoal hover:text-teal font-medium transition duration-300">Services</a>
              <a href="#how-it-works" className="text-charcoal hover:text-teal font-medium transition duration-300">How It Works</a>
              <a href="#service-areas" className="text-charcoal hover:text-teal font-medium transition duration-300">Service Areas</a>
              <a href="#admin-portal" className="text-charcoal hover:text-teal font-medium transition duration-300">Track Repair</a>
              <a href="tel:5206378943" className="text-navy font-semibold hover:text-teal transition duration-300">📞 520-637-8943</a>
              <button onClick={() => setPickupModalOpen(true)} className="bg-accent-yellow text-navy px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 glow-effect">
                Schedule Pickup
              </button>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-charcoal hover:text-teal">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? '' : 'hidden'} bg-white border-t`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#services" className="block px-3 py-2 text-charcoal hover:text-teal">Services</a>
            <a href="#how-it-works" className="block px-3 py-2 text-charcoal hover:text-teal">How It Works</a>
            <a href="#service-areas" className="block px-3 py-2 text-charcoal hover:text-teal">Service Areas</a>
            <a href="#admin-portal" className="block px-3 py-2 text-charcoal hover:text-teal">Track Repair</a>
            <a href="tel:5206378943" className="block px-3 py-2 text-navy font-semibold">📞 520-637-8943</a>
            <button onClick={() => setPickupModalOpen(true)} className="block w-full text-left px-3 py-2 bg-accent-yellow text-navy rounded-lg mt-2 font-bold">Schedule Pickup</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
        <section className="hero-dark-bg pt-20 pb-16 circuit-pattern">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="flex items-center mb-6">
                    <div className="trust-badge bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold mr-4 border border-white/20">
                        🏆 Certified Microsoldering
                    </div>
                    <div className="trust-badge bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20">
                        ⚡ Same-Day Available
                    </div>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-charcoal mb-6 leading-tight">
                    <span className="text-accent-yellow">90-Day Warranty</span> Repairs<br />
                    Free SanTan Valley/Queen Creek Pickup
                </h1>
                <p className="text-xl text-charcoal/90 mb-8 leading-relaxed">
                    Board-level expertise meets no-oxidation guarantee. We speak geek, but explain in English.<br />
                    <span className="text-accent-yellow font-semibold">Serving SanTan Valley, Queen Creek, Florence, Gilbert & Chandler since 2024</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button onClick={() => setPickupModalOpen(true)} className="bg-accent-yellow text-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition duration-300 glow-effect">
                        🚚 Schedule Free Pickup
                    </button>
                    <button onClick={() => setMailInModalOpen(true)} className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:text-white transition duration-300">
                        📦 Mail-In Repair
                    </button>
                </div>
                <div className="text-charcoal/80">
                    <p className="text-lg mb-2">📞 <a href="tel:5206378943" className="text-accent-yellow hover:underline font-semibold">520-637-8943</a> | 📧 <a href="mailto:savemyboard@gmail.com" className="text-accent-yellow hover:underline">savemyboard@gmail.com</a></p>
                    <p>Mon-Fri 8AM–9PM | Sat 8AM–6PM | Closed Sunday</p>
                </div>
            </div>
            <div className="text-center">
                <div className="floating">
                    <div className="relative">
                        <div className="repair-animation text-8xl mb-4">🔧</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border-4 border-accent-yellow rounded-full animate-spin border-t-transparent"></div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                        <h3 className="text-2xl font-bold text-charcoal mb-4">Live Repair Status</h3>
                        <div className="space-y-2 text-left">
                            <div className="flex items-center text-charcoal/90">
                                <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                                <span className="ticket-number">SMB-7429-2412</span> - Diagnosis Complete
                            </div>
                            <div className="flex items-center text-charcoal/90">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                                <span className="ticket-number">SMB-8156-2412</span> - In Repair
                            </div>
                            <div className="flex items-center text-charcoal/90">
                                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                                <span className="ticket-number">SMB-9283-2412</span> - Quality Check
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

      {/* Service Areas with Dynamic Map */}
    <section id="service-areas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-navy mb-4">Our Service Coverage</h2>
                <p className="text-xl text-charcoal">Local pickup zones + nationwide mail-in service</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* <!-- Local Service Map --> */}
                <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-navy/5 to-teal/5 p-8 rounded-2xl border-2 border-teal/20">
                        <h3 className="text-2xl font-bold text-navy mb-6 flex items-center">
                            <span className="text-3xl mr-3">🗺️</span>
                            East Valley Service Zone
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal hover:shadow-md transition duration-300">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">📍</span>
                                    <div>
                                        <h4 className="font-bold text-navy">SanTan Valley</h4>
                                        <p className="text-sm text-charcoal">Free same-day pickup available</p>
                                        <p className="text-xs text-teal font-medium">15-30 min response time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal hover:shadow-md transition duration-300">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">📍</span>
                                    <div>
                                        <h4 className="font-bold text-navy">Queen Creek</h4>
                                        <p className="text-sm text-charcoal">Free same-day pickup available</p>
                                        <p className="text-xs text-teal font-medium">15-30 min response time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal hover:shadow-md transition duration-300">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">📍</span>
                                    <div>
                                        <h4 className="font-bold text-navy">Florence</h4>
                                        <p className="text-sm text-charcoal">Free pickup within 24hrs</p>
                                        <p className="text-xs text-teal font-medium">30-60 min response time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal hover:shadow-md transition duration-300">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">📍</span>
                                    <div>
                                        <h4 className="font-bold text-navy">Gilbert & Chandler</h4>
                                        <p className="text-sm text-charcoal">Free pickup within 24hrs</p>
                                        <p className="text-xs text-teal font-medium">30-60 min response time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setPickupModalOpen(true)} className="w-full bg-accent-yellow text-navy py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300">
                            Schedule Local Pickup
                        </button>
                    </div>
                </div>

                {/* <!-- National Coverage --> */}
                <div>
                    <div className="bg-gradient-to-br from-charcoal to-navy p-8 rounded-2xl text-white h-full">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🇺🇸</div>
                            <h3 className="text-2xl font-bold mb-2">Nationwide Coverage</h3>
                            <p className="text-white/80">Mail-in service to all 50 states</p>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-accent-yellow rounded-full mr-3"></div>
                                <span className="text-sm">Free return shipping</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-accent-yellow rounded-full mr-3"></div>
                                <span className="text-sm">Fully insured transit</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-accent-yellow rounded-full mr-3"></div>
                                <span className="text-sm">3-5 day turnaround</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-accent-yellow rounded-full mr-3"></div>
                                <span className="text-sm">Real-time tracking</span>
                            </div>
                        </div>
                        <button onClick={() => setMailInModalOpen(true)} className="w-full bg-teal text-white py-3 rounded-lg font-bold hover:bg-teal/90 transition duration-300">
                            Start Mail-In Repair
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>


      {/* How It Works - Dual Path */}
     <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-navy mb-4">How Our Process Works</h2>
                <p className="text-xl text-charcoal">Choose your path: Local pickup or nationwide mail-in</p>
            </div>

            {/* <!-- Process Selector --> */}
            <div className="flex justify-center mb-12">
                <div className="bg-white p-2 rounded-lg shadow-lg">
                    <button
                      onClick={() => setShowLocalProcess(true)}
                      id="local-btn"
                      className="px-6 py-3 rounded-lg font-semibold transition duration-300 bg-accent-yellow text-navy"
                    >
                        🚚 Local Process
                    </button>
                    <button
                      onClick={() => setShowLocalProcess(false)}
                      id="mailin-btn"
                      className="px-6 py-3 rounded-lg font-semibold transition duration-300 text-charcoal hover:bg-gray-100"
                    >
                        📦 Mail-In Process
                    </button>
                </div>
            </div>

            {/* Local Process */}
            <div id="local-process" className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">1</div>
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Submit Request</h3>
                    <p className="text-charcoal">Fill out our quick form with device details and preferred pickup time</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">2</div>
                    <div className="text-4xl mb-4">🚚</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Free Pickup</h3>
                    <p className="text-charcoal">Our certified technician picks up your device at your convenience</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">3</div>
                    <div className="text-4xl mb-4">🔬</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Expert Repair</h3>
                    <p className="text-charcoal">Board-level diagnosis and repair with real-time status updates</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center text-navy font-bold text-2xl mx-auto mb-4">4</div>
                    <div className="text-4xl mb-4">🏠</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Free Delivery</h3>
                    <p className="text-charcoal">Device delivered back to you with 90-day warranty certificate</p>
                </div>
            </div>

            {/* Mail-In Process */}
            <div id="mailin-process" className="hidden grid md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">1</div>
                    <div className="text-4xl mb-4">🎫</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Generate Ticket</h3>
                    <p className="text-charcoal">Complete form and receive printable repair ticket with QR code</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">2</div>
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Ship Device</h3>
                    <p className="text-charcoal">Securely package device with ticket and ship to our facility</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">3</div>
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Rapid Repair</h3>
                    <p className="text-charcoal">3-5 day turnaround with photo documentation and progress updates</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">4</div>
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold text-navy mb-2">Free Return</h3>
                    <p className="text-charcoal">Device shipped back free with tracking and warranty documentation</p>
                </div>
            </div>
        </div>
    </section>

      {/* Expanded Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-navy mb-4">Our Specialized Repair Services</h2>
                <p className="text-xl text-charcoal">Board-level expertise for all your electronics repair needs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Device Refresh/Cleanings */}
                <div className="service-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-teal">
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Device Refresh & Cleaning</h3>
                    <p className="text-charcoal mb-4">Comprehensive cleaning and optimization services</p>
                    <ul className="text-sm text-charcoal space-y-2 mb-6">
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Deep internal cleaning</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Thermal paste replacement</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Dust removal & prevention</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Performance optimization</li>
                    </ul>
                    <div className="text-accent-yellow font-bold">Starting at $49</div>
                </div>

                {/* <!-- Hardware Upgrades --> */}
                <div className="service-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-teal">
                    <div className="text-5xl mb-4">🔄</div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Hardware Upgrades</h3>
                    <p className="text-charcoal mb-4">Enhance your device performance with upgrades</p>
                    <ul className="text-sm text-charcoal space-y-2 mb-6">
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>RAM & SSD upgrades</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Battery replacements</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Screen & display upgrades</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Storage expansion</li>
                    </ul>
                    <div className="text-accent-yellow font-bold">Starting at $79</div>
                </div>

                {/* <!-- Motherboard Repairs --> */}
                <div className="service-card bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-teal">
                    <div className="text-5xl mb-4">🔌</div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Motherboard Repairs</h3>
                    <p className="text-charcoal mb-4">Expert board-level diagnostics and repairs</p>
                    <ul className="text-sm text-charcoal space-y-2 mb-6">
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Component-level diagnostics</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Power circuit repair</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>IC chip replacement</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Data recovery services</li>
                    </ul>
                    <div className="text-accent-yellow font-bold">Starting at $99</div>
                </div>

                {/* <!-- Trace & Component Repairs --> */}
                <div className="service-card bg-gradient-to-br from-accent-yellow/10 to-accent-yellow/5 p-8 rounded-2xl shadow-lg border-2 border-accent-yellow hover:border-accent-yellow">
                    <div className="flex items-center mb-4">
                        <div className="text-4xl mr-2">🔍</div>
                        <span className="bg-accent-yellow text-navy px-2 py-1 rounded-full text-xs font-bold">SPECIALTY</span>
                    </div>
                    <h3 className="text-2xl font-bold text-navy mb-4">Trace & Component Repairs</h3>
                    <p className="text-charcoal mb-4">Precision microsoldering and board repair</p>
                    <ul className="text-sm text-charcoal space-y-2 mb-6">
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Trace repairs & jumpers</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Component replacement</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>Reflows & reworks</li>
                        <li className="flex items-center"><span className="text-teal mr-2">✓</span>BGA chip replacement</li>
                    </ul>
                    <div className="text-accent-yellow font-bold">Starting at $129</div>
                </div>
            </div>
        </div>
    </section>


      {/* Admin Portal Preview */}
      <section id="admin-portal" className="py-20 bg-gray-50">
        {/* Admin portal content */}
        {/* ... */}
      </section>

      {/* Trust Badges & Certifications */}
     <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                <div>
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="font-bold text-accent-yellow mb-2">Certified Microsoldering</h3>
                    <p className="text-sm text-white/80">Board-level repair expertise</p>
                </div>
                <div>
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-bold text-accent-yellow mb-2">Same-Day Available</h3>
                    <p className="text-sm text-white/80">Rush service when you need it</p>
                </div>
                <div>
                    <div className="text-4xl mb-4">🛡️</div>
                    <h3 className="font-bold text-accent-yellow mb-2">90-Day Warranty</h3>
                    <p className="text-sm text-white/80">Comprehensive coverage included</p>
                </div>
                <div>
                    <div className="text-4xl mb-4">🔬</div>
                    <h3 className="font-bold text-accent-yellow mb-2">No-Oxidation Guarantee</h3>
                    <p className="text-sm text-white/80">Clean, professional work</p>
                </div>
            </div>
        </div>
    </section>

      {/* Contact/CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Save Your Device?</h2>
            <p className="text-xl mb-8 text-white/90">Serving SanTan Valley, Queen Creek, Florence, Gilbert & Chandler</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button onClick={() => setPickupModalOpen(true)} className="bg-accent-yellow text-navy px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition duration-300 glow-effect">
                    🚚 Schedule Free Pickup
                </button>
                <button onClick={() => setMailInModalOpen(true)} className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-charcoal transition duration-300">
                    📦 Start Mail-In Repair
                </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <div className="text-3xl mb-4">📞</div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p><a href="tel:5206378943" className="text-accent-yellow hover:underline text-lg font-semibold">520-637-8943</a></p>
                </div>
                <div>
                    <div className="text-3xl mb-4">📧</div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p><a href="mailto:savemyboard@gmail.com" className="text-accent-yellow hover:underline">savemyboard@gmail.com</a></p>
                </div>
                <div>
                <div className="text-3xl mb-4">🕒</div>
                    <h3 className="text-xl font-semibold mb-2">Hours</h3>
                    <p>Mon-Fri 8AM–9PM<br />Sat 8AM–6PM<br />Closed Sunday
                    </p>
                
                </div>
            </div>
        </div>
    </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-navy to-teal rounded-lg flex items-center justify-center circuit-pattern mr-3">
                            <span className="text-accent-yellow font-orbitron font-bold">SMB</span>
                        </div>
                        <div>
                            <div className="font-orbitron font-bold">SaveMyBoard</div>
                            <div className="text-xs text-teal">Since 2024</div>
                        </div>
                    </div>
                    <p className="text-gray-400 mb-4">Device resuscitation specialists with board-level expertise and no-oxidation guarantee.</p>
                    <div className="text-gray-400">
                        <p>📞 <a href="tel:5206378943" className="text-accent-yellow hover:underline">520-637-8943</a></p>
                        <p>📧 <a href="mailto:savemyboard@gmail.com" className="text-accent-yellow hover:underline">savemyboard@gmail.com</a></p>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-accent-yellow">Services</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>Device Refresh & Cleaning</li>
                        <li>Hardware Upgrades</li>
                        <li>Motherboard Repairs</li>
                        <li>Trace & Component Repairs</li>
                        <li>Microsoldering</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-accent-yellow">Service Areas</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>SanTan Valley, AZ</li>
                        <li>Queen Creek, AZ</li>
                        <li>Florence, AZ</li>
                        <li>Gilbert, AZ</li>
                        <li>Chandler, AZ</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-accent-yellow">Certifications</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>🏆 Certified Microsoldering</li>
                        <li>⚡ Same-Day Service</li>
                        <li>🛡️ 90-Day Warranty</li>
                        <li>🔬 No-Oxidation Guarantee</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 SaveMyBoard Electronics Repair Specialists. All rights reserved. | Precision repairs since 2024</p>
            </div>
        </div>
    </footer>


      {/* Local Pickup Modal */}
      {pickupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-navy">Schedule Free Pickup</h3>
                <p className="text-charcoal">East Valley same-day service available</p>
              </div>
              <button onClick={() => setPickupModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, "Local Pickup")} className="space-y-6">
              <input type="hidden" name="service_type" value="Local Pickup" />
              <input type="hidden" name="ticket_number" value={generateTicketNumber()} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Full Name *</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Email Address *</label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Service Area *</label>
                  <select name="service_area" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent">
                    <option value="">Select your city</option>
                    {eastValleyCities.map(city => (
                      <option key={city} value={city}>
                        {city} {city === "SanTan Valley" || city === "Queen Creek" ? "(Same-day available)" : "(24hr pickup)"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Device Type *</label>
                  <select name="device_type" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent">
                    <option value="">Select device</option>
                    {deviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Device Model & Issue *</label>
                <textarea name="device_details" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="e.g., iPhone 14 Pro - Won't charge. Dropped in water yesterday."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Pickup Location *</label>
                <textarea name="pickup_address" required rows={2} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Public location for pickup (e.g., Starbucks at Arizona Ave & Ocotillo)"></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Preferred Date *</label>
                  <input type="date" name="pickup_date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Preferred Time *</label>
                  <select name="pickup_time" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent">
                    <option value="">Select time window</option>
                    <option value="Morning (8AM-12PM)">Morning (8AM-12PM)</option>
                    <option value="Afternoon (12PM-5PM)">Afternoon (12PM-5PM)</option>
                    <option value="Evening (5PM-9PM)">Evening (5PM-9PM)</option>
                  </select>
                </div>
              </div>

              <div className="bg-teal/10 p-4 rounded-lg">
                <div className="flex items-start">
                  <input type="checkbox" name="rush_service" className="mt-1 mr-3" />
                  <div>
                    <label className="font-semibold text-charcoal">Rush Service (+$65)</label>
                    <p className="text-sm text-charcoal">Same-day pickup and priority repair queue</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-accent-yellow text-navy py-4 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold text-lg glow-effect">
                Schedule My Free Pickup
              </button>

              <p className="text-sm text-charcoal text-center">You'll receive a confirmation with your ticket number within 15 minutes</p>
            </form>
          </div>
        </div>
      )}

      {/* Mail-In Modal */}
      {mailInModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-navy">Start Mail-In Repair</h3>
                <p className="text-charcoal">Nationwide service with free return shipping</p>
              </div>
              <button onClick={() => setMailInModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="bg-accent-yellow/20 border border-accent-yellow rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <span className="text-2xl mr-3">📋</span>
                <div>
                  <p className="font-semibold text-navy">Important: Print Your Repair Ticket</p>
                  <p className="text-sm text-charcoal">After submitting, you'll receive a printable repair ticket with QR code. Include this with your device when shipping.</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e, "Mail-In Repair")} className="space-y-6">
              <input type="hidden" name="service_type" value="Mail-In Repair" />
              <input type="hidden" name="ticket_number" value={generateTicketNumber()} />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Full Name *</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Email Address *</label>
                <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Return Shipping Address *</label>
                <textarea name="return_address" required rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Complete address where we should ship your repaired device"></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Device Type *</label>
                  <select name="device_type" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent">
                    <option value="">Select device</option>
                    {deviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Device Model *</label>
                  <input type="text" name="device_model" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="e.g., iPhone 14 Pro, MacBook Air M2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Detailed Issue Description *</label>
                <textarea name="issue_description" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Describe the problem in detail. Include when it started, what happened, and any error messages."></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Device Passcode</label>
                  <input type="text" name="passcode" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent" placeholder="Required for testing" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Estimated Value</label>
                  <select name="device_value" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent">
                    <option value="">Select range</option>
                    <option value="Under $200">Under $200</option>
                    <option value="$200-$500">$200-$500</option>
                    <option value="$500-$1000">$500-$1000</option>
                    <option value="Over $1000">Over $1000</option>
                  </select>
                </div>
              </div>

              <div className="bg-teal/10 p-4 rounded-lg">
                <div className="flex items-start">
                  <input type="checkbox" name="rush_service" className="mt-1 mr-3" />
                  <div>
                    <label className="font-semibold text-charcoal">Rush Service (+$65)</label>
                    <p className="text-sm text-charcoal">Priority handling and 24-48 hour turnaround</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-navy text-white py-4 rounded-lg hover:bg-navy/90 transition duration-300 font-bold text-lg">
                Generate Repair Ticket & Shipping Label
              </button>

              <div className="text-center">
                <p className="text-sm text-charcoal mb-2">After submitting, you'll receive:</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center">
                    <span className="text-teal mr-2">✓</span>
                    Printable repair ticket
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-teal mr-2">✓</span>
                    Prepaid shipping label
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}