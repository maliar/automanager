# 🚀 Nasadenie na Websupport

## Krok 1: Buildnutie projektu

### 1.1 Otvorte terminál/príkazový riadok v priečinku projektu

```bash
# Nainštalujte závislosti (ak ste to ešte nerobili)
npm install

# Buildnite projekt
npm run build
```

Po dokončení sa vytvorí priečinok **`dist/`** so všetkými súbormi vášho webu.

---

## Krok 2: Príprava Websupport hostingu

### 2.1 Prihláste sa do Websupport admin panelu
- Choďte na: https://admin.websupport.sk
- Prihláste sa

### 2.2 Vyberte doménu automanager.sk
- V menu kliknite na **Webhosting**
- Vyberte doménu **automanager.sk**

---

## Krok 3: Nahratie súborov

### Metóda A: Cez Webdisk (jednoduchšie)

1. **Kliknite na "Webdisk"** v Websupport admin paneli
2. **Otvorte priečinok vašej domény** (pravdepodobne `automanager.sk/` alebo `www/`)
3. **Vymažte všetky staré súbory** v tomto priečinku (ak tam nejaké sú)
4. **Nahrajte VŠETKY súbory z priečinka `dist/`**:
   - Môžete použiť drag & drop
   - Alebo tlačidlo "Nahrať súbory"
5. **Dôležité:** Nahrajte priamo súbory z `dist/`, NIE celý priečinok `dist/`

Štruktúra by mala vyzerať takto:
```
automanager.sk/
├── index.html
├── assets/
│   ├── index-xyz123.js
│   ├── index-abc456.css
│   └── ...
└── .htaccess (tento vytvoríte ďalej)
```

### Metóda B: Cez FTP (pre pokročilých)

1. **FTP údaje nájdete v admin paneli** Websupport → Webhosting → FTP prístupy
2. **Použite FTP klienta** (napr. FileZilla)
   - Host: `ftp.websupport.sk`
   - Užívateľské meno: `váš_ftp_login`
   - Heslo: `vaše_ftp_heslo`
3. **Pripojte sa a nahrajte súbory z `dist/`** do root priečinka domény

---

## Krok 4: Nastavenie .htaccess (KRITICKÉ!)

Pretože je to Single Page Application, musíte vytvoriť súbor **`.htaccess`** v root priečinku:

### 4.1 Vytvorte súbor .htaccess

Cez Webdisk alebo FTP vytvorte nový súbor s názvom **`.htaccess`** (s bodkou na začiatku!) a vložte doň tento obsah:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirect HTTP to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Single Page Application routing
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

### 4.2 Uložte súbor

Uistite sa, že súbor má presný názov **`.htaccess`** (s bodkou!)

---

## Krok 5: Aktivácia HTTPS (SSL certifikát)

### 5.1 V Websupport admin paneli

1. Prejdite na **Webhosting** → **SSL certifikáty**
2. Vyberte doménu **automanager.sk**
3. Kliknite na **"Aktivovať Let's Encrypt SSL"** (je to zadarmo!)
4. Počkajte 5-10 minút, kým sa certifikát aktivuje

### 5.2 Overenie

Po aktivácii by mal web automaticky fungovať na `https://automanager.sk`

---

## Krok 6: Testovanie

### 6.1 Otvorte web v prehliadači

```
https://automanager.sk
```

### 6.2 Skontrolujte:

- ✅ Načítava sa správne dizajn
- ✅ Zobrazujú sa všetky obrázky (teraz z Unsplash)
- ✅ Navigácia funguje (tlačidlá scrollujú na správne sekcie)
- ✅ Kontaktný formulár odosiela správy
- ✅ Google recenzie sa načítavajú
- ✅ Web je responzívny (funguje na mobile)

### 6.3 Ak niečo nefunguje

**Otvorte Developer Console** (F12 v prehliadači) → záložka **Console**
- Hľadajte chybové hlášky
- Screenshot pošlite a pomôžem opraviť

---

## Krok 7: Aktualizácia webu v budúcnosti

Pri každej zmene kódu:

```bash
# 1. Buildnite projekt
npm run build

# 2. Nahrajte nový obsah priečinka dist/ na Websupport
#    (prepíšte staré súbory novými)

# 3. Možno budete musieť vyčistiť cache prehliadača (Ctrl+F5)
```

---

## 📋 Checklist pre deployment

- [ ] `npm install` úspešne dokončené
- [ ] `npm run build` vytvorilo priečinok `dist/`
- [ ] Všetky súbory z `dist/` nahrané na Websupport
- [ ] Súbor `.htaccess` vytvorený s obsahom vyššie
- [ ] SSL certifikát aktivovaný (HTTPS funguje)
- [ ] Web sa správne načítava na `https://automanager.sk`
- [ ] Všetky obrázky sa zobrazujú
- [ ] Formulár odosiela správy
- [ ] Responzívny dizajn funguje na mobile

---

## 🆘 Časté problémy a riešenia

### Problém: Obrázky sa nenačítavajú
**Riešenie:** Teraz používame Unsplash CDN, ktorý je stabilný. Ak sa stále nenačítavajú, skontrolujte console (F12) pre chybové hlášky.

### Problém: Po obnovení stránky sa zobrazí 404
**Riešenie:** Skontrolujte, či ste správne vytvorili súbor `.htaccess` s obsahom vyššie.

### Problém: HTTP namiesto HTTPS
**Riešenie:** Aktivujte Let's Encrypt SSL v Websupport admin paneli a počkajte 5-10 minút.

### Problém: Formulár neodosiela správy
**Riešenie:** Skontrolujte, či Supabase Edge Function funguje. Otestujte na `https://[supabase-project-id].supabase.co/functions/v1/make-server-235ea927/contact`

### Problém: Google recenzie sa nenačítavajú
**Riešenie:** Skontrolujte, či máte správne nastavenú `GOOGLE_PLACES_API_KEY` v Supabase Secrets.

---

## ✅ Hotovo!

Váš web by teraz mal byť naživo na **https://automanager.sk**! 🎉

Ak máte akékoľvek problémy, otvorte Developer Console (F12) a pošlite screenshot chybových hlášok.
