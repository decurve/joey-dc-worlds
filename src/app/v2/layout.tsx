import RainbowProvider from "./RainbowProvider";
import FilmGrain from "./FilmGrain";
import StaticNoise from "./StaticNoise";

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <RainbowProvider />
      <FilmGrain />
      <StaticNoise opacity={0.055} />
      {children}
    </div>
  );
}
