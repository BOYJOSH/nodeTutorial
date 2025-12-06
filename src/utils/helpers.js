// create a function that generate state security number 
export function generateStateSecurityNumber() {
    // generate a random number between 1000000000 and 9999999999
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    // convert the number to a string
    const randomNumberString = randomNumber.toString();
    // return the string
    return randomNumberString;
}


export function generateAccountNumberFromPhoneNumber(phone) {
  if (!phone) return null;

  // remove non-digits
  phone = phone.replace(/\D/g, '');

  // remove +234 or 234
  if (phone.startsWith('234')) phone = phone.slice(3);

  // remove leading 0
  if (phone.startsWith('0')) phone = phone.slice(1);

  // now phone should start with 7/8/9 and be 10 digits
  return phone;
}
