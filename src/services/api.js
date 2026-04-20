import axios from 'axios';

const DUMMY_API = 'https://dummyjson.com/products';

export const fetchDummyJobs = async () => {
  try {
    const res = await axios.get(`${DUMMY_API}?limit=20`);
    const products = res.data.products;

    const companies = [
      { name: 'Google', domain: 'google.com' },
      { name: 'Microsoft', domain: 'microsoft.com' },
      { name: 'Amazon', domain: 'amazon.com' },
      { name: 'Apple', domain: 'apple.com' },
      { name: 'Meta', domain: 'meta.com' },
      { name: 'Netflix', domain: 'netflix.com' },
      { name: 'Spotify', domain: 'spotify.com' },
      { name: 'Adobe', domain: 'adobe.com' },
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'Slack', domain: 'slack.com' },
      { name: 'Shopify', domain: 'shopify.com' },
      { name: 'Stripe', domain: 'stripe.com' },
      { name: 'Uber', domain: 'uber.com' },
      { name: 'Airbnb', domain: 'airbnb.com' },
      { name: 'Twitter', domain: 'twitter.com' },
      { name: 'LinkedIn', domain: 'linkedin.com' },
      { name: 'GitHub', domain: 'github.com' },
      { name: 'Notion', domain: 'notion.so' },
      { name: 'Figma', domain: 'figma.com' },
      { name: 'Vercel', domain: 'vercel.com' },
    ];

    const roles = [
      'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
      'DevOps Engineer', 'Data Scientist', 'Product Manager',
      'UX Designer', 'Mobile Developer', 'Cloud Architect',
      'Software Engineer', 'ML Engineer', 'SRE',
      'Engineering Manager', 'QA Engineer', 'Security Engineer',
      'Platform Engineer', 'React Developer', 'Node.js Developer',
      'Python Developer', 'Solutions Architect'
    ];

    const statuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
    const platforms = ['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'AngelList', 'Glassdoor'];
    const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'London, UK', 'Bangalore, India', 'Berlin, Germany'];

    return products.map((p, i) => {
      const company = companies[i % companies.length];
      const statusIndex = i % statuses.length;
      const appliedDate = new Date();
      appliedDate.setDate(appliedDate.getDate() - Math.floor(Math.random() * 60));
      const interviewDate = new Date(appliedDate);
      interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 14) + 3);

      return {
        id: crypto.randomUUID(),
        company: company.name,
        companyDomain: company.domain,
        role: roles[i % roles.length],
        location: locations[i % locations.length],
        salary: Math.floor(p.price * 1000) + 50000,
        platform: platforms[i % platforms.length],
        status: statuses[statusIndex],
        appliedDate: appliedDate.toISOString().split('T')[0],
        interviewDate: statusIndex === 1 ? interviewDate.toISOString().split('T')[0] : '',
        notes: p.description || '',
        bookmarked: i % 4 === 0,
      };
    });
  } catch (error) {
    console.error('Failed to fetch dummy jobs:', error);
    return [];
  }
};

export const getCompanyLogo = (domain) => {
  return `https://logo.clearbit.com/${domain}`;
};
