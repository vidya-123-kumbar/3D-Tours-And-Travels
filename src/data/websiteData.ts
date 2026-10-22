import type { FleetVehicle, ServiceItem, TestimonialItem, ClientPartner, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: "Tours & Travels Pvt. Ltd.",
  shortName: "T&T",
  tagline: "Driven by Reliability. Elevated by Innovation.",
  establishedYear: 2016,
  experienceYears: "15+",
  activeFleetCount: "500+",
  clientsCount: "10+",
  dailyTripsCount: "1,000+",
  verifiedDrivers: "600+",
  sosResponseTime: "< 3 min",
  supportAvailability: "24/7/365",
  certifications: [
    { title: "ISO 9001:2015", desc: "Quality Management System Certified", icon: "Award" },
    { title: "MSME Registered", desc: "Govt. of India Enterprise Recognition", icon: "Building2" },
    { title: "GST Compliant", desc: "100% Tax & Invoicing Transparency", icon: "FileCheck" },
    { title: "MCA Incorporated", desc: "Registered under Companies Act", icon: "ShieldCheck" },
  ],
  contacts: {
    primaryPhone: "+91 97425 88995",
    phones: ["+91 97425 88995", "+91 95352 29994", "+91 74111 44405"],
    emails: ["sales@toursandtravels.com", "mails@toursandtravels.com", "support@toursandtravels.com"],
    whatsapp: "919742588995",
    address: "Shop No. 7, 8, 9, 1st Floor, Whitefield Main Road, Samethanahalli, Hosakote Taluk, Bengaluru – 560 067",
    workingHours: "Operations: 24/7/365 · Corporate Office: Mon–Sat 9:00 AM – 6:00 PM",
  },
  director: {
    name: "Mr. P. N. Divakar Naidu",
    title: "Director — Tours & Travels Pvt. Ltd.",
    quote: "Beginning our journey from ground-level operations gave us first-hand understanding of what corporate clients truly need: absolute punctuality, uncompromised passenger safety, and complete operational transparency.",
    bio: "Mr. P. N. Divakar Naidu is a visionary young leader with a deep-rooted passion for the corporate mobility industry. Having gained hands-on experience across every operational vertical, his leadership has scaled Tours & Travels to 500+ GPS-tracked vehicles serving Karnataka's top multinational enterprises.",
  },
  partners: {
    gps: {
      name: "Nyletech",
      role: "GPS & Live Telemetry Partner",
      desc: "Powers our real-time fleet visibility, millisecond location updates, SOS dispatch, and route optimization across Karnataka."
    },
    tech: {
      name: "Technology Partners",
      role: "Operations Platform Partner",
      desc: "Delivers enterprise-grade automated rostering, employee shift dispatch, and consolidated invoicing."
    }
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: "corporate-transport",
    title: "Corporate Transport Services",
    shortDesc: "Dedicated vehicle fleets engineered for IT enterprises, MNC campuses, and BPOs with 24/7 GPS supervision.",
    fullDesc: "Dedicated, bespoke corporate transport fleets providing scheduled, dependable point-to-point and hub-and-spoke commuting for enterprises across Bengaluru's major technology corridors.",
    icon: "Building",
    features: ["Dedicated dedicated fleet allocation", "Custom branding & executive comfort", "Guaranteed 99.8% punctuality SLA", "Dedicated on-site account manager"],
    idealFor: "Tech Parks, Global Capability Centers & MNC Campuses",
    stat: "99.8%",
    statLabel: "On-Time Arrival Rate",
    image: "/images/service_corporate.jpg"
  },
  {
    id: "employee-transport",
    title: "Employee Transportation (ETS)",
    shortDesc: "End-to-end safe mobility featuring dynamic shift rostering, safe routing, and certified night-shift protocols.",
    fullDesc: "Complete employee mobility lifecycle management from roster upload to automated route optimization, driver assignment, escort management, and safe home arrival confirmation.",
    icon: "Users",
    features: ["Automated shift rostering & geofenced routes", "Special night cab escort protocol for women commuters", "Live employee app with ETA notifications", "Instant digital ride OTP validation"],
    idealFor: "24/7 Shift Workforces, BPOs, Healthcare & IT Corridors",
    stat: "1,000+",
    statLabel: "Daily Shifts Executed",
    image: "/images/service_ets.jpg"
  },
  {
    id: "event-transport",
    title: "Event & Delegation Logistics",
    shortDesc: "Coordinated luxury logistics for corporate conferences, board delegations, product launches, and summits.",
    fullDesc: "Flawlessly synchronized transportation coordination for high-profile business summits, international client delegations, annual offsites, and airport VIP meet-and-greets.",
    icon: "CalendarCheck",
    features: ["Dedicated on-ground fleet dispatch marshals", "Flight tracker synchronization for airport pickups", "Uniformed, etiquette-trained chauffeur team", "Luxury coaches & executive sedans available"],
    idealFor: "Conferences, Board Meetings & Corporate Summits",
    stat: "100%",
    statLabel: "VIP Fleet Compliance",
    image: "/images/service_delegation.jpg"
  },
  {
    id: "fleet-management",
    title: "Enterprise Fleet Management",
    shortDesc: "Complete outsourcing of procurement, statutory RTO compliance, periodic maintenance, and driver payroll.",
    fullDesc: "Relieve your facilities and HR teams of transportation burdens. We manage end-to-end fleet operations including vehicle acquisition, statutory compliance, insurance, maintenance, and driver staffing.",
    icon: "Cog",
    features: ["100% RTO, Insurance & Fitness certified", "Preventative maintenance & backup vehicle guarantee", "Unified GST invoicing eliminating multi-vendor chaos", "Real-time compliance dashboard for facilities heads"],
    idealFor: "Enterprises seeking zero Capex fleet management",
    stat: "500+",
    statLabel: "Managed Assets",
    image: "/images/service_maintenance.jpg"
  },
  {
    id: "gps-technology",
    title: "GPS Tracking & Smart Analytics",
    shortDesc: "Powered by Nyletech — real-time vehicle telemetry, geofence violations, speed governance, and SOS alerts.",
    fullDesc: "State-of-the-art telemetry integration providing minute-by-minute vehicle locations, driver behavioral scoring, speed-limit monitors, fuel efficiency diagnostics, and immediate SOS triggers.",
    icon: "Radio",
    features: ["Nyletech live GPS hardware in 100% of vehicles", "Continuous geofencing & route deviation alerts", "Automated billing with digital distance verification", "Emergency SOS panic button connected to 24/7 desk"],
    idealFor: "Transport Managers requiring live audits",
    stat: "< 3s",
    statLabel: "Telemetry Refresh Latency",
    image: "/images/service_gps.jpg"
  },
  {
    id: "support-operations",
    title: "24/7 Operations Control Room",
    shortDesc: "Around-the-clock physical control room in Bengaluru providing instant trip monitoring and emergency response.",
    fullDesc: "Our dedicated Bengaluru control room operates 24 hours a day, 365 days a year. Command operators monitor all active trips, coordinate roadside assistance, and manage customer inquiries with zero lag.",
    icon: "Headphones",
    features: ["Always-on control room desk in Bengaluru", "Sub-3-minute emergency escalation and dispatch", "Live traffic rerouting and breakdown substitution", "Bilingual customer service representatives"],
    idealFor: "Mission-critical 24/7 operations",
    stat: "< 3 min",
    statLabel: "Average SOS Escalation Time",
    image: "/images/operations_center.jpg"
  }
];

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: "ev-tigor-nexon",
    name: "Electric Fleet (Tata Tigor / Nexon EV)",
    category: "ev",
    categoryLabel: "Electric Vehicle (EV)",
    description: "Zero-emission, silent, and sustainable corporate mobility engineered for environmentally conscious enterprises and ESG goals.",
    seatingCapacity: "4 Passengers + Chauffeur",
    features: ["Zero Emission", "Whisper Quiet Cabin", "Dual Airbags & ABS", "Live GPS Telemetry", "High Speed Fast-Charging"],
    specs: {
      fuel: "100% Electric (Battery)",
      safety: "5-Star NCAP Safety Standard",
      tracking: "Nyletech Real-Time Telemetry"
    },
    recommendedFor: "Daily Executive & Green Commutes",
    badge: "Eco Champion · Zero Carbon",
    accentColor: "from-emerald-500/20 to-teal-500/10",
    image: "/images/fleet_ev_driving.jpg"
  },
  {
    id: "cng-sedan",
    name: "CNG Green Mobility (Dzire / Aura)",
    category: "cng",
    categoryLabel: "CNG Vehicles",
    description: "Clean, fuel-efficient, and economical daily employee transportation vehicle with certified safety valves and optimized running overheads.",
    seatingCapacity: "4 Passengers + Chauffeur",
    features: ["Factory Fitted CNG Kit", "Dual Air Conditioning", "Speed Governor 80 km/h", "Clean Fabric Interiors", "First Aid & Fire Extinguisher"],
    specs: {
      fuel: "CNG + Petrol Hybrid",
      safety: "RTO Approved High-Pressure Cylinder",
      tracking: "Live GPS & In-Cab SOS"
    },
    recommendedFor: "High-Frequency Daily Commuter Shifts",
    badge: "Cost & Fuel Efficient",
    accentColor: "from-amber-500/20 to-yellow-500/10",
    image: "/images/fleet_cng_driving.jpg"
  },
  {
    id: "executive-sedan",
    name: "Executive Sedan (Etios / Dzire / Honda Amaze)",
    category: "sedan",
    categoryLabel: "Executive Sedans",
    description: "The gold standard for corporate executive commutes, manager pickups, and airport transfers with superior legroom and quiet highway cruising.",
    seatingCapacity: "4 Passengers + Chauffeur",
    features: ["Plush Ergonomic Seating", "High-Capacity Chilled AC", "Large Boot for Luggage", "Mobile Charging Ports", "Police Verified Chauffeur"],
    specs: {
      fuel: "Diesel / Petrol BS-VI",
      safety: "ABS, EBD & Dual Airbags",
      tracking: "Nyletech Live Map & SOS"
    },
    recommendedFor: "Management Staff & Client Transfers",
    badge: "Most Popular Corporate Pick",
    accentColor: "from-sky-500/20 to-blue-500/10",
    image: "/images/fleet_sedan_driving.jpg"
  },
  {
    id: "suv-innova-ertiga",
    name: "Executive MUV / SUV (Toyota Innova Crysta & Ertiga)",
    category: "suv",
    categoryLabel: "SUVs & MUVs",
    description: "Spacious multi-utility vehicles offering supreme comfort, captain seats, individual air vents, and commanding road presence for senior leadership.",
    seatingCapacity: "6–7 Passengers + Chauffeur",
    features: ["Reclining Captain Chairs", "Multi-Zone Rear Climate Control", "Rear AC Vents for Each Row", "Spacious Head & Leg Room", "Heavy Luggage Carrier"],
    specs: {
      fuel: "Diesel BS-VI Compliant",
      safety: "7 Airbags (Innova) & VSC",
      tracking: "Integrated Nyletech GPS"
    },
    recommendedFor: "Leadership Teams, Project Delegations & Airport Runs",
    badge: "Executive Class Comfort",
    accentColor: "from-amber-400/20 to-amber-600/10",
    image: "/images/fleet_suv_driving.jpg"
  },
  {
    id: "tempo-force-traveller",
    name: "Force Tempo Traveller (Pushback AC)",
    category: "tempo",
    categoryLabel: "Tempo Travellers",
    description: "The ideal solution for medium-sized project groups, cross-campus transfers, and weekend team offsites with individual pushback seats.",
    seatingCapacity: "12–17 Passengers + Chauffeur",
    features: ["Individual Pushback Recliners", "Roof-Mounted Heavy Duty AC", "Wide Center Aisle", "LED Reading Lamps", "Underseat Mobile Charging"],
    specs: {
      fuel: "Diesel Turbo Intercooled",
      safety: "Emergency Exit Door & First Aid",
      tracking: "GPS Route & Speed Governor"
    },
    recommendedFor: "Departmental Shifts, Corporate Outings & Airport Groups",
    badge: "Team Favorite",
    accentColor: "from-indigo-500/20 to-purple-500/10",
    image: "/images/fleet_tempo_driving.jpg"
  },
  {
    id: "luxury-coach-volvo",
    name: "Luxury Multi-Axle Coach (Volvo / Scania / BharatBenz)",
    category: "coach",
    categoryLabel: "Luxury Coaches",
    description: "Ultra-premium interstate and intercity corporate coaches with electronically controlled air suspension, whisper-smooth ride, and onboard Wi-Fi.",
    seatingCapacity: "35–45 Reclining Executive Seats",
    features: ["Electronically Controlled Air Suspension", "High-Definition Audio/Video Setup", "Onboard USB Ports at Every Seat", "Ample Underbelly Luggage Bays", "Tinted UV Protection Windows"],
    specs: {
      fuel: "Euro-6 / BS-VI High Power Engine",
      safety: "Electronic Stability Control & Retarder",
      tracking: "Satellite GPS & Driver Cam"
    },
    recommendedFor: "Corporate Conferences, Offsites & Long-Distance Delegations",
    badge: "Flagship Luxury",
    accentColor: "from-rose-500/20 to-pink-500/10",
    image: "/images/fleet_coach_driving.jpg"
  },
  {
    id: "staff-bus-tata-leyland",
    name: "Enterprise Staff Bus (Ashok Leyland / Tata Motors)",
    category: "bus",
    categoryLabel: "Staff Buses",
    description: "High-capacity employee transportation buses designed for industrial campuses, tech clusters, and large IT campuses with strict timetable adherence.",
    seatingCapacity: "40–52 Seater High Back",
    features: ["Dual CCTV Recording Cameras", "Public Address System", "Wide Stanchion Grab Handles", "RTO Certified Emergency Exits", "Digital Route Display Board"],
    specs: {
      fuel: "BS-VI Clean Diesel",
      safety: "Fire Suppression & Speed Governor",
      tracking: "Nyletech Real-Time Telematics"
    },
    recommendedFor: "High-Volume Tech Park & Factory Campus Shifts",
    badge: "Maximum Efficiency",
    accentColor: "from-blue-600/20 to-cyan-600/10",
    image: "/images/fleet_bus_driving.jpg"
  }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: "[24]7.ai", category: "AI & Customer Engagement", accent: "#ef4444", tagline: "Global AI customer experience leader" },
  { name: "AECOM", category: "Infrastructure & Engineering", accent: "#003087", tagline: "Fortune 500 global infrastructure firm" },
  { name: "AON", category: "Professional Services & Risk", accent: "#dc2626", tagline: "Global financial & risk management giant" },
  { name: "Pearl Global", category: "Global Manufacturing", accent: "#16a34a", tagline: "Multinational apparel manufacturing corporation" },
  { name: "PragmaEdge", category: "Enterprise Software", accent: "#ea580c", tagline: "Data integration & cloud consulting" },
  { name: "Commure", category: "Healthcare Technology", accent: "#0284c7", tagline: "Modern healthcare operating software" },
  { name: "Kwalee™", category: "Gaming & Interactive", accent: "#f59e0b", tagline: "Global leading video games developer" },
  { name: "Nurture International School", category: "Education Institution", accent: "#8b5cf6", tagline: "Premier academic institution campus" },
  { name: "VR Builders & Developers", category: "Real Estate & Infrastructure", accent: "#0d9488", tagline: "Karnataka's landmark urban developers" },
  { name: "Nyletech", category: "GPS & IoT Partner", accent: "#38bdf8", tagline: "Smart mobility & telematics infrastructure" },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Tours & Travels has handled our Bengaluru employee transit for multiple years with exceptional reliability. Their GPS-enabled fleet, trained chauffeurs, and instantaneous control room response give our HR and facilities departments total peace of mind.",
    author: "Admin Manager",
    role: "Head of Corporate Facilities",
    company: "[24]7.ai Bengaluru",
    rating: 5
  },
  {
    quote: "The live telematics through Nyletech provide exact visibility of our night shifts. T&T's strict adherence to female commuter safety protocols, verified escorts, and 99%+ punctuality make them the standout transport vendor in Karnataka.",
    author: "Transport Head",
    role: "Infrastructure & Logistics",
    company: "AECOM India",
    rating: 5
  },
  {
    quote: "Coordinating multi-location pickups for our annual leadership conference was executed with surgical precision. From executive Innovas to luxury coaches, every vehicle was immaculately sanitized and arrived 15 minutes before schedule.",
    author: "Senior Operations Lead",
    role: "People & Places Management",
    company: "AON Global",
    rating: 5
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    number: "01",
    title: "Trained & POSH Compliant Chauffeurs",
    desc: "Every driver undergoes comprehensive police background checks, periodic medical assessments, defensive driving certification, and mandatory POSH awareness training.",
    tag: "✓ POSH Certified & Verified",
    icon: "UserCheck"
  },
  {
    number: "02",
    title: "Unified Billing & Transparent Accounting",
    desc: "A single consolidated, GST-compliant monthly invoice covering all vehicle operations, kilometers logged, and telematics reports — zero reconciliation headaches.",
    tag: "✓ GST Compliant Invoicing",
    icon: "Receipt"
  },
  {
    number: "03",
    title: "Safe & Secure Travel with SOS Panic Systems",
    desc: "Physical emergency SOS buttons installed in every vehicle coupled with mobile app safety triggers connect directly to our 24/7 command center and rapid response team.",
    tag: "✓ Real-Time SOS Integration",
    icon: "ShieldAlert"
  },
  {
    number: "04",
    title: "24/7 On-Route Operations Support",
    desc: "Active trip supervisors and mechanical support units patrol key Bengaluru transit arteries, guaranteeing instant breakdown relief and zero commuter delay.",
    tag: "✓ Sub-3-Min Rapid Dispatch",
    icon: "Headphones"
  },
  {
    number: "05",
    title: "Intelligent GPS Route Optimization",
    desc: "Powered by smart algorithms to cluster pickup nodes, bypass traffic choke points across Outer Ring Road and Whitefield, and cut employee commute times by up to 22%.",
    tag: "✓ Fuel & Time Efficient",
    icon: "Route"
  },
  {
    number: "06",
    title: "Rigorous Fleet Hygiene & Pre-Trip Checks",
    desc: "Mandatory daily sanitization, tire condition verification, AC filtration sanitization, and strict adherence to our ISO 9001:2015 quality checklists.",
    tag: "✓ ISO 9001:2015 Quality",
    icon: "Sparkles"
  },
  {
    number: "07",
    title: "100% Statutory & RTO Regulatory Compliance",
    desc: "All vehicles maintain valid state tourist/contract carriage permits, comprehensive passenger insurance policies, fitness certificates, and updated PUC cards.",
    tag: "✓ Zero Regulatory Liability",
    icon: "CheckCircle2"
  }
];

export const TECH_FEATURES = [
  {
    title: "Live GPS Fleet Telemetry",
    desc: "Minute-by-minute satellite tracking powered by Nyletech with geofencing alerts, route replay, and speed governance.",
    icon: "Satellite"
  },
  {
    title: "AI Dynamic Route Optimization",
    desc: "Automated route generation calculating traffic congestion in real time across Bengaluru's tech corridors.",
    icon: "Cpu"
  },
  {
    title: "Automated Shift Rostering",
    desc: "Seamless synchronization with enterprise HRMS systems for automated employee shift mapping and seat assignment.",
    icon: "Calendar"
  },
  {
    title: "Consolidated Digital Billing",
    desc: "Automated kilometer and trip calculation with digital trip sheets eliminating manual logbook errors.",
    icon: "CreditCard"
  },
  {
    title: "Driver Navigation App",
    desc: "Turn-by-turn navigation, multilingual UI, shift acceptance, and digital SOS beacon for our chauffeurs.",
    icon: "Navigation"
  },
  {
    title: "Employee Passenger Mobile App",
    desc: "Live cab tracking, driver contact masking, ETA notifications, and ride verification PIN for commuters.",
    icon: "Smartphone"
  },
  {
    title: "Instant SOS & Emergency Desk",
    desc: "Dedicated hardware emergency switch inside every cab connected to our 24/7 Bengaluru monitoring room.",
    icon: "BellRing"
  },
  {
    title: "Enterprise Analytics Portal",
    desc: "Executive dashboard showing on-time performance metrics, fleet utilization, and vendor compliance reports.",
    icon: "BarChart3"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "Coverage",
    question: "What service areas do you cover across Bengaluru and Karnataka?",
    answer: "We provide comprehensive coverage across all major IT corridors and business zones including Whitefield, Electronic City Phase 1 & 2, Outer Ring Road (Bellandur, Marathahalli, Mahadevapura), Sarjapur Road, Manyata Tech Park (Hebbal), Bagmane Tech Park (CV Raman Nagar), Hosakote Industrial Area, Peenya, and Devanahalli Airport corridor."
  },
  {
    category: "Fleet Models",
    question: "Do you offer dedicated vehicles or shared fleet models for companies?",
    answer: "We offer both dedicated fleet options (vehicles and chauffeurs exclusively reserved for your corporate campus with custom enterprise branding) and shared / pooled fleet models for cost optimization. Our transportation architects will analyze your headcount, shift distribution, and route density to recommend the optimal solution."
  },
  {
    category: "Safety",
    question: "How do you verify driver safety and passenger security?",
    answer: "Every chauffeur on our roster undergoes thorough 3-tier vetting: local police criminal background verification, authentic driving license validation via Sarathi portal, and medical fitness checkups. Furthermore, drivers complete mandatory POSH (Prevention of Sexual Harassment) training, customer courtesy drills, and defensive driving tests."
  },
  {
    category: "Technology",
    question: "What software and GPS tracking tools are provided with the service?",
    answer: "Every enterprise contract comes integrated with Nyletech live satellite GPS hardware, real-time employee mobile apps with driver location, automated shift rostering software, digital trip logging, and an executive administration portal with on-demand compliance reports and billing reconciliations."
  },
  {
    category: "Night Shifts",
    question: "How do you handle night shifts and women commuter safety protocols?",
    answer: "For late-night and graveyard shifts (8:00 PM to 6:00 AM), we strictly implement Karnataka Transport Department guidelines: mandatory verified security escorts for vehicles carrying women commuters, priority first-drop / last-pickup sequencing, continuous trip monitoring from our 24/7 control room, and compulsory safe-arrival confirmation calls."
  },
  {
    category: "Quotes",
    question: "How quickly can we obtain a customized corporate transportation proposal?",
    answer: "You can submit an inquiry via our website form, call our sales desk directly at +91 97425 88995, or connect via WhatsApp. Our corporate fleet specialists will review your employee headcount and route requirements to deliver a detailed, transparent proposal within 2 business hours."
  }
];

export const GALLERY_IMAGES = [
  { title: "Electric Executive Commuter", category: "EV Fleet", desc: "Eco-friendly zero-emission Tata Tigor EV for campus commutes", image: "/images/fleet_ev.jpg" },
  { title: "Corporate SUV Lineup", category: "SUVs & MUVs", desc: "Toyota Innova Crysta & Ertiga executive airport fleet", image: "/images/fleet_suv.jpg" },
  { title: "Executive Sedan Roster", category: "Sedans", desc: "Immaculately maintained Toyota Etios & Dzire cabs", image: "/images/fleet_sedan.jpg" },
  { title: "Force Tempo Traveller Fleet", category: "Tempo Travellers", desc: "12-17 seater recliners for team offsites and department shuttles", image: "/images/fleet_tempo.jpg" },
  { title: "Staff Transportation Buses", category: "Staff Buses", desc: "CCTV-equipped Ashok Leyland 50-seater corporate buses", image: "/images/fleet_bus.jpg" },
  { title: "Bengaluru 24/7 Operations Room", category: "Control Center", desc: "Real-time Nyletech GPS tracking desk monitoring 1,000+ daily trips", image: "/images/operations_center.jpg" }
];
