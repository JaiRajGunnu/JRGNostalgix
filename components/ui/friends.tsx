"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  fullname: string;
  king: boolean,
  email: string;
  src: string;
};

// Short Testimonials Data
export const shortTestimonials: Testimonial[] = [
  {
    "id": 11092202,
    "quote": "You're not just a friend, you're family. Thanks for always being my ride or die, Kanna!",
    "name": "Kanna",
    "fullname": "Sai Tarun",
    "king": true,
    "email": "esaitarun12@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 10112003,
    "quote": "Thanks for all the laughs and for being the bestie ever since topper day. Let's become CEOs of one company and get rich together! 😂",
    "name": "Vissu",
    "fullname": "Viswanadham",
    "king": true,
    "email": "viswanadhkillamsetty422@gmail.com",
    "src": "/img/img3.avif"
  },
  {
    "id": 10012001,
    "quote": "I know I can always count on you to say 'You know all, man!' Thanks for always being honest.",
    "name": "Likki",
    "fullname": "Likhith",
    "king": true,
    "email": "likhithsarvisetti@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 10013432001,
    "quote": "To the heart and soul, and the girl with no secrets! My CB ! ❤️(♾️❤️). Thanks for always being there, Chinnu.",
    "name": "Chinnuu",
    "fullname": "Keerthika",
    "king": false,
    "email": "keerthikabandaru2003@gmail.com",
    "src": "/img/female/img_chinnu.jpg"
  },
  {
    "id": 100128766001,
    "quote": "Briyani is ready 🤫 . Thank you for support and guidance always .",
    "name": "Pavii",
    "fullname": "Rakshanna",
    "king": false,
    "email": "pavith2602@gmail.com",
    "src": "/img/female/img_raksh.jpg"
  },
  {
    "id": 10014542001,
    "quote": "Thanks for the great company we shared in college. Even now, if you could, you'd still follow me anywhere! I'm grateful for your support."
,
    "name": "Praneeth",
    "fullname": "Sri Praneeth",
    "king": true,
    "email": "praneethyakkala@gmail.com",
    "src": "/img/img3.avif"
  },
  {
    "id": 10012676001,
    "quote": "Genuine and straight to the point, I appreciate the honesty and our love in college.",
    "name": "Gopi",
    "fullname": "Gopi Krishna",
    "king": true,
    "email": "gopikrishnaanagani25@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 1001542001,
    "quote": "Thanks for always encouraging me to be myself and also being a new for me .",
    "name": "Magii",
    "fullname": "Lakshmi Madhuri",
    "king": false,
    "email": "lakshmimadhuriakula@gmail.com",
    "src": "/img/female/img_maggi.jpg"
  },
  {
    "id": 1034012001,
    "quote": "Thanks for always helping me in all my works. You mean a lot.",
    "name": "Bathuu",
    "fullname": "Bhargavi",
    "king": false,
    "email": "madinibharu@gmail.com",
    "src": "/img/female/img_bharu.jpg"
  },
  {
    "id": 10012054501,
    "quote": "A mystery wrapped in a Biryani and a thousand chocolates. I always enjoy your company. ",
    "name": "Paddhu",
    "fullname": "Padma Sri",
    "king": false,
    "email": "padmasri.02pandranki@gmail.com",
    "src": "/img/female/img_chingu.jpg"
  },
  {
    "id": 10014342001,
    "quote": "Always a fun time with you. Thanks for being around even though there is nothing you hate about me.",
    "name": "Giri",
    "fullname": "Gireesh",
    "king": true,
    "email": "gireeshpotunuru@gmail.com",
    "src": "/img/img3.avif"
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

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const isActive = (index: number) => index === active;

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
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
                    <Image
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex justify-between flex-col py-4">
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
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
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
