"use client";

import { useState, useEffect, useRef } from "react";
import { isBrideFirst } from "@/config/tenant-display";
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
import type { Tenant, ThemeConfig } from "@/types";

interface Props {
  tenant: Record<string, unknown>;
  photos: { id: string; url: string; caption?: string; sort_order: number }[];
  wishes: { id: string; name: string; message: string; created_at: string }[];
  theme: Record<string, unknown> | null;
  guestName?: string;
}

export function InvitationWrapper({ tenant, photos, wishes, theme, guestName }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const autoPlayAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpened) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isOpened]);

  const handleOpen = () => {
    const musicUrl = tenant.music_url as string | undefined;
    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch(() => {});
      autoPlayAudioRef.current = audio;
    }
    setIsOpened(true);
  };

  const themeConfig: ThemeConfig = ((theme as { config?: ThemeConfig })?.config || {
    primaryColor: "#E8748A",
    secondaryColor: "#FDF2F8",
    accentColor: "#C9A96E",
    backgroundColor: "#FDF8F0",
    textColor: "#4A2C2A",
    fontHeading: "Cormorant Garamond",
    fontBody: "Lato",
    fontScript: "Great Vibes",
    ornamentStyle: "floral",
  }) as ThemeConfig;

  const slug = tenant.slug as string;
  const brideFirst = isBrideFirst(slug);
  const coverFirstNickname = brideFirst
    ? (tenant.bride_nickname as string)
    : (tenant.groom_nickname as string);
  const coverSecondNickname = brideFirst
    ? (tenant.groom_nickname as string)
    : (tenant.bride_nickname as string);

  if (!isOpened) {
    return (
      <OpeningCover
        groomNickname={coverFirstNickname}
        brideNickname={coverSecondNickname}
        akadDate={tenant.akad_date as string}
        coverPhotoUrl={tenant.cover_photo_url as string | undefined}
        guestName={guestName}
        themeConfig={themeConfig}
        onOpen={handleOpen}
      />
    );
  }

  return (
    <div style={{ backgroundColor: themeConfig.backgroundColor, color: themeConfig.textColor }}>
      <MusicPlayer
        musicUrl={tenant.music_url as string | undefined}
        autoPlayAudio={autoPlayAudioRef.current}
      />

      {(() => {
        const tenantData: Tenant = {
          id: tenant.id as string,
          slug: tenant.slug as string,
          groomName: tenant.groom_name as string,
          brideName: tenant.bride_name as string,
          groomNickname: tenant.groom_nickname as string,
          brideNickname: tenant.bride_nickname as string,
          groomFather: tenant.groom_father as string,
          groomMother: tenant.groom_mother as string,
          brideFather: tenant.bride_father as string,
          brideMother: tenant.bride_mother as string,
          religion: (tenant.religion as Tenant["religion"]) || "islam",
          groomBirthOrder: tenant.groom_birth_order as string | undefined,
          brideBirthOrder: tenant.bride_birth_order as string | undefined,
          groomPhotoUrl: tenant.groom_photo_url as string | undefined,
          bridePhotoUrl: tenant.bride_photo_url as string | undefined,
          akadDate: tenant.akad_date as string,
          akadTimeStart: tenant.akad_time_start as string,
          akadTimeEnd: tenant.akad_time_end as string,
          akadVenueName: tenant.akad_venue_name as string,
          akadVenueAddress: tenant.akad_venue_address as string,
          akadMapsUrl: tenant.akad_maps_url as string | undefined,
          receptionDate: tenant.reception_date as string,
          receptionTimeStart: tenant.reception_time_start as string,
          receptionTimeEnd: tenant.reception_time_end as string,
          receptionVenueName: tenant.reception_venue_name as string,
          receptionVenueAddress: tenant.reception_venue_address as string,
          receptionMapsUrl: tenant.reception_maps_url as string | undefined,
          timeZone: (tenant.time_zone as Tenant["timeZone"]) || "WIB",
          themeId: tenant.theme_id as string,
          coverPhotoUrl: tenant.cover_photo_url as string | undefined,
          loveStory: tenant.love_story as string | undefined,
          musicUrl: tenant.music_url as string | undefined,
          isActive: tenant.is_active as boolean,
          isPasswordProtected: tenant.is_password_protected as boolean,
          showAmplopDigital: tenant.show_amplop_digital as boolean,
          showGiftAddress: (tenant.show_gift_address as boolean) || false,
          showQris: (tenant.show_qris as boolean) || false,
          giftAddress: tenant.gift_address as string | undefined,
          giftNotes: tenant.gift_notes as string | undefined,
          qrisImageUrl: tenant.qris_image_url as string | undefined,
          bankAccounts:
            (tenant.bank_accounts as Tenant["bankAccounts"]) || [],
          lottieAutoSelect: (tenant.lottie_auto_select as boolean) !== false,
          lottieAnimationUrl: tenant.lottie_animation_url as string | undefined,
          lottieAnimationPosition: tenant.lottie_animation_position as Tenant["lottieAnimationPosition"],
          expiresAt: tenant.expires_at as string | undefined,
          dresscode: tenant.dresscode as string | undefined,
          additionalNotes: tenant.additional_notes as string | undefined,
          closingMessage: tenant.closing_message as string | undefined,
          createdAt: tenant.created_at as string,
          updatedAt: tenant.updated_at as string,
        };

        return (
          <>
      <HeroSection
        tenant={tenantData}
        themeConfig={themeConfig}
        guestName={guestName}
      />

      <OpeningSection
        religion={tenantData.religion}
        groomName={tenantData.groomName}
        brideName={tenantData.brideName}
        brideFirst={brideFirst}
        themeConfig={themeConfig}
      />

      <CoupleSection tenant={tenantData} themeConfig={themeConfig} />

      <EventSection tenant={tenantData} themeConfig={themeConfig} />

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

      <AmplopSection tenant={tenantData} themeConfig={themeConfig} />

      <FooterSection
        groomNickname={coverFirstNickname}
        brideNickname={coverSecondNickname}
        akadDate={tenant.akad_date as string}
        closingMessage={tenant.closing_message as string | undefined}
        slug={tenant.slug as string}
        themeConfig={themeConfig}
      />
          </>
        );
      })()}
    </div>
  );
}
