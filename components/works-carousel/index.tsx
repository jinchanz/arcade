import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

const WorksCarousel = ( { images }: any ) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 3000); // 3000 毫秒（3秒）切换一次图片

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="carousel h-full w-full overflow-hidden">
      <div className="carousel-inner relative h-full w-full flex items-center justify-center">
        {images.map((image: Record<string, any>, index: number) => (
          <div
            key={index}
            className={`carousel-item absolute h-full w-full flex items-center justify-center transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 图片，底部黑色半透明蒙版 */}
            <img src={image.url} alt="" className="h-full w-full object-cover" />
            <div className="absolute right-0 bottom-0 left-0">
              <div className="w-full mx-auto flex gap-x-2 py-2 items-center justify-center bg-black opacity-80">
                  <p className="text-white px-5 ">{image.prompt}</p>
                  <div>
                    <Button
                      className='text-white'
                      variant="link"
                      onClick={() => {
                        window.location.href = '/generate';
                      }}
                    >
                      一键同款
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksCarousel;