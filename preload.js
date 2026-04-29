const { ipcRenderer } = require('electron');

const hookCanvas = () => {
  const iframe = document.querySelector("iframe.gameframe");
  if (!iframe) return;

  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;

  const originalArc = win.CanvasRenderingContext2D.prototype.arc;

  win.CanvasRenderingContext2D.prototype.arc = function(x, y, r, s, e) {
    if (r > 5 && r < 20) {
      window.ballPos = { x, y };
    }
    return originalArc.apply(this, arguments);
  };
};

setTimeout(hookCanvas, 3000);

let last = null;
let velocity = { x: 0, y: 0 };

setInterval(() => {
  if (!window.ballPos) return;
  if (last) {
    velocity.x = window.ballPos.x - last.x;
    velocity.y = window.ballPos.y - last.y;
  }
  last = { ...window.ballPos };
}, 16);

/* ========= INTERFACE DO CLIENT ========= */
window.addEventListener('DOMContentLoaded', () => {
    const box = document.createElement('div');
    box.style = 'position:fixed;top:10px;right:10px;background:#1a1a1a;color:#fff;padding:10px;border-radius:8px;z-index:9999;font-family:sans-serif;border:1px solid #333;width:180px;';

    const header = document.createElement('div');
    header.innerText = 'Client Menu';
    header.style = 'font-weight:bold;margin-bottom:8px;cursor:move;display:flex;justify-content:space-between;';
    
    const minBtn = document.createElement('span');
    minBtn.innerText = '_';
    minBtn.style = 'cursor:pointer;padding:0 5px;';
    header.appendChild(minBtn);

    const content = document.createElement('div');
    content.style = 'display:flex;flex-direction:column;gap:5px;';

    const pingDisplay = document.createElement('div');
    pingDisplay.innerText = 'Ping: --';
    content.appendChild(pingDisplay);

    const input = document.createElement('input');
    input.placeholder = 'Link da Sala...';
    input.style = 'background:#222;border:1px solid #444;color:#fff;padding:4px;border-radius:4px;outline:none;';

    const btnJoin = document.createElement('button');
    btnJoin.innerText = 'Entrar na Sala';
    btnJoin.style = 'background:#58a6ff;border:none;color:#fff;padding:5px;border-radius:4px;cursor:pointer;';

    btnJoin.onclick = () => {
        const url = input.value.trim();
        if (url.startsWith('http')) {
            ipcRenderer.send('update-rpc', { details: "Jogando", state: "Em uma sala" });
            window.location.href = url;
        }
    };

    let minimized = false;
    minBtn.onclick = () => {
        minimized = !minimized;
        content.style.display = minimized ? 'none' : 'flex';
        minBtn.innerText = minimized ? '+' : '_';
    };

    content.append(input, btnJoin);
    box.append(header, content);
    document.body.appendChild(box);

    /* LÓGICA DE PING */
    setInterval(async () => {
        const start = Date.now();
        try {
            await fetch('https://www.google.com/generate_204', { mode: 'no-cors', cache: 'no-cache' });
            const p = Date.now() - start;
            pingDisplay.innerText = "Ping: " + p + "ms";
            pingDisplay.style.color = p < 100 ? '#0f0' : '#f00';
        } catch (e) { pingDisplay.innerText = 'Ping: Erro'; }
    }, 2000);

    /* ARRASTAR MENU */
    let dragging = false, ox = 0, oy = 0;
    header.addEventListener('mousedown', e => {
        dragging = true;
        ox = e.clientX - box.offsetLeft;
        oy = e.clientY - box.offsetTop;
    });
    document.addEventListener('mousemove', e => {
        if (dragging) {
            box.style.left = (e.clientX - ox) + 'px';
            box.style.top = (e.clientY - oy) + 'px';
            box.style.right = 'auto';
        }
    });
    document.addEventListener('mouseup', () => dragging = false);
});