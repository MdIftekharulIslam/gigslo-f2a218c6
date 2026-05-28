export type Task = {
  id: string;
  title: string;
  category: string;
  area: string;
  budget: number;
  when: string;
  bids: number;
  /** Approx coordinates (Finland) used for distance-based filtering in the explore page. */
  lat: number;
  lng: number;
};

export const sampleTasks: Task[] = [
  { id: "t1", title: "Assemble IKEA Pax wardrobe", category: "Furniture assembly", area: "Kallio, Helsinki", budget: 80, when: "This weekend", bids: 4, lat: 60.1843, lng: 24.9509 },
  { id: "t2", title: "Weekly apartment cleaning (60 m²)", category: "Cleaning", area: "Punavuori, Helsinki", budget: 55, when: "Recurring", bids: 7, lat: 60.1612, lng: 24.9402 },
  { id: "t3", title: "Walk our golden retriever (Mon–Fri)", category: "Pet sitting", area: "Espoo Centre", budget: 20, when: "Weekdays 4pm", bids: 9, lat: 60.2052, lng: 24.6522 },
  { id: "t4", title: "Help moving 1-bedroom apartment", category: "Moving help", area: "Tampere", budget: 140, when: "Sat 10am", bids: 3, lat: 61.4978, lng: 23.7610 },
  { id: "t5", title: "Trim hedge & mow back garden", category: "Gardening", area: "Turku", budget: 70, when: "Next week", bids: 5, lat: 60.4518, lng: 22.2666 },
  { id: "t6", title: "Mount 65″ TV on living room wall", category: "Handyperson", area: "Vantaa", budget: 60, when: "Tomorrow", bids: 6, lat: 60.2934, lng: 25.0378 },
  { id: "t7", title: "Evening babysitting for 2 kids", category: "Babysitting", area: "Oulu", budget: 45, when: "Fri 6–10pm", bids: 8, lat: 65.0121, lng: 25.4651 },
  { id: "t8", title: "Pick up groceries from K-Citymarket", category: "Deliveries", area: "Jätkäsaari, Helsinki", budget: 18, when: "Today", bids: 2, lat: 60.1587, lng: 24.9210 },
  { id: "t9", title: "Deep clean studio before move-out", category: "Cleaning", area: "Töölö, Helsinki", budget: 95, when: "Sun morning", bids: 1, lat: 60.1820, lng: 24.9215 },
  { id: "t10", title: "Assemble baby cot & changing table", category: "Furniture assembly", area: "Pasila, Helsinki", budget: 50, when: "This week", bids: 0, lat: 60.1986, lng: 24.9335 },
];

/** Distance between two lat/lng pairs in km (haversine). */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
