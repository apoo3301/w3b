import React, { useRef } from 'react'
import { LayoutGrid } from '../layoutGrid'
import { motion } from 'framer-motion'

const LifestyleComp = () => {
    const parallaxRef = useRef(null)
    return (
        <section className="py-20 bg-gray-50 text-white overflow-hidden" ref={parallaxRef}>
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Lifestyle
                </motion.h2>
                <div className="h-screen py-20 w-full">
                    <LayoutGrid cards={cards} />
                </div>
            </div>
        </section>
    )
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                House in the woods
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A serene and tranquil retreat, this house in the woods offers a peaceful
                escape from the hustle and bustle of city life.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                House above the clouds
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Perched high above the world, this house offers breathtaking views and a
                unique living experience. It&apos;s a place where the sky meets home,
                and tranquility is a way of life.
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Greens all over
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Rivers are serene
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A house by the river is a place of peace and tranquility. It&apos;s the
                perfect place to relax, unwind, and enjoy life.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail:
            "https://static.wixstatic.com/media/39f71a_4035a429d2a147dba6835f5cfda5fd51~mv2.jpg/v1/fill/w_1645,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/site.jpg",
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail:
            "https://static.wixstatic.com/media/39f71a_f05825214449450ba5097043ada027ab~mv2.jpg/v1/fill/w_285,h_285,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/39f71a_f05825214449450ba5097043ada027ab~mv2.jpg",
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: "https://static.wixstatic.com/media/39f71a_24fb5bed449e4e8fa5e5f821a4c02a3b~mv2.jpg/v1/fill/w_285,h_285,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/39f71a_24fb5bed449e4e8fa5e5f821a4c02a3b~mv2.jpg",
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail:
            "https://static.wixstatic.com/media/39f71a_ca84222d51044856be9807ede5d54788~mv2.jpg/v1/fill/w_1785,h_745,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Fd%20site.jpg",
    },
];

export default LifestyleComp

