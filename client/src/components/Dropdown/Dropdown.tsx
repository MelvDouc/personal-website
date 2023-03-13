import { Observable } from "reactfree-jsx";
import cssClasses from "./Dropdown.module.scss";

export default function Dropdown({ children }: {
  children?: HTMLElement[];
}) {
  const [summary, content] = children!;
  const isOpen = new Observable(false);

  const observer = new MutationObserver((mutations) => {
    for (const { type, target } of mutations) {
      if (type === "attributes" && (target as HTMLDetailsElement).open !== isOpen.value) {
        isOpen.value = (target as HTMLDetailsElement).open;
        break;
      }
    }
  });

  return (
    <details
      className={cssClasses.dropdown}
      open={isOpen}
      $init={(element) => {
        observer.observe(element, { attributes: true });
        document.addEventListener("click", ({ target }) => {
          if (isOpen.value && target instanceof Node && element !== target && !element.contains(target))
            isOpen.value = false;
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