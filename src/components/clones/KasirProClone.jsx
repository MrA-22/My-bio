import { useState, useMemo } from "react"

const INITIAL_PRODUCTS = [
  { id: 1, name: "Kopi Susu Gula Aren", category: "Minuman", price: 18000, stock: 24 },
  { id: 2, name: "Es Teh Manis", category: "Minuman", price: 8000, stock: 35 },
  { id: 3, name: "Nasi Goreng Spesial", category: "Makanan", price: 22000, stock: 15 },
  { id: 4, name: "Roti Bakar Coklat Keju", category: "Snack", price: 16000, stock: 18 },
]

export default function KasirProClone() {
  const [activeTab, setActiveTab] = useState("kasir") // "kasir" | "menu" | "laporan"
  const [categoryFilter, setCategoryFilter] = useState("Semua")
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [cart, setCart] = useState([])
  const [cashInput, setCashInput] = useState("")
  const [receipt, setReceipt] = useState(null)
  const [transactions, setTransactions] = useState([
    { id: "TRX-001", time: "09:15", total: 40000, method: "Tunai" },
    { id: "TRX-002", time: "09:42", total: 26000, method: "QRIS" },
  ])

  // Form tambah menu cepat di tab Menu
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newCategory, setNewCategory] = useState("Makanan")

  const filteredProducts = useMemo(() => {
    if (categoryFilter === "Semua") return products
    return products.filter((p) => p.category === categoryFilter)
  }, [products, categoryFilter])

  const addToCart = (product) => {
    setReceipt(null)
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cashNumber = Number(cashInput) || 0
  const changeAmount = Math.max(cashNumber - totalAmount, 0)

  const handleCheckout = (method = "Tunai") => {
    if (cart.length === 0) return
    const paid = method === "QRIS" ? totalAmount : Math.max(cashNumber, totalAmount)
    const kembalian = method === "QRIS" ? 0 : Math.max(paid - totalAmount, 0)

    const newTrx = {
      id: `TRX-00${transactions.length + 1}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      total: totalAmount,
      method,
    }

    setTransactions((prev) => [newTrx, ...prev])
    setReceipt({
      ...newTrx,
      items: cart,
      paid,
      change: kembalian,
    })
    setCart([])
    setCashInput("")
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    const parsedPrice = Number(newPrice)
    if (!newName.trim() || !parsedPrice) return
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        category: newCategory,
        price: parsedPrice,
        stock: 20,
      },
    ])
    setNewName("")
    setNewPrice("")
    setActiveTab("kasir")
  }

  const totalOmzet = transactions.reduce((sum, t) => sum + t.total, 0)

  return (
    <div className="min-h-full bg-zinc-950 text-white flex flex-col justify-between text-xs">
      {/* Header Aplikasi */}
      <div className="p-3.5 bg-gradient-to-r from-cyan-950/80 via-zinc-900 to-purple-950/80 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase">
              Android POS Clone
            </p>
            <h3 className="text-sm font-bold text-white">KasirPro</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px]">
            ● Ready
          </span>
        </div>
      </div>

      {/* Konten Utama Sesuai Tab */}
      <div className="flex-1 p-3.5 space-y-3 overflow-y-auto">
        {activeTab === "kasir" && (
          <>
            {/* Filter Kategori */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {["Semua", "Makanan", "Minuman", "Snack"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-medium shrink-0 transition ${
                    categoryFilter === cat
                      ? "bg-cyan-500 text-black font-semibold"
                      : "bg-white/5 text-gray-300 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Daftar Produk */}
            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addToCart(item)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition flex flex-col justify-between gap-1.5"
                >
                  <p className="font-semibold text-white line-clamp-2 text-[11px]">
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-[11px]">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      + Pilih
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Keranjang & Pembayaran */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-200">
                  Pesanan ({cart.reduce((s, i) => s + i.qty, 0)} item)
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="text-[10px] text-rose-400 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <p className="text-[11px] text-gray-500">
                  Tap produk di atas untuk memasukkan ke transaksi.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-24 overflow-y-auto">
                  {cart.map((c) => (
                    <div key={c.id} className="flex justify-between text-[11px]">
                      <span className="text-gray-300">
                        {c.qty}x {c.name}
                      </span>
                      <span className="text-cyan-300">
                        Rp {(c.price * c.qty).toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Total</span>
                <span className="text-sm font-bold text-cyan-400">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </span>
              </div>

              <input
                type="number"
                value={cashInput}
                onChange={(e) => setCashInput(e.target.value)}
                placeholder="Nominal uang tunai (opsional)"
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              />

              {cashNumber > 0 && totalAmount > 0 && (
                <div className="flex justify-between text-[11px] text-emerald-300">
                  <span>Kembalian</span>
                  <span>Rp {changeAmount.toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCheckout("Tunai")}
                  className="py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-white text-[11px]"
                >
                  Bayar Tunai
                </button>
                <button
                  type="button"
                  onClick={() => handleCheckout("QRIS")}
                  className="py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-cyan-400/30 font-semibold text-cyan-300 text-[11px]"
                >
                  Bayar QRIS
                </button>
              </div>
            </div>

            {/* Struk Ringkas */}
            {receipt && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-400/30 space-y-1.5">
                <div className="flex justify-between font-bold text-emerald-300 text-[11px]">
                  <span>Struk {receipt.id}</span>
                  <span>{receipt.method}</span>
                </div>
                <p className="text-[10px] text-gray-300">
                  Total: Rp {receipt.total.toLocaleString("id-ID")} • Kembali: Rp{" "}
                  {receipt.change.toLocaleString("id-ID")}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "menu" && (
          <form onSubmit={handleAddProduct} className="space-y-2.5">
            <p className="font-semibold text-cyan-400">Tambah Produk Baru</p>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nama produk..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500"
            />
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Harga (contoh: 15000)"
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
            >
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Snack">Snack</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold text-white"
            >
              Simpan ke Katalog
            </button>
          </form>
        )}

        {activeTab === "laporan" && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-gray-400">Ringkasan Omzet</p>
              <p className="text-base font-bold text-cyan-400">
                Rp {totalOmzet.toLocaleString("id-ID")}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {transactions.length} transaksi tercatat
              </p>
            </div>

            <div className="space-y-1.5">
              {transactions.map((trx) => (
                <div
                  key={trx.id}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-white">{trx.id}</p>
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
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar Ala App */}
      <div className="grid grid-cols-3 border-t border-white/10 bg-zinc-900/90 text-[10px]">
        {[
          { id: "kasir", label: "🧾 Kasir" },
          { id: "menu", label: "📦 Produk" },
          { id: "laporan", label: "📊 Laporan" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 font-medium transition ${
              activeTab === tab.id
                ? "text-cyan-400 bg-cyan-500/10"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}