import { IDashboard } from "@/model";

export const showMoney: IDashboard[] = [
  {
    title: "账户余额",
    value: 0,
    unit: "元"
  },
  {
    title: "累计赚取",
    value: 0,
    unit: "元"
  }
];

export const showMerchant: IDashboard[] = [
  {
    title: "邀请直属商家",
    value: 0,
    unit: ""
  },
  {
    title: "商家累计发单",
    value: 0,
    unit: "单"
  },
  {
    title: "已完结订单",
    value: 0,
    unit: "单"
  }
];

export const showBuyer: IDashboard[] = [
  {
    title: "邀请推广员",
    value: 0,
    unit: ""
  },
  {
    title: "下属推广员商家累计发单",
    value: 0,
    unit: "单"
  },
  {
    title: "已完结订单",
    value: 0,
    unit: "单"
  },
  {
    title: "下属累计赚取",
    value: 0,
    unit: "元"
  }
];

export const commissionTitle: any = new Map([
  [
    "tab-fir",
    {
      title: "一级代理佣金提成",
      content: "可以开二级代理推广号"
    }
  ],
  [
    "tab-sec",
    {
      title: "二级代理佣金提成",
      content: "可以开三级代理推广号"
    }
  ],
  [
    "tab-th",
    {
      title: "三级代理佣金提成",
      content: "无法开四级代理推广号"
    }
  ]
]);
