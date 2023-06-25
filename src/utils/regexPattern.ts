const regexPattern = {
  Letters: /^[A-Za-z]*$/,
  LettesAndNumbers: /^[A-Za-z0-9]*$/,
  LettersAndSpaces: /^[A-Za-z ]*$/,
  LettersAndSpacesAndDashes: /^[A-Za-z -]*$/,
  LettersAndSpacesAndDashesAndNumbers: /^[A-Za-z0-9 -]*$/,
  LettersAndSpacesAndUNDERSCORE: /^[A-Za-z _]*$/,
  Numbers: /^[0-9]*$/,
  NumbersAndSpaces: /^[0-9 ]*$/,
  NumbersAndDot: /^[0-9.]*$/,
  NumbersAndSpacesAndDashes: /^[0-9 -]*$/,
  Email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  Phone: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  Date: /^\d{4}([./-])\d{2}\1\d{2}$/,

  IP: /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S{8,99}$/,
};

export default regexPattern;
