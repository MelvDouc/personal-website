import router from "../routing/router.js";

export default function Link({ href, className, $init, children }: {
  href: string;
  className?: string;
  $init?: (a: HTMLAnchorElement) => void;
  children?: any;
}) {
  return (
    <a
      href={href}
      onclick={(e) => {
        e.preventDefault();
        history.pushState({}, "", href);
        router.setUrl(href);
      }}
      $init={(a) => {
        className && (a.className = className);
        $init && $init(a);
      }}
    >{children}</a>
  );
}