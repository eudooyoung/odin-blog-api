const validateErrorMessags = {
  // common
  emptyErr: "must be present",
  duplicateErr: "already in use",
  alphaErr: "must only contain alphabet characters",
  hangulAlphaNumericErr: "must only contain 한글, alphabet or numbers",

  // signup
  emailErr: "must be email",
  usernameMinLengthErr: "must be at least 6 characters",
  usernameMaxLengthErr: "must be 30 or less characters",

  passwordMinLengthErr: "must be at least 8 characters ",
  passwordMaxLengthErr: "must be 72 or less characters ",
  passwordUppercaseErr: "must contain an uppercase letter",
  passwordNumericErr: "must contain a number",
  passwordSpecialCharacterErr: "must contain a special character",
  passwordConfirmNotMatchErr: "password don't match",

  nameLengthErr: "must be between 1 and 15 characters",
};

export default validateErrorMessags;
