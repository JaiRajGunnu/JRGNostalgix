"use client";
import Head from "next/head";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import DisableRightClick from '../components/disablerightclick';
import Image from 'next/image';

import { BuildingLibraryIcon, CheckBadgeIcon, } from "@heroicons/react/24/solid";

import {
    IconAtom,
    IconBook,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandYoutube,
    IconCake,
    IconChairDirector,
    IconChartBubble,
    IconCheese,
    IconCloudHeart,
    IconExternalLink,
    IconHeart,
    IconHeartBroken,
    IconHearts,
    IconHome,
    IconMapPin,
    IconMickey,
    IconMoodKid,
    IconMoodSmile,
    IconPalette,
    IconSchool,
    IconWorld
} from "@tabler/icons-react";

export default function AboutMe() {

    return (
        <>
            <Head>
                <title>About Me</title>
            </Head>

            <SidebarLayout>
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
                </div>

                <main className="relative min-h-screen w-full px-6 py-10 lg:px-30 lg:py-30 text-white flex justify-center">
                    <div className="w-full max-w-3xl">
                        {/* Main card with sticky header */}
                        <div className="mb-4 w-full bg-[#18191af7] rounded-xl font-[Hammersmith_One] text-[15px]">
                            {/* Sticky Profile Section */}
                            <div className="sticky top-0 z-20 bg-[#18191af7] backdrop-blur-md rounded-t-xl  pt-4 px-6">
                                <div
                                    className="rounded-xl mt-2 text-center bg-cover bg-no-repeat bg-center cursor-pointer h-[150px]"
                                    style={{
                                        backgroundImage: `url('/img/cover/rk_cover_img.png')`,
                                        backgroundPosition: "0 0",
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div className="flex justify-center">
                                        <DisableRightClick>
                                            <Image
                                                alt="Jai Raj Gunnu"
                                                className="border-4 border-[#3a3b3c] rounded-full transition duration-300
                                            mt-[75px] w-[100px] h-[100px] object-cover hover:shadow-[6px_5px_3px_0px_rgba(0,0,0,0.36)]"
                                                src="/img/jairajgunnu.jpg"
                                                width={100}
                                                height={100}
                                            />
                                        </DisableRightClick>
                                    </div>
                                </div>

                                <div className="mt-8 text-center pb-4">
                                    <h2 className="text-white  cursor-default text-xl font-bold">
                                        Jai Raj Gunnu
                                        <CheckBadgeIcon
                                            className="inline-block w-4 h-4 ml-1 text-[#2d88ff]"
                                            title="Verified profile"
                                        />
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-2 font-poppins">
                                        A person&apos;s beliefs mirror their true self.

                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-transparent mb-0 via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-6 space-y-6">
                                {/* Intro Section */}
                                <div>
                                    <div className="mb-2 text-left">
                                        <h3 className="text-white text-2xl mb-3 font-bold">Intro</h3>
                                    </div>
                                    <div className="text-[16.5px] space-y-3">
                                        <div className="flex items-center">
                                            <IconCake className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite font-poppins">January 05, 2003</span>
                                        </div>
                                        <div className="flex items-center">
                                            <IconAtom className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite font-poppins">Capricorn</span>
                                        </div>
                                        <div className="flex items-center">
                                            <IconMapPin className="w-4 h-4 text-gray-400 mr-2" />
                                            <span className="text-white-lite font-poppins">
                                                Srikakulam, Andhra Pradesh
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Education Section */}
                                <div>
                                    <div className="bg-gradient-to-r from-transparent mb-5 via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                                    <div className="mb-2 text-left">
                                        <h3 className="text-white text-2xl mb-3 font-bold">Education</h3>
                                    </div>
                                    <div className="text-[16.5px] space-y-3">
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">School</label>
                                            <div className="flex items-center">
                                                <IconBook className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    Sri Chaitanya Techno School, Srikakulam
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">College</label>
                                            <div className="flex items-center">
                                                <BuildingLibraryIcon className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    Sri Chaitanya Educational Institutions, Vijayawada
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">University</label>
                                            <div className="flex items-center">
                                                <IconSchool className="w-4 h-4 text-gray-400 mr-2" />
                                                <a
                                                    href="https://en.wikipedia.org/wiki/SRM_Institute_of_Science_and_Technology"
                                                    className="text-white-lite font-poppins"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    SRM University - KTR, Chennai
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Favourites Section */}
                                <div>
                                    <div className="bg-gradient-to-r from-transparent mb-5 via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                                    <div className="mb-2 text-left">
                                        <h3 className="text-white text-2xl mb-3 font-bold">Favourites</h3>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between text-[16.5px] space-y-4 md:space-y-0">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Color</label>
                                                <span className="flex items-center">
                                                    <IconPalette className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Blue</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Place</label>
                                                <span className="flex items-center">
                                                    <IconHome className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">My home</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Food</label>
                                                <span className="flex items-center">
                                                    <IconCheese className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Chicken biryani</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Person</label>
                                                <span className="flex items-center">
                                                    <IconHeart className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Sai - Kannaya</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Actor</label>
                                                <span className="flex items-center">
                                                    <IconMoodSmile className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Mahesh, Nani, Saurabh</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Movie</label>
                                                <span className="flex items-center">
                                                    <IconBrandYoutube className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Hi Nanna, Bahubali</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Director</label>
                                                <span className="flex items-center">
                                                    <IconChairDirector className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">Rajamouli SS</span>
                                                </span>
                                            </div>
                                            <div>
                                                <label className="text-gray-400 text-sm block font-poppins">Book/novel</label>
                                                <span className="flex items-center">
                                                    <IconBook className="w-4 h-4 text-gray-400 mr-2" />
                                                    <span className="text-white-lite font-poppins">The Mahabharat</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Peculiars Section */}
                                <div>
                                    <div className="bg-gradient-to-r from-transparent mb-5 via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                                    <div className="mb-2 text-left">
                                        <h3 className="text-white text-2xl mb-3 font-bold">Peculiars</h3>
                                    </div>
                                    <div className="text-[16.5px] space-y-3">
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Crush</label>
                                            <span className="flex items-center">
                                                <IconHearts className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">Magic girl</span>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Nicknames</label>
                                            <span className="flex items-center">
                                                <IconMickey className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">Jai, Rajuu, Junnu</span>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Crazy dreams</label>
                                            <span className="flex items-center">
                                                <IconCloudHeart className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    I wish I had some random powers, like a superhero.
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Childish things</label>
                                            <span className="flex items-center">
                                                <IconMoodKid className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    I still sometimes find myself overthinking.
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Hobbies</label>
                                            <span className="flex items-center">
                                                <IconChartBubble className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    Video editing, building webpages.
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Deepest fear</label>
                                            <span className="flex items-center">
                                                <IconHeartBroken className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-white-lite font-poppins">
                                                    Losing the people closest to me.
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Links Section */}
                                <div>
                                    <div className="bg-gradient-to-r from-transparent mb-5 via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
                                    <div className="mb-2 text-left">
                                        <h3 className="text-white text-2xl mb-3 font-bold">Links</h3>
                                    </div>
                                    <div className="text-[16.5px] space-y-3">
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Portfolio</label>
                                            <span className="flex items-center">
                                                <IconWorld className="w-4 h-4 text-gray-400 mr-2" />
                                                <a
                                                    href="https://jrg-portfolio-25.vercel.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white-lite font-poppins flex flex-row"
                                                >
                                                    jrg-portfolio-25
                                                    <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                                </a>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Instagram</label>
                                            <span className="flex items-center">
                                                <IconBrandInstagram className="w-4 h-4 text-gray-400 mr-2" />
                                                <a
                                                    href="https://www.instagram.com/jairajgunnu"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white-lite font-poppins flex flex-row"
                                                >
                                                    jairajgunnu
                                                    <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                                </a>
                                            </span>
                                        </div>
                                        <div>
                                            <label className="text-gray-400 text-sm block font-poppins">Facebook</label>
                                            <span className="flex items-center">
                                                <IconBrandFacebook className="w-4 h-4 text-gray-400 mr-2" />
                                                <a
                                                    href="https://www.facebook.com/jairajg24/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white-lite font-poppins flex flex-row"
                                                >
                                                    jairajg24
                                                    <IconExternalLink className="w-4 h-4 text-gray-400 ml-1 mt-1" />
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarLayout>
        </>
    );
}