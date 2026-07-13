import project1 from '../assets/project1.png'
import project2 from '../assets/project2.png'
import project3 from '../assets/project3.png'
import project4 from '../assets/project4.png'
import project5 from '../assets/project5.png'

export const personalInfo = {
  name: 'Arslan Iqbal',
  title: 'Software Engineer & Front-End Developer',
  email: 'arslaniqbal4666@gmail.com',
  phone: '', // Can be updated
  location: 'Pakistan',
  github: 'https://github.com/arslaniqbal4666',
  linkedin: 'https://www.linkedin.com/in/arslan-iqbal-aa51a7305/',
  summary: 'Software Engineering undergraduate with 2+ years of experience developing modern user interfaces and scalable full-stack applications using React, Node.js, Express.js, MongoDB, Tailwind CSS, and WordPress.',
};

export const education = [
  {
    degree: 'BS Software Engineering',
    institution: 'Hazara University',
    duration: '2022 - 2026',
    description: 'Developing a strong foundation in software engineering principles, algorithms, and full-stack development.',
  }
];

export const experiences = [
   {
    role: 'Full-Stack Web Developer',
    company: 'FIVED ',
    duration: '2024 – 2025',
    bullets: [
      'Developed full-stack web applications using MongoDB, Express, React, and Node.',
      'Created custom WordPress websites and integrated responsive client interfaces.',
    ],
  },
  {
    role: 'Front-End Developer',
    company: 'FutureXcel',
    duration: 'Nov 2025 – Dec 2025',
    bullets: [
      'Designed responsive UI designs and developed high-fidelity user flows.',
      'Collaborated with developers to integrate UI components with backend APIs.',
    ],
  },
 
  {
    role: 'Digital Campaign Analyst',
    company: 'Hackta Connect Pvt Ltd',
    duration: 'Dec 2025 – Jan 2026',
    bullets: [
      'Monitored ad performance metrics and analyzed user conversion funnels.',
      'Supported integration of tracking scripts and custom campaign landing pages.',
    ],
  },
 {
    role: 'Front-End Development Intern',
    company: 'Hazara University, Mansehra',
    duration: 'Jan 2026 – Jun 2026',
    bullets: [
      'Developed Hazara University website UI using React.js and Tailwind CSS.',
      'Built reusable, highly performant, and responsive UI components.',
    ],
  },
 
];

export const projectsData = [
  {
    id: 3,
    title: 'Campus Guard App',
    category: 'MERN Stack',
    description: 'Secure and anonymous complaint reporting system. Real-time communication and status tracking.Mobile responsive design with email notifications.Role based dashboards for students, proctors, and chief proctor.',
    image: project3,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'tailwind CSS'],
    liveLink: 'https://frontend-blond-chi-82.vercel.app/',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
  {
    id: 2,
    title: 'Hazara University Website Redesign',
    category: 'Front-End',
    description: 'Change in User Interface and User Experience of Hazara University Website with modern design, smooth animations, and responsive layouts.',
    image: project2,
    tags: ['React.js', 'Tailwind CSS'],
    liveLink: 'https://arslan-1312.github.io/HU-Website/',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
  {
    id: 1,
    title: 'E-Commerce Hub',
    category: 'MERN Stack',
    description: 'A premium, fully responsive online shopping experience with a dynamic cart, product filtering, secure checkout, and interactive dashboards.',
    image: project1,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
  {
    id: 4,
    title: 'Digital Library System',
    category: 'Front-End',
    description: 'A sleek dashboard to search, issue, and return books with user authentication, fine calculation, and reading statistics.',
    image: project4,
    tags: ['React.js', 'Tailwind CSS', 'Lucide Icons', 'Context API'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
  {
    id: 5,
    title: 'Modern Job Portal',
    category: 'MERN Stack',
    description: 'A jobs marketplace connecting recruiters and applicants with resume building, advanced search filters, and application tracking.',
    image: project5,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
  {
    id: 6,
    title: 'Creative Portfolio UI',
    category: 'UI/UX Design',
    description: 'Award-winning concept portfolio with rich hover interactions, custom web animations, and fluid scroll transitions.',
    image: project1,
    tags: ['Framer Motion', 'Tailwind CSS', 'React.js', 'Figma'],
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/arslaniqbal4666',
  },
];

export const certificationsData = [
 {
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    date: '2025',
    credentialId: 'META-FE-9823',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'group-hover:border-blue-500/40',
  },
  {
    title: 'Google AI Studio',
    issuer: 'Google Developer Group Islamabad',
    date: '2026',
    credentialId: '1D-AI-2026',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'group-hover:border-purple-500/40',
  },
  {
    title: 'Wireframing and UI/UX Design Certificate ',
    issuer: 'Google',
    date: '2025',
    credentialId: 'HU-RWD-2025',
    color: 'from-cyan-500/20 to-emerald-500/20',
    borderColor: 'group-hover:border-cyan-500/40',
  },
  {
    title: 'WordPress Training Certificate',
    issuer: 'DigiSkills.pk',
    date: '2026',
    credentialId: 'FXT2XSMMK',
    color: 'from-indigo-500/20 to-purple-500/20',
    borderColor: 'group-hover:border-indigo-500/40',
  },
  {
    title: 'Search Engine Optimization (SEO) with Squarespace',
    issuer: 'Coursera',
    date: '2024',
    credentialId: 'https://coursera.org/verify/QXHOE3V0YYTD',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'group-hover:border-emerald-500/40',
  },
  {
    title: 'Freelancing Training Certificate',
    issuer: 'DigiSkills.pk',
    date: '2024',
    credentialId: 'UDE-NODE-8831',
    color: 'from-green-500/20 to-emerald-600/20',
    borderColor: 'group-hover:border-green-500/40',
  },
  {
    title: 'Google Ads Certification',
    issuer: 'Google',
    date: '2026',
    credentialId: 'https://coursera.org/verify/895H2PFUCXKP',
    color: 'from-slate-500/20 to-slate-700/20',
    borderColor: 'group-hover:border-slate-500/40',
  },
];
