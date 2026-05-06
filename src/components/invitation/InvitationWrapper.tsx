"use client";

import { useState, useEffect } from "react";
import { OpeningCover } from "./OpeningCover";
import { MusicPlayer } from "./MusicPlayer";
import { HeroSection } from "./sections/HeroSection";
import { OpeningSection } from "./sections/OpeningSection";
import { CoupleSection } from "./sections/CoupleSection";
import { EventSection } from "./sections/EventSection";
import { CountdownSection } from "./sections/CountdownSection";
import { LoveStorySection } from "./sections/LoveStorySection";
import { GallerySection } from "./sections/GallerySection";
import { RSVPSection } from "./sections/RSVPSection";
import { WishesSection } from "./sections/WishesSection";
import { AmplopSection } from "./sections/AmplopSection";
import { FooterSection } from "./sections/FooterSection";

interface Props {
  tenant: Record<string, unknown>;
  photos: { id: string; url: string; caption?: string; sort_order: number }[];
  wishes: { id: string; name: string; message: string; created_at: string }[];
  theme: Record<string, unknown> | null;
  guestName?: string;
}

export function InvitationWrapper({ tenant, photos, wishes, theme, guestName }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpened) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isOpened]);

  const themeConfig = (theme as { config?: Record<string, string> })?.config || {
    primaryColor: "#E8748A",
    secondaryColor: "#FDF2F8",
    accentColor: "#C9A96E",
    backgroundColor: "#FDF8F0",
    textColor: "#4A2C2A",
  };

  if (!isOpened) {
    return (
      <OpeningCover
        groomNickname={tenant.groom_nickname as string}
        brideNickname={tenant.bride_nickname as string}
        akadDate={tenant.akad_date as string}
        coverPhotoUrl={tenant.cover_photo_url as string | undefined}
        guestName={guestName}
        themeConfig={themeConfig}
        onOpen={() => setIsOpened(true)}
      />
    );
  }

  return (
    <div style={{ backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}>
      <MusicPlayer musicUrl={tenant.music_url as string | undefined} />

      <HeroSection
        groomNickname={tenant.groom_nickname as string}
        brideNickname={tenant.bride_nickname as string}
        akadDate={tenant.akad_date as string}
        coverPhotoUrl={tenant.cover_photo_url as string | undefined}
        themeConfig={themeConfig}
        lottieUrl={tenant.lottie_animation_position === "hero" || tenant.lottie_animation_position === "both" ? (tenant.lottie_animation_url as string) : undefined}
      />

      <OpeningSection themeConfig={themeConfig} />

      <CoupleSection
        groomName={tenant.groom_name as string}
        brideName={tenant.bride_name as string}
        groomNickname={tenant.groom_nickname as string}
        brideNickname={tenant.bride_nickname as string}
        groomFather={tenant.groom_father as string}
        groomMother={tenant.groom_mother as string}
        brideFather={tenant.bride_father as string}
        brideMother={tenant.bride_mother as string}
        groomPhotoUrl={tenant.groom_photo_url as string | undefined}
        bridePhotoUrl={tenant.bride_photo_url as string | undefined}
        themeConfig={themeConfig}
        lottieUrl={tenant.lottie_animation_position === "couple_section" || tenant.lottie_animation_position === "both" ? (tenant.lottie_animation_url as string) : undefined}
      />

      <EventSection
        akadDate={tenant.akad_date as string}
        akadTimeStart={tenant.akad_time_start as string}
        akadTimeEnd={tenant.akad_time_end as string}
        akadVenueName={tenant.akad_venue_name as string}
        akadVenueAddress={tenant.akad_venue_address as string}
        akadMapsUrl={tenant.akad_maps_url as string | undefined}
        receptionDate={tenant.reception_date as string}
        receptionTimeStart={tenant.reception_time_start as string}
        receptionTimeEnd={tenant.reception_time_end as string}
        receptionVenueName={tenant.reception_venue_name as string}
        receptionVenueAddress={tenant.reception_venue_address as string}
        receptionMapsUrl={tenant.reception_maps_url as string | undefined}
        themeConfig={themeConfig}
      />

      <CountdownSection
        akadDate={tenant.akad_date as string}
        receptionDate={tenant.reception_date as string}
        themeConfig={themeConfig}
      />

      {(tenant.love_story as string) ? (
        <LoveStorySection loveStory={tenant.love_story as string} themeConfig={themeConfig} />
      ) : null}

      {photos.length > 0 && (
        <GallerySection photos={photos} themeConfig={themeConfig} />
      )}

      <RSVPSection
        tenantId={tenant.id as string}
        guestName={guestName}
        themeConfig={themeConfig}
      />

      <WishesSection
        tenantId={tenant.id as string}
        initialWishes={wishes}
        themeConfig={themeConfig}
      />

      {(tenant.show_amplop_digital as boolean) ? (
        <AmplopSection
          tenantId={tenant.id as string}
          bankAccounts={(tenant.bank_accounts as Array<{ id: string; bankName: string; accountNumber: string; accountHolder: string; isActive: boolean }>) || []}
          themeConfig={themeConfig}
        />
      ) : null}

      <FooterSection
        groomNickname={tenant.groom_nickname as string}
        brideNickname={tenant.bride_nickname as string}
        akadDate={tenant.akad_date as string}
        closingMessage={tenant.closing_message as string | undefined}
        slug={tenant.slug as string}
        themeConfig={themeConfig}
      />
    </div>
  );
}
