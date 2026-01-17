/**
 * Logos Data
 * Contains client logos and university logos for carousel displays
 */

/**
 * Client/Organization Logos
 * Companies and organizations that have collaborated with Dinni
 */
export const clientLogos = [
  {
    id: 1,
    name: "Microsoft",
    image: "/images/logo client/icon-microsoft.svg",
    alt: "Microsoft",
  },
  {
    id: 2,
    name: "Glints",
    image: "/images/logo client/icon-glints.svg",
    alt: "Glints",
  },
  {
    id: 3,
    name: "Shift Academy",
    image: "/images/logo client/icon-shift-academy.svg",
    alt: "Shift Academy",
  },
  {
    id: 4,
    name: "Tanoto Foundation",
    image: "/images/logo client/icon-tanoto.svg",
    alt: "Tanoto Foundation",
  },
  {
    id: 5,
    name: "Paragon",
    image: "/images/logo client/icon-paragon.svg",
    alt: "Paragon",
  },
  {
    id: 6,
    name: "Yayasan Baitul Maal",
    image: "/images/logo client/icon-yayasan-baitul-maal.svg",
    alt: "Yayasan Baitul Maal",
  },
  {
    id: 7,
    name: "U Shape",
    image: "/images/logo client/icon-u-shape.svg",
    alt: "U Shape",
  },
  {
    id: 8,
    name: "Salman",
    image: "/images/logo client/icon-salman.svg",
    alt: "Salman",
  },
  {
    id: 9,
    name: "Bank Syariah Indonesia",
    image: "/images/logo client/Bank_Syariah_Indonesia.svg.png",
    alt: "BSI",
  },
  {
    id: 10,
    name: "ICDX",
    image: "/images/logo client/logoICDXOrange 1.db6a58c.png",
    alt: "ICDX",
  },
];

/**
 * University Logos
 * Universities from alumni network
 */
export const universityLogos = [
  {
    id: 1,
    name: "Columbia University",
    image: "/images/logo univ/Columbia.svg",
    alt: "Columbia University",
  },
  {
    id: 2,
    name: "Cornell University",
    image: "/images/logo univ/Cornell.svg",
    alt: "Cornell University",
  },
  {
    id: 3,
    name: "University College London",
    image: "/images/logo univ/UCL.svg",
    alt: "University College London",
  },
  {
    id: 4,
    name: "University of Melbourne",
    image: "/images/logo univ/Melbourne.svg",
    alt: "University of Melbourne",
  },
  {
    id: 5,
    name: "INSEAD",
    image: "/images/logo univ/Insead.svg",
    alt: "INSEAD",
  },
  {
    id: 6,
    name: "Harvard University",
    image: "/images/logo univ/Harvard_University_coat_of_arms.svg.png",
    alt: "Harvard University",
  },
];

/**
 * Statistics
 */
export const logoStats = {
  totalClients: clientLogos.length,
  totalUniversities: universityLogos.length,
  totalPartners: clientLogos.length + universityLogos.length,
};

export default {
  clients: clientLogos,
  universities: universityLogos,
  stats: logoStats,
};
