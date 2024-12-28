const Advertisment = () => {
  return (
    <div className="grid grid-cols-2 container mx-auto gap-3">
      <div className="col-span-2">
        <div className="gift-items-banner w-100 rounded-3 overflow-hidden relative">
          <div
            className="h-80 bg-cover bg-center bg-no-repeat rounded-xl flex justify-center"
            style={{
              backgroundImage: "url(/gift-items-banner-bg.png)",
            }}
          >
            <div className="banner-text text-md-center z-10 flex flex-col items-center gap-4">
              <h2 className="text-white font-bold text-4xl mt-10">
                Get <span className="text-sky-400">10% Off </span>
                on gift items
              </h2>
              <a
                href="/"
                className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Mua ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisment;
