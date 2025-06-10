import { FaGithub, FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 text-center"
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I'm Aryan <span className="inline-block animate-wave">👋</span>
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          I’m a high school student who builds AI agents, , web apps and cool products. I share what I build and help others do the same.
        </p>

        <div className="h-6" />

           <div className="flex justify-center gap-6 text-2xl text-muted-foreground">
          <a
            href="https://github.com/Aryandec"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://discord.com/users/879645759883051049"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaDiscord />
          </a>
          <a
            href="https://twitter.com/aryanbhx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/aryanbh7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram />
          </a>
        </div>

      </div>
    </section>
  );
}
