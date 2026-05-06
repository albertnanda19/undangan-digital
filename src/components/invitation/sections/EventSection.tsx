"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, ExternalLink } from "lucide-react";
import { formatDate, formatTime, generateICSContent, downloadICS } from "@/lib/utils";

interface Props {
  akadDate: string;
  akadTimeStart: string;
  akadTimeEnd: string;
  akadVenueName: string;
  akadVenueAddress: string;
  akadMapsUrl?: string;
  receptionDate: string;
  receptionTimeStart: string;
  receptionTimeEnd: string;
  receptionVenueName: string;
  receptionVenueAddress: string;
  receptionMapsUrl?: string;
  themeConfig: Record<string, string>;
}

export function EventSection(props: Props) {
  const { themeConfig } = props;

  const handleSaveCalendar = (type: "akad" | "resepsi") => {
    const isAkad = type === "akad";
    const ics = generateICSContent({
      title: isAkad ? "Akad Nikah" : "Resepsi Pernikahan",
      startDate: isAkad ? props.akadDate : props.receptionDate,
      startTime: isAkad ? props.akadTimeStart : props.receptionTimeStart,
      endTime: isAkad ? props.akadTimeEnd : props.receptionTimeEnd,
      location: isAkad ? props.akadVenueName : props.receptionVenueName,
      description: isAkad ? `Akad Nikah di ${props.akadVenueName}` : `Resepsi di ${props.receptionVenueName}`,
    });
    downloadICS(`${type}-pernikahan.ics`, ics);
  };

  const EventCard = ({ title, date, timeStart, timeEnd, venue, address, mapsUrl, type }: {
    title: string; date: string; timeStart: string; timeEnd: string;
    venue: string; address: string; mapsUrl?: string; type: "akad" | "resepsi";
  }) => (
    <motion.div
      className="rounded-2xl p-6 border"
      style={{ backgroundColor: themeConfig.backgroundColor, borderColor: themeConfig.primaryColor + "30" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-display text-xl font-semibold mb-4" style={{ color: themeConfig.primaryColor }}>{title}</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <CalendarDays className="h-4 w-4 mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <span style={{ color: themeConfig.textColor }}>{formatDate(date)}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <span style={{ color: themeConfig.textColor }}>{formatTime(timeStart)} - {formatTime(timeEnd)} WIB</span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: themeConfig.primaryColor }} />
          <div>
            <p className="font-medium" style={{ color: themeConfig.textColor }}>{venue}</p>
            <p className="opacity-70" style={{ color: themeConfig.textColor }}>{address}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            <ExternalLink className="h-3 w-3" /> Lihat Peta
          </a>
        )}
        <button
          onClick={() => handleSaveCalendar(type)}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium border transition-opacity hover:opacity-80"
          style={{ borderColor: themeConfig.primaryColor, color: themeConfig.primaryColor }}
        >
          <CalendarDays className="h-3 w-3" /> Simpan ke Kalender
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="event" className="invitation-section" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Akad & Resepsi</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>Waktu & Tempat</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            title="Akad Nikah"
            date={props.akadDate}
            timeStart={props.akadTimeStart}
            timeEnd={props.akadTimeEnd}
            venue={props.akadVenueName}
            address={props.akadVenueAddress}
            mapsUrl={props.akadMapsUrl}
            type="akad"
          />
          <EventCard
            title="Resepsi"
            date={props.receptionDate}
            timeStart={props.receptionTimeStart}
            timeEnd={props.receptionTimeEnd}
            venue={props.receptionVenueName}
            address={props.receptionVenueAddress}
            mapsUrl={props.receptionMapsUrl}
            type="resepsi"
          />
        </div>
      </motion.div>
    </section>
  );
}
