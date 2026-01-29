export type UserRole = "Importer" | "Exporter" | "Owner" | "Garage" | "Admin";
export type AuthUserRole = "importer" | "owner";

export type RiskLevel = "Low" | "Medium" | "High" | "Pending";

export type VehicleStatus =
  | "Auction Won"
  | "At Port - Nagoya"
  | "Customs Clearance"
  | "Shipping"
  | "Registered";

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  status: VehicleStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  ownerRoleView?: UserRole;
}

export interface ProvenanceEvent {
  id: string;
  vehicleId: string;
  title: string;
  timestamp: string;
  location: string;
  status: "Completed" | "In Progress" | "Pending";
  documentUrl?: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  mileage: number;
}

export interface ComplianceDocument {
  id: string;
  vehicleId: string;
  type: string;
  issuedDate: string;
  expiryDate?: string;
  issuingAuthority: string;
  documentUrl?: string;
}

export interface ShipmentDetail {
  id: string;
  vehicleId: string;
  containerNumber: string;
  shippingCompany: string;
  vesselName: string;
  departureDate: string;
  arrivalDate: string;
  originPort: string;
  destinationPort: string;
}

export const serviceRecords: ServiceRecord[] = [
  {
    id: "srv-1",
    vehicleId: "harrier-2022",
    date: "2024-12-01T10:00:00Z",
    type: "Oil Change",
    description: "Regular oil and filter change",
    cost: 4500,
    mileage: 25000
  },
  {
    id: "srv-2",
    vehicleId: "harrier-2022",
    date: "2024-10-15T14:30:00Z",
    type: "Tire Rotation",
    description: "Tire rotation and balance check",
    cost: 2500,
    mileage: 22000
  },
  {
    id: "srv-3",
    vehicleId: "note-2018",
    date: "2024-11-20T11:00:00Z",
    type: "Battery Replacement",
    description: "Replaced 12V auxiliary battery",
    cost: 8500,
    mileage: 45000
  },
  {
    id: "srv-4",
    vehicleId: "vezel-2015",
    date: "2024-09-10T09:00:00Z",
    type: "Brake Pad Replacement",
    description: "Front brake pads and rotors",
    cost: 12000,
    mileage: 65000
  },
  {
    id: "srv-5",
    vehicleId: "impreza-2012",
    date: "2023-08-05T13:00:00Z",
    type: "Engine Tune-up",
    description: "Spark plugs and air filter replacement",
    cost: 6800,
    mileage: 85000
  },
  {
    id: "srv-6",
    vehicleId: "outlander-2019",
    date: "2024-07-20T10:30:00Z",
    type: "Transmission Service",
    description: "CVT transmission fluid change",
    cost: 5500,
    mileage: 35000
  },
  {
    id: "srv-7",
    vehicleId: "cx-5-2020",
    date: "2024-08-25T15:00:00Z",
    type: "Air Filter Replacement",
    description: "Cabin and engine air filters",
    cost: 3200,
    mileage: 28000
  },
  {
    id: "srv-8",
    vehicleId: "rx-2021",
    date: "2024-09-15T12:00:00Z",
    type: "Wheel Alignment",
    description: "Four-wheel alignment and suspension check",
    cost: 4800,
    mileage: 22000
  },
  {
    id: "srv-9",
    vehicleId: "leaf-2017",
    date: "2024-06-30T14:00:00Z",
    type: "Battery Diagnostics",
    description: "High-voltage battery health check",
    cost: 2500,
    mileage: 55000
  },
  {
    id: "srv-10",
    vehicleId: "prius-2016",
    date: "2024-05-10T11:30:00Z",
    type: "Hybrid System Check",
    description: "Hybrid battery and motor diagnostics",
    cost: 3800,
    mileage: 72000
  }
];

export const vehicles: Vehicle[] = [
  {
    id: "harrier-2022",
    vin: "JTNAX3AH7N100001",
    make: "Toyota",
    model: "Harrier",
    year: 2022,
    status: "At Port - Nagoya",
    riskLevel: "Low",
    riskScore: 82,
    ownerRoleView: "Owner"
  },
  {
    id: "note-2018",
    vin: "3N1CE2CPXJL360002",
    make: "Nissan",
    model: "Note e-Power",
    year: 2018,
    status: "Customs Clearance",
    riskLevel: "Medium",
    riskScore: 64
  },
  {
    id: "vezel-2015",
    vin: "JHMZC6G35FC700003",
    make: "Honda",
    model: "Vezel",
    year: 2015,
    status: "Shipping",
    riskLevel: "Low",
    riskScore: 76
  },
  {
    id: "impreza-2012",
    vin: "JF1GPAL63CH400004",
    make: "Subaru",
    model: "Impreza",
    year: 2012,
    status: "Registered",
    riskLevel: "High",
    riskScore: 48
  },
  {
    id: "swift-2024",
    vin: "JS2ZC92S0G6100005",
    make: "Suzuki",
    model: "Swift",
    year: 2024,
    status: "Auction Won",
    riskLevel: "Pending",
    riskScore: 0
  },
  {
    id: "outlander-2019",
    vin: "JA4J24A5XKZ600006",
    make: "Mitsubishi",
    model: "Outlander",
    year: 2019,
    status: "Registered",
    riskLevel: "Low",
    riskScore: 85
  },
  {
    id: "cx-5-2020",
    vin: "JM3KFBDM0L0000007",
    make: "Mazda",
    model: "CX-5",
    year: 2020,
    status: "Shipping",
    riskLevel: "Medium",
    riskScore: 68
  },
  {
    id: "rx-2021",
    vin: "JTJGZKCA6M2000008",
    make: "Lexus",
    model: "RX",
    year: 2021,
    status: "Customs Clearance",
    riskLevel: "Low",
    riskScore: 78
  },
  {
    id: "leaf-2017",
    vin: "1N4AZ1CP5HC500009",
    make: "Nissan",
    model: "Leaf",
    year: 2017,
    status: "At Port - Nagoya",
    riskLevel: "High",
    riskScore: 42
  },
  {
    id: "prius-2016",
    vin: "JTDKARFU0G3000010",
    make: "Toyota",
    model: "Prius",
    year: 2016,
    status: "Registered",
    riskLevel: "Low",
    riskScore: 88
  },
  {
    id: "forester-2014",
    vin: "JF2SJADC0EH400011",
    make: "Subaru",
    model: "Forester",
    year: 2014,
    status: "Shipping",
    riskLevel: "Medium",
    riskScore: 62
  },
  {
    id: "civic-2018",
    vin: "2HGFC2F59JH500012",
    make: "Honda",
    model: "Civic",
    year: 2018,
    status: "Auction Won",
    riskLevel: "Pending",
    riskScore: 0
  },
  {
    id: "mirage-2022",
    vin: "ML32A3HJ5NH000013",
    make: "Mitsubishi",
    model: "Mirage",
    year: 2022,
    status: "Customs Clearance",
    riskLevel: "Low",
    riskScore: 79
  },
  {
    id: "mazda3-2019",
    vin: "JM1BPALM9K1400014",
    make: "Mazda",
    model: "Mazda3",
    year: 2019,
    status: "Registered",
    riskLevel: "Medium",
    riskScore: 71
  },
  {
    id: "es-2023",
    vin: "58AB21BAXN7000015",
    make: "Lexus",
    model: "ES",
    year: 2023,
    status: "At Port - Nagoya",
    riskLevel: "Low",
    riskScore: 82
  },
  {
    id: "juke-2015",
    vin: "JN1BJ0HR9FM400016",
    make: "Nissan",
    model: "Juke",
    year: 2015,
    status: "Shipping",
    riskLevel: "High",
    riskScore: 35
  },
  {
    id: "c-hr-2020",
    vin: "NMTKHMBX1LR000017",
    make: "Toyota",
    model: "C-HR",
    year: 2020,
    status: "Customs Clearance",
    riskLevel: "Medium",
    riskScore: 65
  },
  {
    id: "crosstrek-2017",
    vin: "JF2GTAEC0H8000018",
    make: "Subaru",
    model: "Crosstrek",
    year: 2017,
    status: "Registered",
    riskLevel: "Low",
    riskScore: 76
  },
  {
    id: "fit-2013",
    vin: "JHMGE8G35DC000019",
    make: "Honda",
    model: "Fit",
    year: 2013,
    status: "Auction Won",
    riskLevel: "Pending",
    riskScore: 0
  },
  {
    id: "ignis-2021",
    vin: "JSAAJGJ1KN7000020",
    make: "Suzuki",
    model: "Ignis",
    year: 2021,
    status: "At Port - Nagoya",
    riskLevel: "Low",
    riskScore: 80
  }
];

export const provenanceEvents: ProvenanceEvent[] = [
  // Harrier 2022
  {
    id: "evt-1",
    vehicleId: "harrier-2022",
    title: "Auction Purchase",
    timestamp: "2025-01-05T10:12:00Z",
    location: "USS Tokyo",
    status: "Completed",
    documentUrl: "/docs/harrier-auction.pdf"
  },
  {
    id: "evt-2",
    vehicleId: "harrier-2022",
    title: "Export Certificate Issued",
    timestamp: "2025-01-10T09:00:00Z",
    location: "Tokyo Transport Bureau",
    status: "Completed",
    documentUrl: "/docs/harrier-export-cert.pdf"
  },
  {
    id: "evt-3",
    vehicleId: "harrier-2022",
    title: "Port Drop-off",
    timestamp: "2025-01-15T14:20:00Z",
    location: "Nagoya Port",
    status: "Completed"
  },
  {
    id: "evt-4",
    vehicleId: "harrier-2022",
    title: "Vessel Departure",
    timestamp: "2025-01-18T06:30:00Z",
    location: "Nagoya Port",
    status: "Completed"
  },
  {
    id: "evt-5",
    vehicleId: "harrier-2022",
    title: "UK Arrival",
    timestamp: "2025-02-02T08:00:00Z",
    location: "Port of Southampton",
    status: "In Progress"
  },
  {
    id: "evt-6",
    vehicleId: "harrier-2022",
    title: "Customs Payment",
    timestamp: "2025-02-03T12:00:00Z",
    location: "HMRC",
    status: "Pending"
  },
  {
    id: "evt-7",
    vehicleId: "harrier-2022",
    title: "DVLA Registration",
    timestamp: "2025-02-15T09:30:00Z",
    location: "DVLA Swansea",
    status: "Pending"
  },
  // Nissan Note
  {
    id: "evt-8",
    vehicleId: "note-2018",
    title: "Auction Purchase",
    timestamp: "2024-12-20T11:00:00Z",
    location: "USS Yokohama",
    status: "Completed"
  },
  {
    id: "evt-9",
    vehicleId: "note-2018",
    title: "Export Certificate Issued",
    timestamp: "2024-12-27T09:30:00Z",
    location: "Yokohama Transport Bureau",
    status: "Completed",
    documentUrl: "/docs/note-export-cert.pdf"
  },
  {
    id: "evt-10",
    vehicleId: "note-2018",
    title: "UK Arrival",
    timestamp: "2025-01-20T08:30:00Z",
    location: "Port of Tilbury",
    status: "In Progress"
  },
  {
    id: "evt-11",
    vehicleId: "note-2018",
    title: "Customs Payment",
    timestamp: "2025-01-21T15:00:00Z",
    location: "HMRC",
    status: "Pending"
  },
  // Honda Vezel
  {
    id: "evt-12",
    vehicleId: "vezel-2015",
    title: "Auction Purchase",
    timestamp: "2024-11-10T10:00:00Z",
    location: "JU Tokyo",
    status: "Completed"
  },
  {
    id: "evt-13",
    vehicleId: "vezel-2015",
    title: "Shipping",
    timestamp: "2024-11-20T07:00:00Z",
    location: "Kobe Port",
    status: "In Progress"
  },
  // Subaru Impreza
  {
    id: "evt-14",
    vehicleId: "impreza-2012",
    title: "Auction Purchase",
    timestamp: "2023-10-10T09:30:00Z",
    location: "USS Sapporo",
    status: "Completed"
  },
  {
    id: "evt-15",
    vehicleId: "impreza-2012",
    title: "DVLA Registration",
    timestamp: "2024-01-05T11:00:00Z",
    location: "DVLA Swansea",
    status: "Completed"
  },
  // Suzuki Swift
  {
    id: "evt-16",
    vehicleId: "swift-2024",
    title: "Auction Won",
    timestamp: "2025-01-25T13:00:00Z",
    location: "USS Osaka",
    status: "Completed"
  },
  // Additional events for existing vehicles
  {
    id: "evt-17",
    vehicleId: "harrier-2022",
    title: "Pre-Shipment Inspection",
    timestamp: "2025-01-12T11:00:00Z",
    location: "Nagoya Inspection Center",
    status: "Completed",
    documentUrl: "/docs/harrier-inspection.pdf"
  },
  {
    id: "evt-18",
    vehicleId: "harrier-2022",
    title: "Maintenance Check",
    timestamp: "2025-01-14T08:30:00Z",
    location: "Toyota Service Center",
    status: "Completed"
  },
  {
    id: "evt-19",
    vehicleId: "note-2018",
    title: "Pre-Shipment Inspection",
    timestamp: "2025-01-05T10:00:00Z",
    location: "Yokohama Inspection Center",
    status: "Completed",
    documentUrl: "/docs/note-inspection.pdf"
  },
  {
    id: "evt-20",
    vehicleId: "note-2018",
    title: "Battery Replacement",
    timestamp: "2024-12-15T14:00:00Z",
    location: "Nissan Service Center",
    status: "Completed"
  },
  {
    id: "evt-21",
    vehicleId: "vezel-2015",
    title: "Pre-Shipment Inspection",
    timestamp: "2024-11-15T09:00:00Z",
    location: "Kobe Inspection Center",
    status: "Completed",
    documentUrl: "/docs/vezel-inspection.pdf"
  },
  {
    id: "evt-22",
    vehicleId: "vezel-2015",
    title: "Tire Replacement",
    timestamp: "2024-11-12T13:00:00Z",
    location: "Honda Service Center",
    status: "Completed"
  },
  {
    id: "evt-23",
    vehicleId: "impreza-2012",
    title: "Pre-Shipment Inspection",
    timestamp: "2023-10-15T11:30:00Z",
    location: "Sapporo Inspection Center",
    status: "Completed",
    documentUrl: "/docs/impreza-inspection.pdf"
  },
  {
    id: "evt-24",
    vehicleId: "impreza-2012",
    title: "Engine Tune-up",
    timestamp: "2023-09-20T10:00:00Z",
    location: "Subaru Service Center",
    status: "Completed"
  },
  {
    id: "evt-25",
    vehicleId: "swift-2024",
    title: "Pre-Shipment Inspection",
    timestamp: "2025-01-28T12:00:00Z",
    location: "Osaka Inspection Center",
    status: "Pending",
    documentUrl: "/docs/swift-inspection.pdf"
  },
  // Events for new vehicles
  {
    id: "evt-26",
    vehicleId: "outlander-2019",
    title: "Auction Purchase",
    timestamp: "2024-08-15T10:00:00Z",
    location: "USS Tokyo",
    status: "Completed"
  },
  {
    id: "evt-27",
    vehicleId: "outlander-2019",
    title: "Export Certificate Issued",
    timestamp: "2024-08-20T09:00:00Z",
    location: "Tokyo Transport Bureau",
    status: "Completed",
    documentUrl: "/docs/outlander-export-cert.pdf"
  },
  {
    id: "evt-28",
    vehicleId: "outlander-2019",
    title: "DVLA Registration",
    timestamp: "2024-10-05T11:00:00Z",
    location: "DVLA Swansea",
    status: "Completed"
  },
  {
    id: "evt-29",
    vehicleId: "cx-5-2020",
    title: "Auction Purchase",
    timestamp: "2024-09-10T14:00:00Z",
    location: "USS Yokohama",
    status: "Completed"
  },
  {
    id: "evt-30",
    vehicleId: "cx-5-2020",
    title: "Shipping",
    timestamp: "2024-09-25T06:00:00Z",
    location: "Yokohama Port",
    status: "In Progress"
  },
  {
    id: "evt-31",
    vehicleId: "rx-2021",
    title: "Auction Purchase",
    timestamp: "2024-10-01T11:30:00Z",
    location: "USS Nagoya",
    status: "Completed"
  },
  {
    id: "evt-32",
    vehicleId: "rx-2021",
    title: "Customs Clearance",
    timestamp: "2024-11-15T13:00:00Z",
    location: "HMRC",
    status: "In Progress"
  },
  {
    id: "evt-33",
    vehicleId: "leaf-2017",
    title: "Auction Purchase",
    timestamp: "2024-07-20T09:45:00Z",
    location: "USS Osaka",
    status: "Completed"
  },
  {
    id: "evt-34",
    vehicleId: "leaf-2017",
    title: "Port Drop-off",
    timestamp: "2024-08-05T15:00:00Z",
    location: "Osaka Port",
    status: "Completed"
  },
  {
    id: "evt-35",
    vehicleId: "prius-2016",
    title: "Auction Purchase",
    timestamp: "2024-06-10T10:30:00Z",
    location: "USS Tokyo",
    status: "Completed"
  },
  {
    id: "evt-36",
    vehicleId: "prius-2016",
    title: "DVLA Registration",
    timestamp: "2024-08-20T12:00:00Z",
    location: "DVLA Swansea",
    status: "Completed"
  },
  {
    id: "evt-37",
    vehicleId: "forester-2014",
    title: "Auction Purchase",
    timestamp: "2024-05-15T08:00:00Z",
    location: "USS Sapporo",
    status: "Completed"
  },
  {
    id: "evt-38",
    vehicleId: "forester-2014",
    title: "Shipping",
    timestamp: "2024-06-01T07:30:00Z",
    location: "Sapporo Port",
    status: "In Progress"
  },
  {
    id: "evt-39",
    vehicleId: "civic-2018",
    title: "Auction Won",
    timestamp: "2025-01-20T16:00:00Z",
    location: "USS Yokohama",
    status: "Completed"
  },
  {
    id: "evt-40",
    vehicleId: "mirage-2022",
    title: "Auction Purchase",
    timestamp: "2024-11-05T12:00:00Z",
    location: "USS Kobe",
    status: "Completed"
  },
  {
    id: "evt-41",
    vehicleId: "mirage-2022",
    title: "Customs Clearance",
    timestamp: "2024-12-10T14:30:00Z",
    location: "HMRC",
    status: "In Progress"
  },
  {
    id: "evt-42",
    vehicleId: "mazda3-2019",
    title: "Auction Purchase",
    timestamp: "2024-07-25T09:15:00Z",
    location: "USS Nagoya",
    status: "Completed"
  },
  {
    id: "evt-43",
    vehicleId: "mazda3-2019",
    title: "DVLA Registration",
    timestamp: "2024-09-15T10:45:00Z",
    location: "DVLA Swansea",
    status: "Completed"
  },
  {
    id: "evt-44",
    vehicleId: "es-2023",
    title: "Auction Purchase",
    timestamp: "2024-12-01T11:00:00Z",
    location: "USS Tokyo",
    status: "Completed"
  },
  {
    id: "evt-45",
    vehicleId: "es-2023",
    title: "Port Drop-off",
    timestamp: "2024-12-10T13:20:00Z",
    location: "Tokyo Port",
    status: "Completed"
  },
  {
    id: "evt-46",
    vehicleId: "juke-2015",
    title: "Auction Purchase",
    timestamp: "2024-04-10T10:30:00Z",
    location: "USS Yokohama",
    status: "Completed"
  },
  {
    id: "evt-47",
    vehicleId: "juke-2015",
    title: "Shipping",
    timestamp: "2024-04-25T08:00:00Z",
    location: "Yokohama Port",
    status: "In Progress"
  },
  {
    id: "evt-48",
    vehicleId: "c-hr-2020",
    title: "Auction Purchase",
    timestamp: "2024-08-30T14:45:00Z",
    location: "USS Osaka",
    status: "Completed"
  },
  {
    id: "evt-49",
    vehicleId: "c-hr-2020",
    title: "Customs Clearance",
    timestamp: "2024-10-05T15:30:00Z",
    location: "HMRC",
    status: "In Progress"
  },
  {
    id: "evt-50",
    vehicleId: "crosstrek-2017",
    title: "Auction Purchase",
    timestamp: "2024-06-20T09:00:00Z",
    location: "USS Sapporo",
    status: "Completed"
  },
  {
    id: "evt-51",
    vehicleId: "crosstrek-2017",
    title: "DVLA Registration",
    timestamp: "2024-08-10T11:15:00Z",
    location: "DVLA Swansea",
    status: "Completed"
  },
  {
    id: "evt-52",
    vehicleId: "fit-2013",
    title: "Auction Won",
    timestamp: "2025-01-15T12:30:00Z",
    location: "USS Kobe",
    status: "Completed"
  },
  {
    id: "evt-53",
    vehicleId: "ignis-2021",
    title: "Auction Purchase",
    timestamp: "2024-09-20T10:45:00Z",
    location: "USS Nagoya",
    status: "Completed"
  },
  {
    id: "evt-54",
    vehicleId: "ignis-2021",
    title: "Port Drop-off",
    timestamp: "2024-10-01T14:00:00Z",
    location: "Nagoya Port",
    status: "Completed"
  }
];

export const complianceDocuments: ComplianceDocument[] = [
  {
    id: "doc-1",
    vehicleId: "harrier-2022",
    type: "Export Certificate",
    issuedDate: "2025-01-10T09:00:00Z",
    issuingAuthority: "Tokyo Transport Bureau",
    documentUrl: "/docs/harrier-export-cert.pdf"
  },
  {
    id: "doc-2",
    vehicleId: "harrier-2022",
    type: "Safety Inspection",
    issuedDate: "2025-01-12T11:00:00Z",
    expiryDate: "2026-01-12T11:00:00Z",
    issuingAuthority: "Nagoya Inspection Center",
    documentUrl: "/docs/harrier-inspection.pdf"
  },
  {
    id: "doc-3",
    vehicleId: "note-2018",
    type: "Export Certificate",
    issuedDate: "2024-12-27T09:30:00Z",
    issuingAuthority: "Yokohama Transport Bureau",
    documentUrl: "/docs/note-export-cert.pdf"
  },
  {
    id: "doc-4",
    vehicleId: "note-2018",
    type: "Emissions Test",
    issuedDate: "2024-12-28T10:00:00Z",
    expiryDate: "2025-12-28T10:00:00Z",
    issuingAuthority: "Yokohama Environmental Bureau"
  },
  {
    id: "doc-5",
    vehicleId: "vezel-2015",
    type: "Safety Inspection",
    issuedDate: "2024-11-15T09:00:00Z",
    expiryDate: "2025-11-15T09:00:00Z",
    issuingAuthority: "Kobe Inspection Center",
    documentUrl: "/docs/vezel-inspection.pdf"
  },
  {
    id: "doc-6",
    vehicleId: "impreza-2012",
    type: "Export Certificate",
    issuedDate: "2023-10-15T11:30:00Z",
    issuingAuthority: "Sapporo Transport Bureau",
    documentUrl: "/docs/impreza-export-cert.pdf"
  },
  {
    id: "doc-7",
    vehicleId: "swift-2024",
    type: "Safety Inspection",
    issuedDate: "2025-01-28T12:00:00Z",
    expiryDate: "2026-01-28T12:00:00Z",
    issuingAuthority: "Osaka Inspection Center",
    documentUrl: "/docs/swift-inspection.pdf"
  },
  {
    id: "doc-8",
    vehicleId: "outlander-2019",
    type: "Export Certificate",
    issuedDate: "2024-08-20T09:00:00Z",
    issuingAuthority: "Tokyo Transport Bureau",
    documentUrl: "/docs/outlander-export-cert.pdf"
  },
  {
    id: "doc-9",
    vehicleId: "cx-5-2020",
    type: "Emissions Test",
    issuedDate: "2024-09-01T14:00:00Z",
    expiryDate: "2025-09-01T14:00:00Z",
    issuingAuthority: "Yokohama Environmental Bureau"
  },
  {
    id: "doc-10",
    vehicleId: "rx-2021",
    type: "Safety Inspection",
    issuedDate: "2024-10-05T12:00:00Z",
    expiryDate: "2025-10-05T12:00:00Z",
    issuingAuthority: "Nagoya Inspection Center"
  }
];

export const shipmentDetails: ShipmentDetail[] = [
  {
    id: "ship-1",
    vehicleId: "harrier-2022",
    containerNumber: "OOLU1234567",
    shippingCompany: "Ocean Network Express",
    vesselName: "ONE HAMBURG",
    departureDate: "2025-01-18T06:30:00Z",
    arrivalDate: "2025-02-02T08:00:00Z",
    originPort: "Nagoya",
    destinationPort: "Southampton"
  },
  {
    id: "ship-2",
    vehicleId: "note-2018",
    containerNumber: "MSCU9876543",
    shippingCompany: "Mediterranean Shipping Company",
    vesselName: "MSC CAPELLA",
    departureDate: "2025-01-05T07:00:00Z",
    arrivalDate: "2025-01-20T08:30:00Z",
    originPort: "Yokohama",
    destinationPort: "Tilbury"
  },
  {
    id: "ship-3",
    vehicleId: "vezel-2015",
    containerNumber: "HLCU4567890",
    shippingCompany: "Hapag-Lloyd",
    vesselName: "HAMBURG EXPRESS",
    departureDate: "2024-11-20T07:00:00Z",
    arrivalDate: "2024-12-05T09:00:00Z",
    originPort: "Kobe",
    destinationPort: "Felixstowe"
  },
  {
    id: "ship-4",
    vehicleId: "impreza-2012",
    containerNumber: "NYKU2345678",
    shippingCompany: "Nippon Yusen Kaisha",
    vesselName: "NYK VEGA",
    departureDate: "2023-10-20T08:00:00Z",
    arrivalDate: "2023-11-05T10:30:00Z",
    originPort: "Sapporo",
    destinationPort: "Southampton"
  },
  {
    id: "ship-5",
    vehicleId: "swift-2024",
    containerNumber: "KMTU3456789",
    shippingCompany: "Kawasaki Kisen Kaisha",
    vesselName: "GRACEFUL LEADER",
    departureDate: "2025-01-30T06:00:00Z",
    arrivalDate: "2025-02-15T08:00:00Z",
    originPort: "Osaka",
    destinationPort: "Tilbury"
  },
  {
    id: "ship-6",
    vehicleId: "outlander-2019",
    containerNumber: "OOLU5678901",
    shippingCompany: "Ocean Network Express",
    vesselName: "ONE STORK",
    departureDate: "2024-08-25T07:30:00Z",
    arrivalDate: "2024-09-10T09:15:00Z",
    originPort: "Tokyo",
    destinationPort: "Felixstowe"
  },
  {
    id: "ship-7",
    vehicleId: "cx-5-2020",
    containerNumber: "MSCU6789012",
    shippingCompany: "Mediterranean Shipping Company",
    vesselName: "MSC ARINA",
    departureDate: "2024-09-25T06:00:00Z",
    arrivalDate: "2024-10-10T08:30:00Z",
    originPort: "Yokohama",
    destinationPort: "Southampton"
  },
  {
    id: "ship-8",
    vehicleId: "rx-2021",
    containerNumber: "HLCU7890123",
    shippingCompany: "Hapag-Lloyd",
    vesselName: "ALEXANDRA",
    departureDate: "2024-10-15T07:00:00Z",
    arrivalDate: "2024-10-30T09:00:00Z",
    originPort: "Nagoya",
    destinationPort: "Tilbury"
  },
  {
    id: "ship-9",
    vehicleId: "leaf-2017",
    containerNumber: "NYKU8901234",
    shippingCompany: "Nippon Yusen Kaisha",
    vesselName: "NYK METEOR",
    departureDate: "2024-08-05T08:00:00Z",
    arrivalDate: "2024-08-20T10:00:00Z",
    originPort: "Osaka",
    destinationPort: "Felixstowe"
  },
  {
    id: "ship-10",
    vehicleId: "prius-2016",
    containerNumber: "KMTU9012345",
    shippingCompany: "Kawasaki Kisen Kaisha",
    vesselName: "GRACEFUL LEADER",
    departureDate: "2024-06-15T06:30:00Z",
    arrivalDate: "2024-06-30T08:45:00Z",
    originPort: "Tokyo",
    destinationPort: "Southampton"
  }
];

// Separate data for importer and owner users
const importerVehicles = vehicles.filter(v => v.id !== "harrier-2022" && v.id !== "prius-2016" && v.id !== "outlander-2019");
const ownerVehicles = vehicles.filter(v => v.id === "harrier-2022" || v.id === "prius-2016" || v.id === "outlander-2019");

const importerServiceRecords = serviceRecords.filter(s => importerVehicles.some(v => v.id === s.vehicleId));
const ownerServiceRecords = serviceRecords.filter(s => ownerVehicles.some(v => v.id === s.vehicleId));

const importerProvenanceEvents = provenanceEvents.filter(e => importerVehicles.some(v => v.id === e.vehicleId));
const ownerProvenanceEvents = provenanceEvents.filter(e => ownerVehicles.some(v => v.id === e.vehicleId));

const importerComplianceDocuments = complianceDocuments.filter(d => importerVehicles.some(v => v.id === d.vehicleId));
const ownerComplianceDocuments = complianceDocuments.filter(d => ownerVehicles.some(v => v.id === d.vehicleId));

const importerShipmentDetails = shipmentDetails.filter(s => importerVehicles.some(v => v.id === s.vehicleId));
const ownerShipmentDetails = shipmentDetails.filter(s => ownerVehicles.some(v => v.id === s.vehicleId));

// Functions to get user-specific data
export const getVehiclesForUser = (userRole: AuthUserRole): Vehicle[] => {
  return userRole === "importer" ? importerVehicles : ownerVehicles;
};

export const getServiceRecordsForUser = (userRole: AuthUserRole): ServiceRecord[] => {
  return userRole === "importer" ? importerServiceRecords : ownerServiceRecords;
};

export const getProvenanceEventsForUser = (userRole: AuthUserRole): ProvenanceEvent[] => {
  return userRole === "importer" ? importerProvenanceEvents : ownerProvenanceEvents;
};

export const getComplianceDocumentsForUser = (userRole: AuthUserRole): ComplianceDocument[] => {
  return userRole === "importer" ? importerComplianceDocuments : ownerComplianceDocuments;
};

export const getShipmentDetailsForUser = (userRole: AuthUserRole): ShipmentDetail[] => {
  return userRole === "importer" ? importerShipmentDetails : ownerShipmentDetails;
};

