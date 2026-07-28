import { bookingSchema } from "./bookingSchema";
export const createBookingSchema = {
    type: "object",
    properties: {
        bookingid: {
            type: "number"
        },
        booking: bookingSchema
    },
    required: [
        "bookingid",
        "booking"
    ]
};