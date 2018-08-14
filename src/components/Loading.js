import React from 'react';
import { Spin, Icon } from 'antd';

function Loading() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <div className="b-loading">
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loading;
