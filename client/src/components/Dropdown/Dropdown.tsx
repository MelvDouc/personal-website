import { Observable } from "reactfree-jsx";
import Link from "../Link.jsx";
import cssClasses from "./Dropdown.module.scss";

export default function Dropdown({ link, links }: {
  link: HTMLAnchorElement;
  links: {
    href: string;
    text: string;
  }[];
}) {
  const visibilityObs = new Observable(false);
  link.onclick = (e) => {
    e.preventDefault();
    visibilityObs.updateValue(prev => !prev);
  };

  return (
    <div className={cssClasses.dropdown} $init={(element) => {
      document.addEventListener("click", ({ target }) => {
        if (target instanceof Node && !element.contains(target))
          visibilityObs.setValue(false);
      });
    }}>
      {link}
      <ul
        classNames={[cssClasses.dropdownList, cssClasses.hidden]}
        $init={element => {
          visibilityObs.subscribe((isVisible) => {
            isVisible
              ? element.classList.remove(cssClasses.hidden)
              : element.classList.add(cssClasses.hidden);
          });
        }}
      >
        {links.map((link) => (
          <li onclick={() => visibilityObs.setValue(false)}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}