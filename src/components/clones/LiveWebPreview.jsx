import React, { useState } from 'react';

export default function AppCloneSatu() {
  const [activeTab, setActiveTab] = useState('beranda');

  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-900">
      {/* Header App */}
      <div className="bg-emerald-600 text-white p-4 rounded-b-2xl shadow-sm">
        <p className="text-xs opacity-80">Halo, Selamat Datang</p>
        <h3 className="text-lg font-bold">Dompet Digital Clone</h3>
        <div className="mt-3 bg-white/15 p-3 rounded-xl backdrop-blur-sm">
          <p className="text-[11px]">Saldo Aktif</p>
          <p className="text-xl font-bold">Rp 1.250.000</p>
        </div>
      </div>

      {/* Body Konten */}
      <div className="p-4 flex-1 space-y-3">
        <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
          {['Transfer', 'Top Up', 'QRIS', 'Riwayat'].map((menu) => (
            <button
              key={menu}
              onClick={() => setActiveTab(menu)}
              className="p-2 bg-white rounded-xl shadow-sm hover:bg-emerald-50 transition"
            >
              <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                {menu[0]}
              </div>
              {menu}
            </button>
          ))}
        </div>

        <div className="bg-white p-3 rounded-xl shadow-sm text-xs">
          <p className="font-semibold mb-1">Status Interaksi:</p>
          <p className="text-slate-500">Menu aktif saat ini: <span className="text-emerald-600 font-medium">{activeTab}</span></p>
        </div>
      </div>
    </div>
  );
}