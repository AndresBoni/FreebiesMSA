export interface Coupon {
  id: number;
  title: string;
  store: string;
  imageUrl?: string;
  shortDescription: string;
  conditions?: string;
  location: {
    state: string;
    district: string;
  };
  status: "active" | "paused";
  targetCustomer: "new" | "returning" | "all";
  redeemed: number;
  available: number;
  inProgress: number;
  availableDays?: DayOfWeek[];
  availableHours?:
    | {
        start: Time;
        end: Time;
      }
    | "all-day";
}

//Valid days of the week
type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"
  | "all-week";

// Valid time format (HH:MM)
type Time = `${number}:${number}` | "all-day";
