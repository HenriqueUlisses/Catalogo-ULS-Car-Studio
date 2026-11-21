/* ===== EDITE AQUI: contatos e valores ===== */
const WHATSAPPS = [
  { label: "(61) 99507-1402", num: "5561995071402" },
  { label: "(61) 99616-3076", num: "5561996163076" },
  { label: "(61) 99828-3722", num: "5561998283722" }
];
/* Valores por lavagem caem R$ 10 a cada nível (2, 3 e 4 lavagens). */
const PLANS = [
  { name: "Essencial", count: 2, tag: "", each: { p: 100, g: 120 },
    items: ["2 lavagens de manutenção por mês", "Lavagem externa e aspiração interna", "Vidros, painel e pneus", "Agendamento flexível"] },
  { name: "Plus", count: 3, tag: "Mais escolhido", each: { p: 90, g: 110 },
    items: ["3 lavagens de manutenção por mês", "Tudo do plano Essencial", "Aplicação de proteção rápida na pintura", "10% de desconto nos serviços de estética"] },
  { name: "Premium", count: 4, tag: "Melhor custo por lavagem", each: { p: 80, g: 100 },
    items: ["4 lavagens de manutenção por mês, 1 por semana", "Tudo do plano Plus", "Prioridade na agenda", "15% de desconto nos serviços de estética"] }
];
/* ========================================== */

const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const waLink = msg => "https://wa.me/" + WHATSAPPS[0].num + "?text=" + encodeURIComponent(msg);
let suv = false;

function render() {
  const k = suv ? "g" : "p";
  document.getElementById("plans").innerHTML = PLANS.map(p => {
    const each = p.each[k];
    const total = each * p.count;
    const msg = "Olá! Vi o catálogo da ULS Car Studio e quero assinar o plano " + p.name + " (" + p.count + " lavagens por mês) para " + (suv ? "SUV/picape" : "hatch/sedã") + ".";
    return '<article class="plan' + (p.tag === "Mais escolhido" ? " featured" : "") + '">' +
      (p.tag ? '<span class="tag">' + p.tag + '</span>' : "") +
      '<h3>' + p.name + '</h3>' +
      '<div class="freq">' + p.count + ' lavagens por mês</div>' +
      '<div class="price"><b>' + brl(total) + '</b><small>por mês</small></div>' +
      '<div class="per">' + brl(each) + ' por lavagem</div>' +
      '<ul>' + p.items.map(i => "<li>" + i + "</li>").join("") + '</ul>' +
      '<a class="btn" href="' + waLink(msg) + '">Quero este plano</a></article>';
  }).join("");
  document.getElementById("plan-note").textContent = "Valores para " + (suv ? "SUV e picape" : "hatch e sedã") + ". Veículos com alta sujidade são confirmados no orçamento.";
  document.getElementById("sz-p").setAttribute("aria-pressed", String(!suv));
  document.getElementById("sz-g").setAttribute("aria-pressed", String(suv));
}
document.getElementById("sz-p").onclick = () => { suv = false; render(); };
document.getElementById("sz-g").onclick = () => { suv = true; render(); };
render();

document.getElementById("wa-list").innerHTML = WHATSAPPS.map((w, i) =>
  '<a class="btn' + (i ? " alt" : "") + '" href="https://wa.me/' + w.num + '?text=' + encodeURIComponent("Olá! Vi o catálogo da ULS Car Studio e gostaria de um orçamento.") + '">WhatsApp ' + w.label + '</a>'
).join("");
