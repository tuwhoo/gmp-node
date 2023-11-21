import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import * as helpers from "../helpers";
import { PublicHoliday } from "../types";

const publicHolidayList = [
  {
    date: "2023-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"],
  },
  {
    date: "2023-01-02",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-ENG", "GB-WLS"],
    launchYear: null,
    types: ["Public"],
  },
];

describe("public-holidays.service (unit tests)", () => {
  describe("getListOfPublicHolidays", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw error if validateInput throws an error", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      await expect(
        getListOfPublicHolidays(2020, "wrong-country")
      ).rejects.toThrow(new Error("Some error"));
    });

    it("should return empty array if request fails", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.reject({ status: 400 })
      );

      const responce = await getListOfPublicHolidays(2020, "GB");

      expect(responce).toEqual([]);
    });

    it("should return empty array if request return wrong data", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ data: null })
      );

      const responce = await getListOfPublicHolidays(2020, "GB");

      expect(responce).toEqual([]);
    });

    it("should return array if shortened holidays", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );

      jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(
        (holiday: PublicHoliday) => ({
          name: holiday.name,
          localName: holiday.localName,
          date: holiday.date,
        })
      );

      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ data: publicHolidayList })
      );

      const responce = await getListOfPublicHolidays(2023, "GB");

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
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw error if validateInput throws an error", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      await expect(
        checkIfTodayIsPublicHoliday("wrong-country")
      ).rejects.toThrow(new Error("Some error"));
    });

    it("should return false if request fails", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.reject({ status: 400 })
      );

      const responce = await checkIfTodayIsPublicHoliday("GB");

      expect(responce).toEqual(false);
    });

    it("should return empty array if request return wrong status", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ status: 400 })
      );

      const responce = await checkIfTodayIsPublicHoliday("GB");

      expect(responce).toEqual(false);
    });

    it("should return true if request return correct status", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );

      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ status: 200 })
      );

      const responce = await checkIfTodayIsPublicHoliday("GB");

      expect(responce).toEqual(true);
    });
  });

  describe("getNextPublicHolidays", () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw error if validateInput throws an error", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(() => {
        throw new Error("Some error");
      });

      await expect(
        getNextPublicHolidays("wrong-country")
      ).rejects.toThrow(new Error("Some error"));
    });

    it("should return empty array if request fails", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.reject({ status: 400 })
      );

      const responce = await getNextPublicHolidays("GB");

      expect(responce).toEqual([]);
    });

    it("should return empty array if request return wrong data", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );
      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ data: null })
      );

      const responce = await getNextPublicHolidays("GB");

      expect(responce).toEqual([]);
    });

    it("should return array if shortened holidays", async () => {
      jest.spyOn(helpers, "validateInput").mockImplementationOnce(
        () => true
      );

      jest.spyOn(helpers, "shortenPublicHoliday").mockImplementation(
        (holiday: PublicHoliday) => ({
          name: holiday.name,
          localName: holiday.localName,
          date: holiday.date,
        })
      );

      jest.spyOn(axios, "get").mockImplementation(() =>
        Promise.resolve({ data: publicHolidayList })
      );

      const responce = await getNextPublicHolidays("GB");

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
