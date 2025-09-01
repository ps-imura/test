(function(){
  var ACCESS_CODE = 'machi-dev'; // 共有コード（必要なら変更）
  var COOKIE_KEY = 'ma_gate';
  var COOKIE_VAL = '1';
  var COOKIE_MAX_AGE = 60 * 60 * 6; // 6時間

  function readCookie(key){
    return document.cookie.split(';').map(function(s){return s.trim();}).some(function(s){return s.indexOf(key + '=') === 0;});
  }
  function setCookie(key, val, maxAge){
    document.cookie = key + '=' + val + '; path=/; max-age=' + maxAge;
  }
  function getParam(name){
    var m = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  function grant(){ setCookie(COOKIE_KEY, COOKIE_VAL, COOKIE_MAX_AGE); removeOverlay(); }

  function removeOverlay(){
    var ov = document.getElementById('ma-access-overlay');
    if (ov) ov.parentNode.removeChild(ov);
    document.documentElement.style.overflow = '';
  }

  function buildOverlay(){
    var ov = document.createElement('div');
    ov.id = 'ma-access-overlay';
    ov.setAttribute('role', 'dialog');
    ov.style.position = 'fixed';
    ov.style.inset = '0';
    ov.style.background = 'rgba(255,255,255,0.98)';
    ov.style.display = 'flex';
    ov.style.flexDirection = 'column';
    ov.style.alignItems = 'center';
    ov.style.justifyContent = 'center';
    ov.style.zIndex = '9999';
    ov.style.padding = '24px';

    var box = document.createElement('div');
    box.style.width = 'min(92vw, 480px)';
    box.style.background = '#fff';
    box.style.border = '2px solid #111';
    box.style.borderRadius = '12px';
    box.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)';
    box.style.padding = '20px';

    var title = document.createElement('div');
    title.textContent = 'アクセスコードを入力してください';
    title.style.fontSize = '16px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '12px';

    var input = document.createElement('input');
    input.type = 'password';
    input.placeholder = 'アクセスコード';
    input.style.width = '100%';
    input.style.boxSizing = 'border-box';
    input.style.padding = '12px 14px';
    input.style.border = '2px solid #e0e0e0';
    input.style.borderRadius = '8px';
    input.style.fontSize = '16px';

    var msg = document.createElement('div');
    msg.style.color = '#d20023';
    msg.style.fontSize = '12px';
    msg.style.marginTop = '8px';
    msg.style.minHeight = '16px';

    var btn = document.createElement('button');
    btn.textContent = '入室';
    btn.style.marginTop = '14px';
    btn.style.width = '100%';
    btn.style.padding = '12px 16px';
    btn.style.border = 'none';
    btn.style.borderRadius = '999px';
    btn.style.background = '#21384f';
    btn.style.color = '#fff';
    btn.style.fontWeight = '700';
    btn.style.fontSize = '14px';
    btn.style.cursor = 'pointer';

    function submit(){
      if ((input.value || '').trim() === ACCESS_CODE) {
        grant();
      } else {
        msg.textContent = 'コードが正しくありません';
        input.focus();
      }
    }

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') submit(); });

    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(msg);
    box.appendChild(btn);
    ov.appendChild(box);
    document.body.appendChild(ov);
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function(){ input.focus(); }, 50);
  }

  // 開発中: 認証を一時的に無効化
  // URLの?access=コード でも入室可
  var urlCode = getParam('access');
  if (urlCode && urlCode === ACCESS_CODE) {
    grant();
    return;
  }

  // 開発中: 認証チェックをスキップ
  /*
  if (!readCookie(COOKIE_KEY)) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildOverlay);
    } else {
      buildOverlay();
    }
  }
  */
})();


