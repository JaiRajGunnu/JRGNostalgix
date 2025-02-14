"use client";
import { useRouter } from "next/router";
import Head from "next/head";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import friends from "../../data/friends.json";
import { useEffect, useState } from "react";

/* Import only the icons you need from Heroicons and Tabler Icons */
import {
    CakeIcon,
    MapPinIcon,
    BeakerIcon,
    BuildingLibraryIcon,
    AcademicCapIcon,
    HeartIcon,
    HomeIcon,
    FilmIcon,
    BookOpenIcon,
    FaceSmileIcon,
    UserIcon,
    ScissorsIcon,
    PhotoIcon,
    PlayCircleIcon,
    PaperAirplaneIcon,
    GlobeAltIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { IconAtom, IconBook, IconBrandFacebook, IconBrandInstagram, IconBrandYoutube, IconBrandYoutubeFilled, IconCake, IconChairDirector, IconCloudHeart, IconExternalLink, IconHeart, IconHeartBroken, IconHeartFilled, IconHearts, IconMapPin, IconMickey, IconMoodKid, IconPalette, IconPaletteFilled, IconSchool, IconWorld } from "@tabler/icons-react";

const FriendsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const friend = friends.find((f) => f.id?.toString() === id);

  if (!friend) {
    return (
      <SidebarLayout>
        <h1 className="text-center text-white text-3xl mt-20">404 - Friend Not Found</h1>
      </SidebarLayout>
    );
  }

  const questionnaire = friend.questionnaire;

  return (
    <>
      <Head>
        <title>{friend.name} - Jai Raj's Slam Book</title>
      </Head>

      <SidebarLayout>
        <div className="flex flex-col items-center min-h-screen text-white bg-black p-4">
          <BackgroundBeamsWithCollision className="w-full p-6 rounded-lg shadow-md">

            {/* Questionnaire Display (Hardcoded) */}
            {questionnaire && (
              <div className="space-y-4">
                {/* Personal Info Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold mb-3">Personal Information</h2>

                  <div className="mb-2 flex items-center">
                    <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">
                      <IconBrandFacebook className="w-4 h-4 text-gray-400 mr-1 inline-block" />
                      What's your name?
                    </label>
                    <p className="text-gray-100">{questionnaire.personal_info["what's your name?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <IconCake className="w-4 h-4 text-gray-400 mr-1 inline-block" />When were you born?</label>
                    <p className="text-gray-100">{questionnaire.personal_info["when were you born?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                     <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                      <IconSchool className="w-4 h-4 text-gray-400 mr-1 inline-block" />Your School</label>
                    <p className="text-gray-100">{questionnaire.personal_info["your school"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <IconBook className="w-4 h-4 text-gray-400 mr-1 inline-block" />Your College</label>
                    <p className="text-gray-100">{questionnaire.personal_info["your college"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <IconAtom className="w-4 h-4 text-gray-400 mr-1 inline-block" />Zodiac sign</label>
                    <p className="text-gray-100">{questionnaire.personal_info["zodiac sign"]}</p>
                  </div>
                </div>

                {/* Favorites Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold mb-3">Favorites</h2>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <IconPalette className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav color</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav color"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav place</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav place"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <CakeIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav food</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav food"]}</p>
                  </div>

                   {/* Add other favorites... */}
                   {/* Replace with appropriate icon based on label. */}
                   <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">   
                    <FilmIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav movie</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav movie"]}</p>
                  </div>

                   <div className="mb-2 flex items-center">
                    <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                      <FaceSmileIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav actor/actress</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav actor/actress"]}</p>
                  </div>

                   <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <HeartIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav person</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav person"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <BookOpenIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav book/novel</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav book/novel"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <ScissorsIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Fav dress</label>
                    <p className="text-gray-100">{questionnaire.favorites["fav dress"]}</p>
                  </div>

                </div>

                {/* deep_thoughts Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-inner flex flex-col">
                  <h2 className="text-2xl font-semibold mb-3">Deep Thoughts</h2>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">
                     <UserIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Your crazy dreams</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["your crazy dreams"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                  <ScissorsIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Your hobbies</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["your hobbies"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <PhotoIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Special talents</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["special talents"]}</p>
                  </div>

                   <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <IconHeartBroken className="w-4 h-4 text-gray-400 mr-1 inline-block" />What's your deepest fear?</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["what's your deepest fear?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <PaperAirplaneIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Tell me one secret</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["tell me one secret"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <HeartIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />The most important person in your life</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["the most important person in your life"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <IconMoodKid className="w-4 h-4 text-gray-400 mr-1 inline-block" />What's the most childish thing you still do?</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["what's the most childish thing you still do?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <HeartIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Who's your crush?</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["who's your crush?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <BuildingLibraryIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />On your interest, the person you like to marry</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["on your interest, the person you like to marry"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">   
                  <GlobeAltIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />If you can be invisible, what will you do first?</label>
                    <p className="text-gray-100">{questionnaire.deep_thoughts["if you can be invisible, what will you do first?"]}</p>
                  </div>

                </div>


                {/* for_me Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold mb-3">For me</h2>

                  <div className="mb-2 flex items-center">
                    <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">
                      <IconMoodKid className="w-4 h-4 text-gray-400 mr-1 inline-block"/>A nickname for me</label>
                    <p className="text-gray-100">{questionnaire.for_me["a nickname for me"]}</p>
                  </div>
                    <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2"> 
                    <IconBrandYoutubeFilled className="w-4 h-4 text-gray-400 mr-1 inline-block" />A song you want to dedicate me</label>
                    <p className="text-gray-100">{questionnaire.for_me["a song you want to dedicate me"]}</p>
                  </div>
                    <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <PaperAirplaneIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Relation between you and me</label>
                    <p className="text-gray-100">{questionnaire.for_me["relation between you and me"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <HeartIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />If I was your slave for a day, what would you ask me to do for you?</label>
                    <p className="text-gray-100">{questionnaire.for_me["if i was your slave for a day, what would you ask me to do for you?"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                  <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                    <IconPalette className="w-4 h-4 text-gray-400 mr-1 inline-block" />Which color suits me the most</label>
                    <p className="text-gray-100">{questionnaire.for_me["which color suits me the most"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                   <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">   
                    <PaperAirplaneIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Something you want to tell me</label>
                    <p className="text-gray-100">{questionnaire.for_me["something you want to tell me"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <IconHeartBroken className="w-4 h-4 text-gray-400 mr-1 inline-block" />Something you hate in me</label>
                    <p className="text-gray-100">{questionnaire.for_me["something you hate in me"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">   
                  <HeartIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />Something you like in me</label>
                    <p className="text-gray-100">{questionnaire.for_me["something you like in me"]}</p>
                  </div>

                  <div className="mb-2 flex items-center">
                 <label className="block text-gray-300 text-sm font-bold mb-1 mr-2">  
                  <FaceSmileIcon className="w-4 h-4 text-gray-400 mr-1 inline-block" />What did you feel when you first saw me?</label>
                    <p className="text-gray-100">{questionnaire.for_me["what did you feel when you first saw me?"]}</p>
                  </div>

                </div>


                {/* filled_at timestamp */}
                {questionnaire.filled_at && (
                  <p className="text-gray-500 text-sm mt-4">Filled at: {questionnaire.filled_at}</p>
                )}
              </div>
            )}
          </BackgroundBeamsWithCollision>
        </div>
      </SidebarLayout>
    </>
  );
};

export default FriendsPage;