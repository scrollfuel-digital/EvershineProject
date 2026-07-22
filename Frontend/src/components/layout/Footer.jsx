import { FaYoutube, FaLinkedin, FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/Evershinelogo.png";
import footerBg from "../../assets/footerimage.png"; // kept for future use

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request a Quote", href: "/contact" },
];

const products = [
  { label: "PEB Buildings", href: "/peb-structure" },
  { label: "Roofing Sheets", href: "/gc-sheet" },
  { label: "Sandwich Panels", href: "/puff-panel" },
  { label: "Air Bubble Insulation", href: "/air-bubble-insulation" },
  { label: "Decking Sheets", href: "/deck-sheet" },
  { label: "Structural Components", href: "/gi-angle" },
  { label: "Building Accessories", href: "/accessories" },
];

const services = [
  "Industrial Building Solutions",
  "Roofing Solutions",
  "Warehouse Construction",
  "Manufacturing Facilities",
  "Commercial Buildings",
  "Infrastructure Solutions",
  "Customized Engineering",
  "Project Consultation",
];

const socials = [
  { icon: <FaFacebookF />, label: "Facebook", href: "#", color: "hover:text-blue-500" },
  { icon: <FaInstagram />, label: "Instagram", href: "#", color: "hover:text-pink-500" },
  { icon: <FaLinkedin />, label: "LinkedIn", href: "#", color: "hover:text-blue-400" },
  { icon: <FaYoutube />, label: "YouTube", href: "#", color: "hover:text-red-500" },
  { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/919860118911", color: "hover:text-green-400" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white">

      <div className="relative z-10">

        {/* CTA Banner */}
        <div className="bg-primary/90 py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Ready to Build Your Next Project?</h3>
              <p className="text-white/80 mt-1">Partner with Evershine Solution for reliable, high-quality, and cost-effective industrial building and roofing solutions.</p>
            </div>
            <Link to="/contact" className="shrink-0 bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
              Request a Free Consultation →
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Company Info */}
            <div className="lg:col-span-1">
              <img src={logo} alt="Evershine Solution" className="w-40 mb-5" />
              <p className="text-sm text-gray-500 leading-7 mb-6">
                Building Strong Foundations for Industrial Growth. A trusted provider of industrial building solutions across India since 2012.
              </p>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`text-gray-500 text-xl transition ${s.color}`}
                    aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-800 font-semibold text-lg mb-5 border-b border-gray-200 pb-3">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((l, i) => (
                  <li key={i}>
                    <Link to={l.href} className="text-gray-500 text-sm hover:text-primary transition">
                      → {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Products */}
            <div>
              <h4 className="text-gray-800 font-semibold text-lg mb-5 border-b border-gray-200 pb-3">Our Products</h4>
              <ul className="space-y-3">
                {products.map((p, i) => (
                  <li key={i}>
                    <Link to={p.href} className="text-gray-500 text-sm hover:text-primary transition">
                      → {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-gray-800 font-semibold text-lg mb-5 border-b border-gray-200 pb-3">Our Services</h4>
              <ul className="space-y-3">
                {services.map((s, i) => (
                  <li key={i} className="text-gray-500 text-sm">→ {s}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-gray-800 font-semibold text-lg mb-5 border-b border-gray-200 pb-3">Contact Information</h4>
              <div className="space-y-4 text-gray-500 text-sm">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                  <span>133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025</span>
                </div>
                <div className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-primary shrink-0" />
                  <a href="tel:+919860118911" className="hover:text-primary transition">+91 9860118911</a>
                </div>
                <div className="flex gap-3 items-center">
                  <FaEnvelope className="text-primary shrink-0" />
                  <a href="mailto:evershinengp@gmail.com" className="hover:text-primary transition">evershinengp@gmail.com</a>
                </div>
                <div className="flex gap-3 items-start">
                  <FaClock className="text-primary mt-1 shrink-0" />
                  <span>Mon – Sat: 09:00 AM – 06:00 PM<br />Sunday: Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Evershine Solution. All Rights Reserved.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-primary transition">Privacy Policy</Link>
              <Link to="/" className="hover:text-primary transition">Terms & Conditions</Link>
              <Link to="/" className="hover:text-primary transition">Sitemap</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
