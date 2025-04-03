/**
 * Bu script, süresi geçmiş turları kontrol edecek bir cron job ayarlar.
 * Vercel üzerinde deploy edilmiş projeler için, bu sayfayı düzenli aralıklarla çağıracak bir 
 * harici cron servisi (örn. cron-job.org) kullanılmalıdır.
 * 
 * Kullanım:
 * 1. Vercel üzerinde deploy edildikten sonra cron-job.org'da bir hesap oluşturun.
 * 2. Yeni bir cron job ekleyin ve URL'i şu şekilde ayarlayın:
 *    https://your-vercel-app-url.vercel.app/api/cron/expired-tours
 * 3. Çalışma zamanını her gün gece yarısı (00:00) olarak ayarlayın.
 */

console.log('Süresi geçmiş turları kontrol etmek için cron job ayarlanıyor...');
console.log('');
console.log('Bu özelliği kullanmak için:');
console.log('1. Web sitenizi Vercel üzerinde deploy edin');
console.log('2. cron-job.org gibi bir serviste hesap oluşturun');
console.log('3. Şu URL\'i her gün gece yarısı çağıracak bir cron job oluşturun:');
console.log('   https://your-vercel-app-url.vercel.app/api/cron/expired-tours');
console.log('');
console.log('Not: Bu endpoint\'i yerel geliştirme ortamında şu şekilde test edebilirsiniz:');
console.log('curl http://localhost:3000/api/cron/expired-tours');
console.log('');
console.log('Demo amaçlı olarak şimdi endpointi çağırıyoruz:');

// Demo amaçlı endpointi çağıralım
async function testExpiredToursEndpoint() {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com' 
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/cron/expired-tours`);
    const data = await response.json();
    
    console.log('API Yanıtı:', JSON.stringify(data, null, 2));
    console.log('');
    console.log('Cron job ayarlamaları tamamlandı!');
  } catch (error) {
    console.error('API çağrısı sırasında hata:', error);
    console.log('');
    console.log('API henüz çalışır durumda olmayabilir. Uygulamanızı çalıştırdıktan sonra tekrar deneyin.');
  }
}

testExpiredToursEndpoint(); 