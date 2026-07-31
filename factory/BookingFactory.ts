import { faker } from "@faker-js/faker";
export class BookingFactory {
    static createBooking() {
        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({
                min: 100,
                max: 5000
            }),
            depositpaid: faker.datatype.boolean(),
            bookingdates: {
                checkin: faker.date.future().toISOString().split("T")[0],
                checkout: faker.date.future({
                    years: 1
                }).toISOString().split("T")[0]
            },
            additionalneeds: faker.helpers.arrayElement([
                "Breakfast",
                "Lunch",
                "Dinner"
            ])
        };
    }
}