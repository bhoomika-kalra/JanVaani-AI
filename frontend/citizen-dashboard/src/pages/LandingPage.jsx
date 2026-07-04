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

  const handleCitizenStart = () => {
    const profile = localStorage.getItem('janvaani_citizen_profile');
    if (profile) {
      navigate('/citizen');
    } else {
      navigate('/citizen-register');
    }
  };

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
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-[#FAFAFA]/50" />
      </div>

      <style>{`
        .animate-hero-logo-proper {
          animation:
            heroEntranceSoft 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
            heroFloatGlow 6s ease-in-out 1.2s infinite;
        }

        @keyframes heroEntranceSoft {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
            filter: drop-shadow(0 0 0 rgba(59,91,255,0));
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 20px 40px rgba(59,91,255,0.25));
          }
        }

        @keyframes heroFloatGlow {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 20px 40px rgba(59,91,255,0.25));
          }
          50% {
            transform: translateY(-12px) scale(1.02);
            filter: drop-shadow(0 35px 55px rgba(59,91,255,0.45));
          }
        }

        .workflow-line-container {
          position: absolute;
          top: 23px;
          left: 10%;
          right: 10%;
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
          transition: width 2s linear;
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
            transform: scale(1.15);
          }
          100% {
            border-color: currentColor;
            box-shadow: 0 0 10px currentColor;
            transform: scale(1);
          }
        }

        .animate-step-glow-1 { animation: pulseGlowIcon 0.5s ease-out 0s forwards; }
        .animate-step-glow-2 { animation: pulseGlowIcon 0.5s ease-out 0.5s forwards; }
        .animate-step-glow-3 { animation: pulseGlowIcon 0.5s ease-out 1.0s forwards; }
        .animate-step-glow-4 { animation: pulseGlowIcon 0.5s ease-out 1.5s forwards; }
        .animate-step-glow-5 { animation: pulseGlowIcon 0.5s ease-out 2.0s forwards; }
      `}</style>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center justify-start w-full min-h-screen max-w-[1700px] mx-auto px-6 lg:px-10 pt-4 pb-6 animate-in fade-in duration-1000">

        {/* BRANDING */}
        <section className="flex flex-col items-center text-center w-full mb-[12px]">
          <div className="w-full flex justify-center mb-3">
            <img
              src={logo}
              alt="JanVaani AI Logo"
              className="h-[230px] sm:h-[220px] md:h-[250px] lg:h-[280px] w-auto max-w-[85vw] object-contain animate-hero-logo-proper"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase mb-2">
            JanVaani <span className="text-[#3B5BFF]">AI</span>
          </h1>

          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight mb-2 flex justify-center gap-2 whitespace-nowrap">
            <span className="text-[#FF8A00]">For the People,</span>
            <span className="text-[#3B5BFF]">By the People,</span>
            <span className="text-[#22A652]">Of the People</span>
          </h2>

          <p className="text-sm md:text-base font-bold text-[#111827] mb-1">
            AI-powered Constituency Development Platform
          </p>

          <p className="text-[#6B7280] text-sm md:text-base max-w-xl font-medium leading-relaxed">
            Transforming every citizen voice into transparent, data-driven public development.
          </p>
        </section>

        {/* CTA BUTTONS */}
        <section className="flex flex-col items-center w-full max-w-[1200px] mx-auto mt-3">
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center px-2 mb-6">
            <button
              onClick={handleCitizenStart}
              className="flex-1 max-w-[300px] h-[72px] group relative bg-[#3B5BFF] hover:bg-[#2563EB] rounded-[22px] overflow-hidden shadow-xl hover:shadow-[0_22px_55px_rgba(59,91,255,0.45)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-4"
            >
              <div className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mic size={20} className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[18px] font-bold text-white leading-tight">Start as Citizen</span>
                <span className="text-[12px] text-white/80 font-medium mt-0.5">Speak. Report. Improve India.</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/mp-login')}
              className="flex-1 max-w-[300px] h-[72px] group relative bg-white border-2 border-slate-200 rounded-[22px] overflow-hidden shadow-md hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] hover:border-[#3B5BFF]/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-4"
            >
              <div className="w-[42px] h-[42px] rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={20} className="text-[#111827]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[18px] font-bold text-[#111827] leading-tight">MP Dashboard</span>
                <span className="text-[12px] text-slate-500 font-medium mt-0.5">Official AI Decision Engine</span>
              </div>
            </button>
          </div>
        </section>

        {/* WORKFLOW */}
        <div className="w-full hidden md:block mb-4 max-w-[1200px]">
          <div className="flex items-start justify-between relative px-4 text-center">
            <div className="workflow-line-container">
              <div className={`workflow-line-glow ${animationStarted ? 'animate' : ''}`} />
            </div>

            {[
              {
                title: 'Citizen Voice',
                icon: <Mic size={20} className="text-[#FF8A00]" />,
                color: 'text-[#FF8A00]',
                glow: 'animate-step-glow-1',
              },
              {
                title: 'AI Understanding',
                icon: <BrainCircuit size={20} className="text-[#3B5BFF]" />,
                color: 'text-[#3B5BFF]',
                glow: 'animate-step-glow-2',
              },
              {
                title: 'Priority Intelligence',
                icon: <ActivitySquare size={20} className="text-[#3B5BFF]" />,
                color: 'text-[#3B5BFF]',
                glow: 'animate-step-glow-3',
              },
              {
                title: 'Government Action',
                icon: <Landmark size={20} className="text-[#22A652]" />,
                color: 'text-[#22A652]',
                glow: 'animate-step-glow-4',
              },
              {
                title: 'Public Impact',
                icon: <Users size={20} className="text-[#22A652]" />,
                color: 'text-[#22A652]',
                glow: 'animate-step-glow-5',
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative z-10 flex flex-col items-center flex-1 px-2 ${step.color}`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center bg-clip-padding ${animationStarted ? step.glow : ''
                    }`}
                >
                  {step.icon}
                </div>
                <h4 className="font-bold text-[#111827] text-[13px] mt-3 leading-tight">
                  {step.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full px-4 max-w-[1500px] relative z-20 mt-10">
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
              className="group bg-white/95 backdrop-blur-sm px-5 py-4 min-h-[95px] rounded-[16px] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)] border border-white/80 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.bg} ${card.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                {card.icon}
              </div>

              <div className="flex-1 flex flex-col justify-center text-left h-full">
                <h3 className="font-bold text-[#111827] text-[16px] mb-1 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-[11.5px] font-medium leading-[1.3] line-clamp-2">
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