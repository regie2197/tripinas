import { faker } from '@faker-js/faker';

function generateInvalidEmail() {
  const email = faker.internet.email();
  const invalidType = faker.helpers.arrayElement(['missingAt', 'missingDomain', 'missingDot']);

  if (invalidType === 'missingAt') {
    // remove the @ symbol
    return email.replace(/@/, '');
  }
  if (invalidType === 'missingDomain') {
    // cut off everything after @
    return email.split('@')[0];
  }
  if (invalidType === 'missingDot') {
    // replace "." with nothing after the @ part
    const [local, domain] = email.split('@');
    return `${local}@${domain.replace(/\./g, '')}`;
  }

  return email; // fallback, though logic ensures it’s invalid

}

export { generateInvalidEmail };