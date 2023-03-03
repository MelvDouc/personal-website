import router from "../routing/router.js";

export default function Link(props: JSX.IntrinsicElements["a"] & Required<Pick<JSX.IntrinsicElements["a"], "href">> & { children?: any; }) {
  const { children, ...otherProps } = props;
  otherProps.onclick = (e) => {
    e.preventDefault();
    history.pushState({}, "", (e.target as HTMLAnchorElement).href);
    router.setUrl(props.href as string);
  };

  return h("a", otherProps, ...(children ?? [])) as HTMLAnchorElement;
}