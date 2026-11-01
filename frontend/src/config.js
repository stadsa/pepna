export const siteConfig = {
  // Identitas dan kontak masih menunggu konfirmasi.
  brand: "Eco-Peptonila",
  productName: "Eco-Peptonila",

  // Kontak contoh untuk pengujian interaksi (ganti dengan nomor asli nanti)
  whatsapp: "",
  contactEmail: "info@pepna.id",
  instagram: "@pepna.id",

  // Background utama halaman beranda (sesuai referensi revisi)
  heroBackground: "/images/Eco-Peptonila_background_bersih.png",

  // Foto produk utama untuk tampilan mobile/dokumentasi
  productImage: "/images/hero-product-clean.png",

  // Gambar sementara.
  heroImage:
    "https://images.unsplash.com/photo-1770653210996-61608f8a6fc3?crop=entropy&cs=srgb&fm=jpg&q=85",

  pondImage:
    "https://images.unsplash.com/photo-1787410798566-b9ed464c4ed3?crop=entropy&cs=srgb&fm=jpg&q=85",

  processImage:
    "https://images.unsplash.com/photo-1617448570646-652843c87581?crop=entropy&cs=srgb&fm=jpg&q=85",

  // Lokasi sumber bahan baku (contoh/dummy yang dapat diganti nanti)
sourceLocation: {
  name: "CV A Sabat Samudra",
  address:
    "Kantor: Kahuripan Nirwana Blok BB 2 No.1–2, Kel. Entalsewu, Kec. Buduran, Kab. Sidoarjo, Jawa Timur",
  note: "Informasi kantor pemasok bahan ikan nila",

  embedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(
      "CV A Sabat Samudra, Kahuripan Nirwana Blok BB 2 No.1-2, Entalsewu, Buduran, Sidoarjo"
    ) +
    "&hl=id&z=16&output=embed",

  mapsUrl: "https://maps.app.goo.gl/NYHk6KsNePJA9tbCA",

  websiteUrl:
    "https://www.jualikanfillet.com/berita/profil/legalitas-bisnis",
},

  // Contoh video sampel online untuk mendemokan pemutar video & navigasi lompat detik
  videos: {
    process: {
      // Contoh file video online (tema air/laut/perikanan)
      src: "https://vjs.zencdn.net/v/oceans.mp4",
      poster:
        "https://images.unsplash.com/photo-1617448570646-652843c87581?crop=entropy&cs=srgb&fm=jpg&q=85",

      // Waktu mulai per proses (dalam detik)
      steps: [
        {
          id: "persiapan",
          title: "Persiapan bahan",
          start: 0,
        },
        {
          id: "pengolahan",
          title: "Pengolahan",
          start: 10,
        },
        {
          id: "penyelesaian",
          title: "Penyelesaian",
          start: 20,
        },
        {
          id: "pengemasan",
          title: "Pengemasan",
          start: 30,
        },
        {
          id: "pemeriksaan",
          title: "Pemeriksaan produk",
          start: 38,
        },
      ],
    },

    usage: {
      // Contoh video penggunaan/penyajian
      src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1770653210996-61608f8a6fc3?crop=entropy&cs=srgb&fm=jpg&q=85",
      steps: [],
    },
  },
};

export const navItems = [
  ["home", "Beranda", "House"],
  ["halal", "Kehalalan", "ShieldCheck"],
  ["ingredients", "Bahan", "Waves"],
  ["process", "Proses", "Factory"],
  ["buy", "Pesan", "ShoppingBag"],
];