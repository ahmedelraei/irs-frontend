import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Get Most&nbsp;</span>
          <span className={title({ color: "violet" })}>Suitable&nbsp;</span>
          <br />
          <span className={title()}>Internship</span>
          <div className={subtitle({ class: "mt-4" })}>
            Get hired with ease!
          </div>
        </div>

        {/* <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}
      </section>
    </>
  );
}
