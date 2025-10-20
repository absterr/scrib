import Link from "next/link";

const footerLinks = [
  {
    name: "Pricing",
    url: "/pricing",
  },
  {
    name: "Contact",
    url: "#",
  },
  {
    name: "𝕏 (Twitter)",
    url: "twitter",
  },
  {
    name: "LinkedIn",
    url: "linkedIn",
  },
  {
    name: "Github",
    url: "github",
  },
];

const Footer = () => (
  <footer className="bg-foreground text-background w-full py-12 px-8 min-h-[calc(40vh)]">
    <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 md:grid-rows-[1fr_0.5fr]">
        <div className="space-y-2">
          <p className="italic font-bold text-2xl">Scrib</p>
          <p className="text-neutral-400">
            Bring your ideas to life with Scrib
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          <ul className="space-y-2 md:col-end-4">
            {footerLinks.map((link) => (
              <li className="hover:underline" key={link.url}>
                <Link href={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-neutral-400 flex items-end">
          <p>&copy; Scrib 2025. All rights reserved</p>
        </div>

        <div className="text-sm text-neutral-400 grid md:grid-cols-3">
          <div className="md:col-end-4 space-x-12 flex items-end">
            <Link href={"#"} className="hover:underline">
              Privacy policy
            </Link>
            <Link href={"#"} className="hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
