import { createDateString, dayMonthExtractor, getCategoryColor, hashString, trimFields } from "@/src/utils/misc";

describe.each([
  ["2023-01-01T00:00:00Z", "1 January"],
  ["2023-02-14T00:00:00Z", "14 February"],
  ["2023-03-31T00:00:00Z", "31 March"],
  ["2023-04-30T00:00:00Z", "30 April"],
])(
  "dayMonthExtractor returns correct day and month for %s",
  (dateString, expectedOutput) => {
    test(`returns ${expectedOutput}`, () => {
      expect(dayMonthExtractor(dateString)).toBe(expectedOutput);
    });
  },
);

describe.each([
 ["test"],
  ["t"],
  ["lets get going shall we?"],
])("hashString returns a non-negative integer %s", (str) => {
  test(`returns a non-negative integer for ${str}`, () => {
    const result = hashString(str);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("trim fields", () => {
    test("trimFields throws error when object is null", () => {
        expect(()=>trimFields(null)).toThrow("Cannot trim fields of null object");
    });
    test("trimFields throws error when value of any key is null", () => {
        expect(() => trimFields({ key1: null })).toThrow("Value of key key1 is null or not a string");
    });
    test("trimFields throws error when value of any key is not a string", () => {
        expect(() => trimFields({ key1: 123 })).toThrow("Value of key key1 is null or not a string");
    });
});

describe.each([
 ["test"],
  ["t"],
  ["lets get going shall we?"],
])("getCategoryColor returns a string for %s", (str) => {
  test(`returns a string for ${str}`, () => {
    const result = getCategoryColor(["red", "green", "blue"], str);
    expect(typeof result).toBe("string");
  });
});

test.todo("category color null check");
describe("createDateString", () => {
  test("returns date in YYYY-MM-DD format", () => {
    const date = new Date("2023-01-01T00:00:00Z");
    expect(createDateString(date)).toBe("2023-01-01");
  })});