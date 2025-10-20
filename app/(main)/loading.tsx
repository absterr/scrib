import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = ({ className = "" }: { className?: string }) => (
  <CarouselItem
    className={`basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4 ${className}`}
  >
    <Skeleton className="h-30 w-34 md:h-32 md:w-38" />
  </CarouselItem>
);

const HomeLoading = () => (
  <div className="min-h-screen max-w-xs md:max-w-xl lg:max-w-4xl py-8 px-4 mx-auto">
    <div className="pb-28 flex items-center justify-center">
      <Skeleton className="h-8 w-52 md:h-10 md:w-82" />
    </div>
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton className="hidden md:block" />
          <CardSkeleton className="hidden lg:block" />
          <CardSkeleton className="hidden lg:block" />
        </CarouselContent>
      </Carousel>
    </div>
  </div>
);

export default HomeLoading;
