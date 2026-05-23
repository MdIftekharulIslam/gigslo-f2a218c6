import cleaning from "@/assets/cat-cleaning.jpg";
import furniture from "@/assets/cat-furniture.jpg";
import gardening from "@/assets/cat-gardening.jpg";
import cooking from "@/assets/cat-cooking.jpg";
import handy from "@/assets/cat-handy.jpg";
import baby from "@/assets/cat-baby.jpg";
import pet from "@/assets/cat-pet.jpg";
import delivery from "@/assets/cat-delivery.jpg";
import moving from "@/assets/cat-moving.jpg";

export type Category = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  fromPrice: number;
};

export const categories: Category[] = [
  { slug: "cleaning", name: "Cleaning", image: cleaning, blurb: "Apartments, deep cleans, move-out.", fromPrice: 25 },
  { slug: "furniture-assembly", name: "Furniture assembly", image: furniture, blurb: "IKEA & flatpack — built fast.", fromPrice: 30 },
  { slug: "gardening", name: "Gardening", image: gardening, blurb: "Mowing, trimming, planting.", fromPrice: 28 },
  { slug: "cooking", name: "Cooking", image: cooking, blurb: "Home chefs and meal prep.", fromPrice: 35 },
  { slug: "handyperson", name: "Handyperson", image: handy, blurb: "Mounting, repairs, fixes.", fromPrice: 32 },
  { slug: "babysitting", name: "Babysitting", image: baby, blurb: "Vetted, friendly sitters.", fromPrice: 18 },
  { slug: "pet-sitting", name: "Pet sitting", image: pet, blurb: "Walks, feeding, overnight stays.", fromPrice: 15 },
  { slug: "deliveries", name: "Deliveries", image: delivery, blurb: "Same-day local pickups.", fromPrice: 12 },
  { slug: "moving-help", name: "Moving help", image: moving, blurb: "Boxes, lifting, the whole move.", fromPrice: 40 },
];
