import { FaGithub, FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

export default function SocialsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Connect with Me</h1>
      <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-xl">
        I'm active on these platforms. Feel free to follow, connect, or message me!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SocialCard
          icon={<FaGithub className="text-2xl" />}
          label="GitHub"
          href="https://github.com/yourusername"
        />
        <SocialCard
          icon={<FaDiscord className="text-2xl" />}
          label="Discord"
          href="https://discord.gg/yourinvite"
        />
        <SocialCard
          icon={<FaTwitter className="text-2xl" />}
          label="Twitter"
          href="https://twitter.com/yourusername"
        />
        <SocialCard
          icon={<FaInstagram className="text-2xl" />}
          label="Instagram"
          href="https://instagram.com/yourusername"
        />
      </div>
    </main>
  );
}

function SocialCard({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 border rounded-xl px-6 py-4 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      {icon}
      <span className="text-lg font-medium">{label}</span>
    </a>
  );
}
