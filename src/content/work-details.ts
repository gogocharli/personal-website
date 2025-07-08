import type { Props as WorkDetails } from '../components/WorkDetails.astro';

export const SuperHi = {
  companyName: 'SuperHi',
  timeline: {
    from: '05-01-2022',
    to: '12-01-2024',
  },
  role: ['Frontend Engineer', 'Senior Software Engineer'],
  description: [
    `I spent almost 3 years of my career (May 2022 - Dec 2024) at SuperHi,
              a one–of–a–kind education startup with an incredible team and culture.
              Having written my first few lines of code alongside SuperHi courses,
              I was excited to participate in the next phase of the company growth.
             `,
    ` Initially hired as a Frontend Engineer, I set out to build, document, and iterate on a flexible design system 
              to handle the growing number of projects we were building while keeping our design language consistent. I also helped
              improve workflows with better testing, logging, and documentation,
              which even sped up how quickly we could launch new courses. Through those efforts, we reduced the time taken to build new courses from months to just 2 weeks.
              We launched 12+ new courses, growing our user base massively and helping as many instructors get paid for their work.
              `,
    `Thanks to those contributions, I was quickly promoted to Senior Software Engineer,
              where I continued to architect solutions and work across the stack,
              boosting revenue by 22% with proactive changes and improving user retention by 10% by tackling UX issues such a building a new video player.
              In addition, I optimized our performance metrics, improved our security, built a brand new dashboard,
              and even prototyped new avenues like AI-powered learning tools.`,
  ],
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
      caption: 'SuperHi Website',
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
      caption: 'SuperHi Plus Website',
    },
    {
      title: 'Bounties',
      url: 'bounties.sh',
      description: `Bounties was a SuperHi platform designed to make it easier
                      for freelancers to find creative projects and get paid
                      transparently. Based on Ethereum smart contracts, clients
                      would put their project funds in escrow which would then
                      be used to pay creators after their work was completed. It was my first forray into building for Web3,
                      and understanding the challenges of creating a user-friendly experience for an audience unfamiliar with the technology.`,
      assets: [
        { type: 'video', url: 'bounties-homepage-1.webm' },
        { type: 'video', url: 'bounties-homepage-2.webm' },
        { type: 'video', url: 'bounties-homepage-3.webm' },
      ],
      caption: 'Bounties Website',
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
  description: [
    `In late-2021, I was elated to join Vercel as a Customer Success Engineer, as an hybrid role which allowed me to work both on the customer side and the product side for our excellent CSE team.
    I was responsible for providing direct technical support to customers of all tiers, be on-call to platform incidents, give technical guidance to our enterprise customers, and add new features to our internal tooling.`,
    `Working at Vercel was a wonderful learning experience, as I was able to work alongside some ofthe best engineers in the world, in a culture dedicated to shipping fast! I developed a deep understanding of serverless architecture, Next.js, and the building and deployment pipeline necessary to ship at scale.`,
  ],
  projects: [
    {
      title: 'Vercel Admin',
      description: `I maintained and improved the Vercel Admin, an internal tool
                      helping the CSE team, and others, manage customer requests
                      by querying, updating, and deleting projects, deployments,
                      domains, and more. I was responsible for iterating on the
                      tool's core features and infrastructure, improving our
                      internal velocity by 50% on recurring tickets by reducing resolution time.`,
    },
    {
      title: 'Vercel Support Page',
      description: `I built a new support page for Vercel, facilitating the migration of hobby tier customer support to GitHub Discussions. This allowed us to focus on our paid customers, reducing incoming support requests by over 30% and reducing the workload on our CSE team.`,
    },
  ],
} satisfies WorkDetails;

export const Lyncxs = {
  companyName: 'Lyncxs',
  timeline: {
    from: '04-01-2020',
    to: '03-01-2021',
  },
  role: 'Technical Co-Founder',
  description: [
    `A couple months after writing my first few lines of code, I joined hands with a B2B sales veteran to build Lyncxs (formerly: C360HD): A panoramic virutal tour booking platform for retail businesses.`,
    `I was responsible for the company's branding and design, as well as
                building the platform's core features and infrastructure. The
                platform was used by over 500 businesses in the Greater
                Montreal Area with over $50k in revenue per month.`,
  ],
  projects: [
    {
      title: 'Lyncxs Marketing Site',
      description: `I designed and built the Lyncxs marketing site with Next.js, TypeScript, and the Google Maps API. It included multiple features such as a multi-step booking flow, a custom booking calendar. This site was the main touch point between our sales team and potential customers. It improved our conversion rate by over 70% when first introduced compared to our initial MVP.`,
      assets: [
        { type: 'video', url: 'lyncxs-homepage.webm' },
        { type: 'video', url: 'lyncxs-pricing-page.webm' },
        { type: 'video', url: 'lyncxs-examples-page.webm' },
      ],
      caption: 'Lyncxs Website',
    },
    {
      title: 'Lyncxs Internal Dashboard and Admin',
      description: `I created an internal dashboard and admin for Lyncxs, which
                      helped the team automate serveral steps of the service, including booking creation, payment processing, scheduling the calendar of our photographers, automating the virtual tour upload to Google Street View, and more.`,
      caption: 'Lyncxs Internal Dashboard and Admin',
    },
    {
      title: 'Lyncxs Branding',
      description: `I designed the Lyncxs branding, including the logo,
      website, and marketing materials used across social media.`,
      caption: 'Lyncxs Branding',
    },
  ],
} satisfies WorkDetails;

export const Freelance = {
  companyName: 'Freelance',
  timeline: {
    from: '01-01-2020',
    to: '05-01-2023',
  },
  role: 'Creative Technologist',
  description: [
    `I started my web development career as a freelance creative technologist, helping clients build
                their brands and websites. I worked on creating interactive and
                accessible websites for clients across the globe, working by
                myself or with international digital agencies such as SameSameStudio. My work was featured
                in multiple design awards, including Typewolf, and SiteInspire.`,
  ],
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
      caption: 'Some of my freelance work',
    },
  ],
} satisfies WorkDetails;
