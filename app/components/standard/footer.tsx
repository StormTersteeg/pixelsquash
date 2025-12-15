export default function Footer() {
  return (
    <footer
      className="
        footer sm:footer-horizontal footer-center
        bg-gray-950 text-base-content text-gray-600 p-4
        animate-in fade-in slide-in-from-bottom-4 duration-700
        fill-mode-both
        [animation-delay:1000ms]
      "
    >
      <aside>
        <a
          href="https://github.com/StormTersteeg/pixelsquash"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          Created by Storm-Julian Tersteeg - 2025
        </a>
      </aside>
    </footer>
  );
}
