import type { MetaFunction } from "@remix-run/cloudflare";
import { useState, useEffect } from "react";

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

// Review types
interface Review {
  id: number;
  rating: number;
  title: string;
  content: string;
  name: string;
  location: string;
  date: string;
  device: string;
  status: "pending" | "approved" | "rejected";
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocalProcess, setShowLocalProcess] = useState(true);
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [mailInModalOpen, setMailInModalOpen] = useState(false);
  const [ticketLookup, setTicketLookup] = useState("");
  const [showTicketDisplay, setShowTicketDisplay] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    content: "",
    name: "",
    location: "",
    device: ""
  });

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

  // Initialize reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('savemyboardReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Default reviews
      const initialReviews: Review[] = [
        {
          id: 1,
          rating: 5,
          title: 'Excellent Service!',
          content: 'My MacBook Pro had water damage and wouldn\'t turn on. SaveMyBoard not only fixed it but explained the process in detail. The flat rate pricing meant no surprises!',
          name: 'John D.',
          location: 'SanTan Valley, AZ',
          date: '2024-11-15',
          device: 'MacBook Pro',
          status: 'approved'
        },
        {
          id: 2,
          rating: 5,
          title: 'Fast and Professional',
          content: 'My gaming console had a motherboard issue. They provided same-day service and the free pickup was incredibly convenient. Will definitely use again!',
          name: 'Mike R.',
          location: 'Queen Creek, AZ',
          date: '2024-11-10',
          device: 'PlayStation 5',
          status: 'approved'
        },
        {
          id: 3,
          rating: 4,
          title: 'Good Experience',
          content: 'My phone repair took a bit longer than expected, but they kept me updated throughout the process. The final result was perfect and the warranty gives me peace of mind.',
          name: 'Sarah A.',
          location: 'Tucson, AZ',
          date: '2024-11-05',
          device: 'iPhone 14 Pro',
          status: 'approved'
        }
      ];
      setReviews(initialReviews);
      localStorage.setItem('savemyboardReviews', JSON.stringify(initialReviews));
    }
  }, []);

  // Save reviews to localStorage when they change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('savemyboardReviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  // Get approved reviews for display
  const approvedReviews = reviews.filter(review => review.status === "approved");
  const pendingReviews = reviews.filter(review => review.status === "pending");

  // Generate a ticket number
  const generateTicketNumber = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `SMB-${randomNum}-${year}${month}`;
  };

  // Handle form submission to Formspree
  const handleFormSubmit = async (e: React.FormEvent, serviceType: string) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add service type to form data
    formData.append('service_type', serviceType);
    
    // Add ticket number to form data
    const ticketNumber = generateTicketNumber();
    formData.append('ticket_number', ticketNumber);
    
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mzzrwbkl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert(`Thank you! Your ${serviceType} request has been submitted.\nYour ticket number: ${ticketNumber}\nWe'll contact you shortly.`);
        
        // Close the modal
        if (serviceType === "Local Pickup") {
          setPickupModalOpen(false);
        } else {
          setMailInModalOpen(false);
        }
        
        // Reset the form
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your form. Please try again or call us directly at 520-637-8943.');
      console.error('Form submission error:', error);
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

  // Handle review form submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview: Review = {
      id: Date.now(),
      rating: reviewForm.rating,
      title: reviewForm.title,
      content: reviewForm.content,
      name: reviewForm.name,
      location: reviewForm.location,
      device: reviewForm.device,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('savemyboardReviews', JSON.stringify(updatedReviews));
    
    // Reset form
    setReviewForm({
      rating: 0,
      title: "",
      content: "",
      name: "",
      location: "",
      device: ""
    });
    
    alert('Thank you for your review! It will be visible once approved by our team.');
    setShowReviewForm(false);
  };

  // Calculate average rating
  const averageRating = approvedReviews.length > 0 
    ? (approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length).toFixed(1)
    : "4.8";

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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">SMB</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-blue-900 text-xs">⚡</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-xl font-bold text-blue-900">SaveMyBoard</div>
                  <div className="text-xs text-teal-600 font-medium">Electronics Repair Specialists</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#services" className="text-gray-700 hover:text-teal-600 font-medium transition duration-300">Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-teal-600 font-medium transition duration-300">How It Works</a>
              <a href="#service-areas" className="text-gray-700 hover:text-teal-600 font-medium transition duration-300">Service Areas</a>
              <a href="#reviews" className="text-gray-700 hover:text-teal-600 font-medium transition duration-300">Reviews</a>
              <a href="tel:5206378943" className="text-blue-900 font-semibold hover:text-teal-600 transition duration-300">📞 520-637-8943</a>
              <button onClick={() => setPickupModalOpen(true)} className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300">
                Schedule Pickup
              </button>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-teal-600">
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
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-teal-600">Services</a>
            <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-teal-600">How It Works</a>
            <a href="#service-areas" className="block px-3 py-2 text-gray-700 hover:text-teal-600">Service Areas</a>
            <a href="#reviews" className="block px-3 py-2 text-gray-700 hover:text-teal-600">Reviews</a>
            <a href="tel:5206378943" className="block px-3 py-2 text-blue-900 font-semibold">📞 520-637-8943</a>
            <button onClick={() => setPickupModalOpen(true)} className="block w-full text-left px-3 py-2 bg-yellow-400 text-blue-900 rounded-lg mt-2 font-bold">Schedule Pickup</button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Circuit Board Background */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background with overlay for better text contrast */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero.webp" 
            alt="Circuit board background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="bg-blue-800/80 text-white px-4 py-2 rounded-full text-sm font-bold border border-blue-500/50 backdrop-blur-sm">
                  🏆 Certified Microsoldering
                </div>
                <div className="bg-blue-800/80 text-white px-4 py-2 rounded-full text-sm font-bold border border-blue-500/50 backdrop-blur-sm">
                  ⚡ Same-Day Available
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-yellow-400">90-Day Warranty</span> Repairs<br />
                Free SanTan Valley/Queen Creek Pickup
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Board-level expertise meets no-oxidation guarantee. We speak geek, but explain in English.<br />
                <span className="text-yellow-400 font-semibold">Serving SanTan Valley, Queen Creek, Florence, Gilbert & Chandler since 2024</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={() => setPickupModalOpen(true)} className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition duration-300 shadow-lg hover:shadow-yellow-400/30">
                  🚚 Schedule Free Pickup
                </button>
                <button onClick={() => setMailInModalOpen(true)} className="border-2 border-blue-200 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-200 hover:text-blue-900 transition duration-300">
                  📦 Mail-In Repair
                </button>
              </div>
              <div className="text-blue-100">
                <p className="text-lg mb-2">📞 <a href="tel:5206378943" className="text-yellow-400 hover:underline font-semibold">520-637-8943</a> | 📧 <a href="mailto:savemyboard@gmail.com" className="text-yellow-400 hover:underline">savemyboard@gmail.com</a></p>
                <p>Mon-Fri 8AM–9PM | Sat 8AM–6PM | Closed Sunday</p>
              </div>
            </div>
            <div className="text-center">
              <div className="floating-animation">
                <div className="relative mx-auto w-48 h-48 flex items-center justify-center">
                  <div className="repair-icon text-8xl text-white">🔧</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-yellow-400 rounded-full animate-spin border-t-transparent"></div>
                  </div>
                </div>
                <div className="bg-blue-900/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 mt-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Live Repair Status</h3>
                  <div className="space-y-2 text-left text-blue-100">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                      <span>SMB-7429-2412 - Diagnosis Complete</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
                      <span>SMB-8156-2412 - In Repair</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                      <span>SMB-9283-2412 - Quality Check</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      <section id="service-areas" className="py-20 bg-gradient-to-b from-gray-50 to-white-16 bg-gradient-to-br from-blue-900 to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Service Coverage</h2>
      <p className="text-xl text-gray-700">Local pickup zones + nationwide mail-in service</p>
    </div>
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Local Service Map */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-3xl text-gray-600 mr-3">🗺️</span>
            East Valley Service Zone
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {eastValleyCities.slice(0, 4).map(city => (
              <div key={city} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-all duration-300 service-card">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📍</span>
                  <div>
                    <h4 className="font-bold text-blue-900">{city}</h4>
                    <p className="text-sm text-gray-600">
                      {city === "SanTan Valley" || city === "Queen Creek" 
                        ? "Free same-day pickup available" 
                        : "Free pickup within 24hrs"}
                    </p>
                    <p className="text-xs text-teal-600 font-medium">
                      {city === "SanTan Valley" || city === "Queen Creek" 
                        ? "15-30 min response time" 
                        : "30-60 min response time"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPickupModalOpen(true)} className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 shadow-md hover:shadow-lg">
            Schedule Local Pickup
          </button>
        </div>
      </div>

      {/* National Coverage */}
      <div>
        <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-2xl text-white h-full shadow-xl border border-gray-700">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🇺🇸</div>
            <h3 className="text-2xl font-bold mb-2">Nationwide Coverage</h3>
            <p className="text-gray-300">Mail-in service to all 50 states</p>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex items-center bg-blue-800/30 p-3 rounded-lg">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-sm">Free return shipping</span>
            </div>
            <div className="flex items-center bg-blue-800/30 p-3 rounded-lg">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-sm">Fully insured transit</span>
            </div>
            <div className="flex items-center bg-blue-800/30 p-3 rounded-lg">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-sm">3-5 day turnaround</span>
            </div>
            <div className="flex items-center bg-blue-800/30 p-3 rounded-lg">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
              <span className="text-sm">Real-time tracking</span>
            </div>
          </div>
          <button onClick={() => setMailInModalOpen(true)} className="w-full bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-400 transition duration-300 shadow-md hover:shadow-lg">
            Start Mail-In Repair
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      

      {/* How It Works - Dual Path */}
<section id="how-it-works" className="py-16 bg-gradient-to-br from-blue-900 to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">How Our Process Works</h2>
      <p className="text-xl text-gray-300">Choose your path: Local pickup or nationwide mail-in</p>
    </div>

    {/* Process Selector */}
    <div className="flex justify-center mb-12">
      <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
        <button
          onClick={() => setShowLocalProcess(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${showLocalProcess ? 'bg-yellow-400 text-blue-900 shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          🚚 Local Process
        </button>
        <button
          onClick={() => setShowLocalProcess(false)}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${!showLocalProcess ? 'bg-teal-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          📦 Mail-In Process
        </button>
      </div>
    </div>

    {/* Local Process */}
    {showLocalProcess && (
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { number: 1, emoji: "📝", title: "Submit Request", description: "Fill out our quick form with device details and preferred pickup time" },
          { number: 2, emoji: "🚚", title: "Free Pickup", description: "Our certified technician picks up your device at your convenience" },
          { number: 3, emoji: "🔬", title: "Expert Repair", description: "Board-level diagnosis and repair with real-time status updates" },
          { number: 4, emoji: "🏠", title: "Free Delivery", description: "Device delivered back to you with 90-day warranty certificate" }
        ].map((step, index) => (
          <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-blue-900 font-bold text-2xl mx-auto mb-4 shadow-md">{step.number}</div>
            <div className="text-4xl mb-4">{step.emoji}</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Mail-In Process */}
    {!showLocalProcess && (
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { number: 1, emoji: "🎫", title: "Generate Ticket", description: "Complete form and receive printable repair ticket with QR code" },
          { number: 2, emoji: "📦", title: "Ship Device", description: "Securely package device with ticket and ship to our facility" },
          { number: 3, emoji: "⚡", title: "Rapid Repair", description: "3-5 day turnaround with photo documentation and progress updates" },
          { number: 4, emoji: "🚀", title: "Free Return", description: "Device shipped back free with tracking and warranty documentation" }
        ].map((step, index) => (
          <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md">{step.number}</div>
            <div className="text-4xl mb-4">{step.emoji}</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</section>

{/* Expanded Services */}
<section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Specialized Repair Services</h2>
      <p className="text-xl text-gray-700">Board-level expertise for all your electronics repair needs</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Device Refresh/Cleanings */}
      <div className="service-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-teal-400">
        <div className="text-5xl mb-4">✨</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Device Refresh & Cleaning</h3>
        <p className="text-gray-700 mb-4">Comprehensive cleaning and optimization services</p>
        <ul className="text-sm text-gray-700 space-y-2 mb-6">
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Deep internal cleaning</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Thermal paste replacement</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Dust removal & prevention</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Performance optimization</li>
        </ul>
        <div className="text-yellow-500 font-bold text-lg">Starting at $49</div>
      </div>

      {/* Hardware Upgrades */}
      <div className="service-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-teal-400">
        <div className="text-5xl mb-4">🔄</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Hardware Upgrades</h3>
        <p className="text-gray-700 mb-4">Enhance your device performance with upgrades</p>
        <ul className="text-sm text-gray-700 space-y-2 mb-6">
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>RAM & SSD upgrades</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Battery replacements</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Screen & display upgrades</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Storage expansion</li>
        </ul>
        <div className="text-yellow-500 font-bold text-lg">Starting at $79</div>
      </div>

      {/* Motherboard Repairs */}
      <div className="service-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-teal-400">
        <div className="text-5xl mb-4">🔌</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Motherboard Repairs</h3>
        <p className="text-gray-700 mb-4">Expert board-level diagnostics and repairs</p>
        <ul className="text-sm text-gray-700 space-y-2 mb-6">
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Component-level diagnostics</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Power circuit repair</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>IC chip replacement</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Data recovery services</li>
        </ul>
        <div className="text-yellow-500 font-bold text-lg">Starting at $99</div>
      </div>

      {/* Trace & Component Repairs */}
      <div className="service-card bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-yellow-400">
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-2">🔍</div>
          <span className="bg-yellow-400 text-blue-900 px-2 py-1 rounded-full text-xs font-bold">SPECIALTY</span>
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Trace & Component Repairs</h3>
        <p className="text-gray-700 mb-4">Precision microsoldering and board repair</p>
        <ul className="text-sm text-gray-700 space-y-2 mb-6">
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Trace repairs & jumpers</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Component replacement</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>Reflows & reworks</li>
          <li className="flex items-center"><span className="text-teal-500 mr-2">✓</span>BGA chip replacement</li>
        </ul>
        <div className="text-yellow-500 font-bold text-lg">Starting at $129</div>
      </div>
    </div>
  </div>
</section>

{/* Trust Badges & Certifications */}
<section className="py-16 bg-gradient-to-br from-blue-900 to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
      <div className="bg-blue-800/30 p-6 rounded-2xl backdrop-blur-sm border border-blue-600/30">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="font-bold text-yellow-400 mb-2">Certified Microsoldering</h3>
        <p className="text-sm text-blue-200">Board-level repair expertise</p>
      </div>
      <div className="bg-blue-800/30 p-6 rounded-2xl backdrop-blur-sm border border-blue-600/30">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="font-bold text-yellow-400 mb-2">Same-Day Available</h3>
        <p className="text-sm text-blue-200">Rush service when you need it</p>
      </div>
      <div className="bg-blue-800/30 p-6 rounded-2xl backdrop-blur-sm border border-blue-600/30">
        <div className="text-4xl mb-4">🛡️</div>
        <h3 className="font-bold text-yellow-400 mb-2">90-Day Warranty</h3>
        <p className="text-sm text-blue-200">Comprehensive coverage included</p>
      </div>
      <div className="bg-blue-800/30 p-6 rounded-2xl backdrop-blur-sm border border-blue-600/30">
        <div className="text-4xl mb-4">🔬</div>
        <h3 className="font-bold text-yellow-400 mb-2">No-Oxidation Guarantee</h3>
        <p className="text-sm text-blue-200">Clean, professional work</p>
      </div>
    </div>
  </div>
</section>

{/* Contact/CTA Section */}
<section className="py-20 bg-gradient-to-b from-gray-50 to-white bg-gradient-to-br from-blue-900 to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold text-blue-900 mb-4">Ready to Save Your Device?</h2>
    <p className="text-xl mb-8 text-gray-700">Serving SanTan Valley, Queen Creek, Florence, Gilbert & Chandler</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <button onClick={() => setPickupModalOpen(true)} className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition duration-300 shadow-lg hover:shadow-yellow-400/30">
        🚚 Schedule Free Pickup
      </button>
      <button onClick={() => setMailInModalOpen(true)} className="border-2 border-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-800 transition duration-300 shadow-md">
        📦 Start Mail-In Repair
      </button>
    </div>
    <div className="grid md:grid-cols-3 gap-8 text-center">
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-2xl text-white h-full shadow-xl border border-gray-700">
        <div className="text-3xl mb-4">📞</div>
        <h3 className="text-xl font-semibold mb-2">Call Us</h3>
        <p><a href="tel:5206378943" className="text-yellow-400 hover:underline text-lg font-semibold">520-637-8943</a></p>
      </div>
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-2xl text-white h-full shadow-xl border border-gray-700">
        <div className="text-3xl mb-4">📧</div>
        <h3 className="text-xl font-semibold mb-2">Email Us</h3>
        <p><a href="mailto:savemyboard@gmail.com" className="text-yellow-400 hover:underline">savemyboard@gmail.com</a></p>
      </div>
      <div className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-2xl text-white h-full shadow-xl border border-gray-700">
        <div className="text-3xl mb-4">🕒</div>
        <h3 className="text-xl font-semibold mb-2">Hours</h3>
        <p className="text-gray-300">Mon-Fri 8AM–9PM<br />Sat 8AM–6PM<br />Closed Sunday</p>
      </div>
    </div>
  </div>
</section>
{/* Reviews Section with Google Reviews */}
<section id="reviews" className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-blue-900 mb-4">Customer Reviews</h2>
      <p className="text-xl text-gray-700 mb-6">See what our customers are saying about their repair experience</p>
      
      {/* Google Reviews Badge */}
      <div className="flex justify-center items-center mb-8">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center border border-gray-200">
          <div className="text-3xl mr-2">⭐</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">4.9/5</div>
            <div className="text-yellow-400 text-sm">★★★★★</div>
            <div className="text-xs text-gray-600 mt-1">Based on Google Reviews</div>
          </div>
        </div>
      </div>

      <button onClick={() => setShowReviewForm(true)} className="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 shadow-md hover:shadow-lg">
        Share Your Experience
      </button>
    </div>

    {/* Google Reviews Grid */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {/* Review 1 */}
      <div className="review-card bg-gray-900 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-yellow-400 text-xl">
            ★★★★★
          </div>
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-blue-700 mb-2">Amazing Service!</h3>
        <p className="text-gray-700 mb-4">They brought my laptop back to life when no one else could. Professional, fast, and affordable. Highly recommend!</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            J
          </div>
          <div>
            <p className="font-semibold">John D.</p>
            <p className="text-sm text-gray-400">SanTan Valley</p>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-400">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.27,6c1.01,0,1.73,0.8,1.73,1.73v12.64c0,0.95-0.78,1.73-1.73,1.73H5.73c-0.95,0-1.73-0.78-1.73-1.73V7.73C4,6.78,4.78,6,5.73,6H18.27 M18.27,4H5.73C3.68,4,2,5.68,2,7.73v12.64C2,22.32,3.68,24,5.73,24h12.64c2.05,0,3.73-1.68,3.73-3.73V7.73C22,5.68,20.32,4,18.27,4L18.27,4z"/>
            <path fill="currentColor" d="M12,7c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,7,12,7M12,5c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,5,12,5L12,5z"/>
          </svg>
          Posted on Google
        </div>
      </div>

      {/* Review 2 */}
      <div className="review-card bg-gray-900 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-yellow-400 text-xl">
            ★★★★★
          </div>
          <span className="text-sm text-gray-500">
            {new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-blue-700 mb-2">Saved My Gaming PC</h3>
        <p className="text-gray-700 mb-4">My water-cooled gaming rig had a motherboard issue. These guys did microsoldering magic and saved me hundreds vs buying new.</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            M
          </div>
          <div>
            <p className="font-semibold">Mike T.</p>
            <p className="text-sm text-gray-500">Queen Creek</p>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.27,6c1.01,0,1.73,0.8,1.73,1.73v12.64c0,0.95-0.78,1.73-1.73,1.73H5.73c-0.95,0-1.73-0.78-1.73-1.73V7.73C4,6.78,4.78,6,5.73,6H18.27 M18.27,4H5.73C3.68,4,2,5.68,2,7.73v12.64C2,22.32,3.68,24,5.73,24h12.64c2.05,0,3.73-1.68,3.73-3.73V7.73C22,5.68,20.32,4,18.27,4L18.27,4z"/>
            <path fill="currentColor" d="M12,7c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,7,12,7M12,5c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,5,12,5L12,5z"/>
          </svg>
          Posted on Google
        </div>
      </div>

      {/* Review 3 */}
      <div className="review-card bg-gray-900 text-white py-12 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="text-yellow-400 text-xl">
            ★★★★★
          </div>
          <span className="text-sm text-gray-500">
            {new Date(Date.now() - 14*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-blue-700 mb-2">Fast MacBook Repair</h3>
        <p className="text-gray-700 mb-4">My MacBook Pro wouldn't turn on after a spill. They fixed it in less than 24 hours and the price was very reasonable. Free pickup was a bonus!</p>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            S
          </div>
          <div>
            <p className="font-semibold">Sarah L.</p>
            <p className="text-sm text-gray-500">Gilbert</p>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.27,6c1.01,0,1.73,0.8,1.73,1.73v12.64c0,0.95-0.78,1.73-1.73,1.73H5.73c-0.95,0-1.73-0.78-1.73-1.73V7.73C4,6.78,4.78,6,5.73,6H18.27 M18.27,4H5.73C3.68,4,2,5.68,2,7.73v12.64C2,22.32,3.68,24,5.73,24h12.64c2.05,0,3.73-1.68,3.73-3.73V7.73C22,5.68,20.32,4,18.27,4L18.27,4z"/>
            <path fill="currentColor" d="M12,7c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,7,12,7M12,5c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,5,12,5L12,5z"/>
          </svg>
          Posted on Google
        </div>
      </div>
    </div>

    <div className="text-center">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Share Your Repair Experience</h3>
      <p className="text-gray-700 mb-8">We value your feedback! Help us improve our services by sharing your experience with your recent repair.</p>
      
      <div className="bg-gradient-to-r from-blue-900 to-teal-700 p-8 rounded-2xl text-white max-w-2xl mx-auto shadow-lg">
        <h4 className="text-xl font-bold mb-4">How to leave a review:</h4>
        <ol className="list-decimal list-inside space-y-3 text-left">
          <li>Click the "Share Your Experience" button</li>
          <li>Rate your experience with stars (1-5)</li>
          <li>Share details about your repair experience</li>
          <li>Submit your review - it will appear after approval</li>
        </ol>
        <div className="mt-8">
          <button onClick={() => setShowReviewForm(true)} className="inline-block bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 shadow-md">
            Write a Review Now
          </button>
        </div>
      </div>

      {/* Google Reviews Link */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto border border-gray-200">
        <h4 className="text-xl font-bold text-blue-900 mb-4">See More Reviews on Google</h4>
        <p className="text-gray-700 mb-4">Read all of our reviews directly on Google</p>
        <a 
          href="https://g.page/r/CQSTMKr7aKmbEBI/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-9l7 4.5-7 4.5z"/>
          </svg>
          View Google Reviews
        </a>
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
              <h4 className="text-lg font-semibold mb-4 text-accent-yellow">Customer Reviews</h4>
              <ul className="space-y-2 text-gray-400">
                <li>★★★★★ {averageRating}/5 Rating</li>
                <li>{approvedReviews.length} Reviews</li>
                <li><button onClick={() => setShowReviewForm(true)} className="text-accent-yellow hover:underline">Write a Review</button></li>
                <li><a href="https://g.page/r/CQSTMKr7aKmbEBI/review" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline">View on Google</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SaveMyBoard Electronics Repair Specialists. All rights reserved. | Precision repairs since 2024</p>
          </div>
        </div>
      </footer>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-3xl font-bold text-navy">Review Your Repair Experience</h3>
                <p className="text-charcoal">Share your feedback with us</p>
              </div>
              <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Your Rating *</label>
                <div className="star-rating">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="inline-block">
                      <input
                        type="radio"
                        id={`star${rating}`}
                        name="rating"
                        value={rating}
                        checked={reviewForm.rating === rating}
                        onChange={() => setReviewForm({...reviewForm, rating})}
                        className="hidden"
                      />
                      <label
                        htmlFor={`star${rating}`}
                        className={`text-2xl cursor-pointer ${reviewForm.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Review Title *</label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({...reviewForm, title: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Great service!"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Your Review *</label>
                <textarea
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="Tell us about your repair experience..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Your Location</label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({...reviewForm, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="SanTan Valley, AZ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Device Repaired (Optional)</label>
                <input
                  type="text"
                  value={reviewForm.device}
                  onChange={(e) => setReviewForm({...reviewForm, device: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent"
                  placeholder="iPhone 14 Pro"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 mr-3"
                />
                <label className="text-sm text-charcoal">I consent to having my review displayed on the SaveMyBoard website and marketing materials</label>
              </div>

              <button type="submit" className="w-full bg-accent-yellow text-navy py-4 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold text-lg glow-effect">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
  

{/* Local Pickup Modal */}
{pickupModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-blue-900">Schedule Free Pickup</h3>
          <p className="text-gray-700">East Valley same-day service available</p>
        </div>
        <button onClick={() => setPickupModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <form 
        action="https://formspree.io/f/mzzrwbkl" 
        method="POST"
        className="space-y-6"
        onSubmit={() => setTimeout(() => setPickupModalOpen(false), 1000)}
      >
        <input type="hidden" name="service_type" value="Local Pickup" />
        <input type="hidden" name="ticket_number" value={generateTicketNumber()} />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
            <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
            <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Area *</label>
            <select name="service_area" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">Select your city</option>
              {eastValleyCities.map(city => (
                <option key={city} value={city}>
                  {city} {city === "SanTan Valley" || city === "Queen Creek" ? "(Same-day available)" : "(24hr pickup)"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Device Type *</label>
            <select name="device_type" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">Select device</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Device Model & Issue *</label>
          <textarea name="device_details" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="e.g., iPhone 14 Pro - Won't charge. Dropped in water yesterday."></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location *</label>
          <textarea name="pickup_address" required rows={2} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Public location for pickup (e.g., Starbucks at Arizona Ave & Ocotillo)"></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
            <input type="date" name="pickup_date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
            <select name="pickup_time" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">Select time window</option>
              <option value="Morning (8AM-12PM)">Morning (8AM-12PM)</option>
              <option value="Afternoon (12PM-5PM)">Afternoon (12PM-5PM)</option>
              <option value="Evening (5PM-9PM)">Evening (5PM-9PM)</option>
            </select>
          </div>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="flex items-start">
            <input type="checkbox" name="rush_service" className="mt-1 mr-3" />
            <div>
              <label className="font-semibold text-gray-700">Rush Service (+$65)</label>
              <p className="text-sm text-gray-600">Same-day pickup and priority repair queue</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-yellow-400 text-blue-900 py-4 rounded-lg hover:bg-yellow-300 transition duration-300 font-bold text-lg">
          Schedule My Free Pickup
        </button>

        <p className="text-sm text-gray-600 text-center">You'll receive a confirmation with your ticket number within 15 minutes</p>
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
          <h3 className="text-3xl font-bold text-blue-900">Start Mail-In Repair</h3>
          <p className="text-gray-700">Nationwide service with free return shipping</p>
        </div>
        <button onClick={() => setMailInModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">📋</span>
          <div>
            <p className="font-semibold text-blue-900">Important: Print Your Repair Ticket</p>
            <p className="text-sm text-gray-700">After submitting, you'll receive a printable repair ticket with QR code. Include this with your device when shipping.</p>
          </div>
        </div>
      </div>

      <form 
        action="https://formspree.io/f/mzzrwbkl" 
        method="POST"
        className="space-y-6"
        onSubmit={() => setTimeout(() => setMailInModalOpen(false), 1000)}
      >
        <input type="hidden" name="service_type" value="Mail-In Repair" />
        <input type="hidden" name="ticket_number" value={generateTicketNumber()} />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
            <input type="text" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
            <input type="tel" name="phone" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input type="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Return Shipping Address *</label>
          <textarea name="return_address" required rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Complete address where we should ship your repaired device"></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Device Type *</label>
            <select name="device_type" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">Select device</option>
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Device Model *</label>
            <input type="text" name="device_model" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="e.g., iPhone 14 Pro, MacBook Air M2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Issue Description *</label>
          <textarea name="issue_description" required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Describe the problem in detail. Include when it started, what happened, and any error messages."></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Device Passcode</label>
            <input type="text" name="passcode" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="Required for testing" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Value</label>
            <select name="device_value" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="">Select range</option>
              <option value="Under $200">Under $200</option>
              <option value="$200-$500">$200-$500</option>
              <option value="$500-$1000">$500-$1000</option>
              <option value="Over $1000">Over $1000</option>
            </select>
          </div>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <div className="flex items-start">
            <input type="checkbox" name="rush_service" className="mt-1 mr-3" />
            <div>
              <label className="font-semibold text-gray-700">Rush Service (+$65)</label>
              <p className="text-sm text-gray-600">Priority handling and 24-48 hour turnaround</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-lg hover:bg-blue-800 transition duration-300 font-bold text-lg">
          Generate Repair Ticket & Shipping Label
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">After submitting, you'll receive:</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-center">
              <span className="text-teal-500 mr-2">✓</span>
              Printable repair ticket
            </div>
            <div className="flex items-center justify-center">
              <span className="text-teal-500 mr-2">✓</span>
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