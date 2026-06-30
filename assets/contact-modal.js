/* ============================================================
   Shared "Start a Conversation" contact modal
   - Injects modal markup + styles into the page
   - Opens when any contact CTA is clicked
   - Submits to Web3Forms -> emails ravi.uxuidesigner@gmail.com
   ------------------------------------------------------------
   SETUP (one time):
   1. Go to https://web3forms.com  ->  enter ravi.uxuidesigner@gmail.com
   2. Copy the Access Key you receive by email
   3. Paste it below, replacing YOUR_WEB3FORMS_ACCESS_KEY
   ============================================================ */
(function () {
  'use strict';

  var ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  // Text labels on CTAs that should open the modal
  var TRIGGER_TEXT = ['start a conversation', 'start a project', 'get in touch', "let's talk", 'lets talk'];

  /* ---------- styles ---------- */
  var css = ''
    + '.cm-overlay{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:24px;'
    + 'background:rgba(0,0,0,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);'
    + 'opacity:0;visibility:hidden;transition:opacity .35s ease,visibility .35s ease}'
    + '.cm-overlay.open{opacity:1;visibility:visible}'
    + '.cm-overlay,.cm-overlay *{cursor:auto!important}'
    + '.cm-overlay input,.cm-overlay textarea,.cm-overlay select{cursor:text!important}'
    + '.cm-overlay button,.cm-overlay .cm-close{cursor:pointer!important}'
    + '.cm-dialog{position:relative;width:min(520px,100%);max-height:90vh;overflow-y:auto;'
    + 'background:var(--bg2,#111);border:1px solid var(--gray6,rgba(255,255,255,.1));border-radius:22px;'
    + 'padding:clamp(28px,4vw,44px);box-shadow:0 40px 120px rgba(0,0,0,.5);'
    + 'transform:translateY(24px) scale(.98);transition:transform .4s cubic-bezier(.25,.46,.45,.94)}'
    + '.cm-overlay.open .cm-dialog{transform:translateY(0) scale(1)}'
    + '.cm-close{position:absolute;top:16px;right:16px;width:38px;height:38px;border-radius:50%;'
    + 'border:1px solid var(--gray6,rgba(255,255,255,.12));background:transparent;color:var(--gray2,#aaa);'
    + 'display:flex;align-items:center;justify-content:center;transition:all .3s ease}'
    + '.cm-close:hover{background:var(--gray6,rgba(255,255,255,.08));color:var(--white,#fff)}'
    + '.cm-eyebrow{font-size:.68rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gray3,#888);margin-bottom:12px}'
    + '.cm-title{font-family:var(--serif,inherit);font-size:clamp(1.5rem,3vw,2rem);font-weight:800;letter-spacing:-.02em;line-height:1.1;color:var(--white,#fff);margin:0 0 8px}'
    + '.cm-sub{font-size:.92rem;color:var(--gray2,#aaa);line-height:1.6;margin:0 0 26px;font-weight:300}'
    + '.cm-field{margin-bottom:16px}'
    + '.cm-field label{display:block;font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gray3,#888);margin-bottom:8px}'
    + '.cm-field input,.cm-field textarea,.cm-field select{width:100%;padding:13px 16px;font:inherit;font-size:.92rem;'
    + 'color:var(--white,#fff);background:var(--bg3,rgba(255,255,255,.04));border:1px solid var(--gray6,rgba(255,255,255,.12));'
    + 'border-radius:12px;outline:none;transition:border-color .3s ease,background .3s ease;box-sizing:border-box}'
    + '.cm-field textarea{resize:vertical;min-height:110px}'
    + '.cm-field input:focus,.cm-field textarea:focus,.cm-field select:focus{border-color:var(--gray3,#888);background:var(--bg2,rgba(255,255,255,.06))}'
    + '.cm-field input::placeholder,.cm-field textarea::placeholder{color:var(--gray4,#666)}'
    + '.cm-hp{position:absolute;left:-9999px;opacity:0;height:0;width:0;overflow:hidden}'
    + '.cm-submit{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:10px;margin-top:6px;'
    + 'padding:15px 28px;font-size:.82rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;'
    + 'background:var(--white,#fff);color:var(--bg1,#000);border:none;border-radius:100px;transition:all .35s ease}'
    + '.cm-submit:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(255,255,255,.14)}'
    + '.cm-submit:disabled{opacity:.6;transform:none;box-shadow:none}'
    + '.cm-note{margin-top:14px;font-size:.78rem;text-align:center;min-height:1.2em}'
    + '.cm-note.ok{color:#3ddc84}.cm-note.err{color:#ff6b6b}'
    + '.cm-success{text-align:center;padding:18px 0}'
    + '.cm-success svg{width:54px;height:54px;color:#3ddc84;margin-bottom:18px}'
    + '.cm-success h3{font-family:var(--serif,inherit);font-size:1.4rem;color:var(--white,#fff);margin:0 0 8px}'
    + '.cm-success p{color:var(--gray2,#aaa);font-size:.92rem;margin:0}'
    + '[data-theme="light"] .cm-submit{background:#111;color:#fff}'
    + '[data-theme="light"] .cm-submit:hover{box-shadow:0 12px 32px rgba(0,0,0,.14)}';

  /* ---------- markup ---------- */
  var html = ''
    + '<div class="cm-overlay" id="cmOverlay" role="dialog" aria-modal="true" aria-labelledby="cmTitle">'
    + '  <div class="cm-dialog">'
    + '    <button class="cm-close" id="cmClose" aria-label="Close">'
    + '      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>'
    + '    </button>'
    + '    <div id="cmBody">'
    + '      <div class="cm-eyebrow">Let’s Talk</div>'
    + '      <h2 class="cm-title" id="cmTitle">Start a conversation</h2>'
    + '      <p class="cm-sub">Tell me a little about your project and I’ll get back to you within 1–2 business days.</p>'
    + '      <form id="cmForm" novalidate>'
    + '        <div class="cm-field"><label for="cmName">Name</label><input id="cmName" name="name" type="text" placeholder="Your name" required></div>'
    + '        <div class="cm-field"><label for="cmEmail">Email</label><input id="cmEmail" name="email" type="email" placeholder="you@example.com" required></div>'
    + '        <div class="cm-field"><label for="cmType">Project type</label><select id="cmType" name="project_type">'
    + '          <option value="">Select one (optional)</option>'
    + '          <option>Product / UX design</option>'
    + '          <option>Website redesign</option>'
    + '          <option>Mobile app</option>'
    + '          <option>Dashboard / SaaS</option>'
    + '          <option>Other</option>'
    + '        </select></div>'
    + '        <div class="cm-field"><label for="cmMsg">Message</label><textarea id="cmMsg" name="message" placeholder="What are you looking to build?" required></textarea></div>'
    + '        <input type="checkbox" name="botcheck" class="cm-hp" tabindex="-1" autocomplete="off">'
    + '        <button type="submit" class="cm-submit" id="cmSubmit">Send Message'
    + '          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 8h9M8 4l4 4-4 4"/></svg>'
    + '        </button>'
    + '        <div class="cm-note" id="cmNote" aria-live="polite"></div>'
    + '      </form>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstElementChild);

    var overlay = document.getElementById('cmOverlay');
    var dialog = overlay.querySelector('.cm-dialog');
    var closeBtn = document.getElementById('cmClose');
    var form = document.getElementById('cmForm');
    var note = document.getElementById('cmNote');
    var submit = document.getElementById('cmSubmit');
    var body = document.getElementById('cmBody');
    var formHTML = body.innerHTML; // snapshot to restore after success

    function open(e) {
      if (e) e.preventDefault();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { var n = document.getElementById('cmName'); if (n) n.focus(); }, 320);
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Wire up CTAs by their text
    var links = document.querySelectorAll('a, button');
    links.forEach(function (el) {
      var t = (el.textContent || '').trim().toLowerCase();
      var match = TRIGGER_TEXT.some(function (k) { return t === k || t.indexOf(k) !== -1; });
      if (match) el.addEventListener('click', open);
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });

    bindForm();

    function bindForm() {
      var f = document.getElementById('cmForm');
      if (!f) return;
      f.addEventListener('submit', onSubmit);
    }

    function onSubmit(e) {
      e.preventDefault();
      var f = e.target;
      var noteEl = document.getElementById('cmNote');
      var btn = document.getElementById('cmSubmit');
      noteEl.className = 'cm-note';
      noteEl.textContent = '';

      if (ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        noteEl.className = 'cm-note err';
        noteEl.textContent = 'Form not configured yet — add your Web3Forms access key.';
        return;
      }

      var data = {
        access_key: ACCESS_KEY,
        subject: 'New enquiry from portfolio — ' + (f.name.value || 'Website'),
        from_name: 'Portfolio Contact Form',
        name: f.name.value,
        email: f.email.value,
        project_type: f.project_type.value,
        message: f.message.value,
        botcheck: f.botcheck.checked
      };

      btn.disabled = true;
      btn.textContent = 'Sending…';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            document.getElementById('cmBody').innerHTML =
              '<div class="cm-success">'
              + '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>'
              + '<h3>Message sent!</h3>'
              + '<p>Thanks for reaching out — I’ll be in touch shortly.</p>'
              + '</div>';
          } else {
            throw new Error(res.message || 'Something went wrong');
          }
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          var n = document.getElementById('cmNote');
          n.className = 'cm-note err';
          n.textContent = 'Couldn’t send right now. Please try again or email directly.';
        });
    }

    // Restore the form when modal reopens after a successful send
    overlay.addEventListener('transitionend', function () {
      if (!overlay.classList.contains('open') && document.querySelector('.cm-success')) {
        body.innerHTML = formHTML;
        bindForm();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
