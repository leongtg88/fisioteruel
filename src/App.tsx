/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ScreenType } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ServicesView from "./components/ServicesView";
import BookingView from "./components/BookingView";
import HtmlExporter from "./components/HtmlExporter";

export default function App() {
  const [currentScreen, setScreen] = useState<ScreenType>("inicio");
  const [currency, setCurrency] = useState<"EUR" | "DOP">("EUR");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // High fidelity trigger state: when they click "Reservar" inside catalog, 
  // we capture that choice and pre-select it in the scheduler slot!
  const [selectedServiceId, setSelectedServiceId] = useState<string>("eval-integral");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-cream-bg font-sans relative overflow-x-hidden">
      {/* Mesh Background Elements from Frosted Glass Theme */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-blue-300 rounded-full blur-[120px] opacity-25"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] bg-teal-200 rounded-full blur-[110px] opacity-35"></div>
        <div className="absolute top-[35%] right-[15%] w-[35vw] h-[35vw] max-w-[400px] bg-indigo-200 rounded-full blur-[130px] opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between flex-1 min-h-screen">
        {/* Dynamic Navigation AppBar */}
        <Header
          currentScreen={currentScreen}
          setScreen={setScreen}
          currency={currency}
          setCurrency={setCurrency}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main viewport state routing router */}
        <main className="flex-grow pb-16 relative z-10">
          {currentScreen === "inicio" && (
            <HomeView
              setScreen={setScreen}
              currency={currency}
            />
          )}

          {currentScreen === "servicios" && (
            <ServicesView
              setScreen={setScreen}
              currency={currency}
              setSelectedServiceId={setSelectedServiceId}
            />
          )}

          {currentScreen === "agendar" && (
            <BookingView
              currency={currency}
              selectedServiceId={selectedServiceId}
              setSelectedServiceId={setSelectedServiceId}
            />
          )}

          {currentScreen === "descargar" && (
            <HtmlExporter />
          )}
        </main>

        {/* Dynamic Footer */}
        <Footer setScreen={setScreen} />
      </div>
    </div>
  );
}
