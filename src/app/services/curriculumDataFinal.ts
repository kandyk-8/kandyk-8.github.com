import { Role } from './curriculumData';

// Final leadership roles

export const finalRoles: Role[] = [
  {
    id: "corresponding-secretary",
    title: "Corresponding Secretary",
    description: "The Corresponding Secretary manages organizational correspondence, meeting notes, and event invitations.",
    attributes: [
      {
        name: "Professional Writing & Email Etiquette",
        description: "Basics of professional writing, email management, and etiquette in official correspondence.",
        courses: [
          { title: "Email and Writing Etiquette", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=email%20etiquette" },
          { title: "Professional Email Communication", platform: "YouTube by Skillshare", duration: "25 mins", url: "https://www.youtube.com/results?search_query=professional+email+communication" },
          { title: "Writing Effective Emails", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=effective%20emails" },
          { title: "Writing with Clarity and Professionalism", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=professional%20writing" },
          { title: "Business Email Best Practices", platform: "YouTube by Harvard", duration: "45 mins", url: "https://www.youtube.com/results?search_query=business+email+harvard" }
        ]
      },
      {
        name: "Record-Keeping & Meeting Documentation",
        description: "How to take minutes, organize notes, and distribute documentation effectively.",
        courses: [
          { title: "How to Take Meeting Minutes", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=meeting%20minutes" },
          { title: "Documenting and Organizing Minutes", platform: "YouTube by Skillshare", duration: "40 mins", url: "https://www.youtube.com/results?search_query=meeting+minutes+documentation" },
          { title: "Basics of Meeting Documentation", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=meeting%20documentation" },
          { title: "Organizing Meeting Records", platform: "YouTube by FutureLearn", duration: "50 mins", url: "https://www.youtube.com/results?search_query=meeting+records+organization" },
          { title: "Documenting Official Meetings", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=official%20meeting%20documentation" }
        ]
      },
      {
        name: "Calendar Management & Scheduling",
        description: "Techniques for managing organizational calendars, scheduling meetings, and sending reminders.",
        courses: [
          { title: "Google Calendar Tips and Tricks", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=google+calendar+tips" },
          { title: "Microsoft Outlook Calendar Basics", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=outlook%20calendar" },
          { title: "Time and Calendar Management", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/calendar-management" },
          { title: "Efficient Scheduling Techniques", platform: "YouTube by Harvard", duration: "35 mins", url: "https://www.youtube.com/results?search_query=scheduling+techniques+harvard" },
          { title: "Setting Up Organizational Schedules", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=organizational%20scheduling" }
        ]
      },
      {
        name: "Digital Tools for Communication & Organization",
        description: "Training on communication and organizational tools like Google Workspace, Slack, and Asana.",
        courses: [
          { title: "Slack for Effective Team Communication", platform: "YouTube by Slack", duration: "25 mins", url: "https://www.youtube.com/results?search_query=slack+team+communication" },
          { title: "Intro to Google Workspace", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=google%20workspace" },
          { title: "Using Trello for Task Management", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/trello" },
          { title: "Microsoft Teams for Communication", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=microsoft%20teams" },
          { title: "Organizing and Sharing Files on Google Drive", platform: "YouTube by Google", duration: "30 mins", url: "https://www.youtube.com/results?search_query=google+drive+organization" }
        ]
      },
      {
        name: "Public Relations & Community Engagement",
        description: "Skills for effectively communicating with the public and promoting events.",
        courses: [
          { title: "Intro to Community Engagement", platform: "YouTube by Candid", duration: "40 mins", url: "https://www.youtube.com/results?search_query=community+engagement+candid" },
          { title: "Basics of Public Relations", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=public%20relations%20basics" },
          { title: "Building Positive Community Relations", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=community%20relations" },
          { title: "Social Media Basics for Community Outreach", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/social-media-outreach" },
          { title: "Intro to Public Relations", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=public+relations+intro" }
        ]
      }
    ]
  },
  {
    id: "chaplain",
    title: "Chaplain",
    description: "The Chaplain provides spiritual guidance and may lead events such as invocations or memorials.",
    attributes: [
      {
        name: "Public Speaking & Inspirational Messaging",
        description: "Techniques for delivering messages with empathy, inspiration, and clarity.",
        courses: [
          { title: "Public Speaking Essentials", platform: "YouTube by Skillshare", duration: "30 mins", url: "https://www.youtube.com/results?search_query=public+speaking+essentials" },
          { title: "How to Inspire Others with Words", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=inspirational%20speaking" },
          { title: "Introduction to Inspirational Speaking", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=inspirational%20speaking" },
          { title: "Confidence in Public Speaking", platform: "YouTube by Stanford", duration: "50 mins", url: "https://www.youtube.com/results?search_query=public+speaking+confidence+stanford" },
          { title: "Storytelling for Impact", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=storytelling%20impact" }
        ]
      },
      {
        name: "Cultural & Religious Sensitivity",
        description: "Training on understanding diverse spiritual practices and being sensitive to all backgrounds.",
        courses: [
          { title: "Understanding Cultural Sensitivity", platform: "YouTube by FutureLearn", duration: "30 mins", url: "https://www.youtube.com/results?search_query=cultural+sensitivity+futurelearn" },
          { title: "Basics of Religious Literacy", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=religious%20literacy" },
          { title: "Introduction to Religious Studies", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=religious%20studies%20intro" },
          { title: "Practicing Cultural Competence", platform: "YouTube by Harvard", duration: "40 mins", url: "https://www.youtube.com/results?search_query=cultural+competence+harvard" },
          { title: "Sensitivity Training for Volunteers", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/sensitivity-training" }
        ]
      },
      {
        name: "Supporting Volunteers' Emotional Wellbeing",
        description: "Skills for providing emotional support and recognizing signs of stress in team members.",
        courses: [
          { title: "Basics of Emotional Wellbeing in the Workplace", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=emotional%20wellbeing" },
          { title: "Managing Mental Health at Work", platform: "YouTube by Harvard", duration: "45 mins", url: "https://www.youtube.com/results?search_query=mental+health+work+harvard" },
          { title: "Building Resilience and Empathy", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=resilience%20empathy" },
          { title: "Introduction to Emotional Intelligence", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/emotional-intelligence" },
          { title: "Mental Health First Aid for Leaders", platform: "YouTube by FutureLearn", duration: "40 mins", url: "https://www.youtube.com/results?search_query=mental+health+first+aid+leaders" }
        ]
      },
      {
        name: "Organizing Ceremonial & Memorial Events",
        description: "Planning and conducting ceremonies or memorials that reflect organizational values.",
        courses: [
          { title: "Planning Special Events", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=special%20events%20planning" },
          { title: "Intro to Event Ceremonies", platform: "YouTube by Udemy", duration: "35 mins", url: "https://www.youtube.com/results?search_query=event+ceremonies" },
          { title: "Basics of Memorial Service Planning", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=memorial%20service%20planning" },
          { title: "Effective Event Coordination", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/event-coordination" },
          { title: "Handling Memorial Events with Compassion", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=memorial%20events" }
        ]
      },
      {
        name: "Ethical Considerations & Confidentiality",
        description: "Ensuring confidentiality and ethical conduct in all interactions.",
        courses: [
          { title: "Ethics in Volunteer Roles", platform: "YouTube by FutureLearn", duration: "45 mins", url: "https://www.youtube.com/results?search_query=volunteer+ethics+futurelearn" },
          { title: "Confidentiality Basics", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=confidentiality%20basics" },
          { title: "Understanding Professional Ethics", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=professional%20ethics" },
          { title: "Handling Sensitive Information", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/sensitive-information" },
          { title: "Ethics and Confidentiality", platform: "YouTube by Harvard", duration: "40 mins", url: "https://www.youtube.com/results?search_query=ethics+confidentiality+harvard" }
        ]
      }
    ]
  },
  {
    id: "parliamentarian",
    title: "Parliamentarian",
    description: "The Parliamentarian ensures meetings follow procedural rules and provides guidance on decision-making processes.",
    attributes: [
      {
        name: "Parliamentary Procedure & Robert's Rules of Order",
        description: "A detailed workshop on parliamentary procedures to run meetings smoothly.",
        courses: [
          { title: "Basics of Parliamentary Procedure", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=parliamentary%20procedure" },
          { title: "Robert's Rules of Order Simplified", platform: "YouTube by Udemy", duration: "50 mins", url: "https://www.youtube.com/results?search_query=robert+rules+order+simplified" },
          { title: "Introduction to Robert's Rules", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=robert%20rules" },
          { title: "Running Meetings with Parliamentary Procedure", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/parliamentary-procedure" },
          { title: "Fundamentals of Meeting Procedure", platform: "YouTube by Harvard", duration: "40 mins", url: "https://www.youtube.com/results?search_query=meeting+procedure+harvard" }
        ]
      },
      {
        name: "Conflict Resolution & Mediation",
        description: "Strategies for handling disagreements in a neutral, procedural manner.",
        courses: [
          { title: "Conflict Resolution Skills", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=conflict%20resolution" },
          { title: "Introduction to Mediation", platform: "YouTube by Coursera", duration: "40 mins", url: "https://www.youtube.com/results?search_query=introduction+to+mediation" },
          { title: "Handling Conflict at Meetings", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/conflict-management" },
          { title: "Basics of Mediation", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=mediation%20basics" },
          { title: "Practical Mediation Skills", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=mediation%20skills" }
        ]
      },
      {
        name: "Meeting Facilitation & Agenda Setting",
        description: "Training on effective agenda-setting and meeting facilitation practices.",
        courses: [
          { title: "How to Facilitate Effective Meetings", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=meeting%20facilitation" },
          { title: "Creating an Agenda for Meetings", platform: "YouTube by Skillshare", duration: "30 mins", url: "https://www.youtube.com/results?search_query=creating+meeting+agenda" },
          { title: "Meeting Facilitation Essentials", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=meeting%20facilitation" },
          { title: "Making Meetings Productive", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=productive%20meetings" },
          { title: "Leading Structured Meetings", platform: "YouTube by Harvard", duration: "50 mins", url: "https://www.youtube.com/results?search_query=structured+meetings+harvard" }
        ]
      },
      {
        name: "Policy Review & Organizational Governance",
        description: "Understanding organizational policies and governance structures for compliance.",
        courses: [
          { title: "Introduction to Organizational Governance", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=organizational%20governance" },
          { title: "Understanding Policy Review", platform: "YouTube by FutureLearn", duration: "30 mins", url: "https://www.youtube.com/results?search_query=policy+review+futurelearn" },
          { title: "Basics of Nonprofit Governance", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=nonprofit%20governance" },
          { title: "Creating Effective Policies", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/policy-creation" },
          { title: "Organizational Policy Review", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=policy%20review" }
        ]
      },
      {
        name: "Ethical Decision-Making in Governance",
        description: "Guiding ethical decision-making and maintaining impartiality in governance roles.",
        courses: [
          { title: "Ethics and Leadership", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=ethics%20leadership" },
          { title: "Making Ethical Decisions", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=ethical%20decisions" },
          { title: "Intro to Governance Ethics", platform: "YouTube by Harvard", duration: "50 mins", url: "https://www.youtube.com/results?search_query=governance+ethics+harvard" },
          { title: "Ethical Leadership for Nonprofits", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/ethical-leadership" },
          { title: "Foundations of Ethical Decision-Making", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=ethical+decision+making" }
        ]
      }
    ]
  }
];
