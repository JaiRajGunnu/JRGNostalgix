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
import { IconAtom, IconBook, IconBrandFacebook, IconBrandInstagram, IconBrandYoutube, IconBrandYoutubeFilled, IconCake, IconChairDirector, IconChartBubble, IconCheese, IconCloudHeart, IconExternalLink, IconFileSmile, IconHeart, IconHeartBroken, IconHeartFilled, IconHearts, IconHome, IconMapPin, IconMickey, IconMoodKid, IconMoodSmile, IconPalette, IconPaletteFilled, IconSchool, IconWorld } from "@tabler/icons-react";

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
                    <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
                </div>

                {/* Main container */}
                <main className="relative min-h-screen w-full px-6 py-10 lg:px-30 lg:py-30 text-white flex justify-center">
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
                                className="rounded-xl mt-2 text-center bg-cover bg-no-repeat bg-center cursor-pointer h-[150px]"
                                style={{
                                    backgroundImage: `url('/img/cover/rk_cover_img.png')`,
                                    backgroundPosition: "0px -40px",
                                    backgroundSize: "cover",
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
                                            mt-[75px] w-[100px] h-[100px] object-cover 
                                            hover:shadow-[6px_5px_3px_0px_rgba(0,0,0,0.36)]
                                            `}
                                        src="/img/jairajgunnu.jpg"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="mt-4 text-center">
                                <h2 className="text-white cursor-default mt-8 text-xl font-bold">
                                    Jai Raj Gunnu
                                    <CheckBadgeIcon
                                        className="inline-block w-4 h-4 ml-1 text-[#2d88ff]"
                                        title="Verified profile"
                                    />
                                </h2>
                                <p className="text-gray-400 text-sm mt-1 mb-5">A person's true self is a reflection of their beliefs.</p>

                                {/* <div className="flex justify-center items-center gap-3 mt-3">
                  <a
                    href="https://www.facebook.com/jairajgunnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="https://www.instagram.com/jairaj_gunnu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <PhotoIcon className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="https://twitter.com/jairajgunnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 text-gray-400 rotate-45" />
                  </a>
                  <a
                    href="https://jairajg.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] rounded-full p-2 w-6 h-6 flex items-center justify-center hover:text-white hover:bg-black"
                  >
                    <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                  </a>
                </div> */}

                            </div>

                            {/* Intro */}

                            {/* Divider Line */}
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 mb-6 h-[1px] w-full" />

                            <div className="mb-2 text-left">
                                <h3 className="text-white text-2xl mb-3 font-bold">Intro</h3>
                            </div>
                            <div className="text-[16.5px] space-y-3">
                                {/* Birthday */}
                                <div className="flex items-center">
                                    <IconCake className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-white-lite mr-2">
                                        January 05, 2003
                                    </span>

                                </div>
                                {/* "Atom" => approximate with Beaker or Sparkles */}
                                <div className="flex items-center">
                                    <IconAtom className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-white-lite">Capricorn</span>
                                </div>
                                {/* Location => MapPinIcon */}


                                <div className="flex items-center">
                                    <IconMapPin className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-white-lite">
                                        Srikakulam, Andhra Pradesh
                                    </span>
                                </div>
                            </div>

                            {/* Education */}

                            {/* Divider Line */}
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 mb-6 h-[1px] w-full" />
                            <div className="mb-2 text-left">
                                <h3 className="text-white text-2xl mb-3 font-bold">Education</h3>
                            </div>
                            <div className="text-[16.5px] space-y-3">
                                <div>
                                    <label className="text-gray-400 text-sm block ">School</label>
                                    <div className="flex items-center">
                                        <IconBook className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Sri Chaitanya Techno School, Srikakulam
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm block">College</label>
                                    <div className="flex items-center">
                                        <BuildingLibraryIcon className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Sri Chaitanya Educational Institutions, Vijayawada
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        University
                                    </label>
                                    <div className="flex items-center">
                                        <IconSchool className="w-4 h-4 text-gray-400 mr-2" />
                                        <a
                                            href="https://en.wikipedia.org/wiki/SRM_Institute_of_Science_and_Technology"
                                            className="text-white-lite"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            SRM University - KTR, Chennai
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Favourites */}

                            {/* Divider Line */}
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 mb-6 h-[1px] w-full" />
                            <div className="mb-2 text-left">
                                <h3 className="text-white text-2xl mb-3 font-bold">Favourites</h3>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between text-[16.5px] space-y-4 md:space-y-0">
                                {/* Left column */}
                                <div className="space-y-3">
                                    {/* Color => palette => approximate PaintBrushIcon? */}
                                    <div>
                                        <label className="text-gray-400 text-sm block">Color</label>
                                        <span className="flex items-center">
                                            {/* No direct "palette" => use "PaintBrushIcon"? */}
                                            <IconPalette className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">Blue</span>
                                        </span>
                                    </div>
                                    {/* Place => HomeIcon */}
                                    <div>
                                        <label className="text-gray-400 text-sm block">Place</label>
                                        <span className="flex items-center">
                                            <IconHome className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                My home
                                            </span>
                                        </span>
                                    </div>
                                    {/* Food => ForkKnifeIcon not in heroicons v2 => we can do "Scissors"? Not correct. We'll do "BeakerIcon"? Or "HandThumbUpIcon"? 
                      Actually there's "CakeIcon"? We used that for birthday. Let's do "BeakerIcon"? 
                      We'll do a disclaim here. If you want a "fork/knife," you can create a custom icon or pick a near match. */}
                                    <div>
                                        <label className="text-gray-400 text-sm block">Food</label>
                                        <span className="flex items-center">
                                            <IconCheese className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                Chicken biryani
                                            </span>
                                        </span>
                                    </div>
                                    {/* Person => HeartIcon */}
                                    <div>
                                        <label className="text-gray-400 text-sm block">Person</label>
                                        <span className="flex items-center">
                                            <IconHeart className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                Sai - Kannaya
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Right column */}
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-gray-400 text-sm block">Actor</label>
                                        <span className="flex items-center">
                                            <IconMoodSmile className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                Mahesh, Nani, Saurabh
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm block">Movie</label>
                                        <span className="flex items-center">
                                            <IconBrandYoutube className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                Hi Nanna, Bahubali, Vunadi Okate Zindagi
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm block">
                                            Director
                                        </label>
                                        <span className="flex items-center">
                                            <IconChairDirector className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                Rajamouli SS
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-sm block">
                                            Book/novel
                                        </label>
                                        <span className="flex items-center">
                                            <IconBook className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite">
                                                The Mahabharat
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Peculiars */}

                            {/* Divider Line */}
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 mb-6 h-[1px] w-full" />
                            <div className="mb-2 text-left">
                                <h3 className="text-white text-2xl mb-3 font-bold">Peculiars</h3>
                            </div>
                            <div className="text-[16.5px] space-y-3">
                                <div>
                                    <label className="text-gray-400 text-sm block">Crush</label>
                                    <span className="flex items-center">
                                        <IconHearts className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Magic girl
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Nicknames
                                    </label>
                                    <span className="flex items-center">
                                        <IconMickey className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Jai, Rajuu, Junnu
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Crazy dreams
                                    </label>
                                    <span className="flex items-center">
                                        <IconCloudHeart className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            I wish I had some random powers, like a superhero.
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Childish things
                                    </label>
                                    <span className="flex items-center">
                                        <IconMoodKid className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            I still sometimes find myself overthinking.
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block">Hobbies</label>
                                    <span className="flex items-center">
                                        <IconChartBubble className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Video editing, building webpages.
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Deepest fear
                                    </label>
                                    <span className="flex items-center">
                                        <IconHeartBroken className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-white-lite">
                                            Losing the people closest to me.
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Links */}

                            {/* Divider Line */}
                            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 mb-6 h-[1px] w-full" />
                            <div className="mb-2 text-left">
                                <h3 className="text-white text-2xl mb-3 font-bold">Links</h3>
                            </div>
                            <div className="text-[16.5px] space-y-3">

                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Portfolio
                                    </label>
                                    <span className="flex items-center">
                                        <IconWorld className="w-4 h-4 text-gray-400 mr-2" />
                                        <a
                                            href="https://jrg-portfolio-25.vercel.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" text-white-lite flex flex-row"
                                        >
                                            jrg-portfolio-25
                                            <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                        </a>
                                    </span>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Instagram
                                    </label>
                                    <span className="flex items-center">
                                        <IconBrandInstagram className="w-4 h-4 text-gray-400 mr-2" />
                                        <a
                                            href="https://www.instagram.com/jairajgunnu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" text-white-lite flex flex-row"
                                        >
                                            jairajgunnu
                                            <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                        </a>
                                    </span>
                                </div>

                                <div>
                                    <label className="text-gray-400 text-sm block">
                                        Facebook
                                    </label>
                                    <span className="flex items-center">
                                        <IconBrandFacebook className="w-4 h-4 text-gray-400 mr-2" />
                                        <a
                                            href="https://www.facebook.com/jairajg24/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" text-white-lite flex flex-row"
                                        >
                                            jairajg24
                                            <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                        </a>
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </main>
            </SidebarLayout>
        </>
    );
}
