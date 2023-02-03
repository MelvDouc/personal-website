import Link from "./Link.jsx";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/test">Test</Link></li>
        </ul>
      </nav>
    </header>
  );
}