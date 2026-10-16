import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

export type CountryOption = {
  iso: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

const names = new Intl.DisplayNames(["fr"], { type: "region" });

function flag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export const countries: CountryOption[] = getCountries()
  .map((iso) => ({
    iso,
    name: names.of(iso) ?? iso,
    callingCode: getCountryCallingCode(iso),
    flag: flag(iso),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

export function findCountry(iso: string) {
  return countries.find((item) => item.iso === iso) ?? null;
}

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function filterCountries(query: string) {
  const q = fold(query.trim().replace(/^\+/, ""));
  if (!q) return countries;
  const exactIso = countries.some((item) => item.iso.toLowerCase() === q);
  const digits = /^\d+$/.test(q);
  return countries.filter((item) => {
    const iso = item.iso.toLowerCase();
    if (iso === q) return true;
    if (digits && (item.callingCode === q || (q.length >= 2 && item.callingCode.startsWith(q)))) return true;
    if (q.length >= 3 && fold(item.name).includes(q)) return true;
    if (!exactIso && !digits && q.length < 3 && fold(item.name).includes(q)) return true;
    return false;
  });
}

export function toInternational(national: string, iso: CountryCode) {
  const code = getCountryCallingCode(iso);
  const compact = national.replace(/[^\d+]/g, "");
  if (!compact) return "";
  let local = compact;
  if (local.startsWith(`+${code}`)) local = local.slice(code.length + 1);
  else if (local.startsWith("+")) {
    const parsed = parsePhoneNumberFromString(local);
    return parsed?.isValid() ? parsed.number : null;
  } else if (local.startsWith("00")) local = local.slice(2);
  else if (local.startsWith(code) && local.length > code.length + 6) local = local.slice(code.length);
  const parsed = parsePhoneNumberFromString(local, iso);
  return parsed?.isValid() ? parsed.number : null;
}
