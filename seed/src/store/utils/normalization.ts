/**
|--------------------------------------------------
| Here comes all normalization functions than can be
| used in forms for examples
|--------------------------------------------------
*/
// Example
export function formatBankAccount(value: string): string {
  // const clearValue = extractNumber(value);
  if (!value) return '';
  let clearValue = value.replace(/\s+/g, '');
  clearValue = clearValue.toUpperCase();
  let output = '';
  output += `${clearValue.slice(0, 4)}`;
  if (clearValue.length > 4) {
    output += ` ${clearValue.slice(4, 8)}`;
  }
  if (clearValue.length > 8) {
    output += ` ${clearValue.slice(8, 12)}`;
  }
  if (clearValue.length > 12) {
    output += ` ${clearValue.slice(12, 16)}`;
  }
  if (clearValue.length > 16) {
    output += ` ${clearValue.slice(16)}`;
  }

  return output;
}
export default formatBankAccount;

export const formatPrice = (value, unit = '%', decimal = 2) => {
  return value.toFixed(decimal) + unit;
};

export const formatPercent = (value, decimal = 2) => {
  return formatPrice(value, '%', decimal);
};

export const formatMobileLink = value => {
  return value.replace(/[^+0-9]/g, '');
};

export const formatEmail = value => {
  if (!value) return '';
  let clearValue = value.replace(/\s+/g, '');
  clearValue = clearValue.toLowerCase();
  return clearValue;
};
