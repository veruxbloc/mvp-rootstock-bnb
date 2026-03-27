"use client";

import { useMarketplace } from '@/context/MarketplaceContext';
import { DatasetCard } from '@/components/DatasetCard';
import Link from 'next/link';

export default function Home() {
  const { datasets } = useMarketplace();

  return (
    <div className="flex flex-col min-h-screen pt-20">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface pt-20 pb-28 lg:pt-32 lg:pb-36 border-b border-outline-variant/15">
        {/* Background watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 pointer-events-none select-none text-[40vw] font-black text-primary leading-none font-[family-name:var(--font-plus-jakarta)]">
          TC
        </div>

        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="font-[family-name:var(--font-plus-jakarta)] font-bold uppercase tracking-[0.3em] text-primary text-sm">
              Talento · Verificado · Blockchain
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-5xl lg:text-7xl leading-[0.9] tracking-tighter mb-10 max-w-4xl text-on-surface">
            El puente entre el talento y las
            <span className="text-primary italic"> oportunidades</span> reales
          </h1>

          <p className="font-[family-name:var(--font-manrope)] text-xl text-on-surface-variant mb-12 max-w-2xl leading-relaxed">
            Conectamos estudiantes verificados con empresas que buscan talento real. Cada logro queda registrado en blockchain, transparente e inmutable.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-on-primary px-10 py-5 font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-widest uppercase text-sm hover:bg-primary-fixed-dim transition-all active:scale-95"
            >
              Explorar Talentos
            </button>
            <Link href="/dashboard">
              <button className="border border-outline-variant/30 text-primary px-10 py-5 font-[family-name:var(--font-plus-jakarta)] font-extrabold tracking-widest uppercase text-sm hover:bg-surface-container-high transition-all w-full sm:w-auto">
                Mi Panel
              </button>
            </Link>
          </div>

          {/* Stats / Features */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-0 max-w-3xl border-t border-outline-variant/15 pt-10">
            <div className="p-6 hover:bg-surface-container-high transition-colors">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-on-surface text-lg uppercase tracking-tight mb-2">
                Verificado en Cadena
              </h3>
              <p className="font-[family-name:var(--font-manrope)] text-on-surface-variant text-sm">
                Certificados y logros registrados en blockchain. Imposibles de falsificar, accesibles globalmente.
              </p>
            </div>
            <div className="p-6 hover:bg-surface-container-high transition-colors border-t sm:border-t-0 sm:border-x border-outline-variant/15">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-on-surface text-lg uppercase tracking-tight mb-2">
                Proyectos Reales
              </h3>
              <p className="font-[family-name:var(--font-manrope)] text-on-surface-variant text-sm">
                Las empresas publican proyectos concretos. Los estudiantes aplican, trabajan y construyen su reputación.
              </p>
            </div>
            <div className="p-6 hover:bg-surface-container-high transition-colors border-t sm:border-t-0">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-on-surface text-lg uppercase tracking-tight mb-2">
                Talento Tokenizado
              </h3>
              <p className="font-[family-name:var(--font-manrope)] text-on-surface-variant text-sm">
                Invertí en el potencial de los mejores profesionales y participá de su crecimiento en el ecosistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="mb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-4xl sm:text-5xl uppercase tracking-tighter text-on-surface mb-4">
                Talentos Disponibles
              </h2>
              <p className="font-[family-name:var(--font-manrope)] text-lg text-on-surface-variant">
                Los perfiles verificados más destacados de la plataforma. Cada token representa una participación en su trayectoria profesional.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
