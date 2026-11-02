/*
  ALL SITE CONTENT LIVES HERE.
  Edit this file to add, remove or reorder projects and about cards — no other file needs to change.

  FILTERS
    Each filter has an `id` (used in tags below) and a `label` (what the pill says).

  STRIP
    `strip` is the order of cards in the horizontal row on the home page.
    Each entry is either a project slug (a string, e.g. 'news-factories') or an about card id
    (e.g. 'about:services'). Mix them freely.

  PROJECTS
    slug        unique, lowercase, used in the URL: project.html?p=<slug>
    draft       optional: true = shown only on your computer, hidden on the live site
    title       card + page title
    client      card subtitle and the "client" field on the project page
    year        shown on the project page
    discipline  shown on the project page
    tags        one or more ids from filters.projects — decides which filters show this card
    cover       the image or video (.mp4) on the card. The card's width follows its proportions.
                Videos play silently on a loop while the card is on screen. Use a small version
                for cards (see EDITING.md: assets/videos/cards/).
    focus       optional: which part of the cover to keep when a phone screen crops it, e.g. '75% 50%'
    intro       the large opening paragraph of the project page
    blocks      the project page body, in order. Two kinds:
                  { media: 'path', alt: '...', caption: '...' }   image (.jpg/.png) or video (.mp4)
                  { media: ['a.jpg', 'b.mp4'], alt: '...' }         two media side by side
                  { title: '...', text: '...' }                    a text section
                Alternate media and text; the page never shows two text blocks back to back.

  ABOUT CARDS
    id       'about:<something>' — referenced in `strip`
    tag      one id from filters.about
    label    small uppercase heading on the card (same style on every card)
    Either   statement: 'big text'                     (large bold text card)
    Or       rows: [{ when, where, what }, …]          (a table, like education or skills)
             columns: ['Years', 'School', 'Degree']    (optional: the table's header row)
    width    optional, in px, for statement cards (default 384)

  VIDEOS
    .mp4 files show a still image until they load: put a .jpg with the same file name in
    assets/posters/ (e.g. assets/videos/happier.mp4 → assets/posters/happier.jpg),
    or set poster: 'path' on the block.

  LEGAL
    site.legal fills in the privacy policy and terms pages. Fill in every empty '' before going live.

  While you edit on your own computer (localhost), a box in the corner lists any mistakes:
  unknown tags, slugs missing from strip, or a file that can't be read (usually a missing comma).
  Visitors never see that box. Filters with no matching cards are hidden automatically.

  Lines marked // CHECK are guesses — please confirm.
  Full step-by-step guide: EDITING.md in this folder.
*/

window.CONTENT = {
  site: {
    name: 'Kosara Keskinova',
    email: 'hello@kosarakeskinova.com',
    instagram: 'https://www.instagram.com/kosara_keskinova/',
    location: 'Soon based in Sofia',   // shown in the footer, next to the legal links
    legal: {
      updated: '2 November 2026',          // date shown on the legal pages; change it when you edit them
      address: 'Sofia, Bulgaria',          // postal address for legal contact, e.g. 'Street 1, 1000 Sofia, Bulgaria'
      host: 'Spaceship, Inc. (USA)',       // who hosts the site
      hostPrivacy: 'https://www.spaceship.com/legal/privacy-policy/', // link to the host's privacy policy
      country: 'Bulgaria',                 // law that applies to the terms, and your data-protection authority
    },
  },

  filters: {
    projects: [
      { id: 'data-visualisation', label: 'data visualisation' },
      { id: 'editorial-design', label: 'editorial design' },
      { id: 'motion-graphics', label: 'motion graphics' },
      { id: 'interactive-installations', label: 'interactive experiences' },
    ],
    about: [
      { id: 'services', label: 'services' },
      { id: 'experience', label: 'experience' },
      { id: 'education', label: 'education' },
      { id: 'skills', label: 'skills' },
      { id: 'awards', label: 'awards' },
      { id: 'exhibitions', label: 'exhibitions' },
    ],
  },

  strip: [
    'news-factories',
    'about:services',
    'two-centuries-of-war',
    'who-was-winning',
    'about:skills',
    'news-factories-research',
    'happier',
    'about:education',
    'mood-swings',
    'about:experience',
    'social-museum',
    'five-hundred-nineteen-million',
    'about:awards',
    'volcanic-activity',
    'about:exhibitions',
    'the-asteroids-around-us',
    'nepravda',
    'stress-triggers',
    'nepravda-newspaper',
    'weather-impression',
  ],

  about: [
    {
      id: 'about:services',
      tag: 'services',
      label: 'services',
      statement: 'Information designer doing data visualisation, motion, editorial and interactive design.',
      width: 384,
    },
    {
      id: 'about:skills',
      tag: 'skills',
      label: 'skills',
      columns: ['Area', 'Tools', 'Use'],
      rows: [
        { when: 'Graphic', where: 'Illustrator, Photoshop, InDesign', what: 'Print and editorial' },
        { when: 'Interface', where: 'Figma', what: 'Layouts and prototypes' },
        { when: 'Motion', where: 'After Effects', what: 'Animation' },
        { when: 'Data', where: 'R Studio, D3.js', what: 'Analysis and charts' },
        { when: 'Web', where: 'HTML, CSS', what: 'Interactive pieces' },
        { when: 'Exploring', where: 'AI-driven workflows', what: 'New creative processes' },
      ],
    },
    {
      id: 'about:education',
      tag: 'education',
      label: 'education',
      columns: ['Years', 'School', 'Degree'],
      rows: [
        { when: '2024 - 2026', where: 'Design Academy Eindhoven', what: 'MA Information Design' },
        { when: '2018 - 2022', where: 'Free University of Bolzano', what: 'BA Industrial Design' },
      ],
    },
    {
      id: 'about:experience',
      tag: 'experience',
      label: 'experience',
      columns: ['Years', 'Where', 'Role'],
      rows: [
        { when: '2024 - now', where: 'Corriere della Sera', what: 'Data visualisation' },
        { when: '2023 - now', where: 'Data for Good (Bulgaria)', what: 'Data visualisation' },
        { when: '2023 - 2024', where: 'Sheldon.Studio', what: 'Information design' },
        { when: '2019 - now', where: 'Freelance', what: 'Multidisciplinary design' },
      ],
    },
    {
      id: 'about:awards',
      tag: 'awards',
      label: 'awards',
      columns: ['Year', 'Award', 'Result'],
      rows: [
        { when: '2025', where: 'European Design Award', what: 'Bronze, Sheldon Studio' },
        { when: '2023', where: 'European Design Award', what: 'Finalist' },
      ],
    },
    {
      id: 'about:exhibitions',
      tag: 'exhibitions',
      label: 'exhibitions',
      columns: ['Year', 'Exhibition', 'Place'],   // the table's header row
      rows: [
        { when: '2026', where: 'Dutch Design Week', what: 'Eindhoven' },
        { when: '2024', where: 'BAM Festival', what: 'Milan' },
        { when: '2024', where: 'Fight for Kindness', what: 'Multiple locations' },
        { when: '2024', where: 'Neologia, Graphic Days', what: 'Turin' },
        { when: '2023', where: 'Neologia, Graphic Days', what: 'Turin' },
      ],
    },
  ],

  projects: [
    {
      slug: 'news-factories',
      title: 'News Factories',
      client: 'Design Academy Eindhoven',
      year: '2025 – 2026',
      discipline: 'MA thesis project, interactive installation',
      tags: ['interactive-installations'],
      cover: 'assets/images/project-01-01.jpg',
      focus: '88% 50%',
      intro: 'Have you ever encountered the exact same news story across multiple websites, sometimes just seconds apart? News Factories investigates the “replication” of news within the Bulgarian online media landscape, and what that repetition reveals about the power structures shaping digital media.',
      blocks: [
        { media: 'assets/images/project-01-03.jpg', alt: 'The installation: timeline screen and news screen' },
        { title: 'How news stories travel', text: 'In my master degree research I was observing online media websites and how some of them work in a network, sharing the same news stories, distorting the reality. They made some stories look more important because they existed within multiple media and because of the amount of news they were publishing, other events remained unobserved. Basically, one media was publishing an article and then within a certain distance of time another media was reposting the exact same article, often quoting that it came from a different author. The distance within the publications was not fixed, neither was the chain of which media posts first, second etc. I mapped all the data that I have on a long timeline, observing the circulation within 24 hours. Each news story became a chain, where a green dot was marking the publication and republication of the news story, the distance was marking the distance in time within the republications. It made it possible to observe the quantity of news on a daily basis and within what distance were all news stories amplified.' },
        { media: 'assets/videos/screen1.mp4', alt: 'The timeline interface in use' },
        { title: 'Interaction with the dataset', text: 'I built an interactive installation which permitted me to explore all identical articles that I have personally collected in the period between November and December 2025. The interface was simple: a timeline that was showing a 24h frame window and two buttons with which to navigate back and forward. I marked some important political events in that period that also reflected the behaviour of these media outlets, such as the series of mass protests and the resignation of the government. I put the option to pause the timeline and see a line chart that was showing the amount of identical news posted daily for the whole period.' },
        { media: 'assets/images/project-01-01.jpg', alt: 'The News Factories installation' },
        { title: 'Understanding of the data', text: 'The interactive timeline that I have built was an abstract view of the dataset. It made it possible to detach from the meaning of the news stories and to observe them in a neutral way, comparing the length of their existence. On a separate screen I put the actual information that each chain from the timeline was carrying: the images, the media website that was re-publishing and the titles behind each story. While navigating the timeline, a person could also observe the visual aspect of these news stories.' },
        { media: 'assets/videos/project-01-03.mp4', alt: 'The installation in the exhibition hall: the news screen on its wooden wall, beside the timeline console' },
        { title: 'Is it possible to experience news?', text: 'The final installation became an invitation to discuss the online media today. It is easy to build a website, it is easy to create multiple of them, it is easy to connect them, it is easy to write ‘news’, it is easy and it is also permitted. The installation permitted people to experience what was visible to the audience of these websites, whose faces they were seeing as a preview of the news stories and what reality were these news depicting. It is not only a problem of fake news, disinformation or favourable political coverage, the repetition itself has meaning and I believe that we should open more discussions on this topic. If you have any thought about that, write me a message, I would be very happy to talk with you!' },
      ],
    },
    {
      slug: 'news-factories-research',
      title: 'News Factories (research)',
      client: 'Design Academy Eindhoven',
      year: '2025 – 2026',
      discipline: 'MA thesis, research publication',
      tags: ['editorial-design'], // CHECK: the research book; or 'interactive-installations' too?
      cover: 'assets/images/nf-book-01.jpg',
      intro: 'The research publication behind News Factories: a study of networks of Bulgarian online media that republish identical news, how they were found, and what allows them to exist.',
      blocks: [
        { media: 'assets/images/nf-book-03.jpg', alt: 'Book pages with text and data visualisation' },
        { title: 'From mushroom websites to networks of power', text: 'I was fascinated by a study made from DFRLab that was exploring a great amount of online media outlets with similar, nearly identical interfaces that were appearing and disappearing as domains and each of them was publishing the same exact news but as if it was their material. The study was calling them ‘mushroom websites’ for the way they were behaving and it turned out that they had a centralised platform where people could register to create ‘their own media website’ and receive money if they repost the suggested news. After the research was published this network suddenly disappeared and now some of the previous domains are redirecting you to websites that are selling swimming pools in Burgas. What was interesting to me was the system they created to amplify news stories they wanted and I really wanted to explore more in depth other networks of power. Therefore, I studied the history of media in Bulgaria and I explored the contemporary online environment today.' },
        { media: 'assets/images/nf-book-04.jpg', alt: 'Book pages with text and data visualisation' },
        { title: 'Online news thrive on Facebook', text: 'Online news ends up on social media. Because Facebook is one of the most popular platforms, I started an exploration of the Bulgarian news groups there. It was noticeable that trolls and bots were sharing materials from some websites and that is how I collected the initial nucleus of the dataset. Then I started copy-pasting some of the titles to see if they existed in other platforms too, then I checked the owners of the domains and which other platforms did they own. In this way, I revealed a broader network of media outlets engaged in republishing the same narratives, ultimately resulting in a final corpus of around 20 websites.' },
        { media: ['assets/images/nf-book-05.jpg', 'assets/images/nf-book-06.jpg'], alt: 'Book pages with text and data visualisation' },
        { title: 'Analysis and findings', text: 'I built a personal scrapper for each website that allowed me to download all of the news articles from there, keeping the title, the time of publication, the author, the image and the support text. Around 10% of the articles were identical, without a clear pattern of who is sharing news from whom. Some of the publications were made in the exact same moment, others within bigger periods of time. It became a challenge for me as an information designer to visualise their behaviour in one single chart.' },
        { media: 'assets/images/nf-book-07.jpg', alt: 'Book pages with text and data visualisation' },
        { title: 'Conclusions', text: 'The theoretical research explores in detail the different types of networks in Bulgaria that I noticed that are sharing identical content. I explore the content as well and also the political situation in which this is happening. The last chapters are focusing on the media policy and what permits the existence of these websites. If you want to learn more or just simply discuss the topic, do not hesitate and please contact me!' },
        { media: 'assets/images/nf-book-01.jpg', alt: 'The News Factories book' },
        { title: 'Gratitude', text: 'I am deeply grateful to Design Academy Eindhoven for the opportunity to be part of such an inspiring community. My sincere thanks go to Marco Ferrari, Sofia Topi, and all the professors whose guidance, knowledge, critical perspectives, and encouragement shaped this journey and helped bring this work to life. I am grateful to everyone who shared their time, care, knowledge, criticism, and encouragement with me over these two years. Every contribution, however small, helped shape this work in ways I will carry with me.' },
      ],
    },
    {
      slug: 'mood-swings',
      title: 'Mood swings',
      client: 'Personal challenge',
      year: '2026',
      discipline: 'Motion graphics',
      tags: ['motion-graphics'],
      cover: 'assets/videos/mood-swings.mp4',
      intro: 'I started doing monthly challenges to improve my data visualisation skills but it turns out also a good way to connect better to myself.',
      blocks: [
        { media: 'assets/videos/mood-swings.mp4', alt: 'Mood swings: a month of moods, animated' },
        { title: 'What the data says', text: 'If you ask me, I had just one fine week but if you see the collected data, you will realise what a rollercoaster of emotions it was. Collecting personal data like this is a powerful tool for self-reflection and growth. Our brain disposes unnecessary information but if we keep tracking it, we can uncover patterns and insights that might otherwise go unnoticed.' },
      ],
    },
    {
      slug: 'two-centuries-of-war',
      title: 'Two centuries of war',
      client: 'Corriere della Sera',
      year: '2025',
      discipline: 'Data visualisation, infographics',
      tags: ['data-visualisation'],
      cover: 'assets/images/project-02-02.jpg',
      intro: 'How conflicts have involved countries from 1816 to 1945: the number of countries where wars occurred or in which they took part, and the number of conflicts per year.',
      blocks: [
        { media: 'assets/images/project-02-02.jpg', alt: 'Two centuries of war, full visualisation' },
        { title: 'The data', text: 'The graphic distinguishes between interstate wars, wars internal to individual states, and the involvement of countries in the internal conflicts of other states (extra-state conflicts). The data are drawn from the Historical Conflict Dataset.' },

      ],
    },
    {
      slug: 'social-museum',
      title: 'Social Museum',
      client: 'With Diana Yukari, tutored by Studio Calibro',
      year: '2025 – 2026',
      discipline: 'Interactive installation',
      tags: ['interactive-installations'],
      cover: 'assets/images/project-05-02.jpg',
      intro: 'A research-led installation exploring how social media shapes the way we experience contemporary art, built from thousands of Instagram images taken in six major contemporary art museums.',
      blocks: [
        { media: 'assets/videos/project-05.mp4', alt: 'The Social Museum installation' },
        { title: 'Engagement or performance?', text: 'Through an interactive exploration of visitor poses and their positioning in relation to artworks, the installation invites visitors to reflect on their own behaviour and question where engagement ends and performance begins.' },
        { media: 'assets/images/project-05-02.jpg', alt: 'Detail of the installation' },
      ],
    },
    {
      slug: 'volcanic-activity',
      title: 'Volcanic activity',
      client: 'Corriere della Sera',
      year: '2025',
      discipline: 'Data visualisation, infographics',
      tags: ['data-visualisation'],
      cover: 'assets/images/project-04-02.jpg',
      intro: 'Eruptions over time for each of the 46 volcanoes still active in 2025, on a timeline beginning in 1900.',
      blocks: [
        { media: 'assets/images/project-04-02.jpg', alt: 'Volcanic activity visualisation' },
        { title: 'Reading the chart', text: 'Each circle is an eruption, with its start and end marked on the timeline. Dot size shows the intensity on the Volcanic Explosivity Index (VEI); colour shows whether an eruption was long-lasting or brief. The elevation and location of each volcano are also indicated.' },
      ],
    },
    {
      slug: 'the-asteroids-around-us',
      title: 'The asteroids around us',
      client: 'Corriere della Sera',
      year: '2025',
      discipline: 'Data visualisation, infographics',
      tags: ['data-visualisation'],
      cover: 'assets/images/project-06-02.jpg',
      intro: 'Asteroids that have made close approaches to Earth, compared with the confirmed impact sites listed in the Earth Impact Database.',
      blocks: [
        { media: 'assets/images/project-06-02.jpg', alt: 'The asteroids around us visualisation' },
        { title: 'Reading the chart', text: 'The analysis highlights the frequency and distance of the most recent close encounters, as well as the geological traces left by past impacts.' },
      ],
    },
    {
      slug: 'who-was-winning',
      title: 'Who was winning*',
      client: 'Personal challenge',
      year: '2025',
      discipline: 'Motion graphics',
      tags: ['motion-graphics'],
      cover: 'assets/videos/georgescu.mp4',
      intro: 'Polls and actual results of the 2024 Romanian presidential elections, animated.',
      blocks: [
        { media: 'assets/videos/georgescu.mp4', alt: 'Who was winning: polls and results of the 2024 Romanian presidential elections' },
        { title: 'What is the data saying?', text: '*The 2024 Romanian presidential elections sparked widespread debate after Călin Georgescu unexpectedly won the first round, driven by an innovative TikTok campaign. His swift rise to prominence raised concerns about the legality of his approach and the validity of the results. This graphic shows the results from the polls in the period between 06/10/2024 and 24/11/2024' },
      ],
    },
    {
      slug: 'happier',
      title: 'Happier?',
      client: 'Personal challenge',
      year: '2024',
      discipline: 'Motion graphics',
      tags: ['motion-graphics'],
      cover: 'assets/videos/dataviz-4.mp4',
      intro: 'According to the World Happiness Index, Bulgarians tend to be happier each year even though they stay in the bottom of the European ranking list.',
      blocks: [
        { media: 'assets/videos/dataviz-4.mp4', alt: 'Happier? The Bulgarian Happiness Index 2015–2024' },
        { title: 'What is the data saying?', text: 'Looking at the how the index of happiness about Bulgaria has changed within 10 years shows that the improvement is not big. However, it is steady and with that speed probably our great great grandchildren will live as happy as kids in Northern Europe now (which even ironically is something). Who knows that no matter the government (or the lack of it) there still can be some light in the tunnel.' },
      ],
    },
    {
      slug: 'five-hundred-nineteen-million',
      title: 'Cost of elections',
      client: 'Personal challenge',
      year: '2024',
      discipline: 'Motion graphics',
      tags: ['motion-graphics'],
      cover: 'assets/videos/dataviz-2.mp4',
      intro: 'Near 520 Million BGN lost in elections.',
      blocks: [
        { media: 'assets/videos/dataviz-2.mp4', alt: '519 million: the cost of Bulgaria’s parliamentary elections' },
        { title: 'What is the data saying?', text: 'After this week’s news that Bulgaria is again without a government and we will face again parliamentary elections (the 6th in the last 3 years), I decided to check what burden this has on our country. In this data visualisation is revealed how expensive it is for the taxpayers to have the wonderful pleasure of going to the polls again. The data shown, taken from the Institute for the Development of the Public Environment, shows what the total cost was for each of the last 5 parliamentary elections.' },
      ],
    },
    {
      slug: 'nepravda',
      title: 'Nepravda',
      client: 'Free University of Bolzano',
      year: '2022',
      discipline: 'BA thesis project, scrollytelling website',
      tags: ['interactive-installations'],
      cover: 'assets/images/nepravda-web-01.jpg',
      intro: 'When information is used as a weapon. Nepravda is an interactive animated invented story based on real events in Zaporizhzhia, showing how news can turn into a tool of information warfare.',
      blocks: [
        { media: 'assets/images/nepravda-web-06.jpg', alt: 'Four screens of the Nepravda website: the chapters Disaster and Distortion, and two story pages' },
        { title: 'The project', text: 'The final output of my thesis “Nepravda. Propaganda in news” examines the growing problem of propaganda in the information space: the methods used to influence public opinion, the situations in which they are deployed, and the lasting effects of long exposure to manipulation and persuasion. Supervised by Gianluca Seta and Elisa Pasqual.' },
        { media: 'assets/videos/nepravda-scroll.mp4', alt: 'Scrolling through the Nepravda story, from the opening screen through its three chapters' },
        { title: 'My work', text: 'I developed a method to show the manipulative techniques used in mass media. I wrote a story based on real events, designed it to look like a news dashboard, and built a website that explains propaganda through scrollytelling.' },
        { media: ['assets/images/nepravda-web-02.jpg', 'assets/images/nepravda-web-03.jpg'], alt: 'The website on phones: the chapter openers Disaster and Distortion, and two story screens' },
        { media: 'assets/images/nepravda-web-04.jpg', alt: 'Five screens of the story on phones, from the opening to the chapter Victory' },
        { title: 'Final result', text: 'Reflecting the undemocratic nature of propaganda, the story shows how manipulation, confusion and fear are used for power and profit. In today’s globalised world, Nepravda shows that propaganda can emerge anywhere and spread chaos. Finalist at the European Design Awards 2023.' },
        { media: 'assets/images/nepravda-web-05.jpg', alt: '19 manipulative techniques of propaganda were found in news, on the website' },
      ],
    },
    {
      slug: 'nepravda-newspaper',
      title: 'Nepravda (newspaper)',
      client: 'Free University of Bolzano',
      year: '2022',
      discipline: 'BA thesis project, editorial design',
      tags: ['editorial-design'],
      cover: 'assets/images/nepravda-editorial-design-01.jpg',
      intro: 'The impact of mass media on public opinion. The research behind Nepravda, translated into a newspaper about the history of propaganda and the Russian media landscape today.',
      blocks: [
        { media: 'assets/images/nepravda-editorial-design-02.jpg', alt: 'Nepravda newspaper spreads' },
        { title: 'Starting point', text: '“Nepravda. Propaganda in news” is my thesis project. It was provoked by the “special military operation” in Ukraine and focuses on information processes in Eastern Europe and Russia. It examines propaganda, its roots, its history and how its methods of communication changed over the last century, as well as newer forms of distortion such as information disorder, disinformation and fake news.' },
        { media: 'assets/images/nepravda-editorial-design-03.jpg', alt: '19 techniques of manipulation, a newspaper spread' },
        { title: 'My work', text: 'I started with extensive research, as accurate as possible and based on established sources: the history of propaganda and how it evolved, and Russian mass media and information processes during the war.' },
        { media: 'assets/images/nepravda-editorial-design-04.jpg', alt: 'Newspaper spreads with charts' },
        { title: 'Final result', text: 'The first part of the project is the documentation: all the research translated into a newspaper, giving an overview of how propaganda changed over time and of the Russian mass media today.' },
      ],
    },
    {
      slug: 'stress-triggers',
      title: 'Stress triggers in a week',
      client: 'Journal DataViz Challenge',
      year: '2023',
      discipline: 'Data visualisation, personal data',
      tags: ['data-visualisation'],
      cover: 'assets/images/stress-triggers-dataviz-01.jpg',
      intro: 'How much do I stress during the day, and what kind of factors influence me? Data I collected about myself in one week in July 2023.',
      blocks: [
        { media: 'assets/images/stress-triggers-dataviz-01.jpg', alt: 'Stress triggers in a week' },
        { title: 'The challenge', text: 'In 2023 I took part in a monthly challenge organised by Martina Zunica and Alenka Gucek. Each month brought a new topic, and participants were free to collect any data and make any infographic about it. I made it part of my routine: for one week each month I kept a daily journal on the topic, then analysed the week and decided how best to visualise it.' },
        { media: ['assets/images/stress-triggers-dataviz-03.jpg', 'assets/images/stress-triggers-dataviz-04.jpg'], alt: 'Stress triggers in a week, annotated' },
        { title: 'The categories', text: 'Every stressful moment went into one of five categories: duties, emotions, personal challenges, noise and others. I shared the results on social media, which made me think about a format that works there. Making these infographics was fun, and taught me a lot.' },
      ],
    },
    {
      slug: 'weather-impression',
      title: 'Weather impression in a week',
      client: 'Journal DataViz Challenge',
      year: '2023',
      discipline: 'Data visualisation, personal data',
      tags: ['data-visualisation'],
      cover: 'assets/images/weather-impression-dataviz-01.jpg',
      intro: 'How hot did it feel, and where was I? A week of forecasts compared with how I experienced the weather, in August 2023.',
      blocks: [
        { media: 'assets/images/weather-impression-dataviz-01.jpg', alt: 'Weather impression in a week, annotated' },
        { title: 'The challenge', text: 'Part of the monthly Journal DataViz Challenge by Martina Zunica and Alenka Gucek. For a week I noted the temperature, how it felt and where I was: at home, outside or somewhere inside. The forecast data comes from Weather Underground.' },
      ],
    },
  ],
};
