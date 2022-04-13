export interface Change {
  amount: number;
  base: string;
  date: Date;
  rates: {
    GBP: number;
    USD: number;
  };
}

export interface Rate {
  [key: string]: any;
  [key: number]: any;
}

export interface Historical {
  amount: number;
  base: string;
  start_date: Date;
  end_date: Date;
  rates: Rate [];
}
