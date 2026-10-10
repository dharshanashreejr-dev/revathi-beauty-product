import { Fragment, type ReactNode } from 'react'

/**
 * Headings with a line break and a gold word, written as ONE translatable string:
 *   "\n" = line break,  *text* = gold highlighted part.
 * e.g. rich('Where beauty\nmeets *care.*')
 */
export function rich(s: string): ReactNode {
  return s.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(/(\*[^*]+\*)/).map((p, j) => (p.startsWith('*') && p.endsWith('*') && p.length > 2 ? <span key={j} className="gold-text">{p.slice(1, -1)}</span> : p))}
    </Fragment>
  ))
}
