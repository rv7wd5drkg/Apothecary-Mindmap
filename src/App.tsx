import { useMemo, useState } from 'react'

type Shelf = {
  name: string
  short: string
  symbol: string
  items: string[]
}

const shelves: Shelf[] = [
  {
    name: 'Natural Remedies',
    short: 'Remedies',
    symbol: '✦',
    items: ['Chamomile', 'Lavender', 'Ginger', 'Turmeric', 'Echinacea', 'Valerian', 'Peppermint'],
  },
  {
    name: 'Plants & Herbs',
    short: 'Plants',
    symbol: '❧',
    items: ['Lavender', 'Rosemary', 'Mint', 'Sage', 'Rose', 'Calendula', 'Dandelion'],
  },
  {
    name: 'Homemade Products',
    short: 'Homemade',
    symbol: '⚗',
    items: ['Herbal Balm', 'Infused Oil', 'Bath Salts', 'Tincture', 'Soap', 'Tea Blend'],
  },
  {
    name: 'Nutrition & Vitamins',
    short: 'Nutrition',
    symbol: '✚',
    items: ['Vitamin D', 'Magnesium', 'Iron', 'Omega 3', 'Vitamin C', 'Zinc'],
  },
  {
    name: 'Parasites & Deworming',
    short: 'Deworming',
    symbol: '⌕',
    items: ['Parasites', 'Deworming', 'Life Cycles', 'Prevention', 'Signs & Symptoms'],
  },
  {
    name: 'Food Growing',
    short: 'Growing',
    symbol: '❀',
    items: ['Tomatoes', 'Pak Choi', 'Herbs', 'Seed Starting', 'Hydroponics', 'Harvesting'],
  },
]

const shelfIcons = ['book', 'jar', 'leaf', 'bottle', 'plant', 'book']

function App() {
  const [activeShelf, setActiveShelf] = useState(0)
  const [page, setPage] = useState(0)
  const [selectedConcept, setSelectedConcept] = useState('')
  const [search, setSearch] = useState('')

  const shelf = shelves[activeShelf]
  const pageSize = 5
  const pageCount = Math.max(1, Math.ceil(shelf.items.length / pageSize))
  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    const all = shelf.items
    if (!query) return all.slice(page * pageSize, page * pageSize + pageSize)
    return all.filter((item) => item.toLowerCase().includes(query)).slice(0, pageSize)
  }, [page, search, shelf.items])

  const selectShelf = (index: number) => {
    setActiveShelf(index)
    setPage(0)
    setSelectedConcept('')
  }

  const moveShelf = (direction: number) => {
    setPage((current) => Math.min(Math.max(current + direction, 0), pageCount - 1))
  }

  return (
    <main className="app-shell">
      <header className="brand-header">
        <div className="brand-ornament">✦</div>
        <div>
          <h1>APOTHECARY MIND MAP</h1>
          <p>Your knowledge, connected</p>
        </div>
        <div className="brand-ornament">✦</div>
      </header>

      <section className="workspace-grid">
        <aside className="left-panel wood-panel">
          <section className="side-section">
            <div className="section-title"><span>✧</span> MY MAPS <span>✧</span></div>
            <button className="new-concept" onClick={() => setSelectedConcept('New Concept')}>
              <span className="plus">+</span>
              <span>New Concept</span>
            </button>
            <button className="map-link active"><span className="line-icon">◉</span> My Knowledge Map</button>
          </section>

          <section className="side-section shelf-menu">
            <div className="section-title"><span>✧</span> SHELVES <span>✧</span></div>
            {shelves.map((item, index) => (
              <button
                key={item.name}
                className={`map-link ${index === activeShelf ? 'active' : ''}`}
                onClick={() => selectShelf(index)}
              >
                <span className="line-icon">{item.symbol}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </section>

          <section className="side-section explore-section">
            <div className="section-title"><span>✧</span> EXPLORE <span>✧</span></div>
            <button className="map-link"><span className="line-icon">▣</span> All Concepts</button>
            <button className="map-link"><span className="line-icon">◷</span> Recently Added</button>
            <button className="map-link"><span className="line-icon">★</span> Favorites</button>
            <button className="map-link"><span className="line-icon">▤</span> Templates</button>
          </section>
        </aside>

        <section className="main-panel">
          <div className="toolbar">
            <label className="search-box">
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search concepts..." />
              <span>⌕</span>
            </label>
            <div className="toolbar-actions">
              <button title="Undo">↶</button>
              <button title="Redo">↷</button>
            </div>
          </div>

          <section className="hero-shelf">
            <div className="shelf-heading">
              <span className="shelf-symbol">{shelf.symbol}</span>
              <div>
                <h2>{shelf.name}</h2>
                <p>Interactive knowledge shelf</p>
              </div>
              <span className="shelf-count">{shelf.items.length} concepts</span>
            </div>

            <div className="wooden-shelf">
              <div className="shelf-row">
                {visibleItems.map((item, index) => (
                  <button
                    className={`concept-book ${selectedConcept === item ? 'selected' : ''}`}
                    key={item}
                    onClick={() => setSelectedConcept(item)}
                  >
                    <span className={`book-art ${shelfIcons[(index + activeShelf) % shelfIcons.length]}`}>
                      <span>{shelf.symbol}</span>
                    </span>
                    <strong>{item}</strong>
                  </button>
                ))}
                {visibleItems.length === 0 && <div className="empty-shelf">No matching concepts on this shelf.</div>}
              </div>
              <div className="shelf-board" />
            </div>

            <div className="shelf-controls">
              <button onClick={() => moveShelf(-1)} disabled={page === 0}>‹</button>
              <div className="page-dots" aria-label="Shelf pages">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index}
                    className={index === page ? 'dot active' : 'dot'}
                    onClick={() => setPage(index)}
                    aria-label={`Shelf page ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={() => moveShelf(1)} disabled={page >= pageCount - 1}>›</button>
            </div>
          </section>

          <section className="canvas">
            <div className="canvas-label">MY KNOWLEDGE MAP</div>
            <div className="parchment-lines" />
            <div className="canvas-hint">
              <span className="hint-icon">✧</span>
              <strong>Select a concept above</strong>
              <small>Then connect, annotate and build your knowledge map here.</small>
            </div>
            <div className="mini-map"><span /><span /><span /></div>
            <div className="zoom-controls"><button>⌗</button><button>+</button><button>−</button></div>
          </section>

          <div className="map-tools">
            <button className="tool active"><span>↖</span> Select</button>
            <button className="tool"><span>✋</span> Pan</button>
            <button className="tool"><span>⌘</span> Connect</button>
            <button className="tool"><span>▤</span> Note</button>
            <button className="tool"><span>□</span> Frame</button>
          </div>
        </section>

        <aside className="right-panel wood-panel">
          <div className="details-heading">
            <span>✧</span>
            <h2>CONCEPT DETAILS</h2>
            <span>✧</span>
          </div>
          <div className="details-form">
            <label>Concept Name<input value={selectedConcept} onChange={(event) => setSelectedConcept(event.target.value)} placeholder="Enter concept name..." /></label>
            <label>Image<div className="upload-box"><span>▧</span><small>Click to upload image<br />or drag and drop</small></div></label>
            <label>Description<textarea placeholder="What is this concept about?" /></label>
            <label>Details<textarea placeholder="Add more details..." /></label>
            <label>My Notes<textarea placeholder="Add your notes here..." /></label>
            <label>Tags<div className="tag-row"><input placeholder="Add a tag..." /><button>Add</button></div></label>
            <p className="muted">No tags added yet.</p>
            <button className="delete-button">Delete Concept</button>
          </div>
          <div className="botanical-shelf">
            <div className="jar teal"><span>✦</span></div>
            <div className="jar amber"><span>❧</span></div>
            <div className="jar green"><span>✧</span></div>
            <div className="tiny-book-stack"><i /><i /><i /></div>
          </div>
        </aside>
      </section>

      <footer className="status-bar">
        <span>▣ Concepts <b>0</b></span>
        <span>⌘ Connections <b>0</b></span>
        <span>❧ Branches <b>0</b></span>
        <span className="saved">◷ Last Saved <b>Just now</b></span>
        <button aria-label="Menu">☰</button>
      </footer>
    </main>
  )
}

export default App
