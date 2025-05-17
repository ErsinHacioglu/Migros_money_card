const urunListesi = [
    { urunIsmı: "Süt", fiyat: 15 },
    { urunIsmı: "Bebek Bezi", fiyat: 100 },
    { urunIsmı: "Kuşbaşı", fiyat: 220 }
];

const gecerliKartlar = ["123456", "654321", "111111"];

let kartNumarasi = prompt("Money Kart numaranızı giriniz (yoksa boş bırakın):");
let kartVarMi = false;
let isim = null;
let soyisim = null;

if (kartNumarasi && gecerliKartlar.includes(kartNumarasi.trim())) {
    kartVarMi = true;
    alert("Kart doğrulandı ✅ İndirim uygulanacak.");
} else {
    const kartIsterMi = confirm("Kart doğrulanamadı. Money Kart çıkartmak ister misiniz?");
    if (kartIsterMi) {
        isim = prompt("Adınızı giriniz:");
        soyisim = prompt("Soyadınızı giriniz:");
        let yeniKartNumarasi = prompt("Yeni kart numarası (6 haneli rakam):");

        if (/^\d{6}$/.test(yeniKartNumarasi)) {
            gecerliKartlar.push(yeniKartNumarasi);
            kartVarMi = true;
            kartNumarasi = yeniKartNumarasi;
            alert("Yeni kart oluşturuldu ve indirim uygulanacak ✅");
        } else {
            alert("Geçersiz kart numarası. İndirim uygulanmayacak ❌");
        }
    } else {
        alert("İşleme kartsız devam edilecek ❌");
    }
}

let secilenUrunler = [];
urunListesi.forEach(urun => {
    const cevap = confirm(`${urun.urunIsmı} (${urun.fiyat} TL) almak ister misiniz?`);
    if (cevap) {
        secilenUrunler.push(urun);
    }
});

if (secilenUrunler.length === 0) {
    alert("Herhangi bir ürün seçilmedi. Alışveriş iptal edildi.");
} else {
    const musteri = new Musteri(isim, soyisim, kartVarMi, secilenUrunler);
    const odenecekTutar = musteri.hesapla();

    let mesaj = `Seçilen Ürünler:\n`;
    secilenUrunler.forEach(u => {
        mesaj += `- ${u.urunIsmı}: ${u.fiyat} TL\n`;
    });

    mesaj += `\n`;

    if (kartVarMi && isim && soyisim) {
        mesaj += `Yeni Müşteri: ${isim} ${soyisim}\nKart Numarası: ${kartNumarasi}\nİndirim uygulandı ✅\n`;
    } else if (kartVarMi) {
        mesaj += `Kartlı müşteri, ancak bilgi alınmadı.\nİndirim uygulandı ✅\n`;
    } else {
        mesaj += `Money Kart kullanılmadı ❌\n`;
    }

    mesaj += `Toplam Ödenecek Tutar: ${odenecekTutar.toFixed(2)} TL`;

    alert(mesaj);
}
