export interface Campaign {
  campaignId: number;
  userId: string;
  state: string;
  district: string;
  availableDays: DayOfWeek[];
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  startDate: string;
  endDate: string;
  targetCustomer: string;
  totalCoupons: number;
  redeemedCoupons: number;
  inProgressCoupons: number;
  coupon: Coupon;
}

export interface Coupon {
  couponId: number;
  title: string;
  store: string;
  image: string;
  shortDescription: string;
  conditions: string;
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
