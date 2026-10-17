/**
 * Centralized Academy Contact & WhatsApp Configuration
 * Single Source of Truth for Admissions & Support
 */

export const ACADEMY_CONTACT = {
  academyName: "Minara-ul-Quran (Minaratul Quran Academy)",
  tagline: "Learn Quran. Understand Islam. Live with Noor.",
  email: "aq0871633@gmail.com",
  
  // WhatsApp Numbers
  whatsappPrimary: "+92 337 3029707",
  whatsappPrimaryRaw: "923373029707",
  whatsappSecondary: "+92 327 3726496",
  whatsappSecondaryRaw: "923273726496",

  // Phone Numbers
  phonePrimary: "+92 337 3029707",
  phoneSecondary: "+92 327 3726496",

  // Operating Centers
  operatingCenters: "London, UK & Islamabad, Pakistan",
  servingRegions: "Serving USA, UK, Canada, Australia, UAE, Saudi Arabia, Pakistan & Worldwide",

  /**
   * Generates a direct WhatsApp click-to-chat URL
   * @param {string} customMessage - Prefilled message text
   * @param {boolean} useSecondary - If true, uses the secondary WhatsApp number
   * @returns {string}
   */
  getWhatsAppUrl(customMessage = "", useSecondary = false) {
    const rawNumber = useSecondary ? this.whatsappSecondaryRaw : this.whatsappPrimaryRaw;
    const defaultMsg = "Assalamu Alaikum! I would like to get information about Quran courses and admission at Minara-ul-Quran Academy.";
    const text = encodeURIComponent(customMessage.trim() || defaultMsg);
    return `https://wa.me/${rawNumber}?text=${text}`;
  },

  /**
   * Generates a mailto link
   * @param {string} subject 
   * @param {string} body 
   * @returns {string}
   */
  getMailtoUrl(subject = "Academy Inquiry - Minara-ul-Quran", body = "") {
    return `mailto:${this.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

export default ACADEMY_CONTACT;
