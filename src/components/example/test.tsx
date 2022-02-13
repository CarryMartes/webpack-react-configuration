import React from "react";
import './test.scoped.scss'
interface Props {
  title: string;
  casuals: number;
}

const Tests = ({ title }: Partial<Props>) => {
  return (
    <div>
      <span className="titleClass">{ title }</span>
    </div>
  );
};
export default Tests;
