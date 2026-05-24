/**
 * Script to update tour images with professional Pixabay city photos
 * 
 * This script helps replace tour images with professional city photographs
 * from Pixabay (verified and manually curated).
 * 
 * Usage:
 * 1. Set MONGODB_URI in .env file
 * 2. Run: npx ts-node scripts/update-tour-images.ts
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Pixabay-based professional city photo mappings
const TOUR_PLACEHOLDERS: Record<string, string> = {
  // Bursa - Cumalıkızık Tarihi Sokakları (Acanalp)
  BURSA: "https://pixabay.com/images/download/acanalp-cumalkzk-2929541_1920.jpg",

  // Kapadokya - Sıcak Hava Balonları (Ramzi Belaidi)
  KAPADOKYA: "https://pixabay.com/images/download/ramzibelaidi-hot-air-balloons-7950143_1920.jpg",

  // İstanbul Lale Festivali - Laleler & Boğaz Köprüsü (Etirgroup)
  LALE_FESTIVALI: "https://pixabay.com/images/download/etirgroup-bridge-7826674_1920.jpg",

  // Mardin - Tarihi Taş Evler & Mezopotamya Ovası (Tuna Ölger)
  MARDIN: "https://pixabay.com/images/download/tunaolger-architectural-3564881_1920.jpg",

  // Safranbolu - Tarihi Konaklar (Shutterbug41)
  SAFRANBOLU: "https://pixabay.com/images/download/shutterbug41-safranbolu-2731638_1920.jpg",

  // İstanbul Genel - Ortaköy & Boğaz (Babelphotography)
  ISTANBUL: "https://pixabay.com/images/download/babelphotography-mosque-279015_1920.jpg",

  // Ankara - Anıtkabir (Schweinalp)
  ANKARA: "https://pixabay.com/images/download/schweinalp-ataturk-2794134_1920.jpg",

  // Adana - Sabancı Camii & Taş Köprü (Macit888)
  ADANA: "https://pixabay.com/images/download/macit888-adana-1279715_1920.jpg",

  // Eskişehir - Porsuk Çayı & Gondol (Vedat Zorluer)
  ESKISEHIR: "https://pixabay.com/images/download/vedatzorluer-turkey-4625598_1920.jpg",

  // Balat & Fener - Kırmızı Mektep (Mücahit Yıldız)
  BALAT_FENER: "https://pixabay.com/images/download/mucahityildiz-fener-greek-high-school-4076351_1920.jpg",
  
  // Abant & Yedigöller - Sisli Göl Manzarası (Beyazt)
  ABANT_YEDIGOLLER: "https://pixabay.com/images/download/beyazt-divided-2068266_1920.jpg",
  
  // Default Fallback
  DEFAULT: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8df9?q=80&w=1200"
};

/**
 * Tur ismine göre en şık görseli eşleştiren akıllı yardımcı fonksiyon.
 */
function getSafeTourImage(title: string): string {
  if (!title) return TOUR_PLACEHOLDERS.DEFAULT;
  
  const t = title.toLocaleLowerCase('tr-TR');
  
  // Bursa Eşleşmesi
  if (t.includes("bursa") || t.includes("cumalıkızık") || t.includes("uludağ")) {
    return TOUR_PLACEHOLDERS.BURSA;
  }

  // Kapadokya Eşleşmesi
  if (t.includes("kapadokya") || t.includes("peri") || t.includes("balon")) {
    return TOUR_PLACEHOLDERS.KAPADOKYA;
  }

  // Lale Festivali Eşleşmesi
  if (t.includes("lale") || t.includes("festivali") || t.includes("emirgan")) {
    return TOUR_PLACEHOLDERS.LALE_FESTIVALI;
  }

  // Mardin Eşleşmesi
  if (t.includes("mardin") || t.includes("artuklu")) {
    return TOUR_PLACEHOLDERS.MARDIN;
  }

  // Safranbolu Eşleşmesi
  if (t.includes("safranbolu") || t.includes("konaklar")) {
    return TOUR_PLACEHOLDERS.SAFRANBOLU;
  }

  // İstanbul Genel Eşleşmesi
  if (t.includes("istanbul") || t.includes("boğaz") || t.includes("ortaköy")) {
    return TOUR_PLACEHOLDERS.ISTANBUL;
  }

  // Ankara Eşleşmesi
  if (t.includes("ankara") || t.includes("anıtkabir")) {
    return TOUR_PLACEHOLDERS.ANKARA;
  }

  // Adana Eşleşmesi
  if (t.includes("adana") || t.includes("taş köprü")) {
    return TOUR_PLACEHOLDERS.ADANA;
  }

  // Eskişehir Eşleşmesi
  if (t.includes("eskişehir") || t.includes("porsuk")) {
    return TOUR_PLACEHOLDERS.ESKISEHIR;
  }
  
  // Balat & Fener Eşleşmesi
  if (t.includes("balat") || t.includes("fener")) {
    return TOUR_PLACEHOLDERS.BALAT_FENER;
  }
  
  // Abant & Yedigöller Eşleşmesi
  if (t.includes("abant") || t.includes("yedigöller")) {
    return TOUR_PLACEHOLDERS.ABANT_YEDIGOLLER;
  }
  
  return TOUR_PLACEHOLDERS.DEFAULT;
}

// Main function to update tour images
async function updateTourImages() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Import Tour model
    const Tour = mongoose.model('Tour', new mongoose.Schema({
      name: String,
      destination: String,
      image: String,
      slug: String,
    }));
    
    // Get all tours
    const tours = await Tour.find({});
    console.log(`📊 Found ${tours.length} tours to update`);
    
    let updatedCount = 0;
    
    // Update each tour with professional Pixabay city photo
    for (const tour of tours) {
      const tourName = tour.name || '';
      const destination = tour.destination || '';
      const newImage = getSafeTourImage(tourName || destination);
      
      if (tour.image !== newImage) {
        await Tour.updateOne(
          { _id: tour._id },
          { $set: { image: newImage } }
        );
        
        console.log(`✅ Updated: ${tour.name} (${destination})`);
        console.log(`   Old: ${tour.image}`);
        console.log(`   New: ${newImage}`);
        updatedCount++;
      }
    }
    
    console.log(`\n🎉 Successfully updated ${updatedCount} tours with professional Pixabay city photos!`);
    
  } catch (error) {
    console.error('❌ Error updating tour images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run the script
updateTourImages();
