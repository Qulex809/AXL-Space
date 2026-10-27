# AXL Space — AI-Powered Vibe Coding Platform Foundation

AXL Space, doğal dil açıklamalarından web uygulamaları tasarlamak, kod üretmek, canlı önizleme yapmak ve AI modellerini bağlamak için geliştirilmiş web-first vibe coding platformudur.

---

## 🚀 Özellikler & Mevcut Kapasite

- **Minimalist & Intelligent Arayüz:** Predominantly monochrome (#0B0B0C) karanlık tema, yüksek kontrastlı tipografi ve duyarlı (responsive) panel düzeni.
- **Özgün Pixel-Art Kurt Maskotu (PixelWolf):** `shape-rendering="crispEdges"` ile oluşturulmuş, `idle`, `thinking` ve `success` durum varyantlarına sahip özgün AXL maskotu ve rehber widget'ı (`WolfHelperWidget`).
- **Proje Yönetimi & Yerel Kalıcılık:**
  - "Yeni Proje" oluşturma, prompt temelli proje adı türetme ve yeniden adlandırma.
  - Proje arama ve filtreleme.
  - Tarayıcı `localStorage` (`axl_space_projects_v1`) katmanı ile projelerin yerel bellekte saklanması.
- **Çoklu Ekran Çalışma Alanı (Workspace):**
  - **Önizleme (Preview):** Bağlantı durumu bildiren açık çalışma alanı göstergesi.
  - **Kod (Code):** Proje dosyalarını görüntüleme ve inceleme.
  - **Dosyalar (Files):** Proje dosya ağacı navigasyonu.
  - **Görev Paneli (Task Panel):** Kullanıcı talimatları ve sistem güncellemeleri akışı.
- **Esnek AI Mimarisi:**
  - `src/lib/ai/types.ts` ve `src/lib/ai/provider.ts` altında Gemini, Claude veya OpenAI entegrasyonları için hazır, strongly-typed soyutlama.
  - AI henüz yapılandırılmadığında sahte çıktı üretmeyen, durumu açıkça kullanıcıya bildiren unconfigured provider yapısı.

---

## 🛠 Teknoloji Yığını

- **React 19**
- **TypeScript** (Strict Type Checking)
- **Vite** (Geliştirme ve Derleme Motoru)
- **Tailwind CSS** (Monokrom tasarım sistemi token'ları)
- **Lucide React** (Arayüz ikonları)
- **Vitest** (Birim testler)

---

## 📦 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18+)
- npm / pnpm / yarn

### Adımlar

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

3. Tür denetimi yapın:
   ```bash
   npm run lint
   ```

4. Unit testleri çalıştırın:
   ```bash
   npm test
   ```

5. Üretim sürümünü derleyin:
   ```bash
   npm run build
   ```

---

## ☁️ Google AI Studio Build İçe Aktarma Rehberi

Bu proje **Google AI Studio Build** ortamında doğrudan geliştirilmeye devam edilmek üzere konvansiyonel bir Node.js / Vite web uygulaması olarak kurgulanmıştır.

1. Proje ana dizinini Google AI Studio Build ortamına yükleyin.
2. `GEMINI_API_KEY` değişkenini `.env` dosyasına veya ortam değişkenlerine tanımlayın.
3. `src/lib/ai/provider.ts` içerisindeki `UnconfiguredAIProvider` yerine `@google/genai` istemcisini bağlayan `GeminiAIProvider` sınıfını tanımlayın.

---

## 📄 Lisans

MIT
