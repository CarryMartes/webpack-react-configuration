import React from "react";
import './test.scss'
interface Props {
  title: string;
}

const Tests = ({ title }: Props) => {
  return (
    <div>
      <span>{ title }</span>
    </div>
  );
};
export default Tests;
