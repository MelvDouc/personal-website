import { Observable } from "reactfree-jsx";
import cssClasses from "./Dropdown.module.scss";

export default function Dropdown({ link, links }: {
  link: HTMLAnchorElement;
  links: HTMLAnchorElement[];
}) {
  const visibilityObs = new Observable(false);
  link.onclick = (e) => {
    e.preventDefault();
    visibilityObs.value = !visibilityObs.value;
  };

  return (
    <div
      className={cssClasses.dropdown}
      $init={(element) => {
        document.addEventListener("click", ({ target }) => {
          if (target instanceof Node && !element.contains(target))
            visibilityObs.value = false;
        });
      }}
    >
      {link}
      <ul
        classes={{
          [cssClasses.dropdownList]: true,
          [cssClasses.visible]: visibilityObs
        }}
      >
        {links.map((link) => (
          <li onclick={() => visibilityObs.value = false}>
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}