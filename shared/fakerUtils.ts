import { faker } from '@faker-js/faker';

export function generateTestUser() {
  const randomNumber = faker.string.numeric(2);
  const usernameBase = faker.internet.username().slice(0, 8).toLowerCase().replace(/[^a-z0-9]/g, '');
  const username = `${usernameBase}_${randomNumber}`;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const newEmail = faker.internet.email({ firstName: `${firstName}`, lastName: `${lastName}` }).toLowerCase();
  const newUsernameBase = faker.internet.username({ firstName: `${firstName}` }).slice(0, 8).toLowerCase().replace(/[^a-z0-9]/g, '');
  const newUsername = `${newUsernameBase}_${randomNumber}`;
  

  return {
    firstName: firstName,
    lastName: lastName,
    username: username,
    newUsername: newUsername,
    email: faker.internet.email().toLowerCase(),
    password: 'ValidP@ss123',
    newFirstName: faker.person.firstName(),
    newLastName: faker.person.lastName(),
    newEmail: newEmail,
  };
}