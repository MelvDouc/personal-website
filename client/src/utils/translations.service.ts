import { Observable } from "reactfree-jsx";
import { Language, Translation } from "../type.js";

const translations = await getTranslations();
export const languageObs = new Observable<Language>();

async function getTranslations() {
  const response = await fetch("/data/translations.json");
  return await response.json() as Record<string, Translation>;
}

export function updateTranslations(language: Language) {
  document.querySelectorAll("[data-trl]").forEach((element) => {
    const key = element.getAttribute("data-trl");
    if (key !== null && key in translations)
      element.innerHTML = translations[key][language];
  });
}

export function trl(key: string): Text {
  const textNode = document.createTextNode("");
  languageObs.subscribe((language) => textNode.textContent = translations[key][language]);
  return textNode;
}