import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => (
  <div className="min-h-screen max-w-4xl py-8 mx-auto px-4">
    <div className="mb-16 flex items-center justify-center">
      <Skeleton className="h-10 w-82" />
    </div>
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="basis-1/5 pl-4">
            <Skeleton className="h-32 w-38" />
          </CarouselItem>
          <CarouselItem className="basis-1/5 pl-4">
            <Skeleton className="h-32 w-38" />
          </CarouselItem>
          <CarouselItem className="basis-1/5 pl-4">
            <Skeleton className="h-32 w-38" />
          </CarouselItem>
          <CarouselItem className="basis-1/5 pl-4">
            <Skeleton className="h-32 w-38" />
          </CarouselItem>
          <CarouselItem className="basis-1/5 pl-4">
            <Skeleton className="h-32 w-38" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </div>
);

export default HomeLoading;
