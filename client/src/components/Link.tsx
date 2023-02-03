export default function Link({ href, children }: {
  href: string;
  children?: any;
}) {
  return (
    <a href={href} onclick={(e) => {
      e.preventDefault();
      history.pushState({}, "", href);
      history.back();
      history.forward();
    }}>{children}</a>
  );
}