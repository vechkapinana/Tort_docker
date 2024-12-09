import React from 'react';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Описание',
    children: 'Content of Tab Pane 1',
  }
];
const Tab = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default Tab;