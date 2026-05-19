 export interface GalleryPlace {
  id: number;
  title: string;
  category: "Temples" | "Ghats" | "Kunds" | "Nature";
  cover: string;
  images: string[];
}

export const GALLERY_PLACES: GalleryPlace[] = [
  {
    id: 1,
    title: "Prem Mandir",
    category: "Temples",

    cover: "/gallery/kund3.jpg",

    images: [
      "/gallery/prem_mandir3.jpeg",
      "/gallery/prem-mandir/2.jpg",
      "/gallery/prem-mandir/3.jpg",
      "/gallery/prem-mandir/4.jpg",
      "/gallery/prem-mandir/5.jpg",
    ],
  },

  {
    id: 2,
    title: "Banke Bihari Mandir",
    category: "Temples",

    cover: "/gallery/banke-bihari/1.jpg",

    images: [
      "/gallery/banke-bihari/1.jpg",
      "/gallery/banke-bihari/2.jpg",
      "/gallery/banke-bihari/3.jpg",
      "/gallery/banke-bihari/4.jpg",
    ],
  },

  {
    id: 3,
    title: "ISKCON Vrindavan",
    category: "Temples",

    cover: "/gallery/iskcon/1.jpg",

    images: [
      "/gallery/iskcon/1.jpg",
      "/gallery/iskcon/2.jpg",
      "/gallery/iskcon/3.jpg",
    ],
  },

  {
    id: 4,
    title: "Vishram Ghat",
    category: "Ghats",

    cover: "/gallery/vishram-ghat/1.jpg",

    images: [
      "/gallery/vishram-ghat/1.jpg",
      "/gallery/vishram-ghat/2.jpg",
      "/gallery/vishram-ghat/3.jpg",
    ],
  },

  {
    id: 5,
    title: "Radha Kund",
    category: "Kunds",

    cover: "/gallery/radha-kund/1.jpg",

    images: [
      "/gallery/radha-kund/1.jpg",
      "/gallery/radha-kund/2.jpg",
      "/gallery/radha-kund/3.jpg",
    ],
  },

  {
    id: 6,
    title: "Nidhivan",
    category: "Nature",

    cover: "/gallery/nidhivan/1.jpg",

    images: [
      "/gallery/nidhivan/1.jpg",
      "/gallery/nidhivan/2.jpg",
      "/gallery/nidhivan/3.jpg",
      "/gallery/nidhivan/4.jpg",
    ],
  },
];