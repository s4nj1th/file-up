import CalcLife from "./CalcLife";

export default function InfoAndCalc() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 p-10">
      <img
        src="/desmos-graph.svg"
        className="w-full max-w-[1000px] lg:max-w-[40vw] mx-auto lg:mr-0 p-2 border border-dashed border-[var(--teritiary-bg)]"
        alt="Desmos graph"
      />
      <div className="text-left m-6">
        <CalcLife />
        <p className="bg-[var(--secondary-bg)] font-mono p-6 rounded-md mt-6">
          min_age = 30 days <br />
          max_age = 1 year <br />
          max_size = 512.0 MiB <br />
          retention = min_age + (min_age - max_age) * pow((file_size / max_size - 1), 3)
        </p>
      </div>
    </div>
  );
}
