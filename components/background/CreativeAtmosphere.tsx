
"use client";

export default function CreativeAtmosphere() {
  return (
    <div className="creative-atmosphere" aria-hidden="true">

      {/* PSYCHOLOGY — perception and attention */}
      <div className="atmosphere-psychology">
        <div className="perception-ring perception-ring-one" />
        <div className="perception-ring perception-ring-two" />
        <div className="perception-ring perception-ring-three" />
        <div className="perception-focus" />
        <div className="attention-path attention-path-one" />
        <div className="attention-path attention-path-two" />
      </div>

      {/* CREATIVITY — editorial campaign composition */}
      <div className="atmosphere-editorial">
        <div className="editorial-frame editorial-frame-one" />
        <div className="editorial-frame editorial-frame-two" />

        <div className="editorial-block editorial-block-one" />
        <div className="editorial-block editorial-block-two" />
        <div className="editorial-block editorial-block-three" />

        <div className="editorial-orbit" />
        <div className="editorial-accent" />
      </div>

      {/* CONNECTION — insight becoming creative action */}
      <div className="atmosphere-connections">
        <div className="connection-line connection-line-one" />
        <div className="connection-line connection-line-two" />
        <div className="connection-node connection-node-one" />
        <div className="connection-node connection-node-two" />
        <div className="connection-node connection-node-three" />
      </div>

      {/* ATMOSPHERIC DETAILS */}
      <div className="atmosphere-grain" />
      <div className="atmosphere-cross atmosphere-cross-one">+</div>
      <div className="atmosphere-cross atmosphere-cross-two">+</div>

    </div>
  );
}
