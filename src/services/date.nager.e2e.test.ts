import request from "supertest";

const PUBLIC_HOLIDAYS_API_URL = "https://date.nager.at/api/v3"; // swagger https://date.nager.at/swagger/index.html

describe("PUBLIC HOLIDAYS API", () => {
  describe("/AvailableCountries", () => {
    test("should return 200 and array of available countries", async () => {
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        "/AvailableCountries"
      );

      expect(status).toEqual(200);
      expect(Array.isArray(body)).toBeTruthy();

      body?.forEach((country: any) =>
        expect(country).toEqual({
          countryCode: expect.any(String),
          name: expect.any(String),
        })
      );
    });
  });

  describe("/CountryInfo", () => {
    test("should return 404 if wrong country code", async () => {
      const countryCode = "wrong-country-code";
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/CountryInfo/${countryCode}`
      );

      expect(status).toEqual(404);

      expect(body).toEqual({
        status: 404,
        type: expect.any(String),
        title: "Not Found",
        traceId: expect.any(String),
      });
    });

    test("should return 200 and country info", async () => {
      const countryCode = "GB";
      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/CountryInfo/${countryCode}`
      );

      expect(status).toEqual(200);
      expect(body).toEqual({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode,
        region: expect.any(String),
        borders: expect.any(Array),
      });
    });
  });
});
