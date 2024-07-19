import {
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import React, { useState } from 'react';
import {register} from "@/services/ant-design-pro/api";
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const Components = {
    ProForm,
  };
  const [type] = useState<keyof typeof Components>('ProForm');

  const FormComponents = Components[type as 'LoginForm'];



  return (
    <PageContainer>
      <div
        style={{
          margin: 24,
        }}
      >
        <FormComponents
          // @ts-ignore
          labelWidth="auto"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建表单
            </Button>
          }
          onFinish={async (values: any) => {
            const response = await register({
              ...values,
              type,
            });
            if (response.code === 20000) {
              message.success('添加成功');
              setTimeout(async function () {
                window.location.href = '/admin/user_manage'
              }, 2000)
              return;
            } else {
              message.warning(response.description);
            }
          }}
          initialValues={{
            gender: 2,
            useMode: 'chapter',
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="username"
              label="用户名"
              placeholder="请输入用户名"
            />
            <ProFormText
              width="md"
              name="nickname"
              label="昵称（可选）"
              placeholder="请输入昵称"
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormRadio.Group
              name="gender"
              label="性别（可选）"
              options={
                [
                  {
                    label: '未知',
                    value: 2,
                  },
                  {
                    label: '男',
                    value: 1,
                  },
                  {
                    label: '女',
                    value: 0,
                  },
                ]}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined/>,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码必填且不小于6位！',
                  min: 6
                },
              ]}
            />
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined/>,
              }}
              placeholder={'请输入确认密码'}
              rules={[
                {
                  required: true,
                  message: '确认密码必填且不小于6位！',
                  min: 6
                },
              ]}
            />
          </ProForm.Group>

        </FormComponents>
      </div>
    </PageContainer>
  );
};
