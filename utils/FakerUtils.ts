import { faker } from '@faker-js/faker';

export class FakerUtils {
    static getUser() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }
}