import matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "./server";

expect.extend(matchers);

beforeAll(() => server.listen());
afterAll(() => server.listen());
afterEach(() => server.resetHandlers());
