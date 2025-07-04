import type { Props as WorkDetails } from '../components/WorkDetails.astro';

export const SuperHi = {
  companyName: 'SuperHi',
  timeline: {
    from: '05-01-2022',
    to: '12-01-2024',
  },
  role: ['Frontend Engineer', 'Senior Software Engineer'],
  description: `I spent a great couple of years (May 2022 - Dec 2024) at SuperHi,
              a high-growth startup, climbing from Front-End to Senior Software
              Developer. I got to build and document a flexible design system
              that helped keep things consistent across tons of sites. A big
              focus was also making our own engineering team faster. I helped
              improve workflows with better testing, logging, and documentation,
              which even sped up how quickly we could launch new courses (from
              months to just 2 weeks!). On the Senior side, I played a key role
              in projects that really moved the needle, boosting revenue by 22%
              with new sites and improving user retention by 10% by tackling UI
              issues. Plus, I optimized performance, cutting load times by 40%,
              and even prototyped fun stuff like AI-powered learning tools.`,
  projects: [
    {
      title: 'SuperHi Platform Redesign',
      url: 'https://dribbble.com/shots/25309216-SuperHi-Platform-and-Marketing-Site-Redesign',
      description: `Spearheaded a platform redesign at SuperHi that drove a
                      22% increase in conversion and a 209% customer growth for
                      over 50,000 users. I led the technical execution, which
                      involved a full-stack migration to Next.js 14,
                      implementing a new, award-winning front-end, and
                      redesigning core content, the dashboard, and the video
                      player experience.`,
      assets: [
        { type: 'video', url: 'sh-home-hero-load.webm' },
        { type: 'video', url: 'sh-homepage-about-hero.webm' },
        { type: 'video', url: 'sh-homepage-testimonial.webm' },
        { type: 'video', url: 'sh-homepage-footer.webm' },
      ],
    },
    {
      title: 'SuperHi Plus',
      url: 'https://dribbble.com/shots/25309292-SuperHi-Plus',
      description: `SuperHi Plus is a program by SuperHi, making it easier to
                      recruit promising creatives from around the world and
                      mentor them to become educators. I drove a 47% increase in
                      traffic to SuperHi's main site through the successful
                      launch of the SuperHi Plus sub-brand. As a Frontend
                      Engineer, I developed the program's engaging and
                      interactive website, focusing on motion and performance to
                      create an immersive user experience. The launch exceeded
                      all targets, attracting over 14,000 visitors and doubling
                      the expected number of applicants.`,
      assets: [
        { type: 'video', url: 'sh-plus.webm' },
        { type: 'video', url: 'sh-plus-courses.webm' },
        { type: 'video', url: 'sh-plus-explore-section.webm' },
        { type: 'video', url: 'sh-plus-quote-section.webm' },
      ],
    },
    {
      title: 'Bounties',
      url: 'bounties.sh',
      description: `Bounties was a SuperHi platform designed to make it easier
                      for freelancers to find creative projects and get paid
                      transparently. Based on Ethereum smart contracts, clients
                      would put their project funds in escrow which would then
                      be used to pay creators after their work was completed.`,
      assets: [
        { type: 'video', url: 'bounties-homepage-1.webm' },
        { type: 'video', url: 'bounties-homepage-2.webm' },
        { type: 'video', url: 'bounties-homepage-3.webm' },
      ],
    },
  ],
} satisfies WorkDetails;

export const Vercel = {
  companyName: 'Vercel',
  timeline: {
    from: '09-01-2021',
    to: '05-01-2022',
  },
  role: 'Customer Success Engineer',
  description: `I was a Customer Success Engineer at Vercel, where I helped
                customers get the most out of their Vercel projects. I was
                responsible for onboarding new customers, providing technical
                support, and ensuring that customers were successful with
                Vercel. I also worked on the Vercel platform itself, helping to
                improve the platform's features and infrastructure.`,
  projects: [
    {
      title: 'Vercel Admin',
      description: `I maintained and improved the Vercel Admin, an internal tool
                      helping the CSE team, and others, manage customer requests
                      by querying, updating, and deleting projects, deployments,
                      domains, and more. I was responsible for iterating on the
                      tool's core features and infrastructure to improve our
                      internal velocity in responding to customer requests.`,
    },
    {
      title: 'Vercel Support Page',
      description: `I built a new support page for Vercel, which was used by
                      over 100,000 users. I was responsible for building the
                      tool's core features and infrastructure.`,
    },
  ],
} satisfies WorkDetails;

export const Lyncxs = {
  companyName: 'Lyncxs (formerly: C360HD)',
  timeline: {
    from: '04-01-2020',
    to: '03-01-2021',
  },
  role: 'Technical Co-Founder',
  description: `I co-founded Lyncxs, a platform that helps people find and
                connect with others who share their interests. Working as the
                sole designer and developer in the team, I was responsible for
                the company's branding and design, as well as building the
                platform's core features and infrastructure. The platform was
                used by over 500 businesses in the Greater Montreal Area with
                over $50k in revenue per month. I left my
                role in early 2021 to focus on my freelance work.`,
  projects: [
    {
      title: 'Lyncxs Marketing Site',
      description: `I built the Lyncxs marketing site, a site that helps people
                      find and connect with others who share their interests.`,
      assets: [
        { type: 'video', url: 'lyncxs-homepage.webm' },
        { type: 'video', url: 'lyncxs-pricing-page.webm' },
        { type: 'video', url: 'lyncxs-examples-page.webm' },
      ],
    },
    {
      title: 'Lyncxs Branding',
      description: `I designed the Lyncxs branding, including the logo,
      website, and marketing materials.`,
    },
    {
      title: 'Lyncxs Internal Dashboard and Admin',
      description: `I created an internal dashboard and admin for Lyncxs, which
                      helped the team manage new leads, customers, and more.`,
    },
  ],
} satisfies WorkDetails;

export const Freelance = {
  companyName: 'Freelance Creative Technologist',
  timeline: {
    from: '01-01-2020',
    to: '05-01-2023',
  },
  role: 'Creative Technologist',
  description: `I was a freelance creative technologist, helping clients build
                their brands and websites. I worked on creating interactive and
                accessible websites for clients across the globe, working by
                myself or with international digital agencies. My work was featured
                in multiple design awards, including Typewolf, and SiteInspire.`,
  projects: [
    {
      title: 'Various Websites',
      description: `I built various websites for clients across the globe,
                      working by myself or with international digital agencies.`,
      assets: [
        { type: 'video', url: 'kalissi-homepage.webm' },
        { type: 'video', url: 'kalissi-projects.webm' },
        { type: 'video', url: 'cgr-homepage.webm' },
        { type: 'video', url: 'liquid-media-group.webm' },
      ],
    },
  ],
} satisfies WorkDetails;
