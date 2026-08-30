import { asset } from "@/lib/asset";
import { TEAM } from "@/lib/about";

export function TeamPeople() {
  return (
    <div className="about-people">
      {TEAM.map((person) => (
        <article key={person.name} className="about-person">
          <img
            className="about-person__photo"
            src={asset(person.photo)}
            alt={person.name}
            width={424}
            height={320}
          />
          <div className="about-person__body">
            <p className="about-person__role">{person.role}</p>
            <h2 className="about-person__name">
              {person.name}
              <span className="about-person__yomi">{person.yomi}</span>
            </h2>
            {person.lead ? <p className="about-person__lead">{person.lead}</p> : null}
            <ul className="about-person__list">
              {person.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
