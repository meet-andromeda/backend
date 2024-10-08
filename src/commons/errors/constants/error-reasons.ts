const errorReasons = {
  documentNumberAlreadyUsed: 'document_number_already_used',
  emailAlreadyUsed: 'email_already_used',
  emailAlreadyVerified: 'email_already_verified',
  emailVerificationNotFound: 'email_verification_not_found',
  invalidParams: 'invalid_params',
  invalidVerificationCode: 'invalid_verification_code',
  userNotFound: 'user_not_found',
} as const;

export default errorReasons;
