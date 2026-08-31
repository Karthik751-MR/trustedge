export const mockStats = {
  todayVerifications: 1247,
  fraudsDetected: 23,
  moneySaved: 247000,
  activeUsers: 428,
  successRate: 98.2,
  avgResponseTime: 2.3,
};

export const mockInstitutions = [
  { name: "Ranchi University", certificates: 5420, verified: true },
  { name: "BIT Mesra", certificates: 3890, verified: true },
  { name: "XLRI Jamshedpur", certificates: 2156, verified: false },
  { name: "ISM Dhanbad", certificates: 1987, verified: true },
];

export const fraudHotspots = [
  { city: "Ranchi", lat: 23.3441, lng: 85.3096, intensity: 8 },
  { city: "Jamshedpur", lat: 22.8046, lng: 86.2029, intensity: 5 },
  { city: "Dhanbad", lat: 23.7957, lng: 86.4304, intensity: 3 },
];
