/**
 * Remounts on every navigation, so each route enters with a short rise.
 * Kept under a second — navigation should feel instant, not staged.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
