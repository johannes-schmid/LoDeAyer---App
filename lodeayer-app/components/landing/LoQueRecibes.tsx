import { Check } from "lucide-react";

const features = [
  "Álbum digital organizado por momentos (ceremonia, cocktail, fiesta)",
  "Descarga de todas las fotos en alta resolución con un clic",
  "Gamificación: puntos por foto, votación por la mejor foto",
  "Panel de la pareja para revisar y aprobar fotos antes del revelado",
  "30 días de acceso al álbum para todos los invitados",
  "Recordatorios por WhatsApp para que los invitados suban más fotos",
  "QR personalizado para imprimir o proyectar en la fiesta",
  "Soporte en español durante todo el evento",
];

const thumbs = [
  "https://images.pexels.com/photos/30505255/pexels-photo-30505255.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/11596048/pexels-photo-11596048.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/30957025/pexels-photo-30957025.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/9041817/pexels-photo-9041817.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/6198375/pexels-photo-6198375.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  "https://images.pexels.com/photos/10168642/pexels-photo-10168642.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
];

export default function LoQueRecibes() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-[#d9b98a] text-xs uppercase tracking-[0.18em] mb-4 font-medium">Lo que recibes</p>
          <h2 className="text-4xl font-serif font-light text-[#f4efe7] mb-10 tracking-tight">
            Todo en un solo{" "}
            <em className="italic text-[#d9b98a]">álbum.</em>
          </h2>
          <ul className="space-y-3.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#d9b98a]/10 border border-[#d9b98a]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#d9b98a]" />
                </div>
                <span className="text-[#f4efe7]/60 text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {thumbs.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-[#111113]">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#111113] border border-white/[0.06] rounded-2xl p-4 text-center">
            <p className="text-[#d9b98a] font-semibold text-xl font-serif italic">287 fotos</p>
            <p className="text-[#f4efe7]/35 text-xs mt-1">de 34 personas · Boda de Ana & Carlos · Lima</p>
          </div>
        </div>
      </div>
    </section>
  );
}
