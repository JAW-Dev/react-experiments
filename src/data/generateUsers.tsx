import { faker } from '@faker-js/faker';
import { User } from '@/types';

const generateFakeUsers = (num: number): User[] => {
	let users: User[] = [];
	for (let i = 0; i < num; i++) {
		const user: User = {
			id: faker.string.uuid(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: faker.internet.email(),
			phoneNumber: faker.phone.number(),
			address: {
				street: faker.location.streetAddress(),
				city: faker.location.city(),
				state: faker.location.state(),
				zipCode: faker.location.zipCode(),
			},
			avatar: faker.image.avatar(),
			bio: faker.person.bio(),
		};
		users.push(user);
	}
	return users;
};

export default generateFakeUsers;