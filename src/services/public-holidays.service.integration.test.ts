import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { SUPPORTED_COUNTRIES } from "../config";

describe("public-holidays.service (integration)", () => {
  describe("getListOfPublicHolidays", () => {
    it("should throw error if validateInput throws an error", async () => {
      const year = 2007;
      const country = 'wrong-country';
      await expect(
        getListOfPublicHolidays(year, country)
      ).rejects.toThrow(new Error(`Country provided is not supported, received: ${country}`));
    });

    it("should return array of shortened holidays", async () => {
      const year = new Date().getFullYear();
      const country = SUPPORTED_COUNTRIES[0];
      const responce = await getListOfPublicHolidays(year, country);

      responce.forEach((holiday) =>
        expect(holiday).toEqual({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        })
      );
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should throw error if validateInput throws an error", async () => {
      const country = 'wrong-country';

      await expect(
        checkIfTodayIsPublicHoliday(country)
      ).rejects.toThrow(new Error(`Country provided is not supported, received: ${country}`));
    });

    it("should return boolean if request does not fail", async () => {
      const country = SUPPORTED_COUNTRIES[0];
      const responce = await checkIfTodayIsPublicHoliday(country);

      expect(typeof responce === 'boolean').toBeTruthy();
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should throw error if validateInput throws an error", async () => {
      const country = 'wrong-country';
      await expect(
        getNextPublicHolidays(country)
      ).rejects.toThrow(new Error(`Country provided is not supported, received: ${country}`));
    });

    it("should return array of shortened holidays", async () => {
      const country = SUPPORTED_COUNTRIES[0];
      const responce = await getNextPublicHolidays(country);

      responce.forEach((holiday) =>
        expect(holiday).toEqual({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
        })
      );
    });
  });
});
