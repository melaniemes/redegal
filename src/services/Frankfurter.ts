import axios from "axios";
import { Change, Historical } from "@/models/changes";
class FrankFurte {
  change: Change = {
    amount: 0,
    base: "",
    date: new Date(),
    rates: {
      GBP: 0,
      USD: 0,
    },
  };

  historical: Historical = {
    amount: 0,
    base: "",
    start_date: new Date(),
    end_date: new Date(),
    rates: []
  }

  async getChange(): Promise<Change> {
    await axios
      .get("https://www.frankfurter.app/latest?to=EUR,USD")
      .then((response) => {
        this.change = response.data;
      });
    return this.change;
  }

  async getHistoricalChange(period: string): Promise<Historical> {
    await axios
      .get(`https://www.frankfurter.app/${period}?to=USD`)
      .then((response) => {
        this.historical = response.data;
      });
    return this.historical;
  } 
}

export default new FrankFurte();