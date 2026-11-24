import { useState, useMemo } from "react"

const SCREENSHOTS = [
  {
    src: "/images/kasir-pro/Screenshot_20261123-234912_Kasir_Pro_cb6b542b.png",
    label: "Tampilan Aplikasi Kasir Pro",
  },
  {
    src: "/images/kasir-pro/image_8dee1a7b.png",
    label: "Preview Layar 2",
  },
  {
    src: "/images/kasir-pro/image_d3615c3d.png",
    label: "Preview Layar 3",
  },
  {
    src: "/images/kasir-pro/image_d7d1cc08.png",
    label: "Preview Layar 4",
  },
]

const INITIAL_PRODUCTS = [
  { id: 1, name: "Kopi Susu Gula Aren", category: "Minuman", price: 18000 },
  { id: 2, name: "Nasi Goreng Spesial", category: "Makanan", price: 22000 },
  { id: 3, name: "Es Teh Manis", category: "Minuman", price: 8000 },
  { id: 4, name: "Roti Bakar Coklat", category: "Snack", price: 15000 },
]

export default function KasirProClone() {
  const [screen, setScreen] = useState("screenshots") // "screenshots" | "dashboard" | "kasir" | "hitung" | "menu" | "laporan" | "settings"
  const [activeShotIdx, setActiveShotIdx] = useState(0)

  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [cart, setCart] = useState([])
  const [cashInput, setCashInput] = useState("")
  const [showQris, setShowQris] = useState(false)
  const [receipt, setReceipt] = useState(null)

  // HitungCepatScreen state
  const [quickTotal, setQuickTotal] = useState("")
  const [quickCash, setQuickCash] = useState("")

  // MenuManagementScreen state
  const [menuName, setMenuName] = useState("")
  const [menuPrice, setMenuPrice] = useState("")
  const [menuCategory, setMenuCategory] = useState("Makanan")

  // LaporanScreen state
  const [transactions, setTransactions] = useState([
    { id: "TRX-101", time: "09:10", total: 40000, method: "Tunai" },
    { id: "TRX-102", time: "09:35", total: 22000, method: "QRIS" },
  ])

  // SettingsScreen state
  const [storeName, setStoreName] = useState("KasirPro Store")
  const [printerReady, setPrinterReady] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "Semua") return products
    return products.filter((p) => p.category === selectedCategory)
  }, [products, selectedCategory])

  const addToCart = (product) => {
    setReceipt(null)
    setShowQris(false)
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cashNum = Number(cashInput) || 0
  const changeNum = Math.max(cashNum - cartTotal, 0)

  const completeTransaction = (method) => {
    if (cart.length === 0) return
    const paid = method === "QRIS" ? cartTotal : Math.max(cashNum, cartTotal)
    const change = method === "QRIS" ? 0 : Math.max(paid - cartTotal, 0)

    const trx = {
      id: `TRX-${103 + transactions.length}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      total: cartTotal,
      method,
    }

    setTransactions((prev) => [trx, ...prev])
    setReceipt({
      ...trx,
      store: storeName,
      items: cart,
      paid,
      change,
    })
    setCart([])
    setCashInput("")
    setShowQris(false)
  }

  const handleAddMenu = (e) => {
    e.preventDefault()
    const priceNum = Number(menuPrice)
    if (!menuName.trim() || !priceNum) return
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: menuName.trim(),
        category: menuCategory,
        price: priceNum,
      },
    ])
    setMenuName("")
    setMenuPrice("")
    setScreen("kasir")
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0)
  const quickChange = Math.max((Number(quickCash) || 0) - (Number(quickTotal) || 0), 0)

  const topTabs = [
    { id: "screenshots", label: "Galeri Asli" },
    { id: "dashboard", label: "Dashboard" },
    { id: "kasir", label: "Kasir" },
    { id: "hitung", label: "Hitung Cepat" },
    { id: "menu", label: "Menu" },
    { id: "laporan", label: "Laporan" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <div className="h-full bg-zinc-950 text-white flex flex-col justify-between text-xs overflow-hidden">
      {/* Top Bar + Navigasi Layar */}
      <div className="bg-zinc-900/95 border-b border-white/10 shrink-0">
        <div className="px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
              Android Kotlin App
            </p>
            <h3 className="text-sm font-bold text-white leading-tight">{storeName}</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
            {screen}
          </span>
        </div>

        <div className="flex gap-1 px-2.5 pb-2 overflow-x-auto">
          {topTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setScreen(t.id)}
              className={`px-2 py-1 rounded-md text-[10px] font-medium shrink-0 transition ${
                screen === t.id
                  ? "bg-cyan-500 text-black font-semibold"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area Isi Layar */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {/* 1. GALERI SCREENSHOT ASLI DARI ZIP */}
        {screen === "screenshots" && (
          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
              <img
                src={SCREENSHOTS[activeShotIdx].src}
                alt={SCREENSHOTS[activeShotIdx].label}
                className="w-full h-[380px] object-contain bg-zinc-950"
              />
            </div>

            <p className="text-[11px] text-gray-300 text-center font-medium">
              {SCREENSHOTS[activeShotIdx].label}
            </p>

            <div className="grid grid-cols-4 gap-1.5">
              {SCREENSHOTS.map((shot, idx) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => setActiveShotIdx(idx)}
                  className={`rounded-lg overflow-hidden border p-0.5 transition ${
                    activeShotIdx === idx
                      ? "border-cyan-400 bg-cyan-500/20"
                      : "border-white/10 bg-white/5 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={shot.src}
                    alt={shot.label}
                    className="w-full h-12 object-cover rounded"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. DASHBOARD SCREEN */}
        {screen === "dashboard" && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/15 to-purple-500/15 border border-white/10">
              <p className="text-[10px] text-gray-400">Omzet Tercatat</p>
              <p className="text-lg font-bold text-cyan-400">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </p>
              <p className="text-[10px] text-gray-300 mt-0.5">
                {transactions.length} Transaksi • {products.length} Produk Aktif
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setScreen("kasir")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left"
              >
                <p className="font-semibold text-cyan-300">Buka Kasir</p>
                <p className="text-[10px] text-gray-400">Input pesanan & bayar</p>
              </button>
              <button
                type="button"
                onClick={() => setScreen("hitung")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left"
              >
                <p className="font-semibold text-purple-300">Hitung Cepat</p>
                <p className="text-[10px] text-gray-400">Kalkulator kembalian</p>
              </button>
              <button
                type="button"
                onClick={() => setScreen("menu")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left"
              >
                <p className="font-semibold text-emerald-300">Kelola Menu</p>
                <p className="text-[10px] text-gray-400">Tambah item & harga</p>
              </button>
              <button
                type="button"
                onClick={() => setScreen("laporan")}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left"
              >
                <p className="font-semibold text-amber-300">Laporan</p>
                <p className="text-[10px] text-gray-400">Riwayat & ekspor</p>
              </button>
            </div>
          </div>
        )}

        {/* 3. KASIR SCREEN + RECEIPT / QRIS / CHANGE POPUP */}
        {screen === "kasir" && (
          <div className="space-y-2.5">
            <div className="flex gap-1.5 overflow-x-auto">
              {["Semua", "Makanan", "Minuman", "Snack"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] shrink-0 ${
                    selectedCategory === cat
                      ? "bg-cyan-500 text-black font-semibold"
                      : "bg-white/5 text-gray-300 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {visibleProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => addToCart(p)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left"
                >
                  <p className="font-semibold text-[11px] truncate">{p.name}</p>
                  <p className="text-[10px] text-cyan-400">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                </button>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[11px]">
                  Keranjang ({cart.reduce((s, i) => s + i.qty, 0)})
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="text-[10px] text-rose-400"
                  >
                    Hapus
                  </button>
                )}
              </div>

              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-[11px] text-gray-300">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
                </div>
              ))}

              <div className="pt-1.5 border-t border-white/10 flex justify-between font-bold text-cyan-400">
                <span>Total</span>
                <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
              </div>

              <input
                type="number"
                value={cashInput}
                onChange={(e) => setCashInput(e.target.value)}
                placeholder="Nominal bayar tunai..."
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white"
              />

              {cashNum > 0 && cartTotal > 0 && (
                <p className="text-[11px] text-emerald-300">
                  Kembalian: Rp {changeNum.toLocaleString("id-ID")}
                </p>
              )}

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => completeTransaction("Tunai")}
                  className="py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-[11px]"
                >
                  Bayar Tunai
                </button>
                <button
                  type="button"
                  onClick={() => setShowQris((v) => !v)}
                  className="py-1.5 rounded-lg bg-white/10 border border-cyan-400/30 text-cyan-300 font-semibold text-[11px]"
                >
                  QRIS Dialog
                </button>
              </div>
            </div>

            {showQris && cartTotal > 0 && (
              <div className="p-3 rounded-xl bg-zinc-900 border border-cyan-400/40 text-center space-y-2">
                <p className="text-[11px] font-semibold text-cyan-300">
                  QRIS Pembayaran — Rp {cartTotal.toLocaleString("id-ID")}
                </p>
                <div className="w-24 h-24 mx-auto rounded-lg bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  QRIS PREVIEW
                </div>
                <button
                  type="button"
                  onClick={() => completeTransaction("QRIS")}
                  className="w-full py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-[11px]"
                >
                  Konfirmasi Bayar QRIS
                </button>
              </div>
            )}

            {receipt && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/30 space-y-1 text-[11px]">
                <p className="font-bold text-emerald-300">
                  ReceiptDialog • {receipt.id}
                </p>
                <p className="text-gray-300">
                  Toko: {receipt.store} ({receipt.method})
                </p>
                <p className="text-gray-300">
                  Total: Rp {receipt.total.toLocaleString("id-ID")} | Kembali: Rp{" "}
                  {receipt.change.toLocaleString("id-ID")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 4. HITUNG CEPAT SCREEN */}
        {screen === "hitung" && (
          <div className="space-y-2.5">
            <p className="font-semibold text-cyan-400">HitungCepatScreen</p>
            <input
              type="number"
              value={quickTotal}
              onChange={(e) => setQuickTotal(e.target.value)}
              placeholder="Total belanja..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
            <input
              type="number"
              value={quickCash}
              onChange={(e) => setQuickCash(e.target.value)}
              placeholder="Uang diterima..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400">Kembalian</p>
              <p className="text-base font-bold text-emerald-300">
                Rp {quickChange.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        )}

        {/* 5. MENU MANAGEMENT SCREEN */}
        {screen === "menu" && (
          <form onSubmit={handleAddMenu} className="space-y-2.5">
            <p className="font-semibold text-cyan-400">MenuManagementScreen</p>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Nama produk baru..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
            <input
              type="number"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
              placeholder="Harga produk..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
            <select
              value={menuCategory}
              onChange={(e) => setMenuCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
            >
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Snack">Snack</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold"
            >
              Simpan Produk
            </button>
          </form>
        )}

        {/* 6. LAPORAN SCREEN */}
        {screen === "laporan" && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400">LaporanScreen</p>
              <p className="text-base font-bold text-cyan-400">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </p>
            </div>
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{trx.id}</p>
                  <p className="text-[10px] text-gray-400">
                    {trx.time} • {trx.method}
                  </p>
                </div>
                <span className="font-bold text-emerald-300">
                  Rp {trx.total.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 7. SETTINGS SCREEN */}
        {screen === "settings" && (
          <div className="space-y-2.5">
            <p className="font-semibold text-cyan-400">SettingsScreen</p>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Nama toko..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            />
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span>ThermalPrinterManager</span>
              <input
                type="checkbox"
                checked={printerReady}
                onChange={(e) => setPrinterReady(e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span>VoiceCommandEngine</span>
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
              />
            </label>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 bg-zinc-900/90 border-t border-white/10 text-[10px] text-gray-400 flex justify-between shrink-0">
        <span>Printer: {printerReady ? "Aktif" : "Nonaktif"}</span>
        <span>Voice: {voiceEnabled ? "Aktif" : "Nonaktif"}</span>
      </div>
    </div>
  )
}