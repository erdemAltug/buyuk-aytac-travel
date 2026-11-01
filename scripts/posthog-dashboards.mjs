/**
 * PostHog dashboard'larını API ile oluşturur (docs/POSTHOG_DASHBOARDLAR.md).
 * Anahtarlar .env.local'den okunur, repoya yazılmaz:
 *   POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID, NEXT_PUBLIC_POSTHOG_HOST
 * Çalıştırma: node --env-file=.env.local scripts/posthog-dashboards.mjs
 * Aynı adlı dashboard varsa atlanır (tekrar çalıştırmak güvenli).
 */

const KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const PROJECT = process.env.POSTHOG_PROJECT_ID;
// Olay adresi (eu.i.posthog.com) değil, uygulama adresi (eu.posthog.com) gerekir
const HOST = (process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com').replace('.i.posthog.com', '.posthog.com');

if (!KEY || !PROJECT) {
  console.error('POSTHOG_PERSONAL_API_KEY ve POSTHOG_PROJECT_ID gerekli (.env.local)');
  process.exit(1);
}

async function api(path, method = 'GET', body) {
  const res = await fetch(`${HOST}/api/projects/${PROJECT}${path}`, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

const ev = (event, math = 'total', properties) => ({ kind: 'EventsNode', event, name: event, math, ...(properties ? { properties } : {}) });
const homeOnly = [{ key: '$pathname', value: '/', operator: 'exact', type: 'event' }];

function trends(series, { display = 'ActionsLineGraph', breakdown, interval = 'day', from = '-30d', compare = false } = {}) {
  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'TrendsQuery',
      series,
      interval,
      dateRange: { date_from: from },
      filterTestAccounts: true,
      trendsFilter: { display },
      ...(breakdown ? { breakdownFilter: { breakdown, breakdown_type: 'event' } } : {}),
      ...(compare ? { compareFilter: { compare: true } } : {}),
    },
  };
}

function funnel(series, { breakdown, from = '-30d' } = {}) {
  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'FunnelsQuery',
      series,
      dateRange: { date_from: from },
      filterTestAccounts: true,
      funnelsFilter: { funnelWindowInterval: 1, funnelWindowIntervalUnit: 'day', funnelVizType: 'steps' },
      ...(breakdown ? { breakdownFilter: { breakdown, breakdown_type: 'event' } } : {}),
    },
  };
}

function retention(event) {
  const entity = { id: event, name: event, type: 'events' };
  return {
    kind: 'InsightVizNode',
    source: {
      kind: 'RetentionQuery',
      dateRange: { date_from: '-8w' },
      filterTestAccounts: true,
      retentionFilter: { targetEntity: entity, returningEntity: entity, period: 'Week', totalIntervals: 8, retentionType: 'retention_first_time' },
    },
  };
}

const DASHBOARDS = [
  {
    name: 'Genel Bakış',
    description: 'Her gün bakılacak özet: ziyaretçi, sayfalar, turlar, kaynaklar, cihaz, talepler.',
    pinned: true,
    insights: [
      ['Günlük ziyaretçi', 'Siteye günde kaç kişi geliyor, kaç sayfa bakıyor?', trends([ev('$pageview', 'dau'), ev('$pageview')])],
      ['Haftalık ziyaretçi (önceki dönemle)', 'Geçen döneme göre büyüyor muyuz?', trends([ev('$pageview', 'dau')], { interval: 'week', from: '-12w', compare: true })],
      ['En çok bakılan sayfalar', 'Hangi sayfalar ilgi görüyor?', trends([ev('$pageview')], { display: 'ActionsTable', breakdown: '$pathname' })],
      ['En çok bakılan turlar', 'Hangi tur en çok ilgi çekiyor?', trends([ev('tour_view', 'dau')], { display: 'ActionsTable', breakdown: 'tour_slug' })],
      ['Trafik kaynakları', 'Ziyaretçiler nereden geliyor?', trends([ev('$pageview', 'dau')], { display: 'ActionsPie', breakdown: '$referring_domain' })],
      ['Cihaz dağılımı', 'Mobil mi masaüstü mü?', trends([ev('$pageview', 'dau')], { display: 'ActionsPie', breakdown: '$device_type' })],
      ['Rezervasyon talepleri (7 gün)', 'Bu hafta kaç rezervasyon talebi geldi?', trends([ev('reservation_submit')], { display: 'BoldNumber', from: '-7d', compare: true })],
      ['WhatsApp tıklamaları (7 gün)', 'Bu hafta kaç kişi WhatsApp’tan yazmaya çalıştı?', trends([ev('whatsapp_click')], { display: 'BoldNumber', from: '-7d', compare: true })],
    ],
  },
  {
    name: 'Satış Hunisi',
    description: 'Ana sayfa → tur → rezervasyon/WhatsApp dönüşümü.',
    insights: [
      ['Ana sayfa → Tur → Rezervasyon', 'Her adımda yüzde kaç kayboluyor?', funnel([ev('$pageview', 'total', homeOnly), ev('tour_view'), ev('reservation_open'), ev('reservation_submit')])],
      ['Tur → WhatsApp', 'Tur sayfasına bakanların kaçı WhatsApp’a tıklıyor?', funnel([ev('tour_view'), ev('whatsapp_click')])],
      ['Huni – cihaza göre', 'Mobilde huni masaüstünden kötü mü?', funnel([ev('$pageview', 'total', homeOnly), ev('tour_view'), ev('reservation_open'), ev('reservation_submit')], { breakdown: '$device_type' })],
      ['Rezervasyon nereden açılıyor?', 'Kart mı, detay mı, mobil çubuk mu?', trends([ev('reservation_open')], { display: 'ActionsBarValue', breakdown: 'source' })],
      ['Form tamamlama (kaynağa göre)', 'Formu açıp vazgeçen çok mu?', funnel([ev('reservation_open'), ev('reservation_submit')], { breakdown: 'source' })],
      ['WhatsApp nereden tıklanıyor?', 'Hangi WhatsApp butonu işe yarıyor?', trends([ev('whatsapp_click')], { display: 'ActionsBarValue', breakdown: 'source' })],
      ['Tur bazında ilgi ve talep', 'Hangi tur çok bakılıyor ama az satıyor?', trends([ev('tour_view', 'dau'), ev('reservation_submit'), ev('whatsapp_click')], { display: 'ActionsTable', breakdown: 'tour_slug' })],
      ['Rezervasyon hataları', 'Form bozuldu mu? (0 olmalı)', trends([ev('reservation_error')])],
    ],
  },
  {
    name: 'Ana Sayfa Etkileşimi',
    description: 'Arama, hızlı linkler, tur gezgini, asistan.',
    insights: [
      ['Ne aranıyor?', 'İnsanlar hangi yerleri arıyor?', trends([ev('hero_search')], { display: 'ActionsTable', breakdown: 'term' })],
      ['Hızlı linkler', 'Hangi hızlı link tıklanıyor?', trends([ev('hero_quick_link')], { display: 'ActionsBarValue', breakdown: 'label' })],
      ['Gezgin sekmeleri', 'Hangi kategori ilgi görüyor?', trends([ev('explorer_tab')], { display: 'ActionsBarValue', breakdown: 'tab' })],
      ['Ay seçimi', 'Hangi ay için tur aranıyor?', trends([ev('explorer_month')], { display: 'ActionsBarValue', breakdown: 'month' })],
      ['Sıradaki kalkış kartı', 'Geri sayım kartı tıklanıyor mu?', trends([ev('next_departure_click')], { display: 'BoldNumber' })],
      ['Asistan kullanımı', 'Asistan kullanılıyor mu, nereden?', trends([ev('assistant_open')], { display: 'ActionsBarValue', breakdown: 'source' })],
    ],
  },
  {
    name: 'Sadakat',
    description: 'Geri dönen ziyaretçiler ve büyümenin kaynağı.',
    insights: [
      ['Geri dönen ziyaretçi', 'Gelenler sonraki haftalarda tekrar geliyor mu?', retention('$pageview')],
      ['Tur bakanlar geri geliyor mu', 'Tur inceleyen kişi yine bakıyor mu?', retention('tour_view')],
      ['Yeni vs geri dönen', 'Büyüme yeni ziyaretçiden mi geri dönenden mi?', { kind: 'InsightVizNode', source: { kind: 'LifecycleQuery', series: [ev('$pageview')], interval: 'week', dateRange: { date_from: '-8w' }, filterTestAccounts: true } }],
    ],
  },
];

const existing = await api('/dashboards/?limit=200');
const byName = new Map(existing.results.filter((d) => !d.deleted).map((d) => [d.name, d]));

for (const d of DASHBOARDS) {
  if (byName.has(d.name)) {
    console.log(`= ${d.name} zaten var, atlandı: ${HOST}/project/${PROJECT}/dashboard/${byName.get(d.name).id}`);
    continue;
  }
  const dash = await api('/dashboards/', 'POST', { name: d.name, description: d.description, pinned: Boolean(d.pinned) });
  let ok = 0;
  for (const [name, description, query] of d.insights) {
    try {
      await api('/insights/', 'POST', { name, description, query, dashboards: [dash.id], saved: true });
      ok++;
    } catch (e) {
      console.warn(`  ! ${name}: ${e.message}`);
    }
  }
  console.log(`+ ${d.name} (${ok}/${d.insights.length} grafik): ${HOST}/project/${PROJECT}/dashboard/${dash.id}`);
}
