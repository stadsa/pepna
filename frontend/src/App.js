import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Factory,
  Fish,
  House,
  Image as ImageIcon,
  Instagram,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";

import { siteConfig, navItems } from "@/config";
import ProductVideo from "@/ProductVideo";
import heroBackgroundImg from "./assets/Eco-Peptonila_background_bersih.png";

import "@/App.css";

/* =========================
   DATA DOKUMENTASI
   ========================= */

// Foto belum tersedia.
// Setelah tersedia, isi image dengan:
// "/images/nama-foto.jpg"
//
// Letakkan foto di:
// frontend/public/images/

const halalDocumentation = [
  {
    id: "preparasi-ikan",
    title: "Preparasi bahan ikan",
    description:
      "Dokumentasi perebusan bahan ikan nila pada tahap preparasi sebelum pengolahan lebih lanjut.",
    image: "/images/halal-preparasi-ikan.png",
    alt: "Bahan ikan nila dalam panci pada tahap perebusan",
  },
  {
    id: "bonggol-nanas",
    title: "Bonggol nanas",
    description:
      "Dokumentasi penimbangan bonggol nanas yang digunakan sebagai sumber bromelain dalam proses hidrolisis protein.",
    image: "/images/halal-bonggol-nanas.png",
    alt: "Penimbangan bonggol nanas menggunakan timbangan digital",
  },
  {
    id: "pengaturan-ph",
    title: "Pengaturan pH",
    description:
      "Dokumentasi pemeriksaan pH campuran bahan sebagai bagian dari pengendalian kondisi pengolahan.",
    image: "/images/halal-pengaturan-ph.png",
    alt: "Pengukuran pH campuran bahan menggunakan pH meter",
  },
  {
    id: "kemasan",
    title: "Kemasan produk",
    description:
      "Visual kemasan sachet Eco-Peptonila yang menampilkan identitas produk.",
    image: "/images/halal-kemasan.png",
    alt: "Visual kemasan sachet Eco-Peptonila",
  },
];

/* Keunggulan produk pada baris fitur beranda */

const heroHighlights = [
  {
    icon: ShieldCheck,
    title: "Halal terjaga",
    copy: "Bahan & proses terpilih",
  },
  {
    icon: Fish,
    title: "Nila pilihan",
    copy: "Dibudidayakan dengan baik",
  },
  {
    icon: Package,
    title: "Proses higienis",
    copy: "Standar bersih setiap langkah",
  },
];

/* =========================
   IKON DAN JUDUL
   ========================= */

function Icon({ name, size = 18 }) {
  const icons = {
    House,
    ShieldCheck,
    Waves,
    Factory,
    Utensils,
    ShoppingBag,
  };

  const IconComponent = icons[name] || Fish;

  return (
    <IconComponent
      size={size}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  light = false,
}) {
  return (
    <div
      className={`section-title ${
        light ? "light" : ""
      }`}
    >
      <span className="eyebrow">
        {eyebrow}
      </span>

      <h2>{title}</h2>

      {copy && <p>{copy}</p>}
    </div>
  );
}

/* =========================
   GALERI DOKUMENTASI
   ========================= */

function HalalSection() {
  const [activeSlide, setActiveSlide] =
    useState(0);

  const [touchStartX, setTouchStartX] =
    useState(null);

  const [failedImages, setFailedImages] =
    useState([]);

  const slide =
    halalDocumentation[activeSlide];

  const imageAvailable =
    Boolean(slide.image) &&
    !failedImages.includes(slide.image);

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0
        ? halalDocumentation.length - 1
        : current - 1
    );
  };

  const nextSlide = () => {
    setActiveSlide(
      (current) =>
        (current + 1) %
        halalDocumentation.length
    );
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const distance =
      touchStartX -
      event.changedTouches[0].clientX;

    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      previousSlide();
    }

    setTouchStartX(null);
  };

  const handleImageError = () => {
    setFailedImages((current) =>
      current.includes(slide.image)
        ? current
        : [...current, slide.image]
    );
  };

  return (
    <section
  id="halal"
  className="section section-anchor pale"
  style={{
    "--halal-bg-url": 'url("/images/background-kehalalan.png")',
  }}
>
      <div className="container">
        <SectionTitle
  title="Bahan, pengolahan, dan kemasan."
  copy="Kenali bahan yang digunakan, dokumentasi pengolahan, dan visual kemasan Eco-Peptonila."
/>

        <div className="halal-documentation-grid">
          <div className="halal-documentation-intro">
            <span className="eyebrow">
  Dokumentasi produk
</span>

<h3>Bahan hingga kemasan</h3>

<p>
  Pilih bagian untuk melihat preparasi bahan ikan,
  penimbangan bonggol nanas, pemeriksaan pH,
  dan visual kemasan produk.
</p>

            <ol className="halal-topic-list">
              {halalDocumentation.map(
                (item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`halal-topic-button ${
                        activeSlide === index
                          ? "is-active"
                          : ""
                      }`}
                      aria-pressed={
                        activeSlide === index
                      }
                      aria-controls="halal-gallery-slide"
                      onClick={() =>
                        setActiveSlide(index)
                      }
                    >
                      <span className="halal-topic-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span>
                        {item.title}
                      </span>

                      <ChevronRight
                        size={18}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              )}
            </ol>
          </div>

          <div
            className="halal-gallery"
            role="region"
            aria-roledescription="karusel"
            aria-label="Galeri dokumentasi bahan dan proses"
          >
            <div
              className="halal-gallery-media"
              onTouchStart={(event) =>
                setTouchStartX(
                  event.touches[0].clientX
                )
              }
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() =>
                setTouchStartX(null)
              }
            >
              {imageAvailable ? (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.alt}
                  onError={handleImageError}
                />
              ) : (
                <div className="halal-gallery-placeholder">
                  <ImageIcon
                    size={44}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  <strong>
                    {slide.image
                      ? "Foto belum dapat ditampilkan"
                      : "Dokumentasi belum tersedia"}
                  </strong>

                  <span>
                    {slide.title}
                  </span>
                </div>
              )}
            </div>

            <div
              id="halal-gallery-slide"
              className="halal-gallery-caption"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="eyebrow">
                Dokumentasi{" "}
                {String(
                  activeSlide + 1
                ).padStart(2, "0")}
              </span>

              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>

            <div className="halal-gallery-controls">
              <button
                type="button"
                className="halal-gallery-arrow"
                onClick={previousSlide}
                aria-label="Dokumentasi sebelumnya"
                aria-controls="halal-gallery-slide"
              >
                <ChevronLeft
                  size={20}
                  aria-hidden="true"
                />
              </button>

              <div
                className="halal-gallery-dots"
                role="group"
                aria-label="Pilih dokumentasi"
              >
                {halalDocumentation.map(
                  (item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`halal-gallery-dot ${
                        activeSlide === index
                          ? "is-active"
                          : ""
                      }`}
                      aria-label={`Tampilkan ${item.title}`}
                      aria-pressed={
                        activeSlide === index
                      }
                      aria-controls="halal-gallery-slide"
                      onClick={() =>
                        setActiveSlide(index)
                      }
                    >
                      <span />
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                className="halal-gallery-arrow"
                onClick={nextSlide}
                aria-label="Dokumentasi berikutnya"
                aria-controls="halal-gallery-slide"
              >
                <ChevronRight
                  size={20}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   APLIKASI UTAMA
   ========================= */

function App() {

  const [active, setActive] =
    useState("home");

  const brand =
    siteConfig.brand || "Eco-Peptonila";

  const productName =
    siteConfig.productName;

  const heroBackgroundUrl =
    siteConfig.heroBackground || heroBackgroundImg;

  const whatsappNumber = String(
    siteConfig.whatsapp || ""
  ).replace(/\D/g, "");

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Halo ${brand}, saya ingin mengetahui informasi pemesanan ${productName}.`
      )}`
    : "";

  const go = (id) => {
    setActive(id);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  useEffect(() => {
    document.title =
      `${brand} — Informasi Bahan dan Proses`;

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    if (!meta) {
      meta =
        document.createElement("meta");

      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.content =
      `Kenali produk ${brand}, informasi bahan, ` +
      "dokumentasi proses, dan petunjuk penggunaannya.";
  }, [brand]);

  return (
    <div className="app-shell">
      {/* HEADER */}

      <header className="topbar">
      <a
  className="brand"
  href="#home"
  aria-label="Eco-Peptonila — kembali ke beranda"
  onClick={(event) => {
    event.preventDefault();
    go("home");
  }}
>
  <img
    src="/images/logo-eco-peptonila.png"
    alt="Eco-Peptonila"
    className="brand-logo"
    width="1448"
    height="1086"
  />
</a>  

        <nav
          className="desktop-nav"
          aria-label="Navigasi utama"
        >
          {navItems.map(
            ([id, label]) => (
              <button
                key={id}
                type="button"
                className={
                  active === id
                    ? "active"
                    : ""
                }
                onClick={() => go(id)}
              >
                {label}
              </button>
            )
          )}
        </nav>

        {whatsappUrl ? (
          <a
            className="nav-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Informasi kontak
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </a>
        ) : (
          <button
            type="button"
            className="nav-cta"
            onClick={() => go("buy")}
          >
            Informasi kontak
            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </button>
        )}
      </header>

      <main>
        {/* BERANDA */}

        <section
          id="home"
          className="hero section-anchor"
          style={{
          "--hero-bg-url": `url("${heroBackgroundUrl}")`,
          }}
          >
          <div className="hero-container">
            <div className="hero-inner">
              <div className="hero-copy">

                <h1 className="hero-heading">
                <span>Kenali produknya,</span>{" "}
                <span>telusuri prosesnya.</span>
                </h1>

                <p className="hero-lead">
                   <em>Eco-Peptonila</em> merupakan produk pepton yang dikembangkan
  untuk penggunaan laboratorium. Kenali bahan, sumber bahan baku,
  dan dokumentasi proses pengolahannya melalui website ini.
                </p>

                <div className="hero-actions">
                  <button
                    type="button"
                    className="primary-btn hero-cta-btn"
                    onClick={() => go("halal")}
                  >
                    <span>Lihat dokumentasi</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="hero-link-btn"
                    onClick={() => go("ingredients")}
                  >
                    <span>Kenali bahannya</span>
                    <span className="diagonal-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                </div>
              </div>

             <div className="hero-art">
              <div className="home-product">
                <img
                src={heroBackgroundUrl}
                alt="Visual kemasan kotak dan sachet Eco-Peptonila"
                className="home-product-image"
                fetchPriority="high"
                />
                </div>
              </div>
            </div>

            {/* BARIS KEUNGGULAN (FLOATING HIGHLIGHTS) */}
            <div
              className="hero-highlights"
              role="region"
              aria-label="Keunggulan produk Eco-Peptonila"
            >
              {heroHighlights.map(
                ({ icon: HighlightIcon, title, copy }, index) => (
                  <div className="highlight-item" key={title}>
                    <span className="highlight-icon-wrap">
                      <HighlightIcon
                        size={22}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="highlight-content">
                      <strong className="highlight-title">{title}</strong>
                      <span className="highlight-copy">{copy}</span>
                    </div>
                    {index < heroHighlights.length - 1 && (
                      <div className="highlight-divider" aria-hidden="true" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* DOKUMENTASI KEHALALAN */}

        <HalalSection />

        {/* BAHAN BAKU */}

        <section
  id="ingredients"
  className="section section-anchor white"
  style={{
    "--ingredients-bg-url":
      'url("/images/background-kehalalan-cream-cahaya.png")',
  }}
>
          <div className="container">
            <div className="split-heading">
              <SectionTitle
                title={
                  <>
                    Kenali bahan,
                    <br />
                    <span>
                      dasar pengembangan
                      produk.
                    </span>
                  </>
                }
                copy="Bahan yang digunakan meliputi limbah tulang dan kepala ikan nila, enzim bromelain dari nanas, asam sitrat p.a., dan aquademin."
              />

              <div className="origin-note">
                <MapPin
                  size={18}
                  aria-hidden="true"
                />

                <strong>
                  Informasi sumber bahan
                </strong>

                <p>
                  {siteConfig.sourceLocation?.name || "Rantai Pasok Lokal"}
                </p>
              </div>
            </div>

<div className="ingredient-grid ingredient-materials">
  <article className="material-card">
    <img
      className="material-photo"
      src="/images/halal-preparasi-ikan.png"
      alt="Dokumentasi preparasi tulang dan kepala ikan nila"
      loading="lazy"
    />

    <div className="material-content">
      <h3>Limbah tulang dan kepala ikan nila</h3>
      <p className="material-scientific">
        (<i>Oreochromis niloticus</i>)
      </p>
    </div>
  </article>

  <article className="material-card">
    <img
      className="material-photo"
      src="/images/halal-bonggol-nanas.png"
      alt="Dokumentasi penimbangan bonggol nanas sebagai sumber bromelain"
      loading="lazy"
    />

    <div className="material-content">
      <h3>Enzim bromelain dari nanas</h3>
      <p className="material-scientific">
        (<i>Ananas comosus</i>)
      </p>
      <p className="material-caption">
        Foto bonggol nanas sebagai sumber bromelain.
      </p>
    </div>
  </article>

  <article className="material-card material-card--name">
    <div className="material-content">
      <h3>Asam sitrat p.a.</h3>
    </div>
  </article>

  <article className="material-card material-card--name">
    <div className="material-content">
      <h3>Aquademin</h3>
    </div>
  </article>
</div>

            {/* PETA GOOGLE MAPS SUMBER BAHAN */}
            {siteConfig.sourceLocation?.embedUrl && (
              <div className="source-map-wrapper">
                <div className="source-map-header">
                  <div className="source-map-info">
                    <span className="eyebrow">Lokasi pemasok</span>
                    <h3>{siteConfig.sourceLocation.name}</h3>
                    <p>
                      <MapPin size={16} aria-hidden="true" />
                      <span>{siteConfig.sourceLocation.address}</span>
                    </p>
                    <a
  className="supplier-website"
  href={siteConfig.sourceLocation.websiteUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Website dan informasi legalitas pemasok
  <ExternalLink size={15} aria-hidden="true" />
</a>
                  </div>

                  {siteConfig.sourceLocation.mapsUrl && (
                    <a
                      className="source-map-btn"
                      href={siteConfig.sourceLocation.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Buka di Google Maps</span>
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="source-map-frame-container">
                  <iframe
                    title="Peta lokasi CV A Sabat Samudra"
                    src={siteConfig.sourceLocation.embedUrl}
                    className="source-map-iframe"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PROSES PRODUKSI */}

        <section
          id="process"
          className="section section-anchor dark-section"
        >
          <div className="container">
            <SectionTitle
              light
              title={
                <>
                  Dari bahan,
                  <br />
                  <em>
                    menuju pengembangan
                    produk.
                  </em>
                </>
              }
              copy="Kenali proses melalui video produksi. Pilih tahap untuk menuju bagian terkait setelah dokumentasi tersedia."
            />

            <ProductVideo
              title={`Proses pembuatan ${brand}`}
              video={siteConfig.videos.process}
              fallbackPoster={
                siteConfig.processImage
              }
              showSteps
            />
          </div>
        </section>  

        {/* PEMESANAN */}

        <section
          id="buy"
          className="buy-section section-anchor"
        >
          <div className="container buy-inner">
            <div>
              <span className="eyebrow">
                05 — Informasi pemesanan
              </span>

              <h2>
                Ingin mengenal
                <br />
                <em>
                  {brand} lebih jauh?
                </em>
              </h2>

              <p>
                Hubungi tim untuk informasi
                produk dan ketersediaannya.
              </p>

              {whatsappUrl ? (
                <a
                  className="primary-btn light-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Hubungi via WhatsApp

                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <p>
                  Kontak WhatsApp
                  belum tersedia.
                </p>
              )}
            </div>

            <div className="product-card">
              <div className="product-image">
                <img
                  src={siteConfig.heroImage}
                  alt="Ilustrasi sementara, bukan foto produk"
                  loading="lazy"
                />

                <span>
                  Ilustrasi
                  <br />
                  sementara
                </span>
              </div>

              <div className="product-info">
                <span className="eyebrow">
                  {brand}
                </span>

                <h3>{productName}</h3>

                <p>
                  Produk pepton dalam
                  tahap pengembangan.
                </p>

                <strong>
                  Informasi menyusul
                </strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a
              className="brand footer-brand"
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                go("home");
              }}
            >
              {brand}
            </a>

            <p>
              Informasi bahan,
              <br />
              proses, dan penggunaan
              produk.
            </p>
          </div>

          <div>
            <span className="footer-label">
              Jelajahi
            </span>

            <button
              type="button"
              onClick={() => go("halal")}
            >
              Dokumentasi kehalalan
            </button>

            <button
              type="button"
              onClick={() => go("process")}
            >
              Proses pembuatan
            </button>
          </div>

          <div>
            <span className="footer-label">
              Hubungi kami
            </span>

            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
              >
                <Mail
                  size={14}
                  aria-hidden="true"
                />

                {siteConfig.contactEmail}
              </a>
            )}

            {siteConfig.instagram && (
              <span>
                <Instagram
                  size={14}
                  aria-hidden="true"
                />

                {siteConfig.instagram}
              </span>
            )}

            {!siteConfig.contactEmail &&
              !siteConfig.instagram && (
                <p>
                  Informasi kontak
                  belum tersedia.
                </p>
              )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {brand}.
          </span>

          <span>
            Prototipe website · Informasi
            produk belum final.
          </span>
        </div>
      </footer>

      {/* NAVIGASI MOBILE */}

      <nav
        className="bottom-nav"
        aria-label="Navigasi mobile"
      >
        {navItems.map(
          ([id, label, icon]) => (
            <button
              key={id}
              type="button"
              className={
                active === id
                  ? "active"
                  : ""
              }
              onClick={() => go(id)}
            >
              <Icon
                name={icon}
                size={18}
              />

              <span>{label}</span>
            </button>
          )
        )}
      </nav>
    </div>
  );
}

export default App;
