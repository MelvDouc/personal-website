import { Observable } from "reactfree-jsx";
import cssClasses from "./ResumePage.module.scss";
import CvSkillsList from "@components/CvSkillsList/CvSkillsList.jsx";
import { getCvTranslations } from "@utils/cv-translations.js";
import { CvTranslation } from "../../type.js";

export default async function ResumePage() {
  const language = new Observable<CvLang>("en");
  const translations = (await getCvTranslations()).reduce((acc, { id, en, fr }) => {
    acc[id] = { en, fr };
    return acc;
  }, {} as Record<string, Pick<CvTranslation, "en" | "fr">>);

  return (
    <div
      className={cssClasses.cv}
      $init={(element) => {
        language.subscribe((language) => {
          element.querySelectorAll("[data-trl]").forEach((translatable) => {
            const key = translatable.getAttribute("data-trl") as keyof typeof translations;
            translatable.innerHTML = translations[key][language];
          });
        });
        language.notify();
      }}
    >
      <section className={cssClasses.pageTop}>
        <h1 data-trl="0"></h1>
        <h2 data-trl="1"></h2>
        <select
          className={cssClasses.langSelect}
          $init={(select) => {
            select.addEventListener("input", () => {
              language.value = select.value as CvLang;
            });
          }}
        >
          <option value="en" selected>English</option>
          <option value="fr">français</option>
        </select>
      </section>

      <section className={cssClasses.pageBottom}>
        <article className={cssClasses.picContainer}>
          <img src="/img/cv/melvin-doucet.jpg" alt="Melvin Doucet" />
        </article>

        <article className={cssClasses.contactDetail}>
          <h3 data-trl="2"></h3>
          <dl>
            <dt>☎️</dt>
            <dd>+33.6.09.21.97.14</dd>
            <dt>@</dt>
            <dd>melv.douc@gmail.com</dd>
            <dt><img src="/img/cv/github-logo.png" alt="GitHub Logo" /></dt>
            <dd><a href="https://github.com/MelvDouc">https://github.com/MelvDouc</a></dd>
            <dt><img src="/img/favicon.png" alt="Logo" /></dt>
            <dd><a href="https://www.melvin-doucet.com">https://www.melvin-doucet.com</a></dd>
            <dt>✉️</dt>
            <dd>
              <address>
                <p>43 rue de l'ancien hôpital</p>
                <p>57100 Thionville - France</p>
              </address>
            </dd>
          </dl>
        </article>

        <article className={cssClasses.hobbies}>
          <h3 data-trl="28"></h3>
          <ul className={cssClasses.list}>
            <li data-trl="29"></li>
            <li data-trl="30"></li>
            <li data-trl="31"></li>
          </ul>
        </article>

        <article className={cssClasses.skills}>
          <h3 data-trl="3"></h3>
          <CvSkillsList />
        </article>

        <article className={cssClasses.exp}>
          <h3 data-trl="4"></h3>
          <ul className={cssClasses.list}>
            <li>
              <div><span className={cssClasses.date}>15/03/2022</span> <span data-trl="5"></span></div>
              <ul className={cssClasses.subList}>
                <li>Sfeir Luxembourg</li>
              </ul>
            </li>
            <li><span className={cssClasses.date}>02/2019</span> <span data-trl="6"></span></li>
            <li><span className={cssClasses.date}>2016-2017</span> <span data-trl="7"></span></li>
            <li><span className={cssClasses.date}>2013-2016</span> <span data-trl="8"></span></li>
            <li>
              <div><span className={cssClasses.date}>2011-2013</span> <span data-trl="9"></span></div>
              <ul className={cssClasses.subList}>
                <li data-trl="10"></li>
              </ul>
            </li>
          </ul>
        </article>

        <article className={cssClasses.training}>
          <h3 data-trl="11"></h3>
          <ul classNames={[cssClasses.list, cssClasses.col2]}>
            <li>
              <span className={cssClasses.date}>2020-2021</span> <span data-trl="12"></span>
              <ul className={cssClasses.subList}>
                <li data-trl="13"></li>
                <li data-trl="14"></li>
              </ul>
            </li>
            <li><span className={cssClasses.date}>2011-2013</span> <span data-trl="15"></span>
              <ul className={cssClasses.subList}>
                <li data-trl="16"></li>
              </ul>
            </li>
            <li><span className={cssClasses.date}>2009-2011</span> <span data-trl="17"></span>
              <ul className={cssClasses.subList}>
                <li data-trl="18"></li>
                <li data-trl="19"></li>
              </ul>
            </li>
            <li><span className={cssClasses.date}>2009</span> <span data-trl="20"></span>
              <ul className={cssClasses.subList}>
                <li data-trl="21"></li>
              </ul>
            </li>
          </ul>
        </article>

        <article className={cssClasses.languages}>
          <h3 data-trl="22"></h3>
          <ul className={cssClasses.list}>
            <li data-trl="23"></li>
            <li data-trl="24"></li>
            <li data-trl="25"></li>
            <li data-trl="26"></li>
            <li data-trl="27"></li>
          </ul>
        </article>
      </section>
    </div>
  );
}


type CvLang = "en" | "fr";