import type { Product, ProductDownload } from "@/data/products";
import { Icon, IconTile } from "./Icons";
import { Magnetic } from "./Interactive";
import { ArrowDown } from "./Primitives";
import { revealProps } from "@/lib/reveal";

/**
 * Download CTAs for installers, and "open" CTAs for browser apps.
 *
 * The button is only ever a real link when `download.url` is set — until a
 * binary actually exists in `public/downloads/`, it renders as a disabled
 * "not yet available" state rather than a link that 404s.
 */

const isWebPlatform = (d: ProductDownload) => d.platform.toLowerCase().includes("web");

function WindowsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
      <path d="M0 2.1 5.7 1.3v5.4H0zM6.4 1.2 14 0v6.6H6.4zM0 7.4h5.7v5.4L0 11.9zM6.4 7.4H14V14l-7.6-1.1z" />
    </svg>
  );
}

export function DownloadButton({
  download,
  accent,
  variant = "primary",
}: {
  download: ProductDownload;
  accent: string;
  variant?: "primary" | "ghost";
}) {
  const ready = Boolean(download.url);
  const platform = download.platform.toLowerCase();
  const isWindows = platform.includes("windows");
  const isAndroid = platform.includes("android");
  const isWeb = isWebPlatform(download);
  const glyph = isWindows ? (
    <WindowsIcon />
  ) : isAndroid ? (
    <Icon name="android" size={15} />
  ) : isWeb ? (
    <Icon name="web" size={15} />
  ) : null;

  if (!ready) {
    return (
      <span
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`}
        aria-disabled="true"
        title={isWeb ? "This app is not live yet." : "Nothing has been published to download yet."}
      >
        {glyph}
        {download.platform} · coming soon
      </span>
    );
  }

  return (
    <Magnetic
      href={download.url!}
      download={!isWeb}
      external={isWeb}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`}
      ariaLabel={isWeb ? "Open in your browser" : `Download for ${download.platform}`}
    >
      {glyph}
      {isWeb ? "Open in browser" : `Download for ${download.platform}`}
      {!isWeb && <ArrowDown />}
    </Magnetic>
  );
}

/** The full download block on a product page. */
export function DownloadPanel({ product }: { product: Product }) {
  const anyReady = product.downloads.some((d) => d.url);
  // A browser app is opened, not installed — the copy has to say so.
  const webOnly = product.downloads.every(isWebPlatform);

  return (
    <div className="panel relative p-8 sm:p-10" {...revealProps()}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-48 w-48 opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${product.accent}55, transparent 70%)` }}
      />

      <div className="relative">
        <div className="group flex items-center gap-4">
          <IconTile name="download" accent={product.accent} />
          <p className="eyebrow">Get {product.name}</p>
        </div>

        <h2 className="display mt-5 text-2xl sm:text-3xl">
          {anyReady ? (webOnly ? "Open the app." : "Download the installer.") : "Not available yet."}
        </h2>

        <p className="lede mt-4 max-w-md text-[15px]">
          {anyReady
            ? webOnly
              ? "It runs in your browser — there is nothing to install."
              : "Pick your platform and install."
            : webOnly
              ? `${product.name} is still in development and is not live yet — when it is, the link will appear right here.`
              : `${product.name} is still in development. There is nothing to download yet — when there is, it will appear right here.`}
        </p>

        <ul className="mt-8 space-y-5">
          {product.downloads.map((d) => (
            <li
              key={d.platform}
              className="flex flex-col gap-4 border-t border-[var(--color-edge)] pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
                  {d.platform}
                </p>
                <p className="mt-1.5 text-[13px] text-ink-mute">{d.requirement}</p>
                {(d.version || d.size) && (
                  <p className="mt-1 font-mono text-[10px] text-ink-mute">
                    {[d.version, d.size].filter(Boolean).join(" · ")}
                  </p>
                )}
                {d.url && d.sha256 && (
                  <p className="mt-1 font-mono text-[10px] break-all text-ink-mute">
                    SHA-256 {d.sha256}
                  </p>
                )}
              </div>
              <DownloadButton download={d} accent={product.accent} />
            </li>
          ))}
        </ul>

        {product.note && (
          <p className="mt-8 border-l-2 pl-4 text-[13px] leading-relaxed text-ink-mute" style={{ borderColor: `${product.accent}55` }}>
            {product.note}
          </p>
        )}
      </div>
    </div>
  );
}
