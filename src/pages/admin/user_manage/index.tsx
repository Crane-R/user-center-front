import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Image, message, Tag} from 'antd';
import {useRef} from 'react';
import {getUserList, userDelete} from "@/services/ant-design-pro/api";
import {PageContainer} from '@ant-design/pro-components';

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
      2: {text: '未知'},
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
    render: (node, currentRow, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(currentRow.userId);
        }}
      >
        编辑
      </a>,
      <a
        key='look'
        onClick={() => {
          window.location.href = '/account'
        }}
      >
        查看
      </a>,
      <a
        key="delete"
        onClick={async () => {
          const sure = confirm('确认删除吗？')
          if (!sure) {
            return;
          }
          await userDelete(currentRow.id);
          message.success('删除成功，请手动点击查询以刷新表格')
          const result = await getUserList();
        }}
      >
        删除
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
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
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              //actionRef.current?.reload();
              window.location.href = '/admin/user_add'
            }}
            type="primary"
          >
            新增用户
          </Button>
        ]}
      />

    </PageContainer>

  );
};
