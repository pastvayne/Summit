import Link from "next/link";
import { brand, movements, recordFields } from "@/lib/brand";

export function Ascent() {
  return (
    <section id="ascent" className="section-anchor narrative">
      <div className="narrative-grid">
        <div className="narrative-sticky">
          <p className="eyebrow">The ascent</p>
          <h2 className="display narrative-title">A project with a horizon.</h2>
        </div>
        <div>
          <p className="narrative-lead">
            SUMMIT explores what can be made in the Ascend ecosystem. The mountain is the first
            public expression of that work.
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
      <div className="record-scene" aria-hidden="true">
        {/* Masked into the section. next/image fill fights this crop. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/summit/hero-mobile.jpg" alt="" />
      </div>
      <div className="record-copy">
        <p className="eyebrow">Status</p>
        <h2 className="display record-title">Project status.</h2>
        <p className="record-lead">A clear record of where the project stands.</p>
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
            Read the full record
          </Link>
        </p>
      </div>
    </section>
  );
}

export function Follow() {
  return (
    <section id="follow" className="section-anchor follow">
      <p className="eyebrow">Next</p>
      <h2 className="display follow-title">Follow the ecosystem.</h2>
      <p className="follow-lead">
        SUMMIT does not have its own public account yet. Ascend’s account is the verified place to
        watch the world this project belongs to.
      </p>
      <p className="narrative-follow">
        <a className="text-link" href={brand.ascend} target="_blank" rel="noreferrer">
          X
        </a>
      </p>
    </section>
  );
}
