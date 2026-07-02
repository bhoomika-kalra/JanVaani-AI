import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  BrainCircuit,
  Landmark,
  Users,
  Map,
  ShieldCheck,
  ActivitySquare,
  LayoutDashboard,
} from 'lucide-react';

import heroBg from '../assets/bg.png';
import logo from '../assets/logo.svg';

const LandingPage = () => {
  const navigate = useNavigate();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] font-sans relative flex flex-col items-center selection:bg-blue-100 selection:text-blue-900 w-full overflow-hidden">
      {/* HERO BACKGROUND */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/30 to-[#FAFAFA]/80" />
      </div>

      <style>{`
        .animate-hero-logo-proper {
          animation:
            heroEntrance 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
            heroFloat 6s ease-in-out 1.5s infinite;
        }

        @keyframes heroEntrance {
          0% {
            opacity: 0;
            transform: scale(0.86) translateY(24px);
            filter: drop-shadow(0 0 0 rgba(59,91,255,0));
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: drop-shadow(0 18px 38px rgba(59,91,255,0.22));
          }
        }

        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
            filter: drop-shadow(0 18px 38px rgba(59,91,255,0.20));
          }
          50% {
            transform: translateY(-8px);
            filter: drop-shadow(0 22px 48px rgba(59,91,255,0.34));
          }
        }

        .workflow-line-container {
          position: absolute;
          top: 26px;
          left: 8%;
          right: 8%;
          height: 2px;
          background-color: #cbd5e1;
          z-index: 0;
        }

        .workflow-line-glow {
          position: absolute;
          inset: 0 auto 0 0;
          width: 0%;
          background: linear-gradient(90deg, #3B5BFF, #22A652);
          box-shadow: 0 0 12px rgba(59,91,255,0.45);
          transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .workflow-line-glow.animate {
          width: 100%;
        }

        @keyframes pulseGlowIcon {
          0% {
            border-color: #f1f5f9;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          }
          50% {
            border-color: currentColor;
            box-shadow: 0 0 18px currentColor;
            transform: scale(1.1);
          }
          100% {
            border-color: #f1f5f9;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            transform: scale(1);
          }
        }

        .animate-step-glow-1 { animation: pulseGlowIcon 0.6s ease-out 0s forwards; }
        .animate-step-glow-2 { animation: pulseGlowIcon 0.6s ease-out 0.45s forwards; }
        .animate-step-glow-3 { animation: pulseGlowIcon 0.6s ease-out 0.9s forwards; }
        .animate-step-glow-4 { animation: pulseGlowIcon 0.6s ease-out 1.35s forwards; }
        .animate-step-glow-5 { animation: pulseGlowIcon 0.6s ease-out 1.8s forwards; }
      `}</style>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-start w-full min-h-screen max-w-[1700px] mx-auto px-6 lg:px-10 pt-8 pb-12 animate-in fade-in duration-1000">

        {/* BRANDING */}
        <section className="flex flex-col items-center text-center w-full mb-[32px]">
          <div className="w-full flex justify-center mb-7">
            <img
              src={logo}
              alt="JanVaani AI Logo"
              className="h-[170px] sm:h-[235px] md:h-[275px] lg:h-[300px] w-auto max-w-[85vw] object-contain animate-hero-logo-proper"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-3">
            JanVaani <span className="text-[#3B5BFF]">AI</span>
          </h1>

          <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-tight mb-3 flex justify-center gap-2 whitespace-nowrap">
            <span className="text-[#FF8A00]">For the People,</span>
            <span className="text-[#3B5BFF]">By the People,</span>
            <span className="text-[#22A652]">Of the People</span>
          </h2>

          <p className="text-xs md:text-sm font-bold text-[#111827] mb-2">
            AI-powered Constituency Development Platform
          </p>

          <p className="text-[#6B7280] text-xs md:text-sm max-w-xl font-medium leading-relaxed">
            Transforming every citizen voice into transparent, data-driven public development.
          </p>
        </section>

        {/* CTA BUTTONS */}
        <section className="flex flex-col items-center w-full max-w-[1200px] mx-auto mt-16">
          <div className="flex flex-col sm:flex-row gap-12 w-full justify-center px-2 mb-28">
            <button
              onClick={() => navigate('/citizen')}
              className="flex-1 max-w-[420px] h-[86px] group relative bg-[#3B5BFF] hover:bg-[#2563EB] rounded-[24px] overflow-hidden shadow-xl hover:shadow-[0_22px_55px_rgba(59,91,255,0.45)] transition-all duration-300 hover:-translate-y-1.5 flex items-center justify-center gap-6"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mic size={28} className="text-white" />
              </div>

              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold text-white tracking-wide leading-tight">
                  Start as Citizen
                </span>
                <span className="text-[14px] font-medium text-blue-100 mt-1">
                  Speak. Report. Improve India.
                </span>
              </div>
            </button>

            <button
              onClick={() => navigate('/mp-login')}
              className="flex-1 max-w-[420px] h-[86px] group relative bg-white border-2 border-slate-200 rounded-[24px] overflow-hidden shadow-md hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] hover:border-[#3B5BFF]/30 transition-all duration-300 hover:-translate-y-1.5 flex items-center justify-center gap-6"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={28} className="text-[#111827]" />
              </div>

              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold text-[#111827] tracking-wide leading-tight">
                  MP Dashboard
                </span>
                <span className="text-[14px] font-medium text-slate-500 mt-1">
                  Official AI Decision Engine
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* WORKFLOW */}
        <div className="w-full hidden md:block mb-24 max-w-[1200px]">
          <div className="flex items-start justify-between relative px-4 text-center">
            <div className="workflow-line-container">
              <div className={`workflow-line-glow ${animationStarted ? 'animate' : ''}`} />
            </div>

            {[
              {
                title: 'Citizen Voice',
                icon: <Mic size={22} className="text-[#FF8A00]" />,
                color: 'text-[#FF8A00]',
                glow: 'animate-step-glow-1',
              },
              {
                title: 'AI Understanding',
                icon: <BrainCircuit size={22} className="text-[#3B5BFF]" />,
                color: 'text-[#3B5BFF]',
                glow: 'animate-step-glow-2',
              },
              {
                title: 'Priority Intelligence',
                icon: <ActivitySquare size={22} className="text-[#3B5BFF]" />,
                color: 'text-[#3B5BFF]',
                glow: 'animate-step-glow-3',
              },
              {
                title: 'Government Action',
                icon: <Landmark size={22} className="text-[#22A652]" />,
                color: 'text-[#22A652]',
                glow: 'animate-step-glow-4',
              },
              {
                title: 'Public Impact',
                icon: <Users size={22} className="text-[#22A652]" />,
                color: 'text-[#22A652]',
                glow: 'animate-step-glow-5',
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative z-10 flex flex-col items-center flex-1 px-2 ${step.color}`}
              >
                <div
                  className={`w-14 h-14 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center bg-clip-padding ${animationStarted ? step.glow : ''
                    }`}
                >
                  {step.icon}
                </div>
                <h4 className="font-bold text-[#111827] text-[14px] mt-4 leading-tight">
                  {step.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 w-full px-4 max-w-[1500px] relative z-20 mt-8">
          {[
            {
              title: 'Speak Naturally',
              desc: 'Report issues using voice, text or images in any Indian language.',
              icon: <Mic size={24} />,
              bg: 'bg-[#FFF3E0]',
              text: 'text-[#FF8A00]',
            },
            {
              title: 'AI Priority Engine',
              desc: 'AI analyzes complaints, detects duplicates and prioritizes public needs.',
              icon: <BrainCircuit size={24} />,
              bg: 'bg-[#E8EAF6]',
              text: 'text-[#3B5BFF]',
            },
            {
              title: 'Smart Constituency Map',
              desc: 'Visualize issue hotspots for smarter constituency planning.',
              icon: <Map size={24} />,
              bg: 'bg-[#E8F5E9]',
              text: 'text-[#22A652]',
            },
            {
              title: 'Transparent Progress',
              desc: 'Track complaint status and development updates with complete transparency.',
              icon: <ShieldCheck size={24} />,
              bg: 'bg-[#EDE7F6]',
              text: 'text-[#5C6BC0]',
            },
          ].map((card, index) => (
            <div
              key={index}
              className="group bg-white/95 backdrop-blur-sm px-7 py-6 min-h-[125px] rounded-[22px] shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_42px_rgba(15,23,42,0.14)] border border-white/80 flex items-center gap-5 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} ${card.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>

              <div className="flex-1 flex flex-col justify-center text-left h-full">
                <h3 className="font-bold text-[#111827] text-[16px] mb-1 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-[13px] font-medium leading-[1.4] line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;