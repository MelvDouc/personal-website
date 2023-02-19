import { Observable } from "reactfree-jsx";
import Link from "../Link.jsx";
import "./Dropdown.scss";

export default function Dropdown({ mainText, mainHref, links }: {
  mainText: string;
  mainHref: string;
  links: {
    href: string;
    text: string;
  }[];
}) {
  const visibilityObs = new Observable(false);

  return (
    <div className="dropdown" $init={(dropdown) => {
      document.addEventListener("click", ({ target }) => {
        if (target !== dropdown && (!(target instanceof Node) || !dropdown.contains(target)))
          visibilityObs.setValue(false);
      });
    }}>
      <a
        href={mainHref}
        onclick={(e) => {
          e.preventDefault();
          visibilityObs.updateValue(isVisible => !isVisible);
        }}
      >{mainText}</a>
      <ul
        className="dropdown-list d-none"
        $init={element => {
          visibilityObs.subscribe((isVisible) => {
            isVisible
              ? element.classList.remove("d-none")
              : element.classList.add("d-none");
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