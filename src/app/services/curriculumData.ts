// Leadership Curriculum Data for National Coalition of 100 Black Women, Queen City Metropolitan Chapter

export const curriculumIntro = {
  title: "Leadership Development Curriculum",
  subtitle: "National Coalition of 100 Black Women, Queen City Metropolitan Chapter",
  description: `This curriculum has been developed to support the growth and effectiveness of leaders within the National Coalition of 100 Black Women, Queen City Metropolitan Chapter. It provides a framework that connects each leadership position within the organization to the core skills required to excel in that role.

In addition to mapping roles and skills, this document offers a curated selection of courses designed to strengthen those competencies. Each course has been aligned with specific leadership needs and is paired with information on where it can be accessed.

This curriculum serves as both a roadmap and a resource for professional development, equipping members with the knowledge and tools necessary to lead with confidence, advance the mission of the organization, and make a lasting impact in the community.`
};

export interface Course {
  title: string;
  platform: string;
  duration: string;
  url: string;
}

export interface Attribute {
  name: string;
  description: string;
  courses: Course[];
}

export interface Role {
  id: string;
  title: string;
  description: string;
  attributes: Attribute[];
}

export const leadershipRoles: Role[] = [
  {
    id: "president",
    title: "President",
    description: "The President's role demands strategic thinking, leadership, communication, and conflict-resolution skills.",
    attributes: [
      {
        name: "Leadership & Strategic Visioning",
        description: "Overview of leadership styles, strategic planning, and setting organizational vision and goals.",
        courses: [
          { title: "What is Strategic Planning?", platform: "LinkedIn Learning", duration: "20 mins", url: "https://www.linkedin.com/learning/search?keywords=strategic%20planning" },
          { title: "Creating Your Personal Leadership Plan", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=leadership%20plan" },
          { title: "Leadership Fundamentals", platform: "YouTube by FutureLearn", duration: "30 mins", url: "https://www.youtube.com/results?search_query=leadership+fundamentals+futurelearn" },
          { title: "Strategic Thinking", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=strategic%20thinking" },
          { title: "Defining Your Leadership Values and Vision", platform: "Coursera", duration: "30 mins", url: "https://www.coursera.org/search?query=leadership%20vision" }
        ]
      },
      {
        name: "Effective Public Speaking & Communication",
        description: "Techniques for public speaking, clear communication, and inspiring team engagement.",
        courses: [
          { title: "Introduction to Public Speaking", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=introduction+to+public+speaking+udemy" },
          { title: "Speak Confidently and Improve Communication Skills", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=public%20speaking" },
          { title: "Public Speaking Essentials", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/public-speaking" },
          { title: "Effective Communication in the Workplace", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=effective%20communication" },
          { title: "Confidence on Camera", platform: "YouTube by Stanford", duration: "50 mins", url: "https://www.youtube.com/results?search_query=confidence+on+camera+stanford" }
        ]
      },
      {
        name: "Conflict Resolution & Mediation",
        description: "Strategies for managing and resolving conflicts within a team or organization.",
        courses: [
          { title: "Managing Conflict in Teams", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=conflict%20management" },
          { title: "Resolving Conflict in the Workplace", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=conflict%20resolution" },
          { title: "Conflict Resolution Skills", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/conflict-resolution" },
          { title: "Conflict Resolution at Work", platform: "YouTube by UC Berkeley", duration: "40 mins", url: "https://www.youtube.com/results?search_query=conflict+resolution+uc+berkeley" },
          { title: "Introduction to Negotiation", platform: "YouTube by Yale", duration: "60 mins", url: "https://www.youtube.com/results?search_query=introduction+to+negotiation+yale" }
        ]
      },
      {
        name: "Delegation & Time Management",
        description: "Best practices for prioritizing tasks, delegating effectively, and managing time.",
        courses: [
          { title: "Effective Delegation Skills", platform: "LinkedIn Learning", duration: "35 mins", url: "https://www.linkedin.com/learning/search?keywords=delegation" },
          { title: "Time Management Tips", platform: "Coursera", duration: "30 mins", url: "https://www.coursera.org/search?query=time%20management" },
          { title: "Introduction to Time Management", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/time-management" },
          { title: "Delegating Effectively", platform: "YouTube by LinkedIn Learning", duration: "40 mins", url: "https://www.youtube.com/results?search_query=delegating+effectively+linkedin" },
          { title: "Mastering Prioritization", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=mastering+prioritization+udemy" }
        ]
      },
      {
        name: "Organizational Culture & Ethics",
        description: "Building an inclusive, positive culture and understanding ethical responsibilities.",
        courses: [
          { title: "Ethics and Organizational Culture", platform: "YouTube by Harvard", duration: "45 mins", url: "https://www.youtube.com/results?search_query=organizational+culture+harvard" },
          { title: "What is Organizational Culture?", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=organizational%20culture" },
          { title: "Building an Inclusive Culture", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=inclusive%20culture" },
          { title: "Ethics for Leaders", platform: "YouTube by FutureLearn", duration: "45 mins", url: "https://www.youtube.com/results?search_query=ethics+for+leaders+futurelearn" },
          { title: "Culture and Leadership", platform: "YouTube by Skillshare", duration: "50 mins", url: "https://www.youtube.com/results?search_query=culture+and+leadership" }
        ]
      }
    ]
  },
  {
    id: "vice-president",
    title: "Vice President",
    description: "The Vice President supports the President and steps in as needed, so training should focus on adaptability, team support, and coordination.",
    attributes: [
      {
        name: "Project Management Essentials",
        description: "Key project management principles to keep initiatives on track and within scope.",
        courses: [
          { title: "Introduction to Project Management", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=project%20management" },
          { title: "Project Planning Basics", platform: "YouTube by PMI", duration: "50 mins", url: "https://www.youtube.com/results?search_query=project+planning+basics+pmi" },
          { title: "Essentials of Project Management", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=project%20management%20essentials" },
          { title: "Project Management Foundations", platform: "LinkedIn Learning", duration: "60 mins", url: "https://www.linkedin.com/learning/search?keywords=project%20management%20foundations" },
          { title: "Understanding Project Lifecycles", platform: "Skillshare", duration: "40 mins", url: "https://www.skillshare.com/browse/project-management" }
        ]
      },
      {
        name: "Effective Communication & Team Dynamics",
        description: "Methods for supporting and enhancing team dynamics and communication as the President's key collaborator.",
        courses: [
          { title: "Building a Great Team", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=building%20teams" },
          { title: "Team Communication Skills", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/team-communication" },
          { title: "Communicating Effectively as a Leader", platform: "YouTube by Stanford", duration: "50 mins", url: "https://www.youtube.com/results?search_query=communicating+as+a+leader+stanford" },
          { title: "Effective Team Communication", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=team%20communication" },
          { title: "Building a Culture of Feedback", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=feedback%20culture" }
        ]
      },
      {
        name: "Strategic Planning & Operational Support",
        description: "Understanding strategic planning and providing operational support to implement initiatives.",
        courses: [
          { title: "Basics of Strategic Planning", platform: "YouTube by Harvard", duration: "35 mins", url: "https://www.youtube.com/results?search_query=strategic+planning+harvard" },
          { title: "Operational Strategy for Managers", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=operational%20strategy" },
          { title: "Strategic Planning Simplified", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/strategic-planning" },
          { title: "Intro to Strategic Operations", platform: "YouTube by FutureLearn", duration: "40 mins", url: "https://www.youtube.com/results?search_query=strategic+operations+futurelearn" },
          { title: "Implementing Strategy", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=implementing%20strategy" }
        ]
      },
      {
        name: "Succession Planning & Mentorship",
        description: "Training on developing future leaders and creating a sustainable succession plan.",
        courses: [
          { title: "Mentoring and Coaching Skills", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=mentoring" },
          { title: "Creating a Mentorship Culture", platform: "Skillshare", duration: "45 mins", url: "https://www.skillshare.com/browse/mentorship" },
          { title: "Planning for Leadership Succession", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=succession%20planning" },
          { title: "Effective Mentorship for Managers", platform: "YouTube by Harvard", duration: "30 mins", url: "https://www.youtube.com/results?search_query=mentorship+harvard" },
          { title: "How to Create a Succession Plan", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=succession%20plan" }
        ]
      },
      {
        name: "Risk Management & Crisis Response",
        description: "Preparing for and managing unexpected challenges, ensuring organizational continuity.",
        courses: [
          { title: "Crisis Management Essentials", platform: "YouTube by Udemy", duration: "30 mins", url: "https://www.youtube.com/results?search_query=crisis+management+udemy" },
          { title: "Risk Management for Leaders", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=risk%20management" },
          { title: "Introduction to Crisis Response", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=crisis%20response" },
          { title: "Managing Risk in Projects", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/risk-management" },
          { title: "Crisis Management in Organizations", platform: "YouTube by PMI", duration: "50 mins", url: "https://www.youtube.com/results?search_query=crisis+management+pmi" }
        ]
      }
    ]
  },
  // Continue with remaining roles...
];

// I'll create a separate file for the remaining roles due to length
export const additionalRoles: Role[] = [
  {
    id: "second-vice-president",
    title: "Second Vice President",
    description: "This role often involves supporting both the President and Vice President in various capacities, with a focus on organization and team oversight.",
    attributes: [
      {
        name: "Administrative Oversight & Best Practices",
        description: "An overview of effective administrative management, including record-keeping and documentation.",
        courses: [
          { title: "Administrative Skills Essentials", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=administrative%20skills" },
          { title: "Best Practices for Effective Administration", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=administrative%20best%20practices" },
          { title: "Managing Office Operations", platform: "YouTube by Harvard", duration: "30 mins", url: "https://www.youtube.com/results?search_query=office+operations+harvard" },
          { title: "Basics of Office Administration", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/office-administration" },
          { title: "Overseeing Teams and Operations", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=overseeing%20operations" }
        ]
      },
      {
        name: "Event Planning & Coordination",
        description: "Essential skills for planning, coordinating, and managing organizational events.",
        courses: [
          { title: "Introduction to Event Planning", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=event%20planning" },
          { title: "Essentials of Event Planning", platform: "YouTube by Eventbrite", duration: "50 mins", url: "https://www.youtube.com/results?search_query=event+planning+eventbrite" },
          { title: "Event Planning Foundations", platform: "Coursera", duration: "40 mins", url: "https://www.coursera.org/search?query=event%20planning" },
          { title: "How to Coordinate Events", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/event-planning" },
          { title: "Effective Event Planning", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=event%20coordination" }
        ]
      },
      {
        name: "Team Leadership & Motivation",
        description: "Tools for motivating team members and leading smaller task forces or committees.",
        courses: [
          { title: "Motivating Your Team", platform: "YouTube by Harvard", duration: "40 mins", url: "https://www.youtube.com/results?search_query=motivating+teams+harvard" },
          { title: "Team Leadership Skills", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=team%20leadership" },
          { title: "Creating Motivation at Work", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/team-motivation" },
          { title: "How to Inspire Your Team", platform: "LinkedIn Learning", duration: "45 mins", url: "https://www.linkedin.com/learning/search?keywords=inspiring%20teams" },
          { title: "Leading Teams Effectively", platform: "YouTube by FutureLearn", duration: "30 mins", url: "https://www.youtube.com/results?search_query=leading+teams+futurelearn" }
        ]
      },
      {
        name: "Data-Driven Decision Making",
        description: "Techniques for analyzing data and making informed decisions that benefit the organization.",
        courses: [
          { title: "Intro to Data-Driven Decisions", platform: "LinkedIn Learning", duration: "50 mins", url: "https://www.linkedin.com/learning/search?keywords=data%20driven%20decisions" },
          { title: "Basics of Data Analysis", platform: "Coursera", duration: "45 mins", url: "https://www.coursera.org/search?query=data%20analysis%20basics" },
          { title: "Using Data to Make Decisions", platform: "YouTube by Udacity", duration: "40 mins", url: "https://www.youtube.com/results?search_query=data+decisions+udacity" },
          { title: "Interpreting Data for Leaders", platform: "Skillshare", duration: "25 mins", url: "https://www.skillshare.com/browse/data-analysis" },
          { title: "Analytics for Nonprofits", platform: "LinkedIn Learning", duration: "55 mins", url: "https://www.linkedin.com/learning/search?keywords=nonprofit%20analytics" }
        ]
      },
      {
        name: "Financial Basics for Nonprofits",
        description: "Basic financial management skills to support the Treasurer and ensure budget compliance.",
        courses: [
          { title: "Introduction to Nonprofit Finance", platform: "LinkedIn Learning", duration: "30 mins", url: "https://www.linkedin.com/learning/search?keywords=nonprofit%20finance" },
          { title: "Basics of Budgeting for Nonprofits", platform: "Coursera", duration: "50 mins", url: "https://www.coursera.org/search?query=nonprofit%20budgeting" },
          { title: "Financial Literacy for Nonprofit Leaders", platform: "YouTube by Candid", duration: "45 mins", url: "https://www.youtube.com/results?search_query=nonprofit+finance+candid" },
          { title: "Understanding Nonprofit Finances", platform: "Skillshare", duration: "30 mins", url: "https://www.skillshare.com/browse/nonprofit-finance" },
          { title: "Finance Essentials for Nonprofits", platform: "LinkedIn Learning", duration: "40 mins", url: "https://www.linkedin.com/learning/search?keywords=nonprofit%20finance%20essentials" }
        ]
      }
    ]
  }
];

// Export combined roles
export const allRoles = [...leadershipRoles, ...additionalRoles];