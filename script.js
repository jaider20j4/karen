/* =====================================================================
   STUDIO K · script.js
   1) Configuración   2) Datos de servicios   3) Lista de servicios
   4) Modales         5) Stepper de reserva   6) Envío por WhatsApp
   ===================================================================== */

document.documentElement.classList.add('js');

/* ---------- 1) CONFIGURACIÓN (edita estos valores) ---------- */
const CONFIG = {
  // Número de WhatsApp que recibe las solicitudes: 57 + número, sin + ni espacios (ej. '573001234567').
  // Si lo dejas vacío, se abre el enlace wa.link de Studio K sin mensaje prellenado.
  WHATSAPP: '',
  WHATSAPP_LINK: 'https://wa.link/8qvs7m',
  HORAS: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
  DIAS_CERRADO: [0],                                     // 0 = domingo
  ESPECIALISTAS: ['Cualquiera del equipo', 'Karen']      // añade al equipo aquí
};

/* ---------- SEDES (rellena dirección, teléfono y foto de cada una) ----------
   foto: ruta de la imagen, ej. 'img/sede1.jpg'. Si la dejas vacía se muestra un marco decorativo con el logo.
   maps: enlace de Google Maps (opcional). Si lo dejas vacío se busca por la dirección.
   whatsapp: número propio de la sede (opcional); si no, se usa CONFIG.WHATSAPP. */
const SEDES = [
  { id: 'sede1', nombre: 'Sede 1', direccion: 'soledad jajaj', referencia: 'Barrio / local / piso', horario: 'Lunes a sábado · 9:00 am – 5:00 pm', telefono: '', whatsapp: '', maps: '', foto: '' },
  { id: 'sede2', nombre: 'Sede 2', direccion: 'Dirección de la sede 2', referencia: 'Barrio / local / piso', horario: 'Lunes a sábado · 9:00 am – 5:00 pm', telefono: '', whatsapp: '', maps: '', foto: '' }
];

/* ---------- 2) SERVICIOS ----------
   OJO: precios, descripciones largas y características (feats) son EJEMPLO; cámbialos por los reales.
   fotos: rutas de las fotos que se ven en "VER FOTO" (carrusel). Para agregar más fotos a un servicio,
   guarda el archivo en imagene/servicios/ y añade su ruta al arreglo, ej:
     fotos: ['imagene/servicios/foto1.jpg', 'imagene/servicios/foto2.jpg', 'imagene/servicios/foto3.jpg']
   Un '' deja un espacio en blanco para una foto futura: se ve la flecha › y un marco vacío con el logo.
   Cuando tengas la foto, cambia ese '' por su ruta.
   extra: retoque o mantenimiento que se muestra debajo del precio, solo en la tarjeta de la lista
   (el modal "VER FOTO" no muestra precios):
     { tipo: 'Retoque' | 'Mantenimiento', precio: 80000, nota: 'cada 15 días' }
   precio 0 (en el servicio o en extra) = se muestra "A consultar".
   abono: lo que la clienta paga para poder agendar ese servicio. Se muestra en la reserva y en el mensaje
   de WhatsApp. Está en 0 en todos: cámbialo por el valor real de cada servicio (ej. abono: 20000). */
const SERVICIOS = [
  // CEJAS
  { id: 's1', cat: 'Cejas', nombre: 'Diseño de cejas', badges: ['CERA', 'HILO'], precio: 25000, abono: 0, desc: 'A la medida de tu estructura.', largo: 'Diseño personalizado según la estructura de tu rostro, retirando el vello con cera o hilo.', feats: ["Técnica con cera o hilo", "Dura de 2 a 3 semanas", "Ideal para todo tipo de piel", "incluye Spa"],
    fotos: ['imagene/servicios/diseño de cejas web.jpg', ''] },   // copia liviana (carga más rápido)
  { id: 's2', cat: 'Cejas', nombre: 'Semipermanente', badges: ['MAQUILLAJE'], precio: 35000, abono: 0, desc: 'Diseño y maquillaje de cejas.', largo: 'Maquillaje de cejas que realza tu diseño con un acabado suave y natural.', feats: ["Dura de 3 a 5 días", "Ideal para efecto maquillaje", "Técnica con cera dermatologica","incluye Spa"],
    fotos: ['imagene/servicios/cejas semi permanente.PNG', 'imagene/servicios/cejas semi.PNG'] },

  { id: 's3', cat: 'Cejas', nombre: 'Micropigmentación', badges: ['PIGMENTO'], precio: 250000, abono: 0, desc: 'Definición que dura.', largo: 'Una tecnica especializada de diseño y pigmentacion que busca realzar la belleza natural de las cejas, respetando la armonia facial, la colorimetria y la escencia de cada persona', feats: ["Dura de 1 a 2 años (varía por piel)", "diseño personalizado", "Efecto Natural","Tecnica efecto polvo"],
    extra: { tipo: 'Retoque', precio: 100000, nota: '2.ª sesión' },
    fotos: ['imagene/servicios/micropigmentacion efecto polvo web.jpg', ''] },   // copia sin el ícono de volumen de la captura
  { id: 's7', cat: 'Cejas', nombre: 'Laminado de cejas', badges: ['LAMINADO'], precio: 85000, abono: 0, desc: 'Cejas peinadas y con volumen.', largo: 'Tratamiento que alisa y fija el vello de las cejas en la dirección deseada para un efecto peinado, lleno y ordenado.', feats: ["Dura de 4 a 6 semanas", "Efecto cejas peinadas", "Ideal para cejas rebeldes o despobladas"],   // REVISAR PRECIO · REVISAR textos
    fotos: ['imagene/servicios/laminado de cejas web.jpg', ''] },   // copia liviana (carga más rápido)
  // PESTAÑAS
  { id: 's4', cat: 'Pestañas', nombre: 'Lifting coreano', badges:['LIFTING'], precio: 95000, abono: 0, desc: 'Pestañas peinadas y con volumen.', largo: 'El lash lifting Korean busca un efecto elegante, limpio y natural, respetando la estructura de la pestaña para lograr una curvatura armoniosa', feats: ["Dura de 4 a 6 semanas", "Sin extensiones", "Sin exceso de producto", "Aspecto sofisticado desde el primer dia" , "Incluye Kit profesional post cuidado"],
    fotos: ['imagene/servicios/lifting tecnica coreana.PNG', ''] },

    //existe un combo de semi con punto a punto a punto 50 mil//
  { id: 's5', cat: 'Pestañas', nombre: 'Pestañas Punto a punto', badges: ['FIBRA DE SEDA'], precio: 30000, abono: 0, desc: 'Fibra de seda, look natural.', largo: 'Extensiones de fibra de seda aplicadas pestaña por pestaña para un look natural.', feats: [  "Ideal para un efecto sutil"],
    fotos: ['imagene/servicios/pestañas punto a punto fibra de seda.PNG', ''] },
  { id: 's6', cat: 'Pestañas', nombre: 'Pestañas híbridas', badges: ['HÍBRIDAS'], precio: 120000, abono: 0, desc: 'Más mirada, sin exagerar.', largo: 'Mezcla de técnicas que combina densidad y ligereza para más mirada sin exagerar.', feats: ["Técnica híbrida", "Ideal para volumen natural"],
    extra: { tipo: 'Mantenimiento', precio: 80000, nota: 'cada 15 días' },
    fotos: ['', ''] },
  { id: 's8', cat: 'Pestañas', nombre: 'Pestañas volumen tecnológico', badges: ['VOLUMEN'], precio: 130000, abono: 0, desc: 'Extensiones con efecto de volumen.', largo: 'Extensiones de pestañas con técnica de volumen tecnológico para una mirada más llena.', feats: ["Técnica de volumen tecnológico"],   // REVISAR textos
    extra: { tipo: 'Retoque', precio: 0, nota: 'cada 3 semanas' },   // REVISAR PRECIO del retoque
    fotos: ['imagene/servicios/pestañas volumen tecnologico.jpg', ''] },
  { id: 's9', cat: 'Pestañas', nombre: 'Pestañas pelo a pelo 3D suave glam', badges: ['PELO A PELO', '3D'], precio: 0, abono: 0, desc: 'Pelo a pelo con un toque de volumen.', largo: 'Combinación de extensiones pelo a pelo con abanicos 3D para una mirada definida con volumen suave.', feats: ["Técnica mixta pelo a pelo y 3D", "Ideal para volumen suave"],   // REVISAR PRECIO · REVISAR textos
    extra: { tipo: 'Mantenimiento', precio: 0, nota: 'cada 15 días' },   // REVISAR PRECIO del mantenimiento
    fotos: ['imagene/servicios/pestañas pelo a pelo 3d suave glam web.jpg', ''] },   // copia sin los bordes negros de la captura
  { id: 's10', cat: 'Pestañas', nombre: 'Set de pestañas pelo a pelo clásicas', badges: ['CLÁSICAS'], precio: 90000, abono: 0, desc: 'Una extensión por cada pestaña.', largo: 'Set clásico: una extensión por cada pestaña natural para alargar y definir con un resultado natural.', feats: ["Técnica pelo a pelo", "Ideal para un look natural"],   // REVISAR PRECIO · REVISAR textos
    extra: { tipo: 'Mantenimiento', precio: 50000, nota: 'cada 15 días' },
    fotos: ['imagene/servicios/set de pestañas pelo a pelo clasicas.jpg', ''] }
];
/* ---------- CURSOS (sección Capacitaciones · Lovely Brows) ----------
   Cada objeto es una tarjeta del carrusel:
   · CON nombre  → la tarjeta muestra el curso y al tocarla se abre su ficha completa.
   · SIN nombre  → TARJETA LIBRE: solo se ve la foto (al tocarla se amplía). Sirve para un curso futuro.

   Los cursos 1 y 2 tienen SOLO información real, tomada de los certificados de las fotos. Úsalos como ejemplo.
   REGLA: no pongas nada que no sea cierto. Lo que no sepas, déjalo vacío ('' o []) y no se mostrará.

   CÓMO CONVERTIR UNA TARJETA LIBRE EN UN CURSO (llena los campos de esa tarjeta, más abajo):
     cat         'Cejas' o 'Pestañas'                        → etiqueta de la tarjeta
     nombre      nombre del curso, ej. 'Micropigmentación'   → título (si lo dejas vacío, la tarjeta queda libre)
     sub         técnica o subtítulo, ej. 'Técnica efecto polvo'
     descripcion qué aprende la alumna y para qué le sirve (1 o 2 frases)
     datos       recuadros de la ficha, ej. { 'Duración': '2 días intensivos', 'Modalidad': 'Presencial',
                 'Valor': '$000.000', 'Certificado': 'Studio K' }      (agrega o quita los que quieras)
     temario     temas, ej. ['Tema 1', 'Tema 2']             → "Lo que aprenderás"
     incluye     ej. ['Material de trabajo', 'Certificado']  → "Incluye"
     ideal       para quién es el curso                      → "Ideal para"
     foto / pos / alt   foto de imagene/cursos/, encuadre en la tarjeta ('50% 40%' = centro, un poco arriba)
                        y una descripción corta de lo que se ve en la foto. */
const CURSOS = [
  { id: 'c1', cat: 'Cejas', nombre: 'Diseño de cejas', sub: 'Acabados Premium · Lovely Brows', foto: 'imagene/cursos/curso1 web.jpg', pos: '50% 55%',
    alt: 'Alumna de Studio K con su certificado de Diseño de cejas Lovely Brows',
    descripcion: 'Curso intensivo de diseño de cejas con acabados premium, para ofrecer un servicio seguro y profesional.',
    datos: { 'Duración': '3 a 4 días intensivos', 'Certificado': 'Studio K · Lovely Brows', 'Instructora': 'Karen, especialista en cejas' },
    temario: [], incluye: [], ideal: '' },
  { id: 'c2', cat: 'Pestañas', nombre: 'Lifting coreano', sub: 'Técnica fusión', foto: 'imagene/cursos/curso4 web.jpg', pos: '50% 50%',
    alt: 'Alumna de Studio K con su certificado de Lifting coreano',
    descripcion: 'Programa intensivo de lifting coreano con técnica fusión, para ofrecer un servicio seguro y profesional.',
    datos: { 'Duración': '2 días intensivos', 'Certificado': 'Studio K · Lifting técnica coreana', 'Instructora': 'Karen, especialista en lifting técnica coreana' },
    temario: [], incluye: [], ideal: '' },
  // ---- TARJETAS LIBRES (solo foto). Llena sus campos cuando tengas un curso nuevo ----
  { id: 'c3', cat: '', nombre: '', sub: '', foto: 'imagene/cursos/curso2 web.jpg', pos: '50% 30%',
    alt: 'Alumna de Studio K con su certificado de Diseño de cejas Lovely Brows',
    descripcion: '', datos: {}, temario: [], incluye: [], ideal: '' },
  { id: 'c4', cat: '', nombre: '', sub: '', foto: 'imagene/cursos/curso5 web.jpg', pos: '50% 60%',
    alt: 'Alumna de Studio K con su certificado de Lifting coreano',
    descripcion: '', datos: {}, temario: [], incluye: [], ideal: '' },
  { id: 'c5', cat: '', nombre: '', sub: '', foto: 'imagene/cursos/curso3 web.jpg', pos: '50% 60%',
    alt: 'Alumna de Studio K con su certificado de Diseño de cejas Lovely Brows',
    descripcion: '', datos: {}, temario: [], incluye: [], ideal: '' },
  { id: 'c6', cat: '', nombre: '', sub: '', foto: 'imagene/cursos/curso6 web.jpg', pos: '50% 40%',
    alt: 'Alumna de Studio K con su certificado de Diseño de cejas Lovely Brows',
    descripcion: '', datos: {}, temario: [], incluye: [], ideal: '' }
];
// texto corto de la tarjeta: duración (o modalidad) · certificado
const metaCurso = c => { const d = c.datos || {}; return [d['Duración'] || d['Modalidad'], d['Certificado'] ? 'Con certificado' : ''].filter(Boolean).join(' · '); };

const CATS = ['Todos', ...new Set(SERVICIOS.map(s => s.cat))];
const GRUPOS = { 'list-cejas': ['Cejas'], 'list-pestanas': ['Pestañas'] };
const money = n => n ? '$' + n.toLocaleString('es-CO') : 'A consultar';
const extraTxt = x => `${x.tipo}${x.nota ? ' ' + x.nota : ''}: ${money(x.precio)}`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- 3) LISTA DE SERVICIOS (Cejas / Pestañas) ---------- */
Object.entries(GRUPOS).forEach(([listId, cats]) => {
  $('#' + listId).innerHTML = SERVICIOS.filter(s => cats.includes(s.cat)).map((s, n) => `
  <article class="svc" id="${s.id}">
    <span class="n">${String(n + 1).padStart(2, '0')}</span>
    <div>
      <div class="ttl"><h3>${s.nombre}</h3>${s.badges.map(b => `<span class="badge">${b}</span>`).join('')}</div>
      <p>${s.desc}</p>
      <button type="button" class="ver" data-id="${s.id}" aria-haspopup="dialog">VER FOTO ▾</button>
    </div>
    <div class="end">
      <div class="price">
        <b>${money(s.precio)}</b>
        ${s.extra ? `<span class="price-x"><em>${s.extra.tipo}</em>${money(s.extra.precio)}${s.extra.nota ? `<i>${s.extra.nota}</i>` : ''}</span>` : ''}
      </div>
      <button type="button" class="agendar" data-id="${s.id}">Agendar →</button>
    </div>
  </article>`).join('');
  $('#' + listId).addEventListener('click', e => {
    const ver = e.target.closest('.ver'), ag = e.target.closest('.agendar');
    if (ver) openPreview(ver.dataset.id);
    if (ag) openBookingModal(ag.dataset.id);
  });
});

/* ---------- SEDES ---------- */
const maps = d => d.maps || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(d.direccion + ' Barranquilla');
$('#sedes-row').innerHTML = SEDES.map((d, i) => `
  <article class="sede" id="${d.id}">
    <div class="sede-foto${d.foto ? '' : ' vacia'}">
      ${d.foto ? `<img src="${d.foto}" alt="${d.nombre} de Studio K en Barranquilla" loading="lazy">` : '<img class="sede-logo" src="imagene/logo.jpg" alt="" loading="lazy">'}
      <span class="sede-n">Sede 0${i + 1}</span>
    </div>
    <div class="sede-b">
      <h3>${d.nombre}</h3>
      <dl>
        <div><dt>Dirección</dt><dd>${d.direccion}${d.referencia ? '<br><span style="color:var(--mute)">' + d.referencia + '</span>' : ''}</dd></div>
        <div><dt>Horario</dt><dd>${d.horario}</dd></div>
        ${d.telefono ? `<div><dt>Teléfono</dt><dd>${d.telefono}</dd></div>` : ''}
      </dl>
      <div class="sede-act">
        <a class="pill o" href="${maps(d)}" target="_blank" rel="noopener">Cómo llegar</a>
        <button type="button" class="pill agendar-sede" data-sede="${d.id}">Agendar aquí</button>
      </div>
    </div>
  </article>`).join('');
$('#sedes-row').addEventListener('click', e => { const b = e.target.closest('.agendar-sede'); if (b) openBookingModal(null, b.dataset.sede); });
$('#foot-sedes').innerHTML = SEDES.map(d => `<span>${d.nombre} · ${d.direccion}</span>`).join('');

/* ---------- 4) MODALES ---------- */
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
const bm = $('#booking-modal'), pm = $('#svc-modal'), cm = $('#curso-modal');
let lastFocus = null;
const modalTop = () => $('.modal-scroll').scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });

function showOverlay(el) { el.hidden = false; el.classList.remove('closing'); document.body.classList.add('lock'); }
function hideOverlay(el, done) {                     // fade-out y luego oculta
  el.classList.add('closing');
  const end = () => { el.hidden = true; el.classList.remove('closing'); if (bm.hidden && pm.hidden && cm.hidden) document.body.classList.remove('lock'); if (done) done(); };
  reduce ? end() : setTimeout(end, 300);
}

/* Visor a pantalla completa: toca una foto de los modales para verla en grande (toca otra vez o Esc para cerrar) */
const d = $('#d'), di = $('img', d);
function zoom(img) {
  if (!img || d.open) return;
  di.src = img.currentSrc || img.src; di.alt = img.alt;
  d.classList.toggle('tall', img.naturalHeight > img.naturalWidth);   // fotos verticales: se ajustan al alto
  d.showModal();
}
d.addEventListener('click', () => d.close());
d.addEventListener('close', () => d.classList.remove('tall'));

/* Modal de agendamiento a pantalla completa. id (opcional) = servicio preseleccionado */
function openBookingModal(id, sedeId) {
  lastFocus = document.activeElement;
  if (!pm.hidden) hideOverlay(pm);
  selected.clear(); if (id) selected.add(id);
  form.elements.sede.value = sedeId || SEDES[0].id;
  catActual = 'Todos'; renderPicker(); updateSummary(); goStep(1);
  showOverlay(bm); modalTop(); $('#bk-close').focus();
}
function closeBookingModal() {
  if (bm.hidden || bm.classList.contains('closing')) return;
  hideOverlay(bm, () => { resetAll(); if (lastFocus && lastFocus.focus) lastFocus.focus(); });
}
function resetAll() {                                // limpia selección y formulario
  form.reset(); selected.clear(); state.hora = ''; catActual = 'Todos';
  $$('.hora').forEach(x => x.classList.remove('on')); $('#fecha-txt').textContent = '';
  $('#ok').classList.remove('show'); $('#paso3').hidden = false;
  setBtn('Enviar solicitud'); btn.disabled = false; renderPicker(); updateSummary(); goStep(1);
}

/* Vista previa de servicio ("VER FOTO") con carrusel: flechas ‹ ›, deslizar con el dedo y puntitos.
   Las fotos salen del campo fotos de cada servicio en SERVICIOS; cada '' es un espacio en blanco para una foto futura.
   Aquí NO se muestran precios: solo están en las tarjetas de la lista de servicios. */
const track = $('#sv-track'), dots = $('#sv-dots');
const slideIdx = () => Math.round(track.scrollLeft / (track.clientWidth || 1));
const goSlide = i => track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
function syncGal() {
  const i = slideIdx();
  $$('span', dots).forEach((d, k) => d.classList.toggle('on', k === i));
  $('#sv-prev').disabled = i <= 0; $('#sv-next').disabled = i >= track.children.length - 1;
}
track.addEventListener('scroll', () => requestAnimationFrame(syncGal), { passive: true });
$('#sv-prev').addEventListener('click', () => goSlide(slideIdx() - 1));
$('#sv-next').addEventListener('click', () => goSlide(slideIdx() + 1));

function openPreview(id) {
  const s = SERVICIOS.find(x => x.id === id);
  const fotos = s.fotos && s.fotos.length ? s.fotos : [''];
  // cada foto se ve COMPLETA (contain) sobre una copia desenfocada de sí misma; '' = espacio en blanco con el logo
  track.innerHTML = fotos.map((f, k) => f
    ? `<div class="gal-slide ph-fit" style="--bg:url('${encodeURI(f)}')"><img src="${encodeURI(f)}" alt="${s.nombre} · foto ${k + 1} de ${fotos.length}"${k ? ' loading="lazy"' : ''}></div>`
    : '<div class="gal-slide empty" aria-hidden="true"><span class="gal-blank"></span></div>').join('');
  dots.innerHTML = fotos.map(() => '<span></span>').join('');
  $('#sv-gal').classList.toggle('one', fotos.length < 2);
  $('#sv-title').textContent = s.nombre; $('#sv-desc').textContent = s.largo;
  $('#sv-feats').innerHTML = s.feats.map(f => `<li>${f}</li>`).join('');
  $('#sv-book').dataset.id = id;
  showOverlay(pm); track.scrollLeft = 0; syncGal(); $('#sv-close').focus();
}
const closePreview = () => { if (!pm.hidden) hideOverlay(pm); };
track.addEventListener('click', e => { if (e.target.tagName === 'IMG') zoom(e.target); });

/* Ficha completa de un curso (datos del arreglo CURSOS). El botón abre WhatsApp con el nombre del curso. */
const cmBody = $('#cm-body'), cmMedia = $('#cm-media'), cmImg = $('#cm-img');
let cmCurso = null, cmFocus = null;
const listaCurso = (titulo, items, cls) => items && items.length
  ? `<h4>${titulo}</h4><ul class="cm-list${cls ? ' ' + cls : ''}">${items.map(x => `<li>${x}</li>`).join('')}</ul>` : '';
function openCurso(i) {
  const c = CURSOS[i]; if (!c) return;
  cmCurso = c; cmFocus = document.activeElement;
  cmMedia.style.setProperty('--bg', `url('${encodeURI(c.foto)}')`);
  cmImg.src = encodeURI(c.foto); cmImg.alt = c.alt || c.nombre;
  const datos = Object.entries(c.datos || {}).filter(([, v]) => v);
  cmBody.innerHTML = `
    <p class="cm-kick"><span class="cm-cat">${c.cat}</span>Curso Studio K</p>
    <h3 id="cm-title">${c.nombre}</h3>
    ${c.sub ? `<p class="cm-sub">${c.sub}</p>` : ''}
    <p>${c.descripcion}</p>
    ${datos.length ? `<dl class="cm-datos">${datos.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
    ${listaCurso('Lo que aprenderás', c.temario)}
    ${listaCurso('Incluye', c.incluye, 'inc')}
    ${c.ideal ? `<h4>Ideal para</h4><p>${c.ideal}</p>` : ''}
    <button type="button" class="pill g" data-wa>Quiero inscribirme →</button>
    <p class="legal">Se abrirá WhatsApp para pedir fechas, cupos y valor del curso.</p>`;
  showOverlay(cm); cmBody.scrollTop = 0; $('.pop-card', cm).scrollTop = 0; $('#cm-close').focus();
}
function closeCurso() {
  if (cm.hidden || cm.classList.contains('closing')) return;
  hideOverlay(cm, () => { if (cmFocus && cmFocus.focus) cmFocus.focus({ preventScroll: true }); });
}
function waCurso(c) {      // sin número configurado: abre el wa.link de Studio K y deja el mensaje copiado
  const msg = `¡Hola! Quiero información del curso ${c.nombre}${c.sub ? ' (' + c.sub + ')' : ''} de Studio K 🖤`;
  const num = CONFIG.WHATSAPP.replace(/\D/g, '');
  if (!num && navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});
  window.open(num ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}` : CONFIG.WHATSAPP_LINK, '_blank');
}
cmBody.addEventListener('click', e => { if (e.target.closest('[data-wa]') && cmCurso) waCurso(cmCurso); });
cmImg.addEventListener('click', () => zoom(cmImg));
$('#cm-close').addEventListener('click', closeCurso);
cm.addEventListener('click', e => { if (e.target === cm) closeCurso(); });

$('#bk-close').addEventListener('click', closeBookingModal);
$('#sv-close').addEventListener('click', closePreview);
pm.addEventListener('click', e => { if (e.target === pm) closePreview(); });
$('#sv-book').addEventListener('click', e => openBookingModal(e.currentTarget.dataset.id));
document.addEventListener('keydown', e => {
  if (d.open) return;                                  // el visor de fotos se cierra solo con Esc
  if (e.key === 'Escape') { if (!cm.hidden) closeCurso(); else if (!pm.hidden) closePreview(); else closeBookingModal(); }
  if (!pm.hidden && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) goSlide(slideIdx() + (e.key === 'ArrowRight' ? 1 : -1));
});
// Botones "Agendar cita" de la página (navbar, hero, footer...)
$$('a[href="#reservar"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openBookingModal(); }));

/* ---------- 5) STEPPER ---------- */
const form = $('#booking-form');
const state = { step: 1, hora: '' };
const selected = new Set();
let catActual = 'Todos';

function goStep(n) {
  state.step = n;
  $$('.step', form).forEach(el => el.classList.toggle('on', +el.dataset.step === n));
  $$('.stepper span').forEach(el => {
    const k = +el.dataset.s; el.classList.toggle('on', k === n); el.classList.toggle('done', k < n);
  });
  $$('.err', form).forEach(e => e.textContent = '');
}
$$('[data-go]', form).forEach(b => b.addEventListener('click', () => {
  const to = +b.dataset.go;
  if (to > state.step && !validar(state.step)) return;   // validación antes de avanzar
  goStep(to); modalTop();
}));

// Paso 1: categorías + selección múltiple
function renderCats() {
  $('#cats').innerHTML = CATS.map(c => `<button type="button" class="chip${c === catActual ? ' on' : ''}" data-c="${c}">${c}</button>`).join('');
}
function renderPicker() {
  renderCats();
  $('#picks').innerHTML = SERVICIOS.filter(s => catActual === 'Todos' || s.cat === catActual).map(s => `
    <label class="pick${selected.has(s.id) ? ' sel' : ''}">
      <input type="checkbox" value="${s.id}" ${selected.has(s.id) ? 'checked' : ''}>
      <span class="nm">${s.nombre}</span><span class="pr">${money(s.precio)}</span>
    </label>`).join('');
}
$('#cats').addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) { catActual = c.dataset.c; renderPicker(); } });
$('#picks').addEventListener('change', e => {
  const cb = e.target; cb.checked ? selected.add(cb.value) : selected.delete(cb.value);
  cb.closest('.pick').classList.toggle('sel', cb.checked); updateSummary();
});
// abono para agendar: se muestra siempre la cifra (también $0 mientras no esté definida)
const pesos = n => '$' + (n || 0).toLocaleString('es-CO');
const abonoDe = lista => lista.reduce((a, s) => a + (s.abono || 0), 0);
function updateSummary() {
  const lista = SERVICIOS.filter(s => selected.has(s.id));
  const total = lista.reduce((a, s) => a + s.precio, 0), abono = abonoDe(lista);
  $('#summary').innerHTML = `<h4>TU SELECCIÓN (${lista.length})</h4>` +
    (lista.length ? `<ul>${lista.map(s => `<li><span>${s.nombre}<small>Abono para agendar: ${pesos(s.abono)}</small></span><span>${money(s.precio)}</span></li>`).join('')}</ul>` : '<p style="margin:0 0 8px;color:var(--mute)">Aún no has elegido servicios.</p>') +
    `<div class="tot"><span>Subtotal confirmado:</span><span>${total ? money(total) : '$0'}</span></div>` +
    (lista.length ? `<div class="abono"><span>Abono para agendar<small>Debes pagarlo para poder agendar tu servicio</small></span><b>${pesos(abono)}</b></div>` : '');
  $$('.abono-total').forEach(el => { el.textContent = pesos(abono); });
}
CONFIG.ESPECIALISTAS.forEach(n => form.elements.especialista.add(new Option(n, n)));
SEDES.forEach(d => form.elements.sede.add(new Option(d.nombre + ' · ' + d.direccion, d.id)));

// Paso 2: fecha y hora
const hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
form.elements.fecha.min = hoy;
$('#horas').innerHTML = CONFIG.HORAS.map(h => `<button type="button" class="hora" data-h="${h}">${h}</button>`).join('');
$('#horas').addEventListener('click', e => {
  const b = e.target.closest('.hora'); if (!b) return;
  state.hora = b.dataset.h; $$('.hora').forEach(x => x.classList.toggle('on', x === b));
});
const fechaLegible = v => new Date(v + 'T00:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
form.elements.fecha.addEventListener('change', () => {
  const v = form.elements.fecha.value;
  if (v && CONFIG.DIAS_CERRADO.includes(new Date(v + 'T00:00').getDay())) {
    form.elements.fecha.value = ''; $('#fecha-txt').textContent = ''; $('#err2').textContent = 'Atendemos de lunes a sábado. Elige otro día.'; return;
  }
  $('#err2').textContent = ''; $('#fecha-txt').textContent = v ? fechaLegible(v) : '';
});

// Validaciones por paso
function validar(n) {
  if (n === 1 && !selected.size) { $('#err1').textContent = 'Elige al menos un servicio para continuar.'; return false; }
  if (n === 2 && (!form.elements.fecha.value || !state.hora)) { $('#err2').textContent = 'Elige una fecha y una hora para continuar.'; return false; }
  if (n === 3) {
    const tel = form.elements.telefono.value.replace(/\D/g, '');
    if (form.elements.nombre.value.trim().length < 2) return err3('Escribe tu nombre completo.', form.elements.nombre);
    if (tel.length < 7) return err3('Escribe un teléfono válido.', form.elements.telefono);
  }
  return true;
}
function err3(msg, el) { $('#err3').textContent = msg; el.focus(); return false; }

/* ---------- 6) ENVÍO POR WHATSAPP ---------- */
const btn = $('#send');
const setBtn = (t, c) => { btn.textContent = t; btn.classList.remove('ok', 'err'); if (c) btn.classList.add(c); };

form.addEventListener('submit', e => {      // sin async/await: Safari (iPhone) bloquea window.open si no es directo al toque
  e.preventDefault();
  if (!validar(3)) return;
  const lista = SERVICIOS.filter(s => selected.has(s.id));
  const sede = SEDES.find(d => d.id === form.elements.sede.value) || SEDES[0];
  const msg = [
    '¡Hola! Quiero agendar una cita en Studio K 🖤',
    '',
    'Nombre: ' + form.elements.nombre.value.trim(),
    'Teléfono: +57 ' + form.elements.telefono.value.trim(),
    'Servicios: ' + lista.map(s => `${s.nombre} (${money(s.precio)}${s.extra ? ' · ' + extraTxt(s.extra) : ''})`).join(', '),
    'Subtotal: ' + money(lista.reduce((a, s) => a + s.precio, 0)),
    'Abono para agendar: ' + pesos(abonoDe(lista)),
    'Sede: ' + sede.nombre + ' · ' + sede.direccion,
    'Especialista: ' + form.elements.especialista.value,
    'Fecha: ' + fechaLegible(form.elements.fecha.value),
    'Hora: ' + state.hora
  ].join('\n');
  const num = (sede.whatsapp || CONFIG.WHATSAPP).replace(/\D/g, '');
  const url = num ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}` : CONFIG.WHATSAPP_LINK;
  if (!num && navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});   // sin número: deja el mensaje copiado
  window.open(url, '_blank');
  setBtn('¡Solicitud lista!', 'ok');
  $('#paso3').hidden = true; $('#ok').classList.add('show');
  setTimeout(closeBookingModal, 6000);
});
$('#nueva').addEventListener('click', closeBookingModal);

/* ---------- Carrusel de cursos (Lovely Brows) ----------
   Las tarjetas salen del arreglo CURSOS: la del centro grande y las laterales más pequeñas e inclinadas (3D).
   Arrastra / desliza o usa las flechas · toca una tarjeta lateral para traerla al centro ·
   toca la del centro (o "Ver curso") para abrir la ficha completa. Avanza solo y se pausa con el mouse encima.
   Las tarjetas libres (sin nombre) muestran solo la foto: al tocarlas se amplía. */
(() => {
  const stage = $('#cf-stage'); if (!stage || !CURSOS.length) return;
  const n = CURSOS.length, dotsEl = $('#cf-dots'), now = $('#cf-now');
  const titulo = (c, i) => c.nombre || `foto de alumna ${i + 1}`;
  stage.innerHTML = CURSOS.map((c, i) => `
    <article class="cf-card${c.nombre ? '' : ' libre'}" data-i="${i}" aria-roledescription="diapositiva" aria-label="${i + 1} de ${n}: ${titulo(c, i)}">
      <img src="${encodeURI(c.foto)}" alt="${c.alt || ''}" style="object-position:${c.pos || '50% 40%'}" draggable="false" loading="lazy">
      ${c.nombre ? `<div class="cf-info">
        ${c.cat ? `<span class="cf-cat">${c.cat}</span>` : ''}
        <h3>${c.nombre}</h3>
        ${c.sub ? `<p class="cf-sub">${c.sub}</p>` : ''}
        <p class="cf-meta">${metaCurso(c)}</p>
        <button type="button" class="cf-ver" tabindex="-1">Ver curso →</button>
      </div>` : ''}
    </article>`).join('');
  dotsEl.innerHTML = CURSOS.map((c, i) => `<button type="button" data-i="${i}" aria-label="Ver ${titulo(c, i)}"></button>`).join('');
  const abrir = i => CURSOS[i].nombre ? openCurso(i) : zoom($('img', cards[i]));   // curso → ficha · libre → foto grande
  const cards = $$('.cf-card', stage), dotBtns = $$('button', dotsEl);
  const mod = k => ((k % n) + n) % n;
  let W = 320, S1 = 240, S2 = 170, pos = 0, target = 0, raf = 0;

  function layout() {                                    // tamaño de las tarjetas según la pantalla
    const sw = stage.clientWidth, vh = innerHeight || 700, movil = sw < 640;
    W = movil ? Math.min(sw * .74, 340) : Math.min(420, Math.max(300, sw * .28));
    let H = W * 1.3;
    const maxH = Math.max(380, vh * .74);
    if (H > maxH) { H = maxH; W = H / 1.3; }
    S1 = W * (movil ? .8 : .74); S2 = W * .52;           // separación de la 1.ª y 2.ª tarjeta lateral
    stage.style.setProperty('--cw', Math.round(W) + 'px');
    stage.style.setProperty('--ch', Math.round(H) + 'px');
    stage.style.setProperty('--stage-h', Math.round(H + 34) + 'px');
  }
  function render() {                                    // coloca cada tarjeta según su distancia al centro
    cards.forEach((el, i) => {
      let dd = mod(i - pos); if (dd > n / 2) dd -= n;    // -n/2 … n/2 (0 = centro)
      const a = Math.abs(dd), s = Math.sign(dd);
      const x = s * (a <= 1 ? a * S1 : S1 + (a - 1) * S2);
      const op = a <= 2 ? 1 - a * .2 : Math.max(0, 1 - (a - 2) / .6) * .6;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,${(-a * 80).toFixed(1)}px) rotateY(${(-s * Math.min(a, 1) * 22).toFixed(2)}deg) scale(${(1 - Math.min(a, 2) * .13).toFixed(3)})`;
      el.style.opacity = op.toFixed(3);
      el.style.zIndex = String(100 - Math.round(a * 10));
      el.style.visibility = op < .02 ? 'hidden' : '';
      el.style.setProperty('--dim', (Math.min(a, 2) * .24).toFixed(3));
    });
  }
  function sync() {                                      // tarjeta activa, puntitos y lectores de pantalla
    const k = mod(target), foco = stage.contains(document.activeElement) && document.activeElement !== stage;
    cards.forEach((el, i) => {
      const on = i === k;
      el.classList.toggle('on', on);
      el.setAttribute('aria-hidden', on ? 'false' : 'true');
      const ver = $('.cf-ver', el); if (ver) ver.tabIndex = on ? 0 : -1;
    });
    dotBtns.forEach((b, i) => { b.classList.toggle('on', i === k); b.setAttribute('aria-current', i === k ? 'true' : 'false'); });
    now.textContent = `${k + 1} de ${n}: ${titulo(CURSOS[k], k)}`;
    if (foco) { const ver = $('.cf-ver', cards[k]); (ver || stage).focus({ preventScroll: true }); }   // el foco sigue a la tarjeta del centro
  }
  function animate() {
    pos += (target - pos) * .14;
    if (Math.abs(target - pos) < .002) pos = target;
    render();
    raf = pos !== target ? requestAnimationFrame(animate) : 0;
  }
  function go(t) {
    target = t; sync();
    if (reduce) { pos = t; render(); return; }
    if (!raf) raf = requestAnimationFrame(animate);
  }
  const goTo = i => { let dd = mod(i - target); if (dd > n / 2) dd -= n; go(target + dd); };   // por el camino más corto
  const next = () => go(target + 1), prev = () => go(target - 1);

  // Avance automático: cada 5 s, solo si está en pantalla, sin mouse encima y sin ficha abierta
  let timer = 0, visible = false, paused = false;
  function kick() { clearTimeout(timer); if (!reduce) timer = setTimeout(auto, 5000); }
  function auto() { if (visible && !paused && !down && cm.hidden && !document.hidden) next(); kick(); }

  // Arrastrar / deslizar: empieza tras moverse 6 px, así un toque simple sigue siendo un clic
  let down = false, moved = false, startX = 0, startPos = 0, lastX = 0, lastT = 0, vel = 0;
  stage.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    cancelAnimationFrame(raf); raf = 0;
    down = true; moved = false; startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0;
  });
  stage.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved) {
      if (Math.abs(dx) < 6) return;
      moved = true; stage.classList.add('drag'); stage.setPointerCapture(e.pointerId);
    }
    const t = performance.now(); vel = (e.clientX - lastX) / Math.max(1, t - lastT); lastX = e.clientX; lastT = t;
    pos = startPos - dx / S1; render();
  });
  const release = () => {
    if (!down) return;
    down = false; stage.classList.remove('drag');
    if (moved) {
      let t = Math.round(pos);
      if (t === Math.round(startPos) && Math.abs(vel) > .35) t += vel < 0 ? 1 : -1;   // gesto rápido = una tarjeta
      go(t); setTimeout(() => { moved = false; });                                    // ignora el clic que sigue al arrastre
    } else if (pos !== target && !raf) raf = requestAnimationFrame(animate);           // termina la animación pendiente
    kick();
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);
  stage.addEventListener('click', e => {
    if (moved) return;
    const card = e.target.closest('.cf-card'); if (!card) return;
    const i = +card.dataset.i;
    i === mod(target) ? abrir(i) : goTo(i);
    kick();
  });

  // Teclado: flechas cambian de curso, Enter abre la ficha
  stage.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); kick(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); kick(); }
    else if ((e.key === 'Enter' || e.key === ' ') && e.target === stage) { e.preventDefault(); abrir(mod(target)); }
  });
  $('#cf-prev').addEventListener('click', () => { prev(); kick(); });
  $('#cf-next').addEventListener('click', () => { next(); kick(); });
  dotsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { goTo(+b.dataset.i); kick(); } });

  stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
  stage.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { paused = false; kick(); } });
  stage.addEventListener('focusin', () => { paused = true; });
  stage.addEventListener('focusout', () => { paused = false; kick(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: .35 }).observe(stage);
  else visible = true;

  addEventListener('resize', () => { layout(); render(); });
  layout(); render(); sync(); kick();
})();

renderPicker(); updateSummary(); goStep(1);

/* ---------- Portada: título palabra por palabra + especialidades que van rotando ---------- */
(() => {
  const h = $('#hero-t');
  if (h && !reduce) {                                   // envuelve cada palabra en <span class="pw"> para animarla
    let i = 0;
    const partir = nodo => [...nodo.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          const s = document.createElement('span'); s.className = 'pw'; s.style.setProperty('--i', i++); s.textContent = t; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) partir(n);
    });
    partir(h); h.classList.add('split');
  }
  const rota = $('#rota'); if (!rota || reduce) return;
  const items = $$('b', rota); let k = 0;
  setInterval(() => {
    if (document.hidden) return;
    const a = items[k]; k = (k + 1) % items.length; const b = items[k];
    a.classList.remove('on'); a.classList.add('out'); b.classList.remove('out'); b.classList.add('on');
    setTimeout(() => a.classList.remove('out'), 750);
  }, 2600);
})();

/* ---------- Portada: video integrado ----------
   · El marco toma la forma exacta del video (se ve completo, sin recortes).
   · Luz ambiental: los colores del video se proyectan suaves alrededor del marco.
   · Botón pausar/reproducir y barra de avance. El video se pausa solo cuando no está en pantalla.
   · Computador: un brillo suave sigue al cursor sobre el video y una luz suave lo sigue por el panel negro.
   · Con "movimiento reducido" el video no arranca solo. */
(() => {
  const wrap = $('.hero-wrap'), bg = $('#hero-bg'), v = $('.hero-video'); if (!wrap || !bg || !v) return;
  const frame = $('.hm-frame', bg), glow = $('.hm-glow', bg), barra = $('.hm-prog i', bg), btn = $('#hm-play');
  const ctx = glow && glow.getContext('2d');
  let enPantalla = true, pausaManual = reduce, rafProg = 0, timerGlow = 0;

  const forma = () => { if (v.videoWidth) wrap.style.setProperty('--ar', (v.videoWidth / v.videoHeight).toFixed(4)); };
  const pintarGlow = () => { if (ctx && v.readyState >= 2) { try { ctx.drawImage(v, 0, 0, glow.width, glow.height); } catch (e) { /* sin luz ambiental */ } } };
  const avance = () => {
    if (v.duration) barra.style.transform = `scaleX(${(v.currentTime / v.duration).toFixed(4)})`;
    rafProg = !v.paused && enPantalla ? requestAnimationFrame(avance) : 0;
  };
  function estado() {                                   // sincroniza botón, barra y luz ambiental con el video
    const pausado = v.paused;
    frame.classList.toggle('pausado', pausado);
    btn.setAttribute('aria-label', pausado ? 'Reproducir video' : 'Pausar video');
    clearInterval(timerGlow); timerGlow = 0;
    if (!pausado && enPantalla) { timerGlow = setInterval(pintarGlow, 140); if (!rafProg) rafProg = requestAnimationFrame(avance); }
    else pintarGlow();
  }
  const reproducir = () => { const p = v.play(); if (p) p.catch(() => {}); };

  v.addEventListener('loadedmetadata', forma); forma();
  v.addEventListener('loadeddata', pintarGlow);
  v.addEventListener('play', estado); v.addEventListener('pause', estado);
  btn.addEventListener('click', () => { if (v.paused) { pausaManual = false; reproducir(); } else { pausaManual = true; v.pause(); } });
  if (reduce) { v.removeAttribute('autoplay'); v.pause(); }
  estado();
  if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => {
    enPantalla = en.isIntersecting;
    if (enPantalla && !pausaManual) reproducir(); else if (!enPantalla) v.pause();
    estado();
  }, { threshold: .15 }).observe(bg);

  // Computador: brillo suave sobre el video y luz del panel negro siguiendo el cursor
  if (reduce || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  wrap.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = wrap.getBoundingClientRect(), f = frame.getBoundingClientRect();
    wrap.style.setProperty('--mx', (e.clientX - r.left) + 'px'); wrap.style.setProperty('--my', (e.clientY - r.top) + 'px'); wrap.classList.add('luz');
    const dentro = e.clientX >= f.left && e.clientX <= f.right && e.clientY >= f.top && e.clientY <= f.bottom;
    frame.classList.toggle('brillo', dentro);
    if (dentro) { frame.style.setProperty('--gx', (e.clientX - f.left) + 'px'); frame.style.setProperty('--gy', (e.clientY - f.top) + 'px'); }
  });
  wrap.addEventListener('pointerleave', () => { wrap.classList.remove('luz'); frame.classList.remove('brillo'); });
})();

/* ---------- Reseñas: los mensajes reales "llegan" uno a uno, como en un chat ----------
   Empieza cuando el chat aparece en pantalla. Cada mensaje resalta su captura original en el abanico.
   Tocar una captura la abre completa. Con "movimiento reducido" se ven todos los mensajes de una vez. */
(() => {
  const chat = $('#rs-chat'); if (!chat) return;
  const msgs = $$('.rs-msg', chat), typing = $('.rs-typing', chat), fan = $('#rs-fan'), shots = $$('.rs-shot', fan);
  const status = $('#rs-status'), replay = $('#rs-replay'), base = status.textContent;
  let timer = 0, i = 0;
  fan.addEventListener('click', e => { const b = e.target.closest('.rs-shot'); if (b) zoom($('img', b)); });
  function marcar(k) {
    shots.forEach((s, j) => s.classList.toggle('on', j === k));
    const s = shots[k];                                 // en celular, la tira se desliza hasta la captura del mensaje
    if (s && fan.scrollWidth > fan.clientWidth + 4) fan.scrollTo({ left: s.offsetLeft - (fan.clientWidth - s.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
  }
  const abajo = () => chat.scrollTo({ top: chat.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  function paso() {
    if (i >= msgs.length) { typing.classList.remove('on'); status.textContent = base; status.classList.remove('escribe'); return; }
    const m = msgs[i], yo = m.classList.contains('yo');
    typing.classList.toggle('yo', yo); typing.classList.add('on');
    status.textContent = yo ? 'Studio K está escribiendo…' : 'Clienta escribiendo…'; status.classList.add('escribe');
    abajo();
    timer = setTimeout(() => {
      typing.classList.remove('on'); m.classList.add('in'); marcar(+m.dataset.shot || 0); abajo(); i++;
      timer = setTimeout(paso, 1500);
    }, Math.min(1700, 650 + m.textContent.length * 10));
  }
  function play() { clearTimeout(timer); msgs.forEach(m => m.classList.remove('in')); chat.classList.add('play'); chat.scrollTop = 0; i = 0; paso(); }
  replay.addEventListener('click', play);
  if (reduce || !('IntersectionObserver' in window)) { marcar(0); return; }
  chat.classList.add('play');                           // ocultos hasta que el chat aparece en pantalla
  const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); play(); } }, { threshold: .45 });
  io.observe(chat);
})();

/* ---------- Aparición suave al hacer scroll ---------- */
const rvSel = '.intro .w>*,.chap-head,.svc,.cur-head,.cf,.dark .w>*,.rs-head>*,.rs-stage,.rs-foot,.sede,#sedes .w>p,#sedes .w>h2,.stats>div';
const rvEls = $$(rvSel);
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; el.classList.add('in'); io.unobserve(el);
    setTimeout(() => { el.style.transitionDelay = ''; }, 1200);   // quita el retraso para que el efecto al pasar el mouse sea inmediato
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  rvEls.forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
}


/* ---------- Corazón flotante: baja y sube con el scroll ---------- */
(() => {
  const cora = $('#cora'); if (!cora || reduce) return;
  let ticking = false;
  const place = () => {
    const vh = innerHeight, max = Math.max(1, document.documentElement.scrollHeight - vh);
    const p = Math.min(1, scrollY / max);
    const y = vh * .2 + (0.5 - 0.5 * Math.cos(p * Math.PI * 2)) * vh * .55;   // sube y baja suavemente a lo largo de la página
    cora.style.transform = `translate3d(0,${y}px,0)`; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(place); } }, { passive: true });
  addEventListener('resize', place); place();
})();

/* ---------- Sede CC San Andresito El Puppy: video cinemático al hacer scroll ----------
   Mientras la sección está fija (sticky), el avance del scroll (0 → 1) se guarda en --p y --k:
   el marco del video se abre de tarjeta a pantalla completa, el título sube y los textos se turnan.
   El video solo se reproduce cuando está en pantalla (ahorra batería y datos). */
(() => {
  const tour = $('#sede-puppy'); if (!tour) return;
  const trackEl = $('.tour-track', tour), video = $('.tour-video', tour), steps = $$('.tour-step', tour);
  const clamp = v => Math.min(1, Math.max(0, v));
  let ticking = false, cur = 0;

  const update = () => {
    ticking = false;
    const r = trackEl.getBoundingClientRect(), dist = r.height - innerHeight;
    const p = dist > 0 ? clamp(-r.top / dist) : 0;
    tour.style.setProperty('--p', p.toFixed(4));
    tour.style.setProperty('--k', clamp(p / .35).toFixed(4));           // apertura del marco (primer 35 % del recorrido)
    const i = Math.min(steps.length - 1, Math.floor(clamp((p - .3) / .6) * steps.length));
    if (i !== cur) { steps[cur].classList.remove('on'); steps[i].classList.add('on'); cur = i; }
  };

  if (reduce) tour.classList.add('static');                            // movimiento reducido: sección normal, sin sticky
  else {
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update); update();
  }

  if (!video) return;
  if (reduce) { video.removeAttribute('autoplay'); video.pause(); video.controls = true; return; }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { const pr = video.play(); if (pr) pr.catch(() => {}); } else video.pause();
    }, { threshold: .1 }).observe(tour);
  }
})();