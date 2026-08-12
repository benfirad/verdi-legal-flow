// DACH HUKUK marka konsepti — tüm kişi ve iletişim bilgileri temsilidir.

export const POSITIONS = [
  { id: 'partner', tr: 'Ortak', en: 'Partner' },
  { id: 'associate', tr: 'Avukat', en: 'Associate' },
  { id: 'trainee', tr: 'Stajyer Avukat', en: 'Trainee Lawyer' },
];

export const PRACTICE_AREAS = [
  { id: 'corporate', tr: 'Ticaret ve Şirketler', en: 'Corporate and Commercial' },
  { id: 'ma', tr: 'Birleşme ve Devralmalar', en: 'Mergers and Acquisitions' },
  { id: 'disputes', tr: 'Uyuşmazlık Çözümü', en: 'Dispute Resolution' },
  { id: 'employment', tr: 'İş Hukuku', en: 'Employment' },
  { id: 'real-estate', tr: 'Gayrimenkul ve İnşaat', en: 'Real Estate and Construction' },
  { id: 'competition', tr: 'Rekabet Hukuku', en: 'Competition Law' },
  { id: 'finance', tr: 'Bankacılık ve Finans', en: 'Banking and Finance' },
  { id: 'data', tr: 'Veri Koruma ve Teknoloji', en: 'Data Protection and Technology' },
  { id: 'ip', tr: 'Fikri Mülkiyet', en: 'Intellectual Property' },
];

const portrait = (slug) => `/assets/team/dach/${slug}.jpg`;
const phone = '+90 212 000 00 00';

export const teamMembers = [
  {
    id: 101, slug: 'caner-demir', name: 'Caner Demir', position: 'partner', titleTr: 'Kurucu Ortak', titleEn: 'Founding Partner',
    email: 'caner.demir@dach-hukuk.example', phone, image: portrait('caner-demir'), practiceAreas: ['corporate', 'ma', 'competition'], languages: ['Türkçe', 'İngilizce'],
    education: ['İstanbul Üniversitesi Hukuk Fakültesi, LL.B.', 'King’s College London, International Business Law, LL.M.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 102, slug: 'ayse-yilmaz', name: 'Ayşe Yılmaz', position: 'partner', titleTr: 'Ortak', titleEn: 'Partner',
    email: 'ayse.yilmaz@dach-hukuk.example', phone, image: portrait('ayse-yilmaz'), practiceAreas: ['disputes', 'employment'], languages: ['Türkçe', 'İngilizce'],
    education: ['Ankara Üniversitesi Hukuk Fakültesi, LL.B.', 'Queen Mary University of London, Dispute Resolution, LL.M.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 103, slug: 'murat-kaya', name: 'Murat Kaya', position: 'partner', titleTr: 'Ortak', titleEn: 'Partner',
    email: 'murat.kaya@dach-hukuk.example', phone, image: portrait('murat-kaya'), practiceAreas: ['real-estate', 'finance'], languages: ['Türkçe', 'İngilizce'],
    education: ['Marmara Üniversitesi Hukuk Fakültesi, LL.B.', 'İstanbul Bilgi Üniversitesi, Ekonomi Hukuku, LL.M.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 104, slug: 'zeynep-celik', name: 'Zeynep Çelik', position: 'partner', titleTr: 'Ortak', titleEn: 'Partner',
    email: 'zeynep.celik@dach-hukuk.example', phone, image: portrait('zeynep-celik'), practiceAreas: ['data', 'ip', 'corporate'], languages: ['Türkçe', 'İngilizce', 'Almanca'],
    education: ['Koç Üniversitesi Hukuk Fakültesi, LL.B.', 'Tilburg University, Law and Technology, LL.M.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 201, slug: 'bora-arslan', name: 'Bora Arslan', position: 'associate', titleTr: 'Kıdemli Avukat', titleEn: 'Senior Associate',
    email: 'bora.arslan@dach-hukuk.example', phone, image: portrait('bora-arslan'), practiceAreas: ['ma', 'corporate'], languages: ['Türkçe', 'İngilizce'],
    education: ['Galatasaray Üniversitesi Hukuk Fakültesi, LL.B.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 202, slug: 'elif-yildiz', name: 'Elif Yıldız', position: 'associate', titleTr: 'Avukat', titleEn: 'Associate',
    email: 'elif.yildiz@dach-hukuk.example', phone, image: portrait('elif-yildiz'), practiceAreas: ['disputes', 'employment'], languages: ['Türkçe', 'İngilizce', 'Fransızca'],
    education: ['Bahçeşehir Üniversitesi Hukuk Fakültesi, LL.B.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 203, slug: 'deniz-ozturk', name: 'Deniz Öztürk', position: 'associate', titleTr: 'Avukat', titleEn: 'Associate',
    email: 'deniz.ozturk@dach-hukuk.example', phone, image: portrait('deniz-ozturk'), practiceAreas: ['data', 'ip'], languages: ['Türkçe', 'İngilizce'],
    education: ['Bilkent Üniversitesi Hukuk Fakültesi, LL.B.'], bar: 'İstanbul Barosu · Temsilî profil',
  },
  {
    id: 301, slug: 'selin-aydin', name: 'Selin Aydın', position: 'trainee', titleTr: 'Stajyer Avukat', titleEn: 'Trainee Lawyer',
    email: 'selin.aydin@dach-hukuk.example', phone, image: portrait('selin-aydin'), practiceAreas: ['corporate', 'competition'], languages: ['Türkçe', 'İngilizce'],
    education: ['Özyeğin Üniversitesi Hukuk Fakültesi, LL.B.'], bar: null,
  },
];
