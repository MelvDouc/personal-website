import cssClasses from "./CvSkillsList.module.scss";

export default function CvSkillsList() {
  return (
    <ul className={cssClasses.skillsList}>
      <li classNames={[cssClasses.rating, cssClasses.rating10]}>HTML</li>
      <li classNames={[cssClasses.rating, cssClasses.rating9]}>CSS</li>
      <li classNames={[cssClasses.rating, cssClasses.rating10]}>Sass</li>
      <li classNames={[cssClasses.rating, cssClasses.rating6]}>UI & UX</li>
      <li classNames={[cssClasses.rating, cssClasses.rating4]}>Figma</li>
      <li classNames={[cssClasses.rating, cssClasses.rating7]}>React</li>
      <li classNames={[cssClasses.rating, cssClasses.rating5]}>Angular</li>
      <li classNames={[cssClasses.rating, cssClasses.rating5]}>Vue</li>
      <li classNames={[cssClasses.rating, cssClasses.rating8]}>Node</li>
      <li classNames={[cssClasses.rating, cssClasses.rating9]}>NPM</li>
      <li classNames={[cssClasses.rating, cssClasses.rating8]}>Express</li>
      <li classNames={[cssClasses.rating, cssClasses.rating3]}>Symfony</li>
      <li classNames={[cssClasses.rating, cssClasses.rating4]}>Spring Boot</li>
      <li classNames={[cssClasses.rating, cssClasses.rating3]}>Django</li>
      <li classNames={[cssClasses.rating, cssClasses.rating2]}>Docker</li>
      <li classNames={[cssClasses.rating, cssClasses.rating9]}>MySQL</li>
      <li classNames={[cssClasses.rating, cssClasses.rating8]}>MongoDB</li>
      <li classNames={[cssClasses.rating, cssClasses.rating8]}>Git</li>
    </ul>
  );
}