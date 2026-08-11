# Proprietary Software

Copyright © 2026 FIRAT DASDOGEN

All Rights Reserved.

Unauthorized copying, modification, distribution, deployment, hosting, or creation of derivative works is prohibited.

---

# VERDİ HUKUK — Marka Konsepti

VERDİ HUKUK için hazırlanmış Vite + React tabanlı bağımsız marka ve web deneyimi konsepti.

> Sayfadaki kişi, iletişim ve kariyer bilgileri temsilidir. Gerçek bir hukuk bürosu beyanı veya hukuki hizmet teklifi değildir.

## Calistirma

```bash
npm install
npm run dev
```

## Komutlar

```bash
npm run build
npm run lint
npm run preview
```

## SEO ve canlıya geçiş

Konsept sürüm varsayılan olarak `noindex, nofollow` kullanır. Gerçek marka, iletişim bilgileri ve alan adı onaylandıktan sonra:

```bash
VITE_SITE_STATUS=live VITE_SITE_URL=https://alanadiniz.com npm run build
```

Canlıya almadan önce `public/sitemap.xml` içindeki örnek alan adını gerçek alan adıyla değiştirin.

## Notlar

- Uygulama artik harici builder/SDK bagimliligi olmadan calisir.
- Iletisim, kariyer ve auth akislarinda yerel demo istemcisi kullanilir.
- Gercek e-posta, dosya yukleme veya uyelik sistemi eklenecekse `src/api/localClient.js` dosyasi uygun backend API'lerine baglanabilir.
