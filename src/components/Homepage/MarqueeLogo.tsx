import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";

const reviews = [
  {
    id: 1,
    img: "/assets/brand/alsalam.png",
  },
  {
    id: 2,
    img: "/assets/brand/Ayodya.png",
  },
  {
    id: 3,
    img: "/assets/brand/bestwestern.png",
  },
  {
    id: 4,
    img: "/assets/brand/crowne.png",
  },
  {
    id: 5,
    img: "/assets/brand/Juju.png",
  },
  {
    id: 6,
    img: "/assets/brand/Kimeros.png",
  },
  {
    id: 7,
    img: "/assets/brand/Swandor.png",
  },
];

const firstRow = reviews; // Ambil semua logo tanpa pemotongan

const MarqueLogo = ({ img, id }: { img: string; id: number }) => {
  return (
    <figure className="flex items-center justify-center w-[128px] h-[128px] mx-4 overflow-hidden ">
      <img
        className="object-contain w-full h-full"
        alt={`Partner logo ${id}`}
        src={img}
      />
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex mt-40 sm:mt-20 lg:mt-40 w-full flex-col items-center justify-center overflow-hidden lg:mb-10  ">
      <h1 className="text-[24px] sm:text-[24px] text-textlayout  md:text-[50px] lg:text-[50px] font-bold  relative mb-8">
        Our Clients
      </h1>
      <Marquee
        pauseOnHover
        className="[--duration:20s] max-w-[330px] sm:max-w-[1100px]  lg:max-w-[1120px] mx-auto py-10"
      >
        {firstRow.map((review) => (
          <MarqueLogo key={review.id} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
