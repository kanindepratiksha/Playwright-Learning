import { test } from "@playwright/test";
import { BookingApi } from "../../api/BookingApi";
import { AuthApi } from "../../api/AuthApi";
test("Verify Booking CRUD Operations", async ({ request }) => {
  const authApi = new AuthApi(request);
  const bookingApi = new BookingApi(request);
  let token: string;
  let bookingId: number;
  await test.step("Generate authentication token", async () => {
    token = await authApi.generateToken();
  });
  await test.step("Create booking", async () => {
    bookingId = await bookingApi.createBooking();
  });
  await test.step("Retrieve booking details", async () => {
    await bookingApi.getBooking(bookingId);
  });
  await test.step("Update booking details", async () => {
    await bookingApi.updateBooking(bookingId, token);
  });
  await test.step("Delete booking", async () => {
    await bookingApi.deleteBooking(bookingId, token);
  });
});