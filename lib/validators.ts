/**
 * Validates Nigerian mobile phone numbers.
 * Supported formats:
 * - 080XXXXXXXX, 081XXXXXXXX, 070XXXXXXXX, 090XXXXXXXX, 091XXXXXXXX (11 digits)
 * - +23480XXXXXXXX, +23481XXXXXXXX, +23470XXXXXXXX, +23490XXXXXXXX, +23491XXXXXXXX
 * - 23480XXXXXXXX (without +)
 */
export function validateNigerianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const nigerianPhoneRegex = /^(?:(?:\+?234)|0)[789][01]\d{8}$/;
  return nigerianPhoneRegex.test(cleanPhone);
}

/**
 * Standardizes any Nigerian phone format to international standard for WhatsApp routing (e.g. 2348012345678)
 */
export function formatToWhatsAppNumber(phone: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, "");
  if (cleanPhone.startsWith("0")) {
    return `234${cleanPhone.slice(1)}`;
  }
  return cleanPhone;
}