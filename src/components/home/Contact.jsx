import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Contact Section Component
 * Contact information with social media cards and FAQ section
 */
const Contact = () => {
  const { t } = useLanguage();
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "dinni.rahmwt@gmail.com";
  const whatsappNumber = "+62 859-1065-31249";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const contactCards = [
    {
      icon: "fab fa-whatsapp",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "WhatsApp",
      subtitle: t("Respon cepat untuk konsultasi", "Fast response for consultation"),
      buttonText: t("Chat via WhatsApp", "Chat via WhatsApp"),
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      link: `https://wa.me/62859106531249?text=${encodeURIComponent(t("Halo Kak Dinni, saya ingin bertanya tentang layanan mentoring/training", "Hi Dinni, I want to ask about your mentoring/training services"))}`,
    },
    {
      icon: "fas fa-envelope",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      title: "Email",
      subtitle: t("Untuk inquiry formal & corporate", "For formal & corporate inquiries"),
      buttonText: emailCopied ? t("Tersalin!", "Copied!") : t("Kirim Email", "Send Email"),
      buttonBg: emailCopied ? "bg-green-600" : "bg-gray-600 hover:bg-gray-700",
      action: handleCopyEmail,
    },
    {
      icon: "fab fa-instagram",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      title: "Instagram",
      subtitle: t("Follow untuk tips & insights", "Follow for tips & insights"),
      buttonText: "@abcdinis",
      buttonBg: "bg-gray-800 hover:bg-gray-900 text-white",
      link: "https://instagram.com/abcdinis",
    },
    {
      icon: "fab fa-linkedin",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-700",
      title: "LinkedIn",
      subtitle: t("Connect untuk update profesional", "Connect for professional updates"),
      buttonText: t("Connect di LinkedIn", "Connect on LinkedIn"),
      buttonBg: "bg-gray-800 hover:bg-gray-900 text-white",
      link: "https://linkedin.com/in/dinnirahmawati",
    },
  ];

  const faqs = [
    {
      question: t("Berapa lama durasi mentoring?", "How long is the mentoring session?"),
      answer: t(
        "Satu sesi mentoring berlangsung 60-90 menit, tergantung paket yang dipilih.",
        "One mentoring session lasts 60-90 minutes, depending on the chosen package."
      ),
    },
    {
      question: t("Apakah bisa online?", "Can it be done online?"),
      answer: t(
        "Ya, semua sesi mentoring bisa dilakukan secara online via Zoom atau Google Meet.",
        "Yes, all mentoring sessions can be conducted online via Zoom or Google Meet."
      ),
    },
    {
      question: t("Bagaimana cara booking?", "How to book?"),
      answer: t(
        "Hubungi via WhatsApp untuk diskusi kebutuhan, lalu pilih jadwal yang tersedia.",
        "Contact via WhatsApp to discuss your needs, then choose an available schedule."
      ),
    },
    {
      question: t("Ada garansi?", "Is there a guarantee?"),
      answer: t(
        "Saya menawarkan satisfaction guarantee - jika tidak puas dengan sesi pertama, uang kembali 100%.",
        "I offer a satisfaction guarantee - if you're not satisfied with the first session, 100% money back."
      ),
    },
  ];

  return (
    <section
      id="contactus"
      className="relative py-24 overflow-hidden bg-gray-50"
    >
      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-blue-600 text-xs font-bold tracking-wider uppercase mb-4">
            {t("KONTAK", "CONTACT")}
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("Mari Diskusikan Kebutuhanmu", "Let's Discuss Your Needs")}
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t(
              "Punya pertanyaan tentang layanan mentoring atau ingin mendiskusikan training untuk organisasimu? Jangan ragu untuk menghubungi saya.",
              "Have questions about mentoring services or want to discuss training for your organization? Don't hesitate to contact me."
            )}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <i className={`${card.icon} text-2xl ${card.iconColor}`}></i>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{card.subtitle}</p>

              {card.link ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 ${card.buttonBg} text-white font-medium rounded-lg transition-all w-full justify-center`}
                >
                  <span>{card.buttonText}</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </a>
              ) : (
                <button
                  onClick={card.action}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 ${card.buttonBg} text-white font-medium rounded-lg transition-all w-full justify-center`}
                >
                  <span>{card.buttonText}</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div
          className="bg-white rounded-2xl p-8 md:p-10 border border-gray-200"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t("Pertanyaan yang Sering Diajukan", "Frequently Asked Questions")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
