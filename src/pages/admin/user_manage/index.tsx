import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Dropdown, Image, Space, Tag} from 'antd';
import {useRef} from 'react';
import request from 'umi-request';
import {getUserList} from "@/services/ant-design-pro/api";
import {switchCase} from "@babel/types";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}/>
      </div>
    )
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    copyable: true,
    ellipsis: true
  },
  {
    title: '性别',
    dataIndex: 'gender',
    copyable: true,
    ellipsis: true,
    valueEnum: {
      0: {text: '女'},
      1: {text: '男'},
    }
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: {text: '正常', status: 'Success'},
      1: {text: '封号', status: 'Error'},
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '修改时间',
    key: 'showTime',
    dataIndex: 'updateTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    renderFormItem: (_, {defaultRender}) => {
      return defaultRender(_);
    },
    render: (text) => (
      <Tag color={text === 1 ? 'purple' : 'green'}>{text === 1 ? '管理员' : '普通用户'}</Tag>
    ),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.userId);
        }}
      >
        编辑
      </a>,
      <a href={record.userId} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const result = await getUserList();
        return {
          data: result.data
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '2',
              },
              {
                label: '3rd item',
                key: '3',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined/>
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
