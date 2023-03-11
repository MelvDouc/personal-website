import { getCvTranslations as getApiTranslations } from "./api.js";
import { CvTranslation } from "../type.js";

const TRANSLATIONS_STORE_NAME = "translations";

function getCvDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("cv");
    let db: IDBDatabase;

    request.onerror = reject;
    request.onupgradeneeded = () => {
      db = request.result;
      if (!db.objectStoreNames.contains(TRANSLATIONS_STORE_NAME))
        db.createObjectStore(TRANSLATIONS_STORE_NAME, {
          autoIncrement: false,
          keyPath: "id"
        });
    };
    request.onsuccess = () => {
      db ??= request.result;
      resolve(db);
    };
  });
}

function getIndexedDBTranslations(db: IDBDatabase): Promise<CvTranslation[]> {
  return new Promise((resolve) => {
    const request = db
      .transaction(TRANSLATIONS_STORE_NAME, "readonly")
      .objectStore(TRANSLATIONS_STORE_NAME)
      .getAll();
    request.onerror = () => resolve([]);
    request.onsuccess = () => resolve(request.result);
  });
}

function insertTranslations(db: IDBDatabase, translations: CvTranslation[]): Promise<CvTranslation[]> {
  return new Promise((resolve, reject) => {
    const request = db.transaction(TRANSLATIONS_STORE_NAME, "readwrite");
    translations.forEach(({ id, en, fr }) => {
      request.objectStore(TRANSLATIONS_STORE_NAME).add({ id, en, fr });
    });
    request.onerror = reject;
    request.oncomplete = () => resolve(translations);
  });
}

export async function getCvTranslations(): Promise<CvTranslation[]> {
  const cvDatabase = await getCvDatabase();
  const translations = await getIndexedDBTranslations(cvDatabase);

  if (translations.length) {
    return translations;
  }

  const apiTranslations = await getApiTranslations();
  return insertTranslations(cvDatabase, apiTranslations ?? []);
}
