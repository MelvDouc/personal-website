export default function HomePage() {
  return (
    <div>
      <section>
        <h2>Introduction</h2>
        <p>My name is Melvin Doucet, {getAge()}, and I'm full-stack web developer. I live in Thionville, Northeastern France, and work in Luxembourg City.</p>
      </section>
      <section>
        <h2>Training</h2>
        <p>
          I followed an intensive web development training program with <a href="https://www.wf3.fr/">WebForce3 Strasbourg</a> from October 2020 to October 2021 which I graduated from.
        </p>
      </section>
    </div>
  );
}

function getAge() {
  const birthDate = new Date(1991, 11, 29);
  const today = new Date();
  const yearDiff = today.getFullYear() - birthDate.getFullYear();

  if (birthDate.getMonth() > today.getMonth() || (birthDate.getMonth() === today.getMonth() && birthDate.getDate() > today.getDate())) {
    return yearDiff - 1;
  }
  return yearDiff;
}
