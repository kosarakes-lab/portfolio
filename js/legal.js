// Privacy policy and terms of use. Text lives here; the personal details come from
// site.legal in content/content.js. Empty details are flagged while editing locally.

(function () {
  const C = window.CONTENT;
  const S = C.site || {};
  const L = S.legal || {};
  const page = document.body.dataset.page;
  const root = document.getElementById('legal');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const missing = [];
  const need = (key, fallback) => {
    if (L[key]) return esc(L[key]);
    missing.push(key);
    return fallback;
  };

  const name = esc(S.name);
  const email = `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`;
  const address = need('address', '');
  const host = need('host', 'the company that hosts this website');
  const hostPrivacy = L.hostPrivacy ? ` (<a href="${esc(L.hostPrivacy)}" target="_blank" rel="noopener">their privacy policy</a>)` : (missing.push('hostPrivacy'), '');
  const country = need('country', 'the country where I am based');

  const authorities = {
    Bulgaria: '<a href="https://www.cpdp.bg/en/" target="_blank" rel="noopener">Commission for Personal Data Protection (CPDP)</a>, Sofia',
    Netherlands: '<a href="https://autoriteitpersoonsgegevens.nl/en" target="_blank" rel="noopener">Autoriteit Persoonsgegevens</a>, The Hague',
    Italy: '<a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener">Garante per la protezione dei dati personali</a>, Rome',
  };
  const authority = authorities[L.country] || 'the data-protection authority of my country';

  const docs = {
    privacy: {
      title: 'Privacy policy',
      lead: `This website is a portfolio. It does not use cookies, analytics, advertising or tracking of any kind, and it has no forms. This page explains the little personal data that is still processed, and your rights.`,
      sections: [
        ['Who is responsible', `
          <p>${name}${address ? `, ${address}` : ''}. Contact: ${email}.</p>
          <p>I am the controller of the personal data described here under the EU General Data Protection Regulation (GDPR).</p>`],
        ['What this website does not do', `
          <ul>
            <li>No cookies and no local storage.</li>
            <li>No analytics, statistics or visitor tracking.</li>
            <li>No advertising, no social-media plugins, no embedded third-party content.</li>
            <li>Fonts, images and videos are stored on this website itself, so your browser does not contact Google Fonts, YouTube or any other third party while you browse.</li>
          </ul>`],
        ['Server logs', `
          <p>When you open a page, the server of ${host}${hostPrivacy} automatically records technical information: your IP address, the date and time, the page requested, the referring page and your browser and operating system.</p>
          <p>This is needed to deliver the website and to keep it secure (legal basis: legitimate interest, Art. 6(1)(f) GDPR). The host processes this data on my behalf and keeps it only for a short period, according to its own retention policy. Where the host processes data outside the European Economic Area, the transfer is covered by appropriate safeguards such as the EU Standard Contractual Clauses.</p>`],
        ['When you email me', `
          <p>If you write to ${email}, I receive your email address, your name if you give it, and whatever you choose to write. I use this only to answer you and, if we work together, to run the project (legal basis: steps towards a contract, Art. 6(1)(b) GDPR, or legitimate interest, Art. 6(1)(f)).</p>
          <p>I keep correspondence for as long as the conversation or project needs it, and delete it at the latest two years after our last exchange, unless the law requires me to keep it longer (for example, invoices).</p>`],
        ['Links to other websites', `
          <p>Links such as Instagram take you to other websites. Their own privacy policies apply there; I have no control over the data they collect.</p>`],
        ['Your rights', `
          <p>You have the right to access your data, to have it corrected or deleted, to restrict or object to its processing, and to receive it in a portable format. Write to ${email} and I will answer within one month.</p>
          <p>You also have the right to complain to a data-protection authority, for example the ${authority}, or the authority in the EU country where you live or work.</p>`],
        ['Security', `
          <p>The website is served over an encrypted connection (HTTPS).</p>`],
        ['Changes', `
          <p>If the website changes in a way that affects your data, for example by adding analytics, this policy will be updated first. Last updated: ${esc(L.updated)}.</p>`],
      ],
    },
    terms: {
      title: 'Terms of use',
      lead: `These terms apply to your use of this website, a portfolio of work by ${name}. By using the website you accept them.`,
      sections: [
        ['Ownership', `
          <p>Unless stated otherwise, all text, images, videos, data visualisations and code on this website are © ${name} and protected by copyright.</p>
          <p>Work made for clients or employers, such as graphics published by Corriere della Sera, is shown as part of my portfolio; the rights in that work remain with the respective client or publisher.</p>`],
        ['What you may do', `
          <ul>
            <li>View the website and share links to it.</li>
            <li>Quote short parts with clear credit to ${name} and a link, within the limits of the law.</li>
          </ul>`],
        ['What you may not do without written permission', `
          <ul>
            <li>Copy, download, republish, modify or sell the work, in whole or in part.</li>
            <li>Present the work as your own or remove credits.</li>
            <li>Use the content to train, fine-tune or prompt machine-learning or AI systems, or collect it automatically (scraping).</li>
          </ul>
          <p>For permissions or licensing, write to ${email}.</p>`],
        ['Names and trademarks', `
          <p>Names of clients, publications, institutions and people are used only to describe the work. Mentioning them does not imply that they endorse this website.</p>`],
        ['Accuracy', `
          <p>Projects are presented as they were made, based on the sources available at the time. The website is provided "as is", for information about my work; it is not professional advice, and I do not guarantee that it is complete, current or always available.</p>`],
        ['Links', `
          <p>I am not responsible for the content of external websites linked from here.</p>`],
        ['Liability', `
          <p>To the extent permitted by law, I am not liable for damage resulting from the use of this website. This does not limit liability that cannot be limited by law, such as for intent or gross negligence.</p>`],
        ['Applicable law', `
          <p>These terms are governed by the law of ${country}. If you are a consumer, you keep the protection of the mandatory laws of the country where you live.</p>`],
        ['Changes and contact', `
          <p>These terms may be updated; the version on this page applies. Last updated: ${esc(L.updated)}. Questions: ${email}.</p>`],
      ],
    },
  };

  const doc = docs[page];
  document.title = `${doc.title} — ${S.name}`;
  document.getElementById('crumbTitle').textContent = doc.title;
  root.innerHTML = `
    <div class="project-head">
      <h1 class="project-title">${doc.title}</h1>
      <dl class="project-meta">
        <div><dt>last updated</dt><dd class="pill">${esc(L.updated)}</dd></div>
        <div><dt>contact</dt><dd class="pill">${esc(S.email)}</dd></div>
      </dl>
      <p class="project-intro">${doc.lead}</p>
    </div>
    <div class="project-body">
      ${doc.sections.map(([h, body]) => `<section class="block-text"><h2>${h}</h2><div class="prose">${body}</div></section>`).join('')}
    </div>
    <a class="next-project" href="${page === 'privacy' ? 'terms.html' : 'privacy.html'}">
      <span class="card-label">also read</span>
      <span class="next-title">${page === 'privacy' ? 'Terms of use' : 'Privacy policy'}&nbsp;→</span>
    </a>`;

  const local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (local && missing.length) {
    document.addEventListener('DOMContentLoaded', () => {
      const box = document.createElement('aside');
      box.className = 'content-notice';
      box.setAttribute('role', 'alert');
      box.innerHTML = `<p class="card-label">fill in before going live</p><ul>${missing.map(k => `<li>site.legal.${k} in content.js</li>`).join('')}</ul>`;
      document.body.appendChild(box);
    });
  }
})();
