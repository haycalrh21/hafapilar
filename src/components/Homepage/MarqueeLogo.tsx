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
    <figure>
      <img
        className="rounded-full object-contain"
        width="128" // Ubah ukuran sesuai kebutuhan
        height="128" // Ubah ukuran sesuai kebutuhan
        alt=""
        src={img}
      />
    </figure>
  );
};

export default function MarqueeDemo() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden mb-40  ">
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
