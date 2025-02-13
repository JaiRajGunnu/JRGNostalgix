// pages/aboutme.tsx

"use client";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Head from "next/head";
import { fakeTestimonials as friends } from "@/components/ui/friends";
export default function AboutMe() {
    return (
        <>
            <Head>
                <title>About Me</title>
                <meta
                    name="description"
                    content="Learn more about [Your Name] and the work they do."
                />
            </Head>
            <SidebarLayout>
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>

                </div>
            </SidebarLayout>
        </>
    );
}
