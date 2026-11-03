// Privacy policy and terms of use, in every language. The personal details come from
// site.legal in content/content.js. Empty details are flagged while editing locally.

(function () {
  const C = window.CONTENT;
  const S = C.site || {};
  const L = S.legal || {};
  const { lang, t, href } = window.I18N;
  const page = document.body.dataset.page;
  const root = document.getElementById('legal');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const missing = [];
  const need = (key, fallback) => {
    if (L[key]) return esc(L[key]);
    missing.push(key);
    return fallback;
  };

  // site.legal.updated is a date like 2026-11-02; each language writes it its own way.
  const day = /^\d{4}-\d{2}-\d{2}$/.test(L.updated || '')
    ? new Intl.DateTimeFormat({ en: 'en-GB', bg: 'bg-BG', it: 'it-IT' }[lang] || 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(L.updated + 'T00:00:00Z'))
    : esc(L.updated);

  const v = {
    name: esc(S.name),
    email: `<a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,
    address: need('address', ''),
    hostName: L.host ? esc(L.host) : (missing.push('host'), ''),
    hostPrivacy: L.hostPrivacy ? esc(L.hostPrivacy) : (missing.push('hostPrivacy'), ''),
    country: L.country || (missing.push('country'), ''),
    updated: day,
  };
  const link = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

  const docs = {
    en: () => {
      const host = v.hostName || 'the company that hosts this website';
      const hostPrivacy = v.hostPrivacy ? ` (${link(v.hostPrivacy, 'their privacy policy')})` : '';
      const authority = {
        Bulgaria: `${link('https://www.cpdp.bg/en/', 'Commission for Personal Data Protection (CPDP)')}, Sofia`,
        Netherlands: `${link('https://autoriteitpersoonsgegevens.nl/en', 'Autoriteit Persoonsgegevens')}, The Hague`,
        Italy: `${link('https://www.garanteprivacy.it/', 'Garante per la protezione dei dati personali')}, Rome`,
      }[v.country] || 'the data-protection authority of my country';
      const country = v.country || 'the country where I am based';
      return {
        privacy: {
          title: 'Privacy policy',
          lead: `This website is a portfolio. It does not use cookies, analytics, advertising or tracking of any kind, and it has no forms. This page explains the little personal data that is still processed, and your rights.`,
          sections: [
            ['Who is responsible', `
              <p>${v.name}${v.address ? `, ${v.address}` : ''}. Contact: ${v.email}.</p>
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
              <p>If you write to ${v.email}, I receive your email address, your name if you give it, and whatever you choose to write. I use this only to answer you and, if we work together, to run the project (legal basis: steps towards a contract, Art. 6(1)(b) GDPR, or legitimate interest, Art. 6(1)(f)).</p>
              <p>I keep correspondence for as long as the conversation or project needs it, and delete it at the latest two years after our last exchange, unless the law requires me to keep it longer (for example, invoices).</p>`],
            ['Links to other websites', `
              <p>Links such as Instagram take you to other websites. Their own privacy policies apply there; I have no control over the data they collect.</p>`],
            ['Your rights', `
              <p>You have the right to access your data, to have it corrected or deleted, to restrict or object to its processing, and to receive it in a portable format. Write to ${v.email} and I will answer within one month.</p>
              <p>You also have the right to complain to a data-protection authority, for example the ${authority}, or the authority in the EU country where you live or work.</p>`],
            ['Security', `
              <p>The website is served over an encrypted connection (HTTPS).</p>`],
            ['Changes', `
              <p>If the website changes in a way that affects your data, for example by adding analytics, this policy will be updated first. Last updated: ${v.updated}.</p>`],
          ],
        },
        terms: {
          title: 'Terms of use',
          lead: `These terms apply to your use of this website, a portfolio of work by ${v.name}. By using the website you accept them.`,
          sections: [
            ['Ownership', `
              <p>Unless stated otherwise, all text, images, videos, data visualisations and code on this website are © ${v.name} and protected by copyright.</p>
              <p>Work made for clients or employers, such as graphics published by Corriere della Sera, is shown as part of my portfolio; the rights in that work remain with the respective client or publisher.</p>`],
            ['What you may do', `
              <ul>
                <li>View the website and share links to it.</li>
                <li>Quote short parts with clear credit to ${v.name} and a link, within the limits of the law.</li>
              </ul>`],
            ['What you may not do without written permission', `
              <ul>
                <li>Copy, download, republish, modify or sell the work, in whole or in part.</li>
                <li>Present the work as your own or remove credits.</li>
                <li>Use the content to train, fine-tune or prompt machine-learning or AI systems, or collect it automatically (scraping).</li>
              </ul>
              <p>For permissions or licensing, write to ${v.email}.</p>`],
            ['Names and trademarks', `
              <p>Names of clients, publications, institutions and people are used only to describe the work. Mentioning them does not imply that they endorse this website.</p>`],
            ['Accuracy', `
              <p>Projects are presented as they were made, based on the sources available at the time. The website is provided "as is", for information about my work; it is not professional advice, and I do not guarantee that it is complete, current or always available.</p>`],
            ['Links', `
              <p>I am not responsible for the content of external websites linked from here.</p>`],
            ['Liability', `
              <p>To the extent permitted by law, I am not liable for damage resulting from the use of this website. This does not limit liability that cannot be limited by law, such as for intent or gross negligence.</p>`],
            ['Applicable law', `
              <p>These terms are governed by the law of ${esc(country)}. If you are a consumer, you keep the protection of the mandatory laws of the country where you live.</p>`],
            ['Changes and contact', `
              <p>These terms may be updated; the version on this page applies. Last updated: ${v.updated}. Questions: ${v.email}.</p>`],
          ],
        },
      };
    },

    // Bulgarian: formal "Вие", as is usual for legal texts.
    bg: () => {
      const host = v.hostName || 'компанията, която хоства този уебсайт';
      const hostPrivacy = v.hostPrivacy ? ` (${link(v.hostPrivacy, 'нейната политика за поверителност')})` : '';
      const authority = {
        Bulgaria: `${link('https://www.cpdp.bg/', 'Комисията за защита на личните данни (КЗЛД)')}, София`,
        Netherlands: `${link('https://autoriteitpersoonsgegevens.nl/en', 'Autoriteit Persoonsgegevens')}, Хага`,
        Italy: `${link('https://www.garanteprivacy.it/', 'Garante per la protezione dei dati personali')}, Рим`,
      }[v.country] || 'надзорния орган по защита на данните в моята държава';
      const law = { Bulgaria: 'Република България', Netherlands: 'Кралство Нидерландия', Italy: 'Република Италия' }[v.country] || 'държавата, в която съм установена';
      return {
        privacy: {
          title: 'Политика за поверителност',
          lead: `Този уебсайт е портфолио. Той не използва бисквитки, аналитични инструменти, реклама или каквото и да е проследяване и няма формуляри. На тази страница е обяснено малкото лични данни, които все пак се обработват, и какви са Вашите права.`,
          sections: [
            ['Кой отговаря за данните', `
              <p>${v.name}${v.address ? `, ${v.address}` : ''}. Контакт: ${v.email}.</p>
              <p>Аз съм администратор на описаните тук лични данни по смисъла на Общия регламент относно защитата на данните на ЕС (GDPR).</p>`],
            ['Какво този уебсайт не прави', `
              <ul>
                <li>Не използва бисквитки и локално хранилище.</li>
                <li>Не използва аналитични инструменти, статистика или проследяване на посетителите.</li>
                <li>Няма реклами, приставки на социални мрежи или вградено съдържание от трети страни.</li>
                <li>Шрифтовете, изображенията и видеата се съхраняват на самия уебсайт, затова, докато разглеждате, браузърът Ви не се свързва с Google Fonts, YouTube или други трети страни.</li>
              </ul>`],
            ['Сървърни логове', `
              <p>Когато отворите страница, сървърът на ${host}${hostPrivacy} автоматично записва техническа информация: Вашия IP адрес, датата и часа, заявената страница, страницата, от която идвате, както и браузъра и операционната Ви система.</p>
              <p>Това е необходимо, за да бъде уебсайтът достъпен и защитен (правно основание: легитимен интерес, чл. 6, пар. 1, буква „е“ от GDPR). Хостинг доставчикът обработва тези данни от мое име и ги съхранява само за кратък период, според собствената си политика. Когато доставчикът обработва данни извън Европейското икономическо пространство, предаването им е обезпечено с подходящи гаранции, например стандартните договорни клаузи на ЕС.</p>`],
            ['Когато ми пишете', `
              <p>Ако ми пишете на ${v.email}, получавам имейл адреса Ви, името Ви, ако го посочите, и всичко, което решите да напишете. Използвам тези данни само за да Ви отговоря и, ако работим заедно, за да осъществим проекта (правно основание: стъпки за сключване на договор, чл. 6, пар. 1, буква „б“ от GDPR, или легитимен интерес, чл. 6, пар. 1, буква „е“).</p>
              <p>Пазя кореспонденцията толкова дълго, колкото е нужно за разговора или проекта, и я изтривам най-късно две години след последната ни размяна на съобщения, освен ако законът не изисква да я пазя по-дълго (например фактури).</p>`],
            ['Връзки към други уебсайтове', `
              <p>Връзки като тази към Instagram Ви отвеждат към други уебсайтове. За тях важат собствените им политики за поверителност; нямам контрол върху данните, които те събират.</p>`],
            ['Вашите права', `
              <p>Имате право на достъп до данните си, да поискате коригирането или изтриването им, да ограничите обработването им или да възразите срещу него, както и да ги получите в преносим формат. Пишете ми на ${v.email} и ще Ви отговоря в срок от един месец.</p>
              <p>Имате право и да подадете жалба до надзорен орган по защита на данните, например ${authority}, или до органа в държавата от ЕС, в която живеете или работите.</p>`],
            ['Сигурност', `
              <p>Уебсайтът се зарежда през криптирана връзка (HTTPS).</p>`],
            ['Промени', `
              <p>Ако уебсайтът се промени по начин, който засяга Вашите данни, например чрез добавяне на аналитични инструменти, тази политика ще бъде актуализирана предварително. Последна актуализация: ${v.updated}.</p>`],
          ],
        },
        terms: {
          title: 'Условия за ползване',
          lead: `Тези условия се отнасят за използването на този уебсайт – портфолио с проекти на ${v.name}. Като използвате уебсайта, Вие ги приемате.`,
          sections: [
            ['Авторски права', `
              <p>Освен ако не е посочено друго, всички текстове, изображения, видеа, визуализации на данни и програмен код на този уебсайт са © ${v.name} и са защитени с авторско право.</p>
              <p>Проекти, създадени за клиенти или работодатели, като например графики, публикувани от Corriere della Sera, са показани като част от моето портфолио; правата върху тях остават на съответния клиент или издател.</p>`],
            ['Какво можете да правите', `
              <ul>
                <li>Да разглеждате уебсайта и да споделяте връзки към него.</li>
                <li>Да цитирате кратки части с ясно посочване на ${v.name} и връзка, в границите на закона.</li>
              </ul>`],
            ['Какво не можете да правите без писмено разрешение', `
              <ul>
                <li>Да копирате, изтегляте, публикувате повторно, променяте или продавате проектите, изцяло или отчасти.</li>
                <li>Да представяте проектите като свои или да премахвате посочването на авторството.</li>
                <li>Да използвате съдържанието за обучение, донастройване или промптове на системи за машинно обучение или изкуствен интелект, или да го събирате автоматично (scraping).</li>
              </ul>
              <p>За разрешения или лицензи пишете на ${v.email}.</p>`],
            ['Имена и търговски марки', `
              <p>Имената на клиенти, издания, институции и хора се използват само за да се опишат проектите. Споменаването им не означава, че те одобряват или подкрепят този уебсайт.</p>`],
            ['Точност', `
              <p>Проектите са представени такива, каквито са създадени, въз основа на източниците, налични към онзи момент. Уебсайтът се предоставя „както е“, като информация за моята работа; той не е професионален съвет и не гарантирам, че е пълен, актуален или винаги достъпен.</p>`],
            ['Връзки', `
              <p>Не нося отговорност за съдържанието на външни уебсайтове, към които водят връзки оттук.</p>`],
            ['Отговорност', `
              <p>В рамките на допустимото от закона не нося отговорност за вреди, произтичащи от използването на този уебсайт. Това не ограничава отговорност, която по закон не може да бъде ограничена, например при умисъл или груба небрежност.</p>`],
            ['Приложимо право', `
              <p>Тези условия се уреждат от правото на ${law}. Ако сте потребител, запазвате защитата на императивните норми на държавата, в която живеете.</p>`],
            ['Промени и контакт', `
              <p>Тези условия могат да бъдат актуализирани; прилага се версията на тази страница. Последна актуализация: ${v.updated}. Въпроси: ${v.email}.</p>`],
          ],
        },
      };
    },
  };

  const doc = (docs[lang] || docs.en)()[page];
  document.title = `${doc.title} — ${S.name}`;
  document.getElementById('crumbTitle').textContent = doc.title;
  const other = (docs[lang] || docs.en)()[page === 'privacy' ? 'terms' : 'privacy'];
  root.innerHTML = `
    <div class="project-head">
      <h1 class="project-title">${doc.title}</h1>
      <dl class="project-meta">
        <div><dt>${t('last updated')}</dt><dd class="pill">${v.updated}</dd></div>
        <div><dt>${t('contact')}</dt><dd class="pill">${esc(S.email)}</dd></div>
      </dl>
      <p class="project-intro">${doc.lead}</p>
    </div>
    <div class="project-body">
      ${doc.sections.map(([h, body]) => `<section class="block-text"><h2>${h}</h2><div class="prose">${body}</div></section>`).join('')}
    </div>
    <a class="next-project" href="${href(page === 'privacy' ? 'terms.html' : 'privacy.html')}">
      <span class="card-label">${t('also read')}</span>
      <span class="next-title">${other.title}&nbsp;→</span>
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
