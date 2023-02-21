import { Observable } from "reactfree-jsx";
import Link from "../Link.jsx";
import "./Dropdown.scss";

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
    <div className="dropdown" $init={(dropdown) => {
      document.addEventListener("click", ({ target }) => {
        if (target !== dropdown && (!(target instanceof Node) || !dropdown.contains(target)))
          visibilityObs.setValue(false);
      });
    }}>
      {link}
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