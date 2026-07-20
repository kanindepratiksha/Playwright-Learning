import { APIRequestContext, expect } from "@playwright/test";
import { config } from "../config/env";
import bookingData from "../testdata/bookingData.json";
export class BookingApi {
  constructor(private request: APIRequestContext) {}
  // Create a new booking
  async createBooking() {
    const response = await this.request.post(
      `${config.restfulBookerBaseUrl}/booking`,
      { data: bookingData }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.bookingid).toBeTruthy();
    expect(responseBody.booking.firstname).toBe(bookingData.firstname);
    expect(responseBody.booking.lastname).toBe(bookingData.lastname);
    return responseBody.bookingid;
  }
  // Get booking details
  async getBooking(bookingId: number) {
    const response = await this.request.get(
      `${config.restfulBookerBaseUrl}/booking/${bookingId}`
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe(bookingData.firstname);
    expect(responseBody.lastname).toBe(bookingData.lastname);
    expect(responseBody.totalprice).toBe(bookingData.totalprice);
    return responseBody;
  }
  // Update booking
  async updateBooking(bookingId: number, token: string) {
    const updatedData = {
      ...bookingData,
      lastname: "Updated",
      totalprice: 800
    };
    const response = await this.request.put(
      `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`
        },
        data: updatedData
      }
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.lastname).toBe(updatedData.lastname);
    return responseBody;
  }
  // Delete booking
  async deleteBooking(bookingId: number, token: string) {
    const response = await this.request.delete(
      `${config.restfulBookerBaseUrl}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`
        }
      }
    );
    expect(response.status()).toBe(201);
  }
}