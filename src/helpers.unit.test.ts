import { SUPPORTED_COUNTRIES } from "./config";

import { validateInput, shortenPublicHoliday } from "./helpers";

const publicHoliday = {
  date: "2023-01-01",
  localName: "New Year's Day",
  name: "New Year's Day",
  countryCode: "GB",
  fixed: false,
  global: false,
  counties: ["GB-NIR"],
  launchYear: null,
  types: ["Public"],
};

describe("helpers", () => {
  describe("validateInput", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw error if country is not supported", () => {
      const country = "random-country";
      expect(() => validateInput({ country })).toThrow(
        `Country provided is not supported, received: ${country}`
      );
    });

    it("should throw error if it is wrong year", () => {
      const year = 2007;
      jest.spyOn(Date.prototype, "getFullYear").mockImplementationOnce(
        () => 2023
      );
      expect(() => validateInput({ year })).toThrow(
        `Year provided not the current, received: ${year}`
      );
    });

    it("should return true if country is supported", () => {
      const country = SUPPORTED_COUNTRIES[0];
      expect(validateInput({ country })).toBe(true);
    });

    it("should return true if it is correct year", () => {
      const year = 2023;
      jest.spyOn(Date.prototype, "getFullYear").mockImplementationOnce(
        () => year
      );
      expect(validateInput({ year })).toBe(true);
    });

    it("should return true if there are no country and year specified", () => {
      expect(validateInput({})).toBe(true);
    });
  });

  describe("shortenPublicHoliday", () => {
    it("should return shorten public holiday", () => {
      expect(shortenPublicHoliday(publicHoliday)).toEqual({
        name: publicHoliday.name,
        localName: publicHoliday.localName,
        date: publicHoliday.date,
      });
    });
  });
});
