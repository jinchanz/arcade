import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s by Malette.Art",
    default: "AI Arcade by Malette.Art",
  },
  description: "AI Architecture Design, AI Artwork, AI Drawing, AI Painting, AI Illustration, AI Animation, AI Cartoon, AI Portrait, AI Landscape, AI Cityscape, AI Seascape, AI Space, AI Fantasy, AI Anime, AI Manga, AI Comic, AI Pixel Art, AI Game, AI Character, AI Logo, AI Icon, AI Emoji, AI GAN, AI VQGAN, AI DALL-E, AI CLIP, AI BigGAN, AI StyleGAN, AI ProGAN, AI CycleGAN, AI GPT, AI DALL-E 2, AI CLIP 2, AI BigGAN 2, AI StyleGAN 2, AI ProGAN 2, AI CycleGAN 2, AI GPT 2, AI DALL-E 3, AI CLIP 3, AI BigGAN 3, AI StyleGAN 3, AI ProGAN 3, AI CycleGAN 3, AI GPT 3, AI DALL-E 4, AI CLIP 4, AI BigGAN 4, AI StyleGAN 4, AI ProGAN 4, AI CycleGAN 4, AI GPT 4, AI DALL-E 5, AI CLIP 5, AI BigGAN 5, AI StyleGAN 5, AI ProGAN 5, AI CycleGAN 5, AI GPT 5, AI DALL-E 6, AI CLIP 6, AI BigGAN 6, AI StyleGAN 6, AI ProGAN 6, AI CycleGAN 6, AI GPT 6, AI DALL-E 7, AI CLIP 7, AI BigGAN 7, AI StyleGAN 7, AI ProGAN 7, AI CycleGAN 7, AI GPT 7, AI DALL-E 8, AI CLIP 8, AI BigGAN 8, AI StyleGAN 8, AI ProGAN 8, AI CycleGAN 8, AI GPT 8, AI DALL-E 9, AI CLIP 9, AI BigGAN 9, AI StyleGAN 9, AI ProGAN 9, AI CycleGAN 9, AI GPT 9, AI DALL-E 10, AI CLIP 10, AI BigGAN 10, AI StyleGAN 10, AI ProGAN 10, AI CycleGAN 10, AI GPT 10, AI",
  keywords: "Architecture, Arcade, Artwork, Drawing, Painting, Illustration, Animation, Cartoon, Portrait, Landscape, Cityscape, Seascape, Space, Fantasy, Anime, Manga, Comic, Pixel Art, Game, Character, Logo, Icon, Emoji, GAN, VQGAN, DALL-E, CLIP, BigGAN, StyleGAN, ProGAN, CycleGAN, GPT, DALL-E 2, CLIP 2, BigGAN 2, StyleGAN 2, ProGAN 2, CycleGAN 2, GPT 2, DALL-E 3, CLIP 3, BigGAN 3, StyleGAN 3, ProGAN 3, CycleGAN 3, GPT 3, DALL-E 4, CLIP 4, BigGAN 4, StyleGAN 4, ProGAN 4, CycleGAN 4, GPT 4, DALL-E 5, CLIP 5, BigGAN 5, StyleGAN 5, ProGAN 5, CycleGAN 5, GPT 5, DALL-E 6, CLIP 6, BigGAN 6, StyleGAN 6, ProGAN 6, CycleGAN 6, GPT 6, DALL-E 7, CLIP 7, BigGAN 7, StyleGAN 7, ProGAN 7, CycleGAN 7, GPT 7, DALL-E 8, CLIP 8, BigGAN 8, StyleGAN 8, ProGAN 8, CycleGAN 8, GPT 8, DALL-E 9, CLIP 9, BigGAN 9, StyleGAN 9, ProGAN 9, CycleGAN 9, GPT 9, DALL-E 10, CLIP 10, BigGAN 10, StyleGAN 10, ProGAN 10, CycleGAN 10, GPT 10, AI, Malette.Art, Jinchan.Space, Arcade.863.AI, AI arcade, AI Artwork, AI Drawing, AI Painting, AI Illustration, AI Animation, AI Cartoon, AI Portrait, AI Landscape, AI Cityscape, AI Seascape, AI Space, AI Fantasy, AI Anime, AI Manga, AI Comic, AI Pixel Art, AI Game, AI Character, AI Logo, AI Icon, AI Emoji, AI GAN, AI VQGAN, AI DALL-E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" richColors />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
