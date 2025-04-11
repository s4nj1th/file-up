import FileUpload from "@/components/FileUpload";
import DownArrow from "@/components/DownArrow";
import InfoAndCalc from "@/components/InfoAndCalc";
import AboutQn from "@/components/AboutQn";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full">
        <h1 className="mt-20">
          <span className="title m-6">File Up</span>
        </h1>
        <div className="text-center">
          upload files to{" "}
          <a href="http://0x0.st/" target="_blank" rel="noopener noreferrer">
            0x0.st
          </a>
          <AboutQn />
        </div>
        <FileUpload />
        <DownArrow />
      </div>
      <InfoAndCalc />
    </div>
  );
}
