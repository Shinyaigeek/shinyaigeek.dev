export const Shinyaigeek = () => {
  return (
    <div
      className="myicon"
      style={{
        position: "absolute",
        bottom: "25px",
        right: "25px",
      }}>
      <div
        className="monkey"
        style={{
          width: "100%",
          height: "100%",
          zIndex: 3,
          position: "absolute",
        }}>
        <img
          src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/icon_transparent.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          alt="monkey-icon"
        />
      </div>
      <div
        style={{
          width: "50px",
          height: "50px",
          position: "absolute",
          bottom: "12%",
          left: "calc(50% - 25px)",
        }}
        className="earth">
        <div className="earthY">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
            src="https://storage.cloud.google.com/blog_assets_shinyaigeek/static/earth.png"
            alt="earth"
          />
        </div>
      </div>
    </div>
  );
};
