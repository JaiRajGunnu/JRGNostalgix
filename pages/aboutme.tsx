"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

/* Import only the icons you need from Heroicons */
import {
  CakeIcon,               // for birthday
  MapPinIcon,             // for location
  BeakerIcon,             // approximate for "atom" (zodiac)
  BuildingLibraryIcon,    // for school/college
  AcademicCapIcon,        // for university
  HeartIcon,              // for 'person' or 'favorite person'
  HomeIcon,               // for 'house'
  FilmIcon,               // for 'movie' or 'director'
  BookOpenIcon,           // for 'book'
  FaceSmileIcon,          // approximate for 'fa-face-kiss'
  UserIcon,               // approximate for 'fa-user-secret' or child
  ScissorsIcon,           // for 'fa-scissors'
  // HeartSlashIcon,         // approximate for 'fa-heart-crack'
  PhotoIcon,              // approximate for Instagram brand
  PlayCircleIcon,         // approximate for YouTube brand
  PaperAirplaneIcon,      // approximate for Telegram brand
  GlobeAltIcon,           // approximate for Facebook or website
  CheckBadgeIcon,         // for "verified" check badge
} from "@heroicons/react/24/solid";
import { IconHeart, IconHeartBroken } from "@tabler/icons-react";

export default function AboutMe() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Convert document.lastModified into a local date/time string
    const mod = new Date(document.lastModified).toLocaleString();
    setLastUpdated(mod);
  }, []);

  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>

      <SidebarLayout>
        {/* Background beams behind everything */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <BackgroundBeamsWithCollision />
        </div>

        {/* Main container */}
        <main className="relative min-h-screen w-full px-6 py-10 text-white flex justify-center">
          <div className="w-full max-w-3xl">
            {/* The main card */}
            <div
              className={`
                mb-4 w-full bg-[#18191af7] rounded-xl shadow-md
                font-[Hammersmith_One] text-[15px]
                pt-4 px-6 pb-5
              `}
            >
              {/* Background image container */}
              <div
                className="rounded-xl mt-2 text-center bg-cover bg-no-repeat bg-center cursor-pointer"
                style={{
                  backgroundImage:
                    "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi70Ue1drOqNe4Ol79oTNabm0n4Sh3aDPuCwMr8jdWN5i2Tl8f-1-1k71yfsp19J1h4bWiL_e0JdwosZE-z3b1J8uU-vcMmQqgj1A8xDAe8TkVxLc1h3ecaQpkeE81OO1i-jHQ28p6CcbuI/s16000/Sai+Wallpaper+4.jpg')",
                //   backgroundPosition: "-460px -177px",
                }}
              >
                {/* Profile Image */}
                <div className="flex justify-center">
                  <img
                    alt="Jai Raj Gunnu"
                    className={`
                      border-4 border-[#3a3b3c]
                      rounded-full
                      transition duration-300
                      mt-10 w-[100px] h-[100px] object-cover
                      hover:shadow-[6px_5px_3px_0px_rgba(0,0,0,0.36)]
                    `}
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhM7ONXWbt-5BwRZ2CniCLoO80ZMwibUKnL10QUlLyehl9-voYrdH67JqweEywEgNsSOx0z5xZJz4Oi_VVt_qI7JVG2YQN2tbGMf1jbYMhyvM3WOUWkbYxEPdUCP1X0srEoV7CVONOAWgIxlZ-yrqTKE6NgqPpVbQ11e3hyzxOAc7Q2VVJMMAS6w3M89w/s16000/FOR%20DP%201.jpg"
                  />
                </div>
              </div>

              {/* Name and socials */}
              <div className="mt-4 text-center">
                <h2 className="text-white cursor-default mt-6 text-xl font-bold">
                  Jai Raj Gunnu
                  <CheckBadgeIcon
                    className="inline-block w-4 h-4 ml-2 text-[#2d88ff]"
                    title="Verified profile"
                  />
                </h2>
                <p className="text-gray-400 text-base mt-1 mb-5">Om Sai Ram ❤️🙏</p>

                {/* <div className="flex justify-center items-center gap-3 mt-3">
                  <a
                    href="https://www.facebook.com/jairajgunnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <GlobeAltIcon className="w-4 h-4 text-[#8c939d]" />
                  </a>
                  <a
                    href="https://www.instagram.com/jairaj_gunnu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <PhotoIcon className="w-4 h-4 text-[#8c939d]" />
                  </a>
                  <a
                    href="https://twitter.com/jairajgunnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 text-[#8c939d] rotate-45" />
                  </a>
                  <a
                    href="https://jairajg.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <GlobeAltIcon className="w-4 h-4 text-[#8c939d]" />
                  </a>
                </div> */}

              </div>

              {/* Intro */}
              <hr className="border-[rgba(255,255,255,0.19)] my-5" />
              <div className="mb-2 text-left">
                <h3 className="text-white text-2xl mb-3">Intro</h3>
              </div>
              <div className="text-[16.5px] space-y-3">
                {/* Birthday */}
                <div className="flex items-center">
                  <CakeIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                  <span className="text-[rgba(228,230,235,0.91)] mr-2">
                    Jan 05 2003
                  </span>
                  <span className="text-[rgba(255,255,255,0.75)] text-sm">
                    ( <span id="jaibdaytimer"> </span> left for b&apos;day )
                  </span>
                </div>
                {/* "Atom" => approximate with Beaker or Sparkles */}
                <div className="flex items-center">
                  <BeakerIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                  <span className="text-[rgba(228,230,235,0.91)]">Capricorn</span>
                </div>
                {/* Location => MapPinIcon */}
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                  <span className="text-[rgba(228,230,235,0.91)]">
                    Srikakulam, Andhra Pradesh
                  </span>
                </div>
              </div>

              {/* Education */}
              <hr className="border-[rgba(255,255,255,0.19)] my-5" />
              <div className="mb-2 text-left">
                <h3 className="text-white text-2xl mb-3">Education</h3>
              </div>
              <div className="text-[16.5px] space-y-3">
                <div>
                  <label className="text-[#8c939d] text-sm block">School</label>
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Sri Chaitanya Techno School
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[#8c939d] text-sm block">College</label>
                  <div className="flex items-center">
                    <BuildingLibraryIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Sri Chaitanya Educational Institutions
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[#8c939d] text-sm block">
                    University
                  </label>
                  <div className="flex items-center">
                    <AcademicCapIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://en.wikipedia.org/wiki/SRM_Institute_of_Science_and_Technology"
                      className="text-[rgba(228,230,235,0.91)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SRM University, Kattankulathur
                    </a>
                  </div>
                </div>
              </div>

              {/* Favourites */}
              <hr className="border-[rgba(255,255,255,0.19)] my-5" />
              <div className="mb-2 text-left">
                <h3 className="text-white text-2xl mb-3">Favourites</h3>
              </div>

              <div className="flex flex-col md:flex-row justify-between text-[16.5px] space-y-4 md:space-y-0">
                {/* Left column */}
                <div className="space-y-3">
                  {/* Color => palette => approximate PaintBrushIcon? */}
                  <div>
                    <label className="text-[#8c939d] text-sm block">Color</label>
                    <span className="flex items-center">
                      {/* No direct "palette" => use "PaintBrushIcon"? */}
                      <BeakerIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">Blue</span>
                    </span>
                  </div>
                  {/* Place => HomeIcon */}
                  <div>
                    <label className="text-[#8c939d] text-sm block">Place</label>
                    <span className="flex items-center">
                      <HomeIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        My home
                      </span>
                    </span>
                  </div>
                  {/* Food => ForkKnifeIcon not in heroicons v2 => we can do "Scissors"? Not correct. We'll do "BeakerIcon"? Or "HandThumbUpIcon"? 
                      Actually there's "CakeIcon"? We used that for birthday. Let's do "BeakerIcon"? 
                      We'll do a disclaim here. If you want a "fork/knife," you can create a custom icon or pick a near match. */}
                  <div>
                    <label className="text-[#8c939d] text-sm block">Food</label>
                    <span className="flex items-center">
                      <CakeIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        Chicken biryani
                      </span>
                    </span>
                  </div>
                  {/* Person => HeartIcon */}
                  <div>
                    <label className="text-[#8c939d] text-sm block">Person</label>
                    <span className="flex items-center">
                      <IconHeart className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        Sai-Kannaya
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[#8c939d] text-sm block">Actor</label>
                    <span className="flex items-center">
                      <FaceSmileIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        Mahesh, Nani, Abeer soofi, Saurabh jain, Sumedh
                      </span>
                    </span>
                  </div>
                  <div>
                    <label className="text-[#8c939d] text-sm block">Movie</label>
                    <span className="flex items-center">
                      <FilmIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        Bahubali, Vunnadhe okate zindagi
                      </span>
                    </span>
                  </div>
                  <div>
                    <label className="text-[#8c939d] text-sm block">
                      Director
                    </label>
                    <span className="flex items-center">
                      <FilmIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        Rajamouli S.S
                      </span>
                    </span>
                  </div>
                  <div>
                    <label className="text-[#8c939d] text-sm block">
                      Book/novel
                    </label>
                    <span className="flex items-center">
                      <BookOpenIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                      <span className="text-[rgba(228,230,235,0.91)]">
                        The Mahabharat
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Peculiars */}
              <hr className="border-[rgba(255,255,255,0.19)] my-5" />
              <div className="mb-2 text-left">
                <h3 className="text-white text-2xl mb-3">Peculiars</h3>
              </div>
              <div className="text-[16.5px] space-y-3">
                <div>
                  <label className="text-[#8c939d] text-sm block">Crush</label>
                  <span className="flex items-center">
                    <FaceSmileIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Unexpected girl
                    </span>
                  </span>
                </div>
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Nicknames
                  </label>
                  <span className="flex items-center">
                    <UserIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Jai, Rajuu, Kanna, Jai Babu, Gunnu
                    </span>
                  </span>
                </div>
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Crazy dreams
                  </label>
                  <span className="flex items-center">
                    <FaceSmileIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      I wish to get some random powers like superheroes
                    </span>
                  </span>
                </div>
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Kid&apos;s things
                  </label>
                  <span className="flex items-center">
                    <UserIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Still used to overthink sometimes.
                    </span>
                  </span>
                </div>
                <div>
                  <label className="text-[#8c939d] text-sm block">Hobbies</label>
                  <span className="flex items-center">
                    <ScissorsIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Editing, web dev..
                    </span>
                  </span>
                </div>
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Deepest fear
                  </label>
                  <span className="flex items-center">
                    <IconHeartBroken className="w-4 h-4 text-[#8c939d] mr-2" />
                    <span className="text-[rgba(228,230,235,0.91)]">
                      Loosing my besties &amp; favourite ones..
                    </span>
                  </span>
                </div>
              </div>

              {/* Links */}
              <hr className="border-[rgba(255,255,255,0.19)] my-5" />
              <div className="mb-2 text-left">
                <h3 className="text-white text-2xl mb-3">Links</h3>
              </div>
              <div className="text-[16.5px] space-y-3">
                {/* Instagram => PhotoIcon */}
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Instagram
                  </label>
                  <span className="flex items-center">
                    <PhotoIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://www.instagram.com/sadguru.sai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      @sadguru.sai
                    </a>
                  </span>
                </div>
                {/* YouTube => PlayCircleIcon */}
                <div>
                  <label className="text-[#8c939d] text-sm block">YouTube</label>
                  <span className="flex items-center">
                    <PlayCircleIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://www.youtube.com/@sadguru_sai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      @sadguru_sai
                    </a>
                  </span>
                </div>
                {/* Telegram => PaperAirplaneIcon */}
                <div>
                  <label className="text-[#8c939d] text-sm block">Telegram</label>
                  <span className="flex items-center">
                    <PaperAirplaneIcon className="w-4 h-4 text-[#8c939d] mr-2 rotate-45" />
                    <a
                      href="https://t.me/sadgurusaioff"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      @sadgurusaioff
                    </a>
                  </span>
                </div>
                {/* Facebook => We'll do GlobeAltIcon again, or HomeIcon? We'll do GlobeAltIcon. */}
                <div>
                  <label className="text-[#8c939d] text-sm block">Facebook</label>
                  <span className="flex items-center">
                    <GlobeAltIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://www.facebook.com/groups/1243760322771265"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      @124376032277..
                    </a>
                  </span>
                </div>
                {/* Webpage => GlobeAltIcon */}
                <div>
                  <label className="text-[#8c939d] text-sm block">Webpage</label>
                  <span className="flex items-center">
                    <GlobeAltIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://epgsk.blogspot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      epgsk.blogspot.com
                    </a>
                  </span>
                </div>
                {/* Portfolio => UserIcon or GlobeAltIcon? We'll do UserIcon. */}
                <div>
                  <label className="text-[#8c939d] text-sm block">
                    Portfolio
                  </label>
                  <span className="flex items-center">
                    <UserIcon className="w-4 h-4 text-[#8c939d] mr-2" />
                    <a
                      href="https://jairaj-gunnu.blogspot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[rgba(228,230,235,0.91)]"
                    >
                      jairaj-gunnu.blogspot.com
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Last updated footer */}
            <div
              className="text-center text-sm mt-8 mb-[-10px]"
              style={{ cursor: "none" }}
            >
              <p className="font-[Google_Sans]">
                Checked-on : <span>{lastUpdated}</span>
              </p>
              <div className="text-white">
                <span>Admin page -</span>
                <a
                  href="https://epgsk.blogspot.com/p/admin-jairajgunnu.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white pl-1 underline"
                >
                  Jai Raj Gunnu
                  <CheckBadgeIcon
                    className="inline-block w-3 h-3 ml-1 text-[#2d88ff]"
                    title="Verified"
                  />
                </a>
              </div>
            </div>
          </div>
        </main>
      </SidebarLayout>
    </>
  );
}
