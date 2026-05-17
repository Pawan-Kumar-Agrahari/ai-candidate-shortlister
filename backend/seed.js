const mongoose = require('./utils/mockMongoose'); // Using mock local database
const Candidate = require('./models/Candidate');
require('dotenv').config();

const seedData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    experience: 4,
    projects: ['E-commerce Platform', 'Chat App'],
    bio: 'Full stack developer with 4 years of experience in MERN stack.'
  },
  {
    name: 'Priya Patel',
    email: 'priya@example.com',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    experience: 2.5,
    projects: ['Data Analytics Dashboard'],
    bio: 'Backend focused developer passionate about clean architecture.'
  },
  {
    name: 'Amit Kumar',
    email: 'amit@example.com',
    skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
    experience: 6,
    projects: ['Banking Microservices'],
    bio: 'Senior backend engineer.'
  },
  {
    name: 'Neha Gupta',
    email: 'neha@example.com',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    experience: 3,
    projects: ['Portfolio Generator', 'SaaS Dashboard'],
    bio: 'Frontend specialist with an eye for design.'
  }
];

mongoose.connect()
  .then(async () => {
    console.log('Seeding data to local db.json...');
    await Candidate.deleteMany({});
    await Candidate.insertMany(seedData);
    console.log('Data seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });
