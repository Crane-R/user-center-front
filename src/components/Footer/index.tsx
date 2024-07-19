import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Crane Resigned"
      links={[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'user-center-front',
          title:<><GithubOutlined /> user-center-front</>,
          href: 'https://github.com/Crane-R/user-center-front',
          blankTarget: true,
        },
        {
          key: 'user-center-back',
          title: <><GithubOutlined /> user-center-back</>,
          href: 'https://github.com/Crane-R/user-center-back',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
