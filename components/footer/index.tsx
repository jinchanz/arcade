import Image from "next/image";
import Social from "@/components/social";

export default function () {
  return (
    <section>
      <div className="w-screen flex-col px-6 py-6 lg:flex lg:px-10 xl:px-24">
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <p>Arcade</p>
            <p className="font-inter mt-4 max-w-[350px] text-base font-light text-gray-500">
              Generate beautiful arcades with AI.
            </p>
            <div className="mb-8 mt-6">
              <Social />
            </div>
          </div>
          <div className="flex grow flex-row flex-wrap lg:mx-10 lg:flex-nowrap lg:justify-center">
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">Friends</p>
              <a
                href="https://malette.art"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                Malette.Art
              </a>
              <a
                href="https://jinchan.space"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                Jinchan.Space
              </a>
            </div>
            <div className="my-5 mr-8 flex max-w-[200px] grow basis-[100px] flex-col space-y-5 lg:mx-10 lg:mt-0">
              <p className="font-inter font-medium text-black">Credit to</p>
              <a
                href="https://arcade.863.ai"
                target="_blank"
                className="font-inter font-light text-gray-500"
              >
                Arcade
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col lg:mt-0">
            <div className="mb-4 flex flex-col items-center">
              <p className="block">Contact</p>
              <div className="font-inter text-black">
                <Image
                  src='https://i.ablula.tech/malette/assets/qr.jpeg!s'
                  alt='qr code'
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
