import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => (
  <CarouselItem className="basis-1/5 pl-4">
    <Skeleton className="h-32 w-38" />
  </CarouselItem>
);

const HomeLoading = () => (
  <div className="min-h-screen max-w-xs md:max-w-xl lg:max-w-4xl py-8 px-4 mx-auto">
    <div className="pb-28 flex items-center justify-center">
      <Skeleton className="h-10 w-82" />
    </div>
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>
);

export default HomeLoading;
