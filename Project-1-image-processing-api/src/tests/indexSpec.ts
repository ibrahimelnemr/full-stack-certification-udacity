import supertest from "supertest";
import app from "../index";
import { validateImg, createResizedImg } from "../utils";

// test for endpoint
const request = supertest(app);

// test for image processing

describe("Test endpoint response", () => {
  it("gets api endpoint at /api/images", async (done) => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200&height=300",
    );
    expect(response.status).toBe(200);
    done();
  });
});

describe("Test image resizing function", () => {
  it("Throws error if invalid file name", async () => {
    const imgValidation = await validateImg("fj.jpg", 200, 300);

    expect(imgValidation).toBe("Image requested does not exist.");
  });

  it("Throws error if invalid width", async () => {
    const imgValidation = await validateImg("fjord.jpg", -200, 300);

    expect(imgValidation).toBe("Invalid width value.");
  });

  it("Throws error if invalid height", async () => {
    const imgValidation = await validateImg("fjord.jpg", 200, -300);

    expect(imgValidation).toBe("Invalid height value.");
  });
});

describe("Processes image without error", () => {
  it("Processes image successfully", () => {
    expect(async () => {
      await createResizedImg("fjord.jpg", 300, 200, "images/full/fjord.jpg");
    }).not.toThrow();
  });
});
