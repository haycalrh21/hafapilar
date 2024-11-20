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
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden mb-40  ">
      <h1 className="text-[24px] font-bold md:text-[36px] lg:text-[48px] xl:text-[48px] text-hero mb-2 leading-tight lg:leading-[70px]  ">
        Our Partner
      </h1>
      <Marquee pauseOnHover className="[--duration:20s] mt-10">
        {firstRow.map((review) => (
          <MarqueLogo key={review.id} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
