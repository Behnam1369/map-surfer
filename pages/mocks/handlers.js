import { rest } from "msw";
import { areas } from "./data";
const tehranStreets = areas.find((area) => area.city == "Tehran")?.streets;

export const handlers = [
  rest.get("/search/get-address", (req, res, ctx) => {
    let city = areas[Math.floor(Math.random() * areas.length)].city;
    let streets = areas.find((a) => a.city === city).streets;
    let street = streets[Math.floor(Math.random() * streets.length)].name;
    return res(ctx.status(200), ctx.json([city, street]));
  }),
  rest.get("/search/search-address", (req, res, ctx) => {
    let text = req.url.searchParams.get("address");
    console.log();
    let result = [];
    if (tehranStreets) {
      result = tehranStreets.filter((street) =>
        street.name.toLowerCase().includes(text.toLowerCase())
      );
    }
    return res(ctx.status(200), ctx.json(result));
  }),
];
