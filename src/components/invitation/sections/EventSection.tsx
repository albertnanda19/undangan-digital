"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CalendarPlus,
  Gem,
  PartyPopper,
} from "lucide-react";
import type { ReactNode } from "react";
import { getReligionContent } from "@/lib/religionContent";
import { formatDate, formatTime, generateICSContent, downloadICS } from "@/lib/utils";
import type { Tenant, ThemeConfig } from "@/types";

type Props = { tenant: Tenant; themeConfig: ThemeConfig };

export function EventSection({ tenant, themeConfig }: Props) {
  const content = getReligionContent(tenant.religion);
  const timeZone = tenant.timeZone || "WIB";

  const handleSaveCalendar = (eventType: "akad" | "reception") => {
    const isAkad = eventType === "akad";
    const ics = generateICSContent({
      title: isAkad
        ? `${content.akadLabel} - ${tenant.groomName} & ${tenant.brideName}`
        : `${content.receptionLabel} - ${tenant.groomName} & ${tenant.brideName}`,
      startDate: isAkad ? tenant.akadDate : tenant.receptionDate,
      startTime: isAkad ? tenant.akadTimeStart : tenant.receptionTimeStart,
      endTime: isAkad ? tenant.akadTimeEnd : tenant.receptionTimeEnd,
      location: isAkad
        ? `${tenant.akadVenueName}, ${tenant.akadVenueAddress}`
        : `${tenant.receptionVenueName}, ${tenant.receptionVenueAddress}`,
      description: `Pernikahan ${tenant.groomName} & ${tenant.brideName}`,
    });
    downloadICS(`undangan-${tenant.slug}-${eventType}.ics`, ics);
  };

  return (
    <section id="event" className="invitation-section relative" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${themeConfig.primaryColor} 1px, transparent 0)`, backgroundSize: "32px 32px" }} />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="font-script text-2xl mb-2" style={{ color: themeConfig.primaryColor }}>Save The Date</p>
          <h2 className="section-title font-display" style={{ color: themeConfig.textColor }}>Jadwal Acara</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            label={content.akadLabel}
            icon={<Gem size={34} strokeWidth={1.8} />}
            date={tenant.akadDate}
            timeStart={tenant.akadTimeStart}
            timeEnd={tenant.akadTimeEnd}
            timeZone={timeZone}
            venueName={tenant.akadVenueName}
            venueAddress={tenant.akadVenueAddress}
            mapsUrl={tenant.akadMapsUrl}
            themeConfig={themeConfig}
            onSaveCalendar={() => handleSaveCalendar("akad")}
          />
          <EventCard
            label={content.receptionLabel}
            icon={<PartyPopper size={34} strokeWidth={1.8} />}
            date={tenant.receptionDate}
            timeStart={tenant.receptionTimeStart}
            timeEnd={tenant.receptionTimeEnd}
            timeZone={timeZone}
            venueName={tenant.receptionVenueName}
            venueAddress={tenant.receptionVenueAddress}
            mapsUrl={tenant.receptionMapsUrl}
            themeConfig={themeConfig}
            onSaveCalendar={() => handleSaveCalendar("reception")}
            delay={0.15}
          />
        </div>
        {tenant.dresscode && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 text-center p-6 rounded-2xl border" style={{ borderColor: themeConfig.primaryColor, borderStyle: "dashed", backgroundColor: `${themeConfig.primaryColor}10` }}>
            <p className="text-sm tracking-widest uppercase font-semibold mb-2" style={{ color: themeConfig.primaryColor }}>Dresscode</p>
            <p className="font-display text-2xl" style={{ color: themeConfig.textColor }}>{tenant.dresscode}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

type EventCardProps = {
  label: string;
  icon: ReactNode;
  date: string;
  timeStart: string;
  timeEnd: string;
  timeZone: string;
  venueName: string;
  venueAddress: string;
  mapsUrl?: string;
  themeConfig: ThemeConfig;
  onSaveCalendar: () => void;
  delay?: number;
};

function EventCard({
  label, icon, date, timeStart, timeEnd, timeZone, venueName, venueAddress, mapsUrl, themeConfig, onSaveCalendar, delay = 0,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-3xl p-8 shadow-lg"
      style={{ backgroundColor: themeConfig.backgroundColor }}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-full p-2.5" style={{ color: themeConfig.primaryColor, backgroundColor: `${themeConfig.primaryColor}14` }}>
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold mb-5" style={{ color: themeConfig.textColor }}>{label}</h3>
      <div className="h-px mb-5" style={{ backgroundColor: themeConfig.primaryColor, opacity: 0.2 }} />
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar size={18} className="mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: themeConfig.textColor, opacity: 0.5 }}>Tanggal</p>
            <p className="font-semibold font-display text-base" style={{ color: themeConfig.textColor }}>{formatDate(date, "EEEE, d MMMM yyyy")}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock size={18} className="mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: themeConfig.textColor, opacity: 0.5 }}>Waktu</p>
            <p className="font-semibold font-display text-base" style={{ color: themeConfig.textColor }}>
              {formatTime(timeStart)} - {formatTime(timeEnd)} {timeZone}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <div>
            <p className="font-semibold font-display text-base mb-0.5" style={{ color: themeConfig.textColor }}>{venueName}</p>
            <p className="text-sm leading-relaxed" style={{ color: themeConfig.textColor, opacity: 0.7 }}>{venueAddress}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: themeConfig.primaryColor, color: "#fff" }}
          >
            <Navigation size={15} />
            Lihat Peta
          </a>
        )}
        <button
          onClick={onSaveCalendar}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border"
          style={{ borderColor: themeConfig.primaryColor, color: themeConfig.primaryColor, backgroundColor: "transparent" }}
        >
          <CalendarPlus size={15} />
          Simpan
        </button>
      </div>
    </motion.div>
  );
}
