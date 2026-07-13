export interface Device {
  id: string;
  name: string;
  image: string;
  description: string;
  specifications: string;
  status: "Operational" | "In Development" | "Planned";
  location: string;
  contactPerson: string;
}

export const devices: Device[] = [
  {
    id: "d1",
    name: "Soterix Low Intensity transcranial Direct Current Stimulator (tDCS)",
    image: "/placeholder.svg",
    description: "A device used for enhancing neuroplasticity, functional recovery, and cognitive rehabilitation in stroke patients.",
    specifications: "Low-intensity transcranial direct current stimulation device with precise current control.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. John Solomon M",
  },
  {
    id: "d2",
    name: "3D Electromagnetic Kinematic Analysis Tracking System (G4 TM Polhemus)",
    image: "/placeholder.svg",
    description: "A wireless electromagnetic tracking system for studying and analyzing human movements in biomechanics research.",
    specifications: "G4 TM Polhemus, Vermont, USA - Wireless electromagnetic tracking for gait analysis, joint kinematics, and limb tracking.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. John Solomon M",
  },
  {
    id: "d3",
    name: "Plug-and-Train Robot for Hand Neurorehabilitation (PLUTO)",
    image: "/placeholder.svg",
    description: "An indigenous end-effector robot system for active and active-assisted hand rehabilitation for stroke patients.",
    specifications: "Custom-developed robotic system for hand assessment and rehabilitation.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. John Solomon M",
  },
  {
    id: "d4",
    name: "ArmAble",
    image: "/placeholder.svg",
    description: "A game-based, intensive, and engaging rehabilitation therapy device for individuals with upper-limb motor deficit.",
    specifications: "Interactive gaming rehabilitation system for upper limb therapy.",
    status: "Operational",
    location: "Neuro Out-patient Department, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. Senthil Kumaran D",
  },
  {
    id: "d5",
    name: "Montreal Stretch Reflex Threshold (MSRT) Device",
    image: "/placeholder.svg",
    description: "A device for measurement of elbow spasticity in stroke patients.",
    specifications: "Specialized measurement device for assessing spasticity through stretch reflex threshold.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. John Solomon M",
  },
  {
    id: "d6",
    name: "Sensor Sole - Weight Symmetry Training Feedback Device",
    image: "/placeholder.svg",
    description: "A device to achieve better weight distribution and postural control by providing real-time feedback on weight symmetry.",
    specifications: "Real-time weight symmetry feedback system for balance training.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, Department of Physiotherapy, MCHP, MAHE",
    contactPerson: "Dr. Manikandan Natarajan",
  },
  {
    id: "d7",
    name: "Starstim Transcranial Electrical Stimulation (tES) and EEG Monitoring Device",
    image: "/placeholder.svg",
    description: "A combined transcranial electrical stimulation and electroencephalogram monitoring device for research and therapy.",
    specifications: "Starstim 20/32 Neobox with neoprene headcap, NG Pistim electrodes, and earclip.",
    status: "Operational",
    location: "Neuromotor Control Training Unit, MCHP, MAHE",
    contactPerson: "Dr. John Solomon M",
  },
];
