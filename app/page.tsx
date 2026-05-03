"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("nasibox");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [calcState, setCalcState] = useState({
    packageType: "nasibox-gold",
    quantity: 30, // Default nilai awal
  });

  // Data Harga & Paket
  const prices: Record<string, { price: number; name: string }> = {
    "nasibox-silver": { price: 25000, name: "Nasi Box Silver" },
    "nasibox-gold": { price: 30000, name: "Nasi Box Gold" },
    "nasibox-diamond": { price: 35000, name: "Nasi Box Diamond" },
    "prasmanan-silver": { price: 30000, name: "Prasmanan Silver" },
    "prasmanan-gold": { price: 40000, name: "Prasmanan Gold" },
    "prasmanan-diamond": { price: 50000, name: "Prasmanan Diamond" },
    "snackbox-silver": { price: 10000, name: "Snack Box Silver" },
    "snackbox-gold": { price: 12000, name: "Snack Box Gold" },
  };

  // Logika Kalkulator (Sudah Diperbaiki)
  const currentPackage = prices[calcState.packageType as keyof typeof prices];

  // Pastikan jika input kosong (""), jumlahnya dianggap 0 agar tidak NaN
  const qty = calcState.quantity === "" ? 0 : parseInt(calcState.quantity);
  let totalPrice = qty * currentPackage.price;

  // Penalti Prasmanan < 100 pax
  if (calcState.packageType.includes("prasmanan") && qty > 0 && qty < 100) {
    totalPrice += qty * 5000;
  }

  // Generate URL WhatsApp
  const generateWaUrl = () => {
    const bonus = qty > 500 ? "%0A🎁 BONUS: Gratis 2 Box Ice Cream!" : "";
    const penaltyInfo =
      calcState.packageType.includes("prasmanan") && qty > 0 && qty < 100
        ? "%0A*(Termasuk biaya tambahan Rp 5000/pax karena pesanan prasmanan < 100 pax)*"
        : "";

    const text = `Halo! Saya ingin pesan:%0A${qty} ${
      currentPackage.name
    }%0AEstimasi harga: Rp ${totalPrice.toLocaleString("id-ID")}${penaltyInfo}${bonus}%0A%0AApakah bisa?`;

    return `https://wa.me/6285776146459?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500/30">
      {/* HEADER NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-neutral-900/80 backdrop-blur-lg border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LOGO DI NAVBAR */}
          <a href="#home" className="flex items-center gap-3 z-50">
            <img
              src="/logocatering.png"
              alt="Logo Ety Catering"
              className="h-10 w-auto object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent hidden sm:block">
              Ety Catering
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8">
            {["Home", "Paket", "Menu", "Kalkulator", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-medium hover:text-amber-500 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-amber-500/20 p-4 flex flex-col gap-4 shadow-xl">
            {["Home", "Paket", "Menu", "Kalkulator", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg hover:text-amber-500"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black"
      >
        <div className="absolute top-32 right-6 flex flex-col gap-4 z-10 hidden md:flex">
          <div className="bg-neutral-900/60 backdrop-blur-md border border-amber-500/30 px-5 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2">
            👑 Best Choice
          </div>
          {/* BADGE LOGO HALAL DI HERO */}
          <div className="bg-neutral-900/60 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-3">
            <img
              src="/logohalal.png"
              alt="Sertifikasi Halal MUI"
              className="h-8 w-auto drop-shadow-md"
            />
            <span>100% Halal MUI</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center z-10 relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-amber-100 to-amber-500 bg-clip-text text-transparent">
            Pilihan Terbaik untuk Momen Spesial Anda
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-10">
            Pernikahan • Khitanan • Ulang Tahun • Arisan • Syukuran
          </p>
          <a
            href="https://wa.me/6285776146459"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black px-8 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.5)] transition-all"
          >
            📲 Pesan Sekarang
          </a>
        </div>
      </section>

      {/* PAKET POPULER */}
      <section id="paket" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-500 mb-16 relative">
          Paket Populer
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card Diamond */}
          <div className="bg-neutral-900 border border-amber-500/20 rounded-3xl p-10 text-center relative overflow-hidden group hover:-translate-y-2 hover:border-amber-500 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="text-5xl mb-6">💎</div>
            <h3 className="text-2xl font-bold mb-4">Nasi Box Diamond</h3>
            <div className="text-3xl font-bold text-amber-500 mb-8">
              Rp 35.000
            </div>
            <ul className="text-left space-y-3 mb-8 text-neutral-300">
              <li>✅ Nasi Putih</li>
              <li>✅ Olahan Ayam / Daging</li>
              <li>✅ Olahan Sayur / Tumis</li>
              <li>✅ Sambal Goreng Kentang Ati</li>
              <li>✅ Buah Jeruk / Pisang</li>
            </ul>
            <a
              href="https://wa.me/6285776146459?text=Saya%20ingin%20pesan%20Nasi%20Box%20Diamond"
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-neutral-800 text-amber-500 border border-amber-500/50 py-3 rounded-full font-semibold group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors"
            >
              Pilih Diamond
            </a>
          </div>

          {/* Card Prasmanan */}
          <div className="bg-neutral-900 border border-amber-500/20 rounded-3xl p-10 text-center relative overflow-hidden group hover:-translate-y-2 hover:border-amber-500 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="text-5xl mb-6">🏅</div>
            <h3 className="text-2xl font-bold mb-4">Prasmanan Gold</h3>
            <div className="text-3xl font-bold text-amber-500 mb-8">
              Rp 40.000/pax
            </div>
            <ul className="text-left space-y-3 mb-8 text-neutral-300">
              <li>
                ✅ <strong className="text-white">All-in Service</strong>
              </li>
              <li>✅ Olahan Ayam/Daging & Ikan</li>
              <li>✅ Sop & Pendamping Lengkap</li>
              <li>✅ Meja, Alat Makan, Pemanas</li>
              <li>✅ Waiters Profesional</li>
            </ul>
            <a
              href="https://wa.me/6285776146459?text=Saya%20ingin%20pesan%20Prasmanan%20Gold"
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-neutral-800 text-amber-500 border border-amber-500/50 py-3 rounded-full font-semibold group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors"
            >
              Pilih Gold
            </a>
          </div>
        </div>
      </section>

      {/* MENU DIGITAL */}
      <section
        id="menu"
        className="py-24 px-6 bg-neutral-900 border-y border-amber-500/10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-500 mb-12">
            Menu Digital Catering
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "nasibox", label: "📦 Nasi Box" },
              { id: "snackbox", label: "🍰 Snack Box" },
              { id: "tumpeng", label: "🏔️ Tumpeng" },
              { id: "prasmanan", label: "🍽️ Prasmanan" },
              { id: "gubukan", label: "🎪 Menu Gubukan" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 border-transparent shadow-[0_4px_20px_-5px_rgba(245,158,11,0.5)]"
                    : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-amber-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Nasi Box */}
          {activeTab === "nasibox" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-x-auto rounded-2xl border border-neutral-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-amber-600 text-black">
                      <th className="p-5 font-bold uppercase">Paket</th>
                      <th className="p-5 font-bold uppercase">Harga</th>
                      <th className="p-5 font-bold uppercase">Detail Menu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 bg-neutral-900/50">
                    <tr className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-5 font-bold">Silver</td>
                      <td className="p-5 font-bold text-amber-500">
                        Rp 25.000
                      </td>
                      <td className="p-5 text-neutral-300">
                        Nasi Putih, Olahan Ayam, Olahan Sayur / Tumis, Mie /
                        Bihun Goreng, Sambal, Kerupuk
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-5 font-bold">Gold</td>
                      <td className="p-5 font-bold text-amber-500">
                        Rp 30.000
                      </td>
                      <td className="p-5 text-neutral-300">
                        Nasi Putih, Olahan Ayam / Daging, Olahan Sayur / Tumis,
                        Sambal Goreng Kentang Ati, Sambal, Kerupuk
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-5 font-bold">Diamond</td>
                      <td className="p-5 font-bold text-amber-500">
                        Rp 35.000
                      </td>
                      <td className="p-5 text-neutral-300">
                        Nasi Putih, Olahan Ayam / Daging, Olahan Sayur / Tumis,
                        Sambal Goreng Kentang Ati, Sambal, Kerupuk, Buah Jeruk /
                        Pisang
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Snack Box */}
          {activeTab === "snackbox" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-x-auto rounded-2xl border border-neutral-800 mb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-amber-600 text-black">
                      <th className="p-5 font-bold uppercase">Paket</th>
                      <th className="p-5 font-bold uppercase">Harga</th>
                      <th className="p-5 font-bold uppercase">Isi Snack Box</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 bg-neutral-900/50">
                    <tr className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-5 font-bold">Silver</td>
                      <td className="p-5 font-bold text-amber-500">
                        Rp 10.000
                      </td>
                      <td className="p-5 text-neutral-300">
                        Lontong / Lemper, Kue Bolu Kukus, Tahu Isi / Risol
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-800/50 transition-colors">
                      <td className="p-5 font-bold">Gold</td>
                      <td className="p-5 font-bold text-amber-500">
                        Rp 12.000
                      </td>
                      <td className="p-5 text-neutral-300">
                        Lontong / Lemper, Tahu Isi / Risol, Kue Bolu Kukus,
                        Dadar Gulung
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-2xl border border-neutral-700">
                <h4 className="text-amber-500 font-bold mb-4 text-lg border-b border-neutral-700 pb-2">
                  Pilihan Varian Snack:
                </h4>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-neutral-300 list-disc list-inside">
                  <li>Lontong isi Sayur / Daging</li>
                  <li>Tahu Isi</li>
                  <li>Risol isi Sayur / Mayo</li>
                  <li>Pastel</li>
                  <li>Kue Bolu Kukus / Panggang</li>
                  <li>Dadar Gulung</li>
                  <li>Kue Lumpur</li>
                  <li>Donat</li>
                  <li>Kue Soes</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content: Tumpeng */}
          {activeTab === "tumpeng" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-neutral-800/50 p-8 rounded-2xl border border-neutral-700">
              <h4 className="text-amber-500 font-bold mb-4 text-xl">
                Varian Ukuran Tumpeng
              </h4>
              <ul className="list-disc list-inside text-neutral-300 mb-8 space-y-2">
                <li>Paket Tumpeng Mini</li>
                <li>
                  Paket Tumpeng Porsi Besar: 20 pax / 30 pax / 40 pax / 50 pax
                </li>
              </ul>
              <h4 className="text-amber-500 font-bold mb-4 text-xl border-t border-neutral-700 pt-6">
                Isi Nasi Tumpeng Lengkap:
              </h4>
              <p className="text-neutral-300 leading-relaxed text-lg">
                Nasi Kuning / Nasi Putih, Ayam Bakar / Ayam Goreng, Telor Dadar,
                Telor Balado, Sambal Kentang & Ati, Perkedel, Tempe / Tahu
                Bacem, Sayur Urap, Sambal, dan Lalapan.
              </p>
            </div>
          )}

          {/* Tab Content: Prasmanan */}
          {activeTab === "prasmanan" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="overflow-x-auto rounded-2xl border border-neutral-800 mb-10">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-amber-600 text-black">
                      <th className="p-5 font-bold uppercase">Paket</th>
                      <th className="p-5 font-bold uppercase">Harga / Pax</th>
                      <th className="p-5 font-bold uppercase">Rincian Menu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 bg-neutral-900/50">
                    {[
                      {
                        name: "Silver",
                        price: "Rp 30.000",
                        detail:
                          "Nasi Putih, Sayur Sop Kimlo/Baso, Olahan Ayam/Daging, Olahan Pendamping, Kerupuk, Air Mineral",
                      },
                      {
                        name: "Gold",
                        price: "Rp 40.000",
                        detail:
                          "Nasi Putih, Sayur Sop Kimlo/Baso, Olahan Ayam/Daging, Olahan Ikan, Olahan Pendamping, Kerupuk, Air Mineral, Buah Potong",
                      },
                      {
                        name: "Tradisional",
                        price: "Rp 45.000",
                        detail:
                          "Olahan Nasi, Olahan Sayur, Olahan Ayam/Daging, Olahan Pendamping, Olahan Tahu & Tempe, Sambel, Krupuk, Es Cendol, Air Mineral",
                      },
                      {
                        name: "Diamond",
                        price: "Rp 50.000",
                        detail:
                          "Nasi Putih, Nasi Goreng, Sayur Sop, Olahan Ayam/Daging, Olahan Ikan, Olahan Pendamping, Kerupuk, Air Mineral, Buah, Pudding",
                      },
                    ].map((item) => (
                      <tr
                        key={item.name}
                        className="hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="p-5 font-bold">{item.name}</td>
                        <td className="p-5 font-bold text-amber-500 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="p-5 text-neutral-300">{item.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-center text-amber-500 mb-8">
                Pilihan Olahan Lauk Prasmanan
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "🍲 Olahan Sup",
                    items: [
                      "Sup Kimlo",
                      "Sup Bakso",
                      "Sup Sosis",
                      "Sup Tetelan",
                      "Sup Iga",
                      "Sup Ayam Jagung",
                    ],
                  },
                  {
                    title: "🍗 Olahan Ayam",
                    items: [
                      "Ayam Bakar / Kecap",
                      "Ayam Rica Rica",
                      "Ayam Bumbu Rujak / Bali",
                      "Ayam Saus Mentega",
                      "Ayam Teriyaki",
                      "Ayam Suwir Pedas",
                    ],
                  },
                  {
                    title: "🥩 Olahan Daging",
                    items: [
                      "Daging Rendang",
                      "Daging Teriyaki",
                      "Daging Lada Hitam",
                      "Dendeng Balado",
                      "Kalio Bola Daging",
                      "Semur Daging",
                    ],
                  },
                  {
                    title: "🐟 Olahan Ikan/Seafood",
                    items: [
                      "Gurame Acar Kuning",
                      "Gurame / Fillet Ikan Asam Manis",
                      "Udang Goreng Tepung",
                      "Udang Saus Mentega",
                    ],
                  },
                  {
                    title: "🥗 Olahan Pendamping",
                    items: [
                      "Kentang Mustofa",
                      "Mie/Bihun Goreng",
                      "Cap Cay / Cah Sayuran",
                      "Asinan Sayur / Acar Kuning",
                      "Karedok / Salad Bangkok",
                    ],
                  },
                ].map((category) => (
                  <div
                    key={category.title}
                    className="bg-neutral-800/50 p-6 rounded-2xl border border-neutral-700"
                  >
                    <h4 className="font-bold text-amber-500 mb-4 border-b border-neutral-700 pb-2">
                      {category.title}
                    </h4>
                    <ul className="space-y-2 text-neutral-300 text-sm">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-amber-500">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Gubukan */}
          {activeTab === "gubukan" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-neutral-800/50 p-8 rounded-2xl border border-neutral-700 max-w-3xl mx-auto">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-neutral-300 text-lg list-disc list-inside">
                <li>Bakso</li>
                <li>Siomay</li>
                <li>Soto Ayam</li>
                <li>Pempek</li>
                <li>Sate Ayam</li>
                <li>Soto Mie</li>
                <li>Zuppa Sup</li>
                <li>Es Dawet</li>
                <li>Es Timun + Selasih</li>
                <li>Es Kopyor</li>
                <li>Es Coktail</li>
                <li>Aneka Juice</li>
                <li>Soft Drink</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* KALKULATOR SECTION */}
      <section id="kalkulator" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-500 mb-12">
          🧮 Kalkulator Pesanan
        </h2>

        <div className="max-w-xl mx-auto bg-neutral-900 border border-amber-500/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h3 className="text-xl font-bold mb-8 text-white">
            Hitung Estimasi Harga Anda
          </h3>

          <div className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Jenis Pesanan:
              </label>
              <select
                value={calcState.packageType}
                onChange={(e) =>
                  setCalcState({ ...calcState, packageType: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow appearance-none"
              >
                <option value="nasibox-silver">Nasi Box Silver (25k)</option>
                <option value="nasibox-gold">Nasi Box Gold (30k)</option>
                <option value="nasibox-diamond">Nasi Box Diamond (35k)</option>
                <option value="prasmanan-silver">
                  Prasmanan Silver (30k/pax)
                </option>
                <option value="prasmanan-gold">Prasmanan Gold (40k/pax)</option>
                <option value="prasmanan-diamond">
                  Prasmanan Diamond (50k/pax)
                </option>
                <option value="snackbox-silver">Snack Box Silver (10k)</option>
                <option value="snackbox-gold">Snack Box Gold (12k)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Jumlah porsi/box (Min 20 untuk Nasi box/Snack dan 50 untuk
                Prasmanan):
              </label>
              <input
                type="number"
                min="20"
                value={calcState.quantity}
                onChange={(e) =>
                  setCalcState({
                    ...calcState,
                    // Fix: Jika dihapus sampai kosong, biarkan kosong (""). Jika tidak, ubah ke angka.
                    quantity:
                      e.target.value === "" ? "" : parseInt(e.target.value),
                  })
                }
                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow text-center text-lg"
              />
            </div>
          </div>

          <div className="my-10">
            <p className="text-sm text-neutral-400 mb-2">Total Estimasi:</p>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Rp {totalPrice.toLocaleString("id-ID")}
            </div>
          </div>

          <div className="bg-neutral-950/50 border border-amber-500/20 rounded-xl p-5 mb-8 text-left">
            <p className="font-bold text-amber-500 mb-2">🎁 BONUS SPESIAL:</p>
            <p className="text-sm text-neutral-300">
              ✅ Pesan <strong>&gt;500 pax</strong> → Gratis 2 Box Ice Cream!
            </p>
            {calcState.packageType.includes("prasmanan") &&
              qty > 0 &&
              qty < 100 && (
                <p className="text-xs text-red-400 mt-2">
                  *Prasmanan di bawah 100 pax dikenakan tambahan Rp 5.000/pax.
                </p>
              )}
          </div>

          <a
            href={generateWaUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30 transition-all text-lg"
          >
            📲 Konfirmasi Pesanan Via WA
          </a>
        </div>
      </section>

      {/* KONTAK & FOOTER */}
      <footer
        id="kontak"
        className="bg-neutral-900 border-t border-amber-500 pt-20 pb-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-amber-500 mb-6">
                Siap Membantu Momen Spesial Anda
              </h2>
              <div className="space-y-6 text-neutral-300 text-lg">
                <p>
                  <strong className="block text-white mb-1">📍 Lokasi:</strong>
                  Citra Indah City - Cluster Mahoni Blok T3 No 16
                </p>
                <p>
                  <strong className="block text-white mb-1">
                    📱 WhatsApp:
                  </strong>
                  <a
                    href="https://wa.me/6285776146459"
                    className="text-green-400 font-bold hover:underline"
                  >
                    085776146459
                  </a>
                </p>
                <p>
                  <strong className="block text-white mb-1">
                    ⏰ Operasional:
                  </strong>
                  08.00 - 22.00 WIB
                </p>
              </div>
            </div>

            {/* Syarat & Ketentuan */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8">
              <h3 className="font-bold text-amber-500 text-xl mb-4 border-b border-neutral-800 pb-4">
                📋 Ketentuan Pemesanan
              </h3>
              <ul className="space-y-3 text-neutral-400 text-sm list-disc list-inside">
                <li>Harga sewaktu-waktu dapat berubah.</li>
                <li>
                  Untuk pemesanan tumpeng bisa langsung menghubungi kontak yang
                  tertera.
                </li>
                <li>
                  Menu dapat disesuaikan dengan permintaan (harga senilai).
                </li>
                <li>
                  Pemesanan Prasmanan &lt; 100 pax ada penambahan biaya Rp
                  5.000/pax.
                </li>
                <li>Pemesanan &gt; 500 pax bonus Ice Cream 2 box.</li>
                <li>
                  Harga Prasmanan sudah termasuk meja, taplak, alat makan,
                  pemanas, gubugan & waiters.
                </li>
                <li>Pemesanan luar kota dikenakan biaya transportasi.</li>
              </ul>
            </div>
          </div>

          {/* LOGO AREA DI FOOTER */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-neutral-800 mb-8">
            <img
              src="/logocatering.png"
              alt="Logo Ety Catering"
              className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
            />
            {/* Garis pemisah vertical untuk tampilan desktop */}
            <div className="hidden md:block w-px h-12 bg-neutral-800"></div>
            <img
              src="/logohalal.png"
              alt="Sertifikasi Halal MUI"
              className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity drop-shadow-lg"
            />
          </div>

          <div className="text-center pt-8 border-t border-neutral-800 text-neutral-500 text-sm">
            <p>
              © {new Date().getFullYear()} Ety Catering. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
