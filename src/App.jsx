import React, { useRef, useState } from 'react'
import {
  ArrowRight, BatteryCharging, Bluetooth, Check, ChevronDown,
  ChevronLeft, ChevronRight, Menu, PhoneCall, ShieldCheck,
  ShoppingBag, Sparkles, Star, Truck, X
} from 'lucide-react'

const plans = [
  { qty: 1, title: '1 Watch 10 Air', old: '₦85,000', price: '₦75,000', perk: 'Free shipping', tag: '' },
  { qty: 2, title: '2 Watch 10 Air', old: '₦170,000', price: '₦135,000', each: '₦67,500 each', perk: 'Free extra strap color', tag: 'Most popular' },
  { qty: 3, title: '3 Watch 10 Air', old: '₦255,000', price: '₦180,000', each: '₦60,000 each', perk: '2 extra straps + screen protectors', tag: 'Best value' },
]

const faqs = [
  ['I already have a phone — why do I need this?', 'It’s not about replacing your phone. It’s about not reaching for it every time something happens. Calls, WhatsApp, and notifications land on your wrist so your phone can stay in your bag or pocket — especially useful mid-task, mid-drive, or mid-workout.'],
  ['Isn’t this another thing I have to charge?', 'No. With 5–7 days per charge, you’re not adding a nightly charging habit. Charge it Sunday and forget about it until the following weekend.'],
  ['Will it work with my phone?', 'Yes. Watch 10 Air is compatible with both iPhone and Android, so you get the full experience whichever phone you carry.'],
  ['How accurate is the health tracking?', 'It gives you a consistent everyday view of your trends, useful for noticing patterns over time. It is not a clinical-grade medical device; always consult a health professional for medical readings.'],
  ['Is there a subscription or extra cost?', 'No subscription. Calling, AI tools, notifications and health tracking are available out of the box.'],
  ['Will notifications become overwhelming?', 'You decide exactly which apps can reach your wrist. The goal is fewer trips to your phone, not more interruptions.'],
]

const testimonials = [
  { quote: 'I used to miss calls whenever my phone was buried in my tote. Now I see who’s calling, answer, and keep moving.', name: 'Amara O.', detail: 'Creative director · Lagos', initials: 'AO' },
  { quote: 'The battery is the real difference. I charged it on Sunday evening and still had power after work on Friday.', name: 'Tobi A.', detail: 'Product manager · Abuja', initials: 'TA' },
  { quote: 'It keeps me present. I can check what matters without opening my phone and disappearing into ten other apps.', name: 'Ife N.', detail: 'Founder · Port Harcourt', initials: 'IN' },
]

function Logo() {
  return <a className="logo" href="#top" aria-label="Galuxe home">GALUXE</a>
}

function WatchVisual({ compact = false }) {
  return (
    <div className={`watch-stage ${compact ? 'compact' : ''}`} aria-label="Product image placeholder">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="watch">
        <div className="strap strap-top"><i /><i /><i /><i /></div>
        <div className="watch-case">
          <div className="crown" />
          <div className="screen">
            <div className="screen-top"><span>10:09</span><BatteryCharging size={12} /></div>
            <div className="screen-rings"><b>7</b><small>DAYS</small></div>
            <div className="screen-label">READY ALL WEEK</div>
          </div>
        </div>
        <div className="strap strap-bottom"><i /><i /><i /><i /></div>
      </div>
      {!compact && <span className="image-note">Product image placeholder</span>}
    </div>
  )
}

function Accordion({ item, index, open, setOpen }) {
  const active = open === index
  return (
    <div className={`faq-item ${active ? 'open' : ''}`}>
      <button onClick={() => setOpen(active ? -1 : index)} aria-expanded={active}>
        <span>{String(index + 1).padStart(2, '0')}</span>{item[0]}<ChevronDown size={21} />
      </button>
      <div className="faq-answer"><p>{item[1]}</p></div>
    </div>
  )
}

export default function App() {
  const [plan, setPlan] = useState(1)
  const [color, setColor] = useState('Black')
  const [slide, setSlide] = useState(0)
  const [earlyFaq, setEarlyFaq] = useState(0)
  const [earlyReview, setEarlyReview] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const earlyReviewsRef = useRef(null)

  const addToCart = () => {
    setAdded(true)
    setCartOpen(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  const goToReview = (index) => {
    const next = (index + testimonials.length) % testimonials.length
    const carousel = earlyReviewsRef.current
    const card = carousel?.children[next]
    if (carousel && card) carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: 'smooth' })
    setEarlyReview(next)
  }

  const trackReview = (event) => {
    const carousel = event.currentTarget
    const cards = [...carousel.children]
    const nearest = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - carousel.offsetLeft - carousel.scrollLeft) < Math.abs(cards[best].offsetLeft - carousel.offsetLeft - carousel.scrollLeft) ? index : best, 0)
    setEarlyReview(nearest)
  }

  return (
    <div id="top">
      <div className="announcement"><Truck size={15} /> FREE SHIPPING NATIONWIDE <span>•</span> SAME-DAY DISPATCH IN LAGOS</div>
      <nav>
        <Logo />
        <div className={`nav-links ${mobileOpen ? 'show' : ''}`}>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
        </div>
        <div className="nav-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={20} /><span>{added ? plan + 1 : 0}</span></button>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-left">
          <div className="product-gallery">
            <WatchVisual />
            <button className="gallery-arrow left" onClick={() => setSlide((slide + 3) % 4)} aria-label="Previous image"><ChevronLeft /></button>
            <button className="gallery-arrow right" onClick={() => setSlide((slide + 1) % 4)} aria-label="Next image"><ChevronRight /></button>
            <div className="gallery-dots">{[0,1,2,3].map(i => <button key={i} className={slide === i ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Image ${i + 1}`} />)}</div>
          </div>

          <section className="early-testimonials" aria-labelledby="early-testimonials-title">
            <div className="early-testimonials-head">
              <div>
                <div className="section-kicker">VERIFIED REVIEWS</div>
                <h2 id="early-testimonials-title">What our customers say</h2>
              </div>
              <div className="early-rating"><b>4.9</b><span><Star /><Star /><Star /><Star /><Star /></span><small>120+ reviews</small></div>
            </div>
            <div className="early-review-grid" ref={earlyReviewsRef} onScroll={trackReview}>
              {testimonials.map((t) => (
                <article key={t.name}>
                  <div className="stars"><Star /><Star /><Star /><Star /><Star /></div>
                  <blockquote>“{t.quote}”</blockquote>
                  <footer><span>{t.initials}</span><div><b>{t.name} <Check /></b><small>{t.detail}</small></div></footer>
                </article>
              ))}
            </div>
            <div className="early-review-controls">
              <div className="review-dots" aria-label="Choose a testimonial">
                {testimonials.map((t, i) => <button key={t.name} className={earlyReview === i ? 'active' : ''} onClick={() => goToReview(i)} aria-label={`Show review ${i + 1}`} />)}
              </div>
              <div className="review-arrows">
                <button onClick={() => goToReview(earlyReview - 1)} aria-label="Previous testimonial"><ChevronLeft /></button>
                <button onClick={() => goToReview(earlyReview + 1)} aria-label="Next testimonial"><ChevronRight /></button>
              </div>
            </div>
          </section>
          </div>

          <div className="hero-right">
          <div className="hero-copy">
            <div className="eyebrow">WATCH 10 AIR <span>NEW</span></div>
            <h1>One watch.<br />Every feature<br />your phone has.</h1>
            <p className="hero-sub">Calls, AI, WhatsApp, health tracking and more—with up to <strong>7 days of battery.</strong></p>
            <div className="rating"><span><Star /><Star /><Star /><Star /><Star /></span> <b>4.9</b> <a href="#reviews">120+ verified reviews</a></div>

            <div className="quick-benefits">
              <div><PhoneCall /><span><b>Calls on your wrist</b><small>Leave your phone in your bag</small></span></div>
              <div><BatteryCharging /><span><b>5–7 day battery</b><small>Charge once. Live all week.</small></span></div>
              <div><Bluetooth /><span><b>iPhone + Android</b><small>Works with the phone you have</small></span></div>
            </div>

            <div className="selector-label">Choose your bundle <span>Save up to ₦75,000</span></div>
            <div className="plans">
              {plans.map((item, i) => (
                <button key={item.qty} className={`plan ${plan === i ? 'selected' : ''}`} onClick={() => setPlan(i)}>
                  {item.tag && <em>{item.tag}</em>}
                  <span className="radio"><i /></span>
                  <span className="plan-copy"><b>{item.title}</b><small><Check /> {item.perk}</small></span>
                  <span className="plan-price"><s>{item.old}</s><b>{item.price}</b>{item.each && <small>{item.each}</small>}</span>
                </button>
              ))}
            </div>

            <div className="color-row"><span>Finish: <b>{color}</b></span><div>{[['Black','#181818'],['Silver Green','#8d968b'],['Silver White','#deded8']].map(([name, hex]) => <button key={name} className={color === name ? 'active' : ''} onClick={() => setColor(name)} title={name} style={{'--swatch': hex}} />)}</div></div>
            <button className="primary-cta" onClick={addToCart}>{added ? <><Check /> Added to cart</> : <>Add to cart — {plans[plan].price}<ArrowRight /></>}</button>
            <div className="checkout-trust"><span><ShieldCheck /> Secure checkout</span><span><Truck /> Free shipping</span><span><Sparkles /> 2 straps included</span></div>
          </div>

          <section className="early-faq" aria-labelledby="early-faq-title">
            <div className="early-faq-intro">
              <div className="section-kicker" id="early-faq-title">BEFORE YOU DECIDE</div>
            </div>
            <div className="early-faq-list">
              {faqs.slice(0, 3).map((item, i) => (
                <Accordion key={item[0]} item={item} index={i} open={earlyFaq} setOpen={setEarlyFaq} />
              ))}
            </div>
          </section>
          </div>
        </section>

        <section className="construction-notice" role="status">
          <span>TO BE CONTINUED</span>
          <b>Page under construction</b>
          <small>More of the Watch 10 Air story is being written.</small>
        </section>

      </main>

      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}><button className="drawer-backdrop" onClick={() => setCartOpen(false)} aria-label="Close cart" /><aside><div className="drawer-head"><b>Your cart</b><button onClick={() => setCartOpen(false)}><X /></button></div>{added ? <><div className="cart-item"><div className="cart-thumb"><WatchVisual compact /></div><div><b>Watch 10 Air</b><span>{color} · {plans[plan].title}</span><strong>{plans[plan].price}</strong></div></div><div className="cart-total"><span>Subtotal</span><b>{plans[plan].price}</b></div><button className="primary-cta">Secure checkout <ArrowRight /></button><small className="cart-note"><ShieldCheck /> Taxes included. Shipping is free.</small></> : <div className="empty-cart"><ShoppingBag /><h3>Your cart is empty</h3><p>Your new favourite watch is one click away.</p><button onClick={() => setCartOpen(false)}>Continue shopping</button></div>}</aside></div>
    </div>
  )
}
