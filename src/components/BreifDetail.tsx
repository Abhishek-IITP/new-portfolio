import {
     BadgeCheck,
     Clock3,
     Globe2,
     Mail,
     MapPin,
     Phone,
     Users,
} from "lucide-react";

const details = {
     currentStatus: "Django Developer at Deccan Ai",
     location: "Jamshedpur, India",
     email: "abhishekmohanty7325@gmail.com",
     phone: "+91 9304659521",
     timezone: "GMT+5:30",
     platform: "https://abhiitp.tech/",
     pronoun: "He/Him",
};

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.location)}`;

const iconClass = "h-4 w-4 text-zinc-500";

type Row = {
     Icon: typeof BadgeCheck;
     label: string;
     value: string;
     href?: string;
     external?: boolean;
};

const rows: Row[] = [
     { Icon: BadgeCheck, label: "Status", value: details.currentStatus },
     { Icon: MapPin, label: "Location", value: details.location, href: googleMapsUrl, external: true },
     { Icon: Clock3, label: "Timezone", value: details.timezone },
     { Icon: Phone, label: "Phone", value: details.phone, href: `tel:${details.phone.replace(/\s+/g, "")}` },
     { Icon: Mail, label: "Email", value: details.email, href: `mailto:${details.email}` },
     { Icon: Globe2, label: "Platform", value: details.platform, href: details.platform, external: true },
     { Icon: Users, label: "Pronoun", value: details.pronoun },
];

export function BreifDetail() {
     return (
          <section className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 p-6 text-zinc-900 dark:text-zinc-100 shadow-sm">
               <div className="mb-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-500">Brief Details</p>
                    <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Contact & profile</h2>
               </div>

               <div className="grid gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-2">
                    {rows.map(({ Icon, label, value, href, external }, index) => {
                         const content = (
                              <>
                                   <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/60 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 shadow-sm">
                                        <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                   </span>
                                   <span className="min-w-0">
                                        <span className="block text-[0.62rem] font-medium uppercase tracking-[0.22em] text-zinc-400">{label}</span>
                                        <span className="block truncate text-[0.86rem] font-medium text-zinc-900 dark:text-zinc-100">{value}</span>
                                   </span>
                              </>
                         );

                         const rowClassName = "flex items-center gap-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-800/20 px-3.5 py-2.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700/80 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60";

                         return href ? (
                              <a
                                   key={`${label}-${index}`}
                                   className={rowClassName}
                                   href={href}
                                   target={external ? "_blank" : undefined}
                                   rel={external ? "noreferrer" : undefined}
                              >
                                   {content}
                              </a>
                         ) : (
                              <div key={`${label}-${index}`} className={rowClassName}>
                                   {content}
                              </div>
                         );
                    })}
               </div>
          </section>
     );
}