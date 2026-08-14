export type GalleryItem = {
  id: string;
  // Path under /public/gallery/, e.g. "/gallery/01.jpg"
  src: string;
  caption?: string;
  // Optional: links this piece back to its full case study in the Memory Bank
  projectId?: string;
};

// Add entries here once real screenshots are supplied — nothing else needs
// to change. Example shape:
// {
//   id: "muratish-01",
//   src: "/gallery/muratish-01.jpg",
//   caption: "Jenga Foundation opener — Muratish",
//   projectId: "muratish",
// }
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "tot-case-study-cover",
    src: "/work/testimony-of-three/03.jpg",
    caption: "Testimony of Three — case study cover",
    projectId: "testimony-of-three",
  },
  {
    id: "muratish-sherehe",
    src: "/work/muratish/06.jpg",
    caption: "Muratish — \"Are you really in a KE sherehe if...\"",
    projectId: "muratish",
  },
  {
    id: "mindfluence-no-influencers",
    src: "/work/mindfluence-content/01.jpg",
    caption: "Mindfluence Deep Dive — \"No Influencers\"",
    projectId: "mindfluence-content",
  },
  {
    id: "tot-design-sketch",
    src: "/work/testimony-of-three/04.jpg",
    caption: "Testimony of Three — industrial design sketch",
    projectId: "testimony-of-three",
  },
  {
    id: "mindfluence-issue-002",
    src: "/work/mindfluence-content/02.jpg",
    caption: "Mindfluence Investigative Series — Issue 002",
    projectId: "mindfluence-content",
  },
  {
    id: "mindfluence-issue-001",
    src: "/work/mindfluence-content/03.jpg",
    caption: "Mindfluence Investigative Series — Issue 001, cults & retention",
    projectId: "mindfluence-content",
  },
  {
    id: "muratish-jenga-foundation",
    src: "/work/muratish/07.jpg",
    caption: "Jenga Foundation na Muratish",
    projectId: "muratish",
  },
  {
    id: "tot-sandal-product",
    src: "/work/testimony-of-three/05.jpg",
    caption: "Testimony of Three — product shot",
    projectId: "testimony-of-three",
  },
  {
    id: "muratish-travels-diani",
    src: "/work/muratish/08.jpg",
    caption: "Muratish Travels — Diani Beach",
    projectId: "muratish",
  },
];
