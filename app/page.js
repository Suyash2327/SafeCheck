import Link from 'next/link';

const allergens = [
  {
    key: 'gluten',
    icon: '🌾',
    label: 'Gluten / Celiac',
    sub: 'Wheat, barley, rye & hidden gluten sources',
    primary: true,
  },
  {
    key: 'lactose',
    icon: '🥛',
    label: 'Lactose',
    sub: 'Milk, dairy & hidden lactose derivatives',
  },
  {
    key: 'peanut',
    icon: '🥜',
    label: 'Peanut',
    sub: 'Peanuts, groundnuts & cross-contamination',
  },
  {
    key: 'soy',
    icon: '🫘',
    label: 'Soy',
    sub: 'Soybeans, soy derivatives & hidden soy',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          100% Private · Runs in your browser
        </div>
        <h1>
          Scan. Analyze.{' '}
          <span className="accent">Eat Safe.</span>
        </h1>
        <p>
          Capture a food label with your camera or upload a photo. 
          SafeCheck instantly analyzes ingredients for allergens — 
          no data leaves your device.
        </p>
      </section>

      <section className="allergen-section">
        <div className="allergen-section-title">Choose what to check</div>
        <div className="allergen-grid">
          {allergens.map((a) => (
            <Link
              key={a.key}
              href={`/scan?check=${a.key}`}
              className={`allergen-card allergen-card--${a.key}`}
            >
              <div className="allergen-card-icon">{a.icon}</div>
              <div className="allergen-card-label">{a.label}</div>
              <div className="allergen-card-sub">{a.sub}</div>
              <span className="allergen-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="how-section-title">How it works</div>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num">1</div>
            <div className="how-step-title">Capture Label</div>
            <div className="how-step-desc">
              Use your camera or upload a photo of the ingredient list
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num">2</div>
            <div className="how-step-title">Extract Text</div>
            <div className="how-step-desc">
              Our OCR engine reads the ingredients directly in your browser
            </div>
          </div>
          <div className="how-step">
            <div className="how-step-num">3</div>
            <div className="how-step-title">Get Verdict</div>
            <div className="how-step-desc">
              Instant analysis against 200+ known allergen terms
            </div>
          </div>
        </div>
      </section>

      <div className="disclaimer">
        <div className="disclaimer-box">
          <strong>⚠ Medical Disclaimer:</strong> SafeCheck is a screening tool only 
          and is not a substitute for professional medical advice. Always verify with 
          the manufacturer and consult your healthcare provider. Cross-contamination 
          during manufacturing cannot be detected from labels alone.
        </div>
      </div>
    </>
  );
}
