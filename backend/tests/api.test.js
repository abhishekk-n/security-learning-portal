
import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("Health API returns success", async () => {
  const response = await request(app)
    .get("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "success");
});

test("Resources API returns data", async () => {
  const response = await request(app)
    .get("/api/resources");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(Array.isArray(response.body.data));
});

test("OWASP search returns matching resources", async () => {
  const response = await request(app)
    .get("/api/resources?search=OWASP");

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);

  assert.ok(
    response.body.data.every((resource) =>
      `${resource.title} ${resource.description}`
        .toLowerCase()
        .includes("owasp")
    )
  );
});

test("Invalid resource type returns 400", async () => {
  const response = await request(app)
    .get("/api/resources?type=INVALID");

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("Unknown API route returns 404", async () => {
  const response = await request(app)
    .get("/api/unknown");

  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
});


test("Category filter returns matching resources", async () => {
  const response = await request(app)
    .get("/api/resources")
    .query({ category: "Cloud Security" });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);

  assert.ok(
    response.body.data.every(
      (resource) => resource.category === "Cloud Security"
    )
  );
});

test("Combined search and type filters work", async () => {
  const response = await request(app)
    .get("/api/resources")
    .query({ search: "OWASP", type: "BOOK" });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);

  assert.ok(
    response.body.data.every(
      (resource) =>
        resource.type === "BOOK" &&
        `${resource.title} ${resource.description}`
          .toLowerCase()
          .includes("owasp")
    )
  );
});

test("Invalid category returns 400", async () => {
  const response = await request(app)
    .get("/api/resources")
    .query({ category: "Unknown" });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("Search longer than 100 characters returns 400", async () => {
  const response = await request(app)
    .get("/api/resources")
    .query({ search: "a".repeat(101) });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
});

test("Search with no matches returns empty array", async () => {
  const response = await request(app)
    .get("/api/resources")
    .query({ search: "unlikely-resource-xyz-12345" });

  assert.equal(response.status, 200);
  assert.equal(response.body.count, 0);
  assert.deepEqual(response.body.data, []);
});
