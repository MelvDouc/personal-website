import router from "../routing/router.js";

export default function Link({ href, children }: {
  href: string;
  children?: any;
}) {
  return (
    <a href={href} onclick={(e) => {
      e.preventDefault();
      history.pushState({}, "", href);
      router.setUrl(href);
    }}>{children}</a>
  );
}