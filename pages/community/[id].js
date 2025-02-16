"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import friends from "../../data/friends.json";
// import { useEffect, useState } from "react";
import DisableRightClick from '../../components/disablerightclick';
import Image from 'next/image';
import { BuildingLibraryIcon, CheckBadgeIcon, MusicalNoteIcon, } from "@heroicons/react/24/solid";

import {
  IconArrowLeft,
  IconArrowRight,
  IconAtom,
  IconBook,
  IconBrandTinder,
  IconBrandYoutube,
  IconCake,
  IconChartBubble,
  IconCheese,
  IconCircleDashedNumber1,
  IconCirclesRelation,
  IconCloudHeart,
  IconDiamond,
  IconEyeClosed,
  IconFlare,
  IconHandLittleFinger,
  IconHanger,
  IconHeart,
  IconHeartBroken,
  IconHearts,
  IconLockPassword,
  IconMapPin,
  IconMasksTheater,
  IconMickey,
  IconMoodKid,
  IconMoodSad,
  IconMoodSmile,
  IconPaint,
  IconPalette,
  IconSchool,
  IconThumbUp,
  IconUserQuestion,
} from "@tabler/icons-react";

const FriendsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const friend = friends.find((f) => f.id?.toString() === id);

  if (!friend) {
    return (
      <SidebarLayout>
        <h1 className="text-center text-white text-3xl mt-20">404 - Friend Not Found</h1>
      </SidebarLayout>
    );
  }

  const questionnaire = friend.questionnaire;

  // Navigation Logic
  const currentIndex = friends.findIndex((f) => f.id?.toString() === id);
  const previousFriend = friends[(currentIndex - 1 + friends.length) % friends.length]; // Wrap around to the last friend if at the beginning
  const nextFriend = friends[(currentIndex + 1) % friends.length]; // Wrap around to the first friend if at the end

  const goToPreviousFriend = () => {
    router.push(`/community/${previousFriend.id}`);
  };

  const goToNextFriend = () => {
    router.push(`/community/${nextFriend.id}`);
  };

  // Construct the meta description
  const metaDescription = `Explore ${friend.fullname}'s slam profile on Jai Raj's Slam Book!
  Discover their favorites, deep thoughts, and what they think about you.
  Learn about ${friend.fullname}'s crazy dreams, hobbies. Dive into their personal slam book questions and answers.`;


  return (
    <>
      <Head>
        <title>{friend.name} - Jai Raj`&apos;`s Slam Book</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <SidebarLayout>
        <div className="relative h-screen overflow-y-auto text-white bg-black">
          <BackgroundBeamsWithCollision className="fixed inset-0 -z-10" />

          <div className="relative z-10 p-6 space-y-6">
            {questionnaire && (
              <div className="space-y-6 max-w-4xl mx-auto p-5">

                {/* Sticky Profile Section */}
                <div className="sticky top-0 z-20 bg-[#18191af7] p-4 pb-2 backdrop-blur-md rounded-2xl shadow-2xl">

                  <div
                    className="rounded-xl mt-2 text-center bg-cover bg-no-repeat bg-center cursor-pointer h-[150px]"
                    style={{
                      backgroundImage: `url('https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?cs=srgb&dl=pexels-andrew-3178786.jpg&fm=jpg')`,
                      backgroundPosition: "0px -40px",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="flex justify-center">
                    <DisableRightClick>
                      <Image
                        alt={friend.fullname}
                        className={`border-4 border-[#3a3b3c] rounded-full transition duration-300
                          mt-[75px] w-[100px] h-[100px] object-cover hover:shadow-[6px_5px_3px_0px_rgba(0,0,0,0.36)]`}
                        src={friend.src}
                        width={100}
                        height={100}
                      /> </DisableRightClick>
                    </div>
                  </div>

                  <div className="mt-8 text-center pb-4">

                      {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12">
                  <button
                    onClick={goToPreviousFriend}
                    className="  
                    py-3 px-2 rounded-full transition duration-300 leading"
                  >
                    <div className="flex flex-row text-gray-400">
                      <IconArrowLeft className="w-8 h-8 stroke-[1.5] hover:text-white mr-2" />
                      <span className="mt-0 font-poppins font-medium"></span>
                    </div>
                  </button>
                  <button
                    onClick={goToNextFriend}
                    className="
                     py-3 px-2 rounded-full transition duration-300 leading"
                  >
                    <div className="flex flex-row text-gray-400">
                      <span className="mt-0 font-poppins font-medium"></span>
                      <IconArrowRight className="w-8 h-8 hover:text-white stroke-[1.5] ml-2" />
                    </div>          
                  </button>
                </div>


                    <h2 className="text-white cursor-default text-xl font-bold capitalize mt-[-60px]">
                      {friend.fullname}
                      <CheckBadgeIcon
                        className="inline-block w-4 h-4 ml-1 text-[#2d88ff]"
                        title="Verified profile"
                      />
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 font-poppins">{friend.instaqoute}</p>
                  </div>

                
                </div>

                

                {/* Rest of Content */}
                <div className="bg-[#18191af7] p-5 rounded-xl shadow-inner space-y-6">
                  {/* Intro Section */}
                  <h2 className="text-white text-2xl mb-3 font-bold capitalize">Intro</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Side */}
                    <div>
                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          What`&apos;`s your name?
                        </label>
                        <div className="flex items-center">
                          <IconUserQuestion className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.personal_info["what's your name?"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          When were you born?
                        </label>
                        <div className="flex items-center">
                          <IconCake className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.personal_info["when were you born?"]}</p>
                        </div>
                      </div>

                      <div className="mb-0 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Your School
                        </label>
                        <div className="flex items-center">
                          <BuildingLibraryIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.personal_info["your school"]}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div>
                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Your College
                        </label>
                        <div className="flex items-center">
                          <IconSchool className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.personal_info["your college"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Zodiac sign
                        </label>
                        <div className="flex items-center">
                          <IconAtom className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.personal_info["zodiac sign"]}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-10 mb-10 h-[1px] w-full" />

                  {/* Favorites Section */}
                  <h2 className="text-white text-2xl mb-3 font-bold capitalize">Favorites</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Side */}
                    <div>
                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite color
                        </label>
                        <div className="flex items-center">
                          <IconPalette className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav color"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite place
                        </label>
                        <div className="flex items-center">
                          <IconMapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav place"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite food
                        </label>
                        <div className="flex items-center">
                          <IconCheese className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav food"]}</p>
                        </div>
                      </div>

                      <div className="mb-0 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite movie
                        </label>
                        <div className="flex items-center">
                          <IconBrandYoutube className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav movie"]}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div>
                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite actor
                        </label>
                        <div className="flex items-center">
                          <IconMoodSmile className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base font-arial">{questionnaire.favorites["fav actor/actress"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite person
                        </label>
                        <div className="flex items-center">
                          <IconHeart className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav person"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite book/novel
                        </label>
                        <div className="flex items-center">
                          <IconBook className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav book/novel"]}</p>
                        </div>
                      </div>

                      <div className="mb-4 flex items-start flex-col">
                        <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                          Favorite dress
                        </label>
                        <div className="flex items-center">
                          <IconHanger className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-white-lite font-poppins text-base">{questionnaire.favorites["fav dress"]}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-10 mb-10 h-[1px] w-full" />


                  {/* deep_thoughts Section */}
                  <h2 className="text-white text-2xl mb-3 font-bold capitalize">Deep Thoughts</h2>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Your crazy dreams
                    </label>
                    <div className="flex items-center">
                      <IconCloudHeart className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["your crazy dreams"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Your hobbies
                    </label>
                    <div className="flex items-center">
                      <IconChartBubble className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["your hobbies"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Special talents
                    </label>
                    <div className="flex items-center">
                      <IconHandLittleFinger className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["special talents"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      What is your deepest fear?
                    </label>
                    <div className="flex items-center">
                      <IconHeartBroken className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["what's your deepest fear?"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Tell me a secret
                    </label>
                    <div className="flex items-center">
                      <IconLockPassword className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["tell me one secret"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      The most important person in your life
                    </label>
                    <div className="flex items-center">
                      <IconBrandTinder className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["the most important person in your life"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      What is the most childish thing you still do?
                    </label>
                    <div className="flex items-center">
                      <IconMoodKid className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["what's the most childish thing you still do?"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Who is your crush?
                    </label>
                    <div className="flex items-center">
                      <IconHearts className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["who's your crush?"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      What qualities do you look for in an ideal life partner?
                    </label>
                    <div className="flex items-center">
                      <IconDiamond className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["on your interest, the person you like to marry"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      If you could be invisible, what would you do first?
                    </label>
                    <div className="flex items-center">
                      <IconEyeClosed className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.deep_thoughts["if you can be invisible, what will you do first?"]}</p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-10 mb-10 h-[1px] w-full" />

                  {/* for_me Section */}
                  <h2 className="text-white text-2xl mb-3 font-bold capitalize">For me</h2>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      A nickname for me
                    </label>
                    <div className="flex items-center">
                      <IconMickey className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["a nickname for me"]}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      A song you would like to dedicate to me
                    </label>
                    <div className="flex items-center">
                      <MusicalNoteIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["a song you want to dedicate me"]}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Our relationship
                    </label>
                    <div className="flex items-center">
                      <IconCirclesRelation className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["relation between you and me"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      If I were your slave for a day, what would you ask me to do?
                    </label>
                    <div className="flex items-center">
                      <IconMasksTheater className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["if i was your slave for a day, what would you ask me to do for you?"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Which color suits me best?
                    </label>
                    <div className="flex items-center">
                      <IconPaint className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["which color suits me the most"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Something you want to tell me
                    </label>
                    <div className="flex items-center">
                      <IconFlare className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["something you want to tell me"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Something you dislike about me
                    </label>
                    <div className="flex items-center">
                      <IconMoodSad className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["something you hate in me"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      Something you like about me
                    </label>
                    <div className="flex items-center">
                      <IconThumbUp className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["something you like in me"]}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-start flex-col">
                    <label className="block text-gray-400 text-sm font-poppins font-medium mb-1 mr-2 ">
                      What was your first impression of me?
                    </label>
                    <div className="flex items-center">
                      <IconCircleDashedNumber1 className="w-4 h-4 text-gray-400 mr-2" />
                      <p className="text-white-lite font-poppins text-base">{questionnaire.for_me["what did you feel when you first saw me?"]}</p>
                    </div>
                  </div>
                </div>

                {/* filled_at timestamp */}
                {questionnaire.filled_at && (
                  <p className="text-gray-500 text-sm mt-4 flex text-center items-center justify-center">Recorded: {questionnaire.filled_at}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default FriendsPage;