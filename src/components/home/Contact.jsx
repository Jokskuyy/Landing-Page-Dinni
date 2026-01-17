import React, { useState } from "react";

/**
 * Contact Section Component
 * Contact information and social media links
 */
const Contact = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "dinnirahmawati.coach@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const contactMethods = [
    {
      icon: "envelope",
      title: "Email",
      value: email,
      action: handleCopyEmail,
      buttonText: emailCopied ? "Tersalin!" : "Copy Email",
    },
    {
      icon: "whatsapp",
      iconType: "fab",
      title: "WhatsApp",
      value: "+62 859-1065-31249",
      link: "https://wa.me/62859106531249",
      buttonText: "Chat WhatsApp",
    },
    {
      icon: "linkedin",
      iconType: "fab",
      title: "LinkedIn",
      value: "Dinni Rahmawati",
      link: "https://linkedin.com/in/dinnirahmawati",
      buttonText: "Lihat Profil",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "instagram",
      link: "https://instagram.com/dinnirahmawati",
      color: "hover:text-pink-600",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://linkedin.com/in/dinnirahmawati",
      color: "hover:text-blue-600",
    },
    {
      name: "Medium",
      icon: "medium",
      link: "https://medium.com/@dinnirahmawati",
      color: "hover:text-gray-800",
    },
  ];

  return (
    <section id="kontak" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-primary-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full mb-4">
            <span className="material-icons-round text-primary-600 text-lg">
              contact_mail
            </span>
            <span className="text-primary-600 font-semibold text-sm">
              KONTAK
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mari Terhubung dan{" "}
            <span className="text-primary-600">Berkembang Bersama</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hubungi saya untuk diskusi lebih lanjut mengenai training,
            mentoring, atau kolaborasi.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                <i
                  className={`${method.iconType || "fas"} fa-${
                    method.icon
                  } text-2xl text-primary-600`}
                ></i>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-6">{method.value}</p>

              {method.link ? (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                >
                  <span>{method.buttonText}</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </a>
              ) : (
                <button
                  onClick={method.action}
                  className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all ${
                    emailCopied
                      ? "bg-green-600 text-white"
                      : "bg-primary-600 hover:bg-primary-700 text-white"
                  }`}
                >
                  <i
                    className={`fas ${
                      emailCopied ? "fa-check" : "fa-copy"
                    } text-sm`}
                  ></i>
                  <span>{method.buttonText}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="text-center" data-aos="fade-up">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Ikuti Saya di Media Sosial
          </h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all ${social.color}`}
                aria-label={social.name}
              >
                <i
                  className={`fab fa-${social.icon} text-2xl text-gray-600`}
                ></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
