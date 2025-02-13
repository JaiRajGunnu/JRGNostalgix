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
  email: string;
  src: string;
};

// Fake Testimonials Data
export const fakeTestimonials: Testimonial[] = [
  {
    "id": 11092202,
    "quote": "Junnu's coding skills are next level! He builds amazing projects with such ease and creativity.",
    "name": "Kanna",
    "fullname": "Sai Tarun",
    "email": "esaitarun12@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 10112003,
    "quote": "Junnu's dedication and passion for tech are truly inspiring. He never stops learning!",
    "name": "Vissu",
    "fullname": "Viswanadham",
    "email": "viswanadhkillamsetty422@gmail.com",
    "src": "/img/img3.avif"
  },
  {
    "id": 10012001,
    "quote": "A true problem solver! Junnu has a unique way of tackling challenges and coming up with brilliant solutions.",
    "name": "Likki",
    "fullname": "Likhith",
    "email": "likhithsarvisetti@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 10013432001,
    "quote": "Junnu is an amazing friend! Always supportive and kind. Blessed to have him in my life.",
    "name": "Chinnuu",
    "fullname": "Keerthika",
    "email": "keerthikabandaru2003@gmail.com",
    "src": "/img/img2.avif"
  },
  {
    "id": 100128766001,
    "quote": "Junnu is a wonderful friend with a golden heart! Always there to support and uplift others.",
    "name": "Pavii",
    "fullname": "Rakshanna",
    "email": "pavith2602@gmail.com",
    "src": "/img/img4.avif"
  },
  {
    "id": 10014542001,
    "quote": "A great leader and motivator! Junnu inspires everyone around him with his energy and positivity.",
    "name": "Praneeth",
    "fullname": "Sri Praneeth",
    "email": "praneethyakkala@gmail.com",
    "src": "/img/img3.avif"
  },
  {
    "id": 10012676001,
    "quote": "Junnu's kindness and wisdom make him an incredible person. Always a pleasure to be around him!",
    "name": "Gopi",
    "fullname": "Gopi Krishna",
    "email": "gopikrishnaanagani25@gmail.com",
    "src": "/img/img1.avif"
  },
  {
    "id": 1001542001,
    "quote": "A true gem of a friend! Junnu brings happiness and warmth wherever he goes.",
    "name": "Magii",
    "fullname": "Lakshmi Madhuri",
    "email": "lakshmimadhuriakula@gmail.com",
    "src": "/img/img2.avif"
  },
  {
    "id": 1034012001,
    "quote": "Junnu's support and understanding make every moment special. A friend like no other!",
    "name": "Bathuu",
    "fullname": "Bhargavi",
    "email": "madinibharu@gmail.com",
    "src": "/img/img4.avif"
  },
  {
    "id": 10012054501,
    "quote": "Junnu's generosity and humor make every day brighter. Truly a one-of-a-kind friend!",
    "name": "Paddhu",
    "fullname": "Padma Sri",
    "email": "padmasri.02pandranki@gmail.com",
    "src": "/img/img2.avif"
  },
  {
    "id": 10014342001,
    "quote": "A friend who understands without words! Junnu’s presence is always comforting.",
    "name": "Giri",
    "fullname": "Gireesh",
    "email": "gireeshpotunuru@gmail.com",
    "src": "/img/img3.avif"
  },
];

export const Friends = ({
  testimonials = fakeTestimonials,
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
