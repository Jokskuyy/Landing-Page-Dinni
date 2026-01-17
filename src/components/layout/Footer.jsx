import React from 'react';

/**
 * Footer Component
 * Site footer with links and social media
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { label: 'Tentang', href: '#aboutme' },
      { label: 'Layanan', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimoni', href: '#testimoni' },
      { label: 'Kontak', href: '#kontak' },
    ],
    social: [
      { name: 'LinkedIn', icon: 'linkedin', link: 'https://linkedin.com/in/dinnirahmawati' },
      { name: 'Instagram', icon: 'instagram', link: 'https://instagram.com/dinnirahmawati' },
      { name: 'Medium', icon: 'medium', link: 'https://medium.com/@dinnirahmawati' },
      { name: 'WhatsApp', icon: 'whatsapp', link: 'https://wa.me/62859106531249' },
    ],
  };

  return (
    <footer id="footer" className="bg-primary-600 py-16">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Branding */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Dinni Rahmawati
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              People Development Practitioner & Career Mentor. Membantu individu
              mencapai potensi terbaik melalui pembelajaran yang transformatif.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope mt-1 text-white"></i>
                <a href="mailto:dinnirahmawati.coach@gmail.com" className="hover:text-white transition-colors">
                  dinnirahmawati.coach@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fab fa-whatsapp mt-1 text-white"></i>
                <a href="https://wa.me/62859106531249" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +62 859-1065-31249
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-white"></i>
                <span>New York, USA & Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="text-center text-white/80 text-sm">
            <p>
              &copy; {currentYear} Dinni Rahmawati. All rights reserved.
            </p>
            <p className="mt-2">
              Built with ❤️ using React & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
