export type Task = {
  id: string;
  title: string;
  category: string;
  area: string;
  budget: number;
  when: string;
  bids: number;
};

export const sampleTasks: Task[] = [
  { id: "t1", title: "Assemble IKEA Pax wardrobe", category: "Furniture assembly", area: "Kallio, Helsinki", budget: 80, when: "This weekend", bids: 4 },
  { id: "t2", title: "Weekly apartment cleaning (60 m²)", category: "Cleaning", area: "Punavuori, Helsinki", budget: 55, when: "Recurring", bids: 7 },
  { id: "t3", title: "Walk our golden retriever (Mon–Fri)", category: "Pet sitting", area: "Espoo Centre", budget: 20, when: "Weekdays 4pm", bids: 9 },
  { id: "t4", title: "Help moving 1-bedroom apartment", category: "Moving help", area: "Tampere", budget: 140, when: "Sat 10am", bids: 3 },
  { id: "t5", title: "Trim hedge & mow back garden", category: "Gardening", area: "Turku", budget: 70, when: "Next week", bids: 5 },
  { id: "t6", title: "Mount 65″ TV on living room wall", category: "Handyperson", area: "Vantaa", budget: 60, when: "Tomorrow", bids: 6 },
  { id: "t7", title: "Evening babysitting for 2 kids", category: "Babysitting", area: "Oulu", budget: 45, when: "Fri 6–10pm", bids: 8 },
  { id: "t8", title: "Pick up groceries from K-Citymarket", category: "Deliveries", area: "Jätkäsaari, Helsinki", budget: 18, when: "Today", bids: 2 },
];
