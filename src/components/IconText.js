import React from 'react';
import { Icon } from 'antd';

function IconText({ type, text, color, ...attrs }) {
  return (
    <span
      {...attrs}
      className="icon-text"
      style={{ color: color ? color : 'inherit' }}
    >
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
}

export default IconText;
