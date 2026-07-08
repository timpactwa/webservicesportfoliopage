// Stand-in for next/link in the design-sync bundle — no App Router context
// exists outside the real Next.js app, so previews use a plain anchor.
import React from 'react'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...rest },
  ref
) {
  return (
    <a ref={ref} href={href} {...rest}>
      {children}
    </a>
  )
})

export default Link
