import type { Router } from "../routing/router.js";

export default function Main({ router }: { router: Router }) {
  return (
    <main>
      <div
        className="container main-container py-3 h-100"
        $init={element => {
          router.onUrlChange(async ({ component }) => {
            element.replaceChildren(await component());
          });
        }}
      ></div>
    </main>
  );
}
