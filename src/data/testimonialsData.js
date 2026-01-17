/**
 * Testimonials Data
 * Contains all testimonials from clients, mentees, and training participants
 */

export const testimonials = [
  {
    id: 1,
    name: "Aisyah Putri",
    title: "LPDP Awardee → Columbia University",
    category: "Beasiswa",
    categoryIcon: "graduation-cap",
    categoryStyle: "white-border", // white bg with border
    rating: 5,
    text: "Kak Dinni sangat membantu dalam proses aplikasi LPDP dan admission ke Columbia. Dari brainstorming essay sampai mock interview, semua sangat terstruktur. Alhamdulillah diterima di Columbia University!",
  },
  {
    id: 2,
    name: "Rizky Pratama",
    title: "Software Engineer → Product Manager",
    category: "Mentoring",
    categoryIcon: "user-tie",
    categoryStyle: "primary",
    rating: 5,
    text: "Awalnya bingung mau transisi karier dari engineer ke PM. Setelah mentoring dengan Kak Dinni, saya punya clarity dan roadmap yang jelas. Dalam 6 bulan, berhasil land dream job sebagai PM di startup unicorn!",
  },
  {
    id: 3,
    name: "Sarah Amelia",
    title: "Fresh Graduate → Management Trainee",
    category: "Mentoring",
    categoryIcon: "user-tie",
    categoryStyle: "primary",
    rating: 5,
    text: "Sebagai fresh graduate yang bingung, sesi mentoring ini sangat membuka wawasan. Kak Dinni membantu saya memahami strengths dan positioning diri. Sekarang sudah diterima di program MT salah satu bank BUMN!",
  },
  {
    id: 4,
    name: "Ahmad Fauzi",
    title: "HR Manager at Startup",
    category: "Corporate Training",
    categoryIcon: "building",
    categoryStyle: "dark",
    rating: 5,
    text: "Corporate training dari Kak Dinni sangat impactful untuk tim kami. Materi relevan, delivery engaging, dan team kami jadi lebih aligned dalam goals. Highly recommended!",
  },
  {
    id: 5,
    name: "Maya Sari",
    title: "LPDP Awardee → UCL",
    category: "Beasiswa",
    categoryIcon: "graduation-cap",
    categoryStyle: "white-border",
    rating: 5,
    text: "Proses aplikasi beasiswa itu overwhelming, tapi dengan guidance Kak Dinni jadi lebih terarah. Essay review-nya sangat detail dan membantu saya articulate cerita dengan lebih powerful. Sekarang kuliah di UCL!",
  },
  {
    id: 6,
    name: "Budi Santoso",
    title: "Senior Manager at Telkom",
    category: "Corporate Training",
    categoryIcon: "building",
    categoryStyle: "dark",
    rating: 5,
    text: "Sudah beberapa kali mengikuti workshop dari Kak Dinni. Materinya always up to date dan applicable. Timku jadi lebih aware tentang career development journey mereka masing-masing.",
  },
  {
    id: 7,
    name: "Bapak Winanto Adi",
    title: "Konsul Jenderal KJRI New York",
    category: "Offline Training",
    categoryIcon: "building",
    categoryStyle: "dark",
    rating: 5,
    text: "Saya atas nama KJRI NY mengucapkan banyak terima kasih kepada Mbak Dinni dan tim yang telah berhasil menyelenggarakan kegiatan Team Building. Output dan Outcomenya bagus banget. Beyond my expectations. Good job.",
  },
  {
    id: 8,
    name: "Zulfal Faradis",
    title: "Strategic Development Manager, ICDX",
    category: "Online Training",
    categoryIcon: "video",
    categoryStyle: "dark",
    rating: 5,
    text: "The online workshop on Self-leadership and Teamwork offers a transformative learning experience. Dinni as a facilitator engages participants through interactive brainstorming, reflection, and team exercises. I highly recommend her workshop to cultivate essential soft skills for your team's success.",
  },
];

/**
 * Testimonial categories
 */
export const testimonialCategories = [
  'All',
  'Beasiswa',
  'Mentoring',
  'Corporate Training',
  'Offline Training',
  'Online Training',
];

/**
 * Get testimonials by category
 */
export const getTestimonialsByCategory = (category) => {
  if (category === 'All') {
    return testimonials;
  }
  return testimonials.filter((testimonial) => testimonial.category === category);
};

/**
 * Get testimonial statistics
 */
export const testimonialStats = {
  total: testimonials.length,
  beasiswa: testimonials.filter((t) => t.category === 'Beasiswa').length,
  mentoring: testimonials.filter((t) => t.category === 'Mentoring').length,
  corporateTraining: testimonials.filter((t) => t.category === 'Corporate Training').length,
  offlineTraining: testimonials.filter((t) => t.category === 'Offline Training').length,
  onlineTraining: testimonials.filter((t) => t.category === 'Online Training').length,
  averageRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
};

export default testimonials;
