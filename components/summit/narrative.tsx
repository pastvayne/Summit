import Image from "next/image";
import Link from "next/link";
import { movements, questions, recordFields } from "@/lib/brand";

export function Ascent() {
  return (
    <section id="ascent" className="section-anchor narrative">
      <div className="narrative-grid">
        <div className="narrative-sticky">
          <p className="eyebrow">The ascent</p>
          <h2 className="display narrative-title">The mountain stands past the weather.</h2>
        </div>
        <div>
          <p className="narrative-lead">
            A sea of cloud. A dark face of stone. A light at the top that keeps its own hours.
          </p>
          <ol className="movement-list">
            {movements.map((movement) => (
              <li key={movement.index}>
                <span className="movement-index">{movement.index}</span>
                <div>
                  <h3>{movement.title}</h3>
                  <p>{movement.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="narrative-follow">
            <Link href="/ascent" className="text-link">
              Field notes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Record() {
  return (
    <section id="record" className="section-anchor record">
      <div className="record-copy">
        <p className="eyebrow">The record</p>
        <h2 className="display record-title">Nothing invented.</h2>
        <p className="record-lead">
          Summit is a name, a mountain, and a horizon. A token, a contract, and a ledger stay blank
          until they can be written without fiction.
        </p>
        <dl className="record-list">
          {recordFields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
        <p className="narrative-follow">
          <Link href="/record" className="text-link">
            Open the colophon
          </Link>
        </p>
      </div>
      <figure className="record-plate">
        <Image
          src="/summit/hero-mobile.jpg"
          alt="The summit seen closer, peach light on the horizon and violet at the peak."
          fill
          sizes="(min-width: 960px) 42vw, 100vw"
          className="object-cover object-[center_28%]"
        />
      </figure>
    </section>
  );
}

export function Questions() {
  return (
    <section id="questions" className="section-anchor questions">
      <div className="questions-grid">
        <h2 className="display questions-title">Asked quietly.</h2>
        <dl>
          {questions.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
