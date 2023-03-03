import type { Router } from "@/routing/router.js";

export default function Main({ router }: { router: Router; }) {
  return (
    <main
      $init={element => {
        router.onUrlChange(async ({ component }) => {
          element.replaceChildren(await component());
        });
      }}
    ></main>
  );
}
