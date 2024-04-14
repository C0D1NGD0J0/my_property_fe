import React from "react";

interface Props {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}
function IconBox({ icon, title, subtitle }: Props) {
  return (
    <div className="icon-box">
      {icon ? <div className="icon-box_icon">{icon}</div> : null}
      <div className="icon-box_text">
        <h3>{title}</h3>
        {subtitle ? <h4>{subtitle}</h4> : null}
      </div>
    </div>
  );
}

export default IconBox;
