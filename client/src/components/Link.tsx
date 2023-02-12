import router from "../routing/router.js";

export default function Link({
  href,
  className,
  attributes,
  children
}: {
  href: string;
  className?: string;
  attributes?: Record<string, string>;
  children?: any;
}) {
  return (
    <a
      href={href}
      $init={element => {
        element.addEventListener("click", handleClick(href, router));
        if (className) element.className = className;
        if (attributes)
          Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, value);
          });
      }}
    >
      {children}
    </a>
  );
}

function handleClick(href: string, router: { setUrl: (url: string) => void }) {
  return (e: Event) => {
    e.preventDefault();
    history.pushState({}, "", href);
    router.setUrl(href);
  };
}
