class BannerOferta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const texto = this.getAttribute('texto') || 'Grandes Ofertas del Día';
    this.shadowRoot.innerHTML = `
      <style>
        .banner {
          background: linear-gradient(90deg, #198754, #20c997);
          color: white;
          padding: 12px;
          text-align: center;
          font-weight: bold;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
      </style>
      <div class="banner">
         <span>${texto}</span>
      </div>
    `;
  }
}

if (!customElements.get('banner-oferta')) {
  customElements.define('banner-oferta', BannerOferta);
}