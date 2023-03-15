import { Observable } from "reactfree-jsx";
import cssClasses from "./Dropdown.module.scss";

export default function Dropdown({ children }: {
  children?: HTMLElement[];
}) {
  const [summary, content] = children!;
  const isOpen = new Observable(false);

  return (
    <details
      className={cssClasses.dropdown}
      open={isOpen}
      $init={(element) => {
        document.addEventListener("click", ({ target }) => {
          if (target instanceof Node && element !== target && !element.contains(target))
            isOpen.value &&= false;
        });
      }}
    >
      <summary>{summary}</summary>
      <div
        className={cssClasses.dropdownContent}
        onclick={() => isOpen.value &&= false}
      >
        {content}
      </div>
    </details>
  );
}