// create a function that generate state security number 
export function generateStateSecurityNumber() {
    // generate a random number between 1000000000 and 9999999999
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    // convert the number to a string
    const randomNumberString = randomNumber.toString();
    // return the string
    return randomNumberString;
}


export function generateAccountNumberFromPhoneNumber(phone){
    if (!phone) return null;
    if(phone.startsWith('234')){
        return phone.slice(3);
    }
    if(phone.startsWith('+234')){
        return phone.slice(4);
    }
    if(phone.startsWith('0')){
        return phone.slice(1);
    }
    return phone;
}
