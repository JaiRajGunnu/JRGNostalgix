"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence, disableInstantTransitions } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import DisableRightClick from '../disablerightclick';

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  fullname: string;
  king: boolean;
  email: string;
  src: string;
};

// Short Testimonials Data
export const shortTestimonials: Testimonial[] = [
  {
    id: 11092202,
    quote:
      "You're not just a friend, you're family. Thanks for always being my ride or die, Kanna! 🥹❤️",
    name: "Kanna",
    fullname: "Sai Tarun",
    king: true,
    email: "esaitarun12@gmail.com",
    src: "/img/kings/imgkanna.jpg",
  },
  {
    id: 10112003,
    quote:
      "Thanks for all the laughs and for being the bestie ever since topper day. Let's become CEOs and get rich together! 😂💖",
    name: "Vissu",
    fullname: "Viswanadham",
    king: true,
    email: "viswanadhkillamsetty422@gmail.com",
    src: "/img/kings/imgvissu.jpg",
  },
  {
    id: 10012001,
    quote:
      "I know I can always count on you to say ' You know all, man! '. Thanks for always being. 🤗💝",
    name: "Likki",
    fullname: "Likhith",
    king: true,
    email: "likhithsarvisetti@gmail.com",
    src: "/img/kings/imglikki.jpg",
  },
  {
    id: 10013432001,
    quote:
      "To the heart and soul, and the girl with no secrets! Thanks for always being there, Chinnu.  My CB ! 🥰💘 ",
    name: "Chinnuu",
    fullname: "Keerthika",
    king: false,
    email: "keerthikabandaru2003@gmail.com",
    src: "/img/queens/imgchinnu.jpg",
  },
  {
    id: 100128766001,
    quote:
      "Biryani is ready 🤫 Thank you for your support and your family's guidance. Always grateful. 🫶💙",
    name: "Pavii",
    fullname: "Rakshanna",
    king: false,
    email: "pavith2602@gmail.com",
    src: "/img/queens/imgraksh.jpg",
  },
  {
    id: 10014542001,
    quote:
      "Thanks for the great company in mid-age. Even now, if you could, you'd still follow me anywhere! I'm grateful for you. 🤗🩷",
    name: "Praneeth",
    fullname: "Sri Praneeth",
    king: true,
    email: "praneethyakkala@gmail.com",
    src: "/img/kings/imgpraneeth.jpg",
  },
  {
    id: 10012676001,
    quote:
      "Genuine and straight to the point, I appreciate the honesty and our love in college. 🤟❤️‍🔥",
    name: "Gopi",
    fullname: "Gopi Krishna",
    king: true,
    email: "gopikrishnaanagani25@gmail.com",
    src: "/img/kings/imggopi.jpg",
  },
  {
    id: 1001542001,
    quote:
      "Thanks for always encouraging me to be myself and also being a new for me. 😍💓",
    name: "Magii",
    fullname: "Lakshmi Madhuri",
    king: false,
    email: "lakshmimadhuriakula@gmail.com",
    src: "/img/queens/imgmaggi.jpg",
  },
  {
    id: 1034012001,
    quote: "Thanks for always being there for me. I hope I never caused you any hurt. 🥹💗",
    name: "Bharuu",
    fullname: "Bhargavi",
    king: false,
    email: "madinibharu@gmail.com",
    src: "/img/queens/imgbharu.jpg",
  },
  {
    id: 10012054501,
    quote:
      "A mystery wrapped in biryani and a thousand chocolates. Thank you for the unforgettable adventures. 🤠💜",
    name: "Paddhu",
    fullname: "Padma Sri",
    king: false,
    email: "padmasri.02pandranki@gmail.com",
    src: "/img/queens/imgchinguu.jpg",
  },
  {
    id: 10014342001,
    quote:
      "Always a fun time with you. Thanks for being around even though there is nothing you hate about me. 🤗💛",
    name: "Giri",
    fullname: "Gireesh",
    king: true,
    email: "gireeshpotunuru@gmail.com",
    src: "/img/kings/imggiri.jpg",
  },
];

export const Friends = ({
  testimonials = shortTestimonials,
  autoplay = true,
}: {
  testimonials?: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleNext = () => {
    if (testimonials.length > 0) {
      setActive((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (testimonials.length > 0) {
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const startAutoplay = () => {
    if (autoplay && testimonials.length > 0 && !isPaused) {
      intervalRef.current = window.setInterval(handleNext, 5000);
    }
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay(); // Start autoplay on initial load

    return () => {
      stopAutoplay(); // Clear interval on unmount
    };
  }, [autoplay, testimonials.length, isPaused]);

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoplay(); // Pause autoplay on mouse enter
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAutoplay(); // Resume autoplay on mouse leave
  };

  return (
    <div
      className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-8 md:px-8 lg:px-12 py-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {testimonials.length > 0 ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Left: Image Slider */}
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 999
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <DisableRightClick>
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl  object-cover object-center"
                    />
                    </DisableRightClick>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
         </div>

          {/* Right: Text Content */}
          <div className="flex justify-between flex-col py-4 mt-[-20] md:mt-0 lg:mt-0">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4 justify-between">
                <div className="items-start justify-start">
                  <h3 className="text-2xl font-bold dark:text-white text-black">
                    {testimonials[active]?.name}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-neutral-500">
                    {testimonials[active]?.fullname}
                  </p>
                </div>

                <div className="flex justify-end items-end">
                  <Link href={`/community/${testimonials[active]?.id}`}>
                    <button className="w-[9rem] shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative"> {/* Container for quote and small image */}
                <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
                  {testimonials[active]?.quote?.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word} 
                    </motion.span>
                  ))}
                </motion.p>

                {/* Small Image */}
                <div className="flex top-0 mt-3 left-0 ml-[-5px] ">
                <DisableRightClick>
                  <Image
                    src="/img/byai.png"  
                    alt="by AI"
                    width={150}   
                    height={150}  
                    objectFit="contain" 
                    className="rounded-full opacity-[0.8]"
                    draggable="false"
                  />
                  </DisableRightClick>
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <div className="flex gap-4 pt-12 md:pt-0 justify-center md:justify-start lg:justify-start">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {/* Slide Counter */}
                  <button
                    onClick={handlePrev}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                  </button>

                  <p className="text-sm font-semibold text-gray-700 dark:text-neutral-400 text-center md:text-left mt-[-5px]">
                    {active + 1} / {testimonials.length}
                  </p>

                  <button
                    onClick={handleNext}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-neutral-400">
          There are no friends available in this community.
        </p>
      )}
    </div>
  );
};