export type ProjectType = "Funded" | "PhD" | "Student";
export type ProjectStatus = "Ongoing" | "Completed" | "Upcoming";
export type StudentCategory = "UG" | "PG";

export interface FundedProject {
  id: string;
  title: string;
  fundingAgency: string;
  pi: string;
  coPi: string;
  duration: string;
  amount: string;
  status: ProjectStatus;
  description: string;
}

export interface PhDProject {
  id: string;
  studentName: string;
  thesisTitle: string;
  guide: string;
  coGuide?: string;
  registrationYear: string;
  status: ProjectStatus;
}

export interface StudentProject {
  id: string;
  title: string;
  studentNames: string;
  guide: string;
  year: string;
  category: StudentCategory;
  status: ProjectStatus;
}

export const fundedProjects: FundedProject[] = [
  {
    id: "f1",
    title: "Home-based Gamified, Intensive, and Functional Tele-rehabilitation (Home-GIFT) device to improve Upper Limb Function following Stroke",
    fundingAgency: "DST",
    pi: "Dr. Senthil Kumaran D",
    coPi: "",
    duration: "10 Apr 2024 - ongoing",
    amount: "₹22,14,035",
    status: "Ongoing",
    description: "Developing and testing a home-based gamified tele-rehabilitation device for upper limb function improvement following stroke.",
  },
  {
    id: "f2",
    title: "HOMER: Home-based robot-assisted upper-limb training for stroke in India",
    fundingAgency: "ICMR - Intermediate Grant",
    pi: "Dr. Sivakumar Balasubramanian",
    coPi: "Dr. John Solomon M\nDr. Sanjith Aaron, Dr. A T Prabhakar, Dr. Henry Prakash, Mr. Samuelkamaleshkumar Selvaraj, Dr. Jeyaraj Pandiyan, Prof. Dorcas BC Gandhi, Dr. Sujatha Srinivasan, Dr. Asha Mathew, Dr. Grace Rebekah",
    duration: "1 Apr 2025 - ongoing",
    amount: "₹84 lakhs",
    status: "Ongoing",
    description: "A home-based robot-assisted upper-limb training program for stroke survivors in India, funded by ICMR.",
  },
  {
    id: "f3",
    title: "Effect of Home-based Game rehabilitation on sensory motor recovery and cognitive functions after stroke",
    fundingAgency: "ICMR - Small Grant",
    pi: "Dr. Senthil Kumaran D",
    coPi: "",
    duration: "1 Jun 2025 - ongoing",
    amount: "₹52 lakhs",
    status: "Ongoing",
    description: "Investigating the effect of home-based game rehabilitation on sensory motor recovery and cognitive functions after stroke.",
  },
  {
    id: "f4",
    title: "ENHANCE proof-of-concept three-arm randomized trial: Effects of reaching training of the hemiparetic upper limb",
    fundingAgency: "[Funding Agency]",
    pi: "Dr. Mindy F Levin",
    coPi: "Dr. John Solomon M, Dr. Sigal Berman, Dr. Neta Weiss",
    duration: "[Duration]",
    amount: "[Amount]",
    status: "Completed",
    description: "A multi-centre trial investigating the effects of reaching training restricted to spasticity-free elbow range in hemiparetic upper limb rehabilitation.",
  },
  {
    id: "f17",
    title: "App based tele-stroke rehabilitation platform for stroke (ATTEND-2)",
    fundingAgency: "WSO Pilot Research Grant",
    pi: "Prof. Dorcas BC Gandhi",
    coPi: "Dr. John Solomon M",
    duration: "August 2024 - ongoing",
    amount: "20,000 USD",
    status: "Ongoing",
    description: "",
  },
  {
    id: "f18",
    title: "ENHANCE: Enhancing brain plasticity for sensorimotor recovery in spastic hemiparesis",
    fundingAgency: "International Development Research Centre, Canada / The Royal Institution for the Advancement of Learning, McGill University, Canada",
    pi: "Dr. Mindy F Levin",
    coPi: "Dr. John Solomon M",
    duration: "January 2016 - April 2021",
    amount: "135,573 CAD",
    status: "Completed",
    description: "",
  },
  {
    id: "f19",
    title: "Activity levels of stroke survivors in hospital settings: A multi-centre study",
    fundingAgency: "Society of Indian Physiotherapists",
    pi: "Dr. Apoorva M Shankaranarayana",
    coPi: "Dr. John Solomon M, Dr. Manikandan Natarajan",
    duration: "April 2022 - ongoing",
    amount: "Rs. 25,000",
    status: "Ongoing",
    description: "",
  },
  {
    id: "f21",
    title: "Physical activity promotion for stroke survivors living in community",
    fundingAgency: "PHRI",
    pi: "Dr. John Solomon M",
    coPi: "",
    duration: "February 2019 - August 2020",
    amount: "Rs. 16,44,330",
    status: "Completed",
    description: "",
  },
  {
    id: "f22",
    title: "Development and feasibility of Adaptive sports for promoting physical activity in community dwelling stroke survivors",
    fundingAgency: "Society of Indian Physiotherapists",
    pi: "Dr. Pradeepa Nayak",
    coPi: "Dr. John Solomon M, Dr. Senthil Kumaran D",
    duration: "April 2019 - March 2020",
    amount: "Rs. 25,000",
    status: "Completed",
    description: "",
  },
  {
    id: "f23",
    title: "Development and testing of a web portal for facilitating adherence to home-based physical exercises among community-dwelling stroke survivors",
    fundingAgency: "Society of Indian Physiotherapists",
    pi: "Dr. Amreen Mahomood",
    coPi: "Dr. John Solomon M, Dr. Manikandan Natarajan",
    duration: "May 2018 - May 2019",
    amount: "Rs. 25,000",
    status: "Completed",
    description: "",
  },
];

export const phdProjects: PhDProject[] = [
  {
    id: "phd1",
    studentName: "Dr. Vasanthan Rajgopalan",
    thesisTitle: "Effect of Multifactorial Context Enhancing Functional Therapy [M-CEFT] on amount of arm use and recovery in stroke survivors",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Manikandan Natarajan",
    registrationYear: "2015 - 2024",
    status: "Completed",
  },
  {
    id: "phd2",
    studentName: "Dr. Amreen Mahmood",
    thesisTitle: "Development and Testing of Adherence Enhancing Strategies for Home based Physical Exercise Program",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Manikandan Natarajan, Dr. Coralie English",
    registrationYear: "2017 - 2020",
    status: "Completed",
  },
  {
    id: "phd3",
    studentName: "Dr. Pradeepa Nayak",
    thesisTitle: "Effect of comprehensive physical activity promotion program on mobility and quality of life",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Senthil Kumaran D",
    registrationYear: "2018 - 2021",
    status: "Completed",
  },
  {
    id: "phd20",
    studentName: "Dr. Wasim Ahmed",
    thesisTitle: "Development and validation of a syntactic assessment and treatment protocol for post stroke agrammatism in kannada",
    guide: "Dr. Gopee Krishnan",
    coGuide: "",
    registrationYear: "2018 - 2023",
    status: "Completed",
  },
  {
    id: "phd6",
    studentName: "Dr. Sanjukta Sardesai",
    thesisTitle: "Clinical and kinematic measures for predicting upper extremity recovery in stroke survivors",
    guide: "Dr. Senthil Kumaran D",
    coGuide: "Dr. John Solomon M",
    registrationYear: "2018 - 2023",
    status: "Completed",
  },
  {
    id: "phd21",
    studentName: "Dr. Chanchal Chaudhary",
    thesisTitle: "Exploring the nature of dysfluencies through cortical stimulation in bilinguals with stuttering",
    guide: "Dr. Gopee Krishnan",
    coGuide: "",
    registrationYear: "2019 - 2025",
    status: "Completed",
  },
  {
    id: "phd7",
    studentName: "Dr. Apoorva M Shankaranarayana",
    thesisTitle: "Strategies to enhance activity levels for motor recovery in early phase of stroke",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Manikandan Natarajan, Dr. Heidi Janssen",
    registrationYear: "2019 - 2024",
    status: "Completed",
  },
  {
    id: "phd8",
    studentName: "Dr. Arunima Biswas",
    thesisTitle: "Effect of action observation training on lower extremity function in acute stroke survivors",
    guide: "Dr. Manikandan Natarajan",
    coGuide: "Dr. John Solomon M, Dr. Sandeep K Subramanian",
    registrationYear: "2019 - 2024",
    status: "Completed",
  },
  {
    id: "phd22",
    studentName: "Dr. Rajath Shenoy",
    thesisTitle: "Efficacy of a smartphone based program for training naming skills in people with aphasia A single case experimental design series",
    guide: "Dr. Gopee Krishnan",
    coGuide: "Dr. Lyndsey Nickels",
    registrationYear: "2020 - 2025",
    status: "Completed",
  },
  {
    id: "phd9",
    studentName: "Dr. Sulfikar Ali A",
    thesisTitle: "Effectiveness of an intensive, functional, gamified rehabilitation program (EnteRtain TRIAL)",
    guide: "Dr. Senthil Kumaran D",
    coGuide: "Dr. Ashokan Arumugam",
    registrationYear: "2019 - 2024",
    status: "Completed",
  },
  {
    id: "phd10",
    studentName: "Dr. Alexander G",
    thesisTitle: "Effect of Enhanced Bilateral Hand Activity Training (EBHAT) on Upper Limb Functional Recovery",
    guide: "Dr. Karthik Babu S",
    coGuide: "Dr. John Solomon M",
    registrationYear: "2020 - 2025",
    status: "Completed",
  },
  {
    id: "phd12",
    studentName: "Dr. Arnold Fredrick D'Souza",
    thesisTitle: "TELEPORT-PD: Effect of a TELE-assisted home exercise PrOgRam on balance and functional mobility in Parkinson's Disease",
    guide: "Dr. Manikandan Natarajan",
    coGuide: "Dr. Dushyanth Babu Jasti",
    registrationYear: "2021 - 2025",
    status: "Completed",
  },
  {
    id: "phd11",
    studentName: "Dr. Akhila Jagadish",
    thesisTitle: "Transcranial Direct Current Stimulation for fatigue in stroke survivors",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Manikandan Natarajan",
    registrationYear: "2021 - 2026",
    status: "Completed",
  },
  {
    id: "phd4",
    studentName: "Mr. Subramanian Durairaj",
    thesisTitle: "Efficacy of transcranial direct current stimulation on upper limb motor control in subacute stroke",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Mindy Levin",
    registrationYear: "2018 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd23",
    studentName: "Mr. Intiaz",
    thesisTitle: "Effect of Mixed Reality Environment on the Conversational Abilities in Persons with Aphasia - A Feasibility &  Pilot Study",
    guide: "Dr. Gopee Krishnan",
    coGuide: "Dr. Girish Menon",
    registrationYear: "2022 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd5",
    studentName: "Sanya Mehernosh Anklesaria",
    thesisTitle: "Effect of Pelvic Floor Rehabilitation In Stroke (PFloRIS) on Urinary Incontinence in Community Dwelling Women Stroke Survivors",
    guide: "Dr. Preetha R",
    coGuide: "",
    registrationYear: "2022 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd13",
    studentName: "Dorcas BC Gandhi",
    thesisTitle: "Implementation of contextualized clinical practice guideline for motor rehabilitation post-stroke in India",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Jeyraj Pandian, Dr. Coralie English",
    registrationYear: "2023 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd15",
    studentName: "Nistara Singh Chawla",
    thesisTitle: "Development and Validation of a Hand Assessment Battery for Stroke Patients Using an Indigenous End-effector Robot System",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Manikandan Natarajan, Dr. Sivakumar Balasubramanian",
    registrationYear: "2024 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd14",
    studentName: "S Aparna Selvam",
    thesisTitle: "Effectiveness of Game-Based Rehabilitation on Sedentary Behavior and Physical Activity in Stroke",
    guide: "Dr. Senthil Kumaran D",
    coGuide: "Dr. Ashokan Arumugam",
    registrationYear: "2023 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd17",
    studentName: "Siddharth N Savadia",
    thesisTitle: "Predicting upper limb sensorimotor recovery using data-driven models in patients with stroke",
    guide: "Dr. Senthil Kumaran D",
    coGuide: "Dr. John Solomon M, Dr. Ramana Vinjanuri",
    registrationYear: "2024 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd16",
    studentName: "Tancia Pires",
    thesisTitle: "Quantitative evaluation of acute ischemic stroke using intravoxel incoherent motion and prediction of motor outcome using diffusion kurtosis imaging",
    guide: "Dr. Priyanka",
    coGuide: "Dr. John Solomon M",
    registrationYear: "2024 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd18",
    studentName: "Farah",
    thesisTitle: "Predicting motor and functional recovery using Surface Electromyography (sEMG) in people with severe motor impairment after stroke",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Senthil Kumaran D",
    registrationYear: "2024 - ongoing",
    status: "Ongoing",
  },
  {
    id: "phd19",
    studentName: "Meghashree Sathish Nayak",
    thesisTitle: "Development and feasibility of a Contextualized Continuum of Care (CCoC) Model for Traumatic Brain Injury survivors",
    guide: "Dr. John Solomon M",
    coGuide: "Dr. Sunila John & Dr. Joanne Watson",
    registrationYear: "2025 - ongoing",
    status: "Ongoing",
  },
];

export const studentProjects: StudentProject[] = [
  {
    id: "st1",
    title: "[Student project title to be added]",
    studentNames: "[Student names to be added]",
    guide: "[Guide name to be added]",
    year: "[Year]",
    category: "UG",
    status: "Completed",
  },
  {
    id: "st2",
    title: "[Student project title to be added]",
    studentNames: "[Student names to be added]",
    guide: "[Guide name to be added]",
    year: "[Year]",
    category: "PG",
    status: "Ongoing",
  },
];



