// ui msg
export const TITLE = "推广平台";
export const TITLE_BODY = "一个专注做推广的平台";
export const USERNAME = "用户名";
export const PHONE_NUMBER = "手机";
export const SEND_CODE_MSG = "发送验证码";
export const CODE = "验证码";
export const PASSWORD = "密码";
export const REPASSWORD = "确认密码";
export const FORGET = "忘记密码";
export const LOGIN = "登录";
export const LOGOUT = "登出";
export const SHARE_TITLE = "做推广，赚分成";
export const SHARE_MSG = "复制链接发送邀请给好友";
export const COPY = "复制";
export const BANK = "银行";
export const ACCOUNT = "账户";
export const HOLDER = "开户人";
export const BIND = "已绑定";
export const NEXT = "下一步";
export const ADD_BIND = "添加绑定";
export const APPROVAL = "提现申请";

export const PROMOTER = "推广员";
export const DIR_STORE = "直接推荐商家";
export const INDIR_STORT = "间接推荐商家";
export const ADDPROMOTER = "添加推广员";
export const PROMOTERID = "推广员ID";
export const STOREID = "商家ID";
export const ORDERID = "订单ID";
export const RATE = "订单分成比例";
export const AMOUNT = "总金额";
export const BALANCE = "余额";
export const TIME = "时间";
export const STATUS = "状态";
export const REMARK = "备注";
export const TYPE = "类型";
export const TOTAL_ORDER_COUNT = "下属累计放单量";
export const END_ORDER_COUNT = "已完结订单量";
export const ACTION = "操作";
export const SEARCH = "查询";
export const EDIT = "编辑";
export const RESET = "重置密码";
export const CLOSE = "关闭";
export const SAVE = "保存";
export const EXPORT = "导出";
export const START_TIME = "开始时间";
export const END_TIME = "结束时间";
export const REG_TIME = "注册时间";
export const ACTION_TIME = "操作时间";
export const CASH = "佣金";
export const DIR_CASH = "直接商家提成";
export const INDIR_CASH = "间接商家提成";
export const FIRST_PROXY = "一级代理";
export const SECOND_PROXY = "二级代理";
export const THIRD_PROXY = "三级代理";
export const EXPORT_TIP = "优质任务和商家加价的佣金不纳入推广员分成。（这两个的费用是全部给买手的）";

// components title
export const CASH_CENTER_TITLE = "提现中心";
export const CASH_DETAIL_TITLE = "提现明细";
export const CASH_CENTER_SUBTITLE = (balance: number) => `当前账户余额: ￥${balance}`;

// step content
export const CASH_CENTER_STEP = ["银行账户绑定", "提交提现信息", "提现审核"];
export const CASH_CENTER_STEP_TIP = [
  "绑定银行卡后，不能更改，要更改只能联系客服进行修改",
  "一个自然月内只能进行提现2次申请",
  "提现时仔细核对收款人姓名、银行卡号（农行提现相较于其他银行较慢）",
  "申请已提交，正在审核...",
  "每个月的5号跟20号进行打款"
];

// validate error msg
export const USERNAME_ERROR_MSG = "无效用户名";
export const PHONE_ERROR_MSG = "手机号码错误";
export const CODE_ERROR_MSG = "验证码错误";
export const PASS_ERROR_MSG = "无效密码";
export const BANK_ERROR_MSG = "无效银行名";
export const ACCOUNT_ERROR_MSG = "无效账户";
export const HOLDER_ERROR_MSG = "无效开户人";
export const AMOUNT_ERROR_MSG = "无效金额数";
export const RATE_ERROR_MSG = "抽成比例设置为0~0.15";

// tip msg
export const LOGOUT_TIP = "是否退出该账号?";
export const CONFIRM = "确认";
export const CANCEL = "取消";
export const COPY_SUCCESS = "复制成功";
export const COPY_FAILED = "复制成功";

// tag
export const TOKEN_STORAGE_KEY = "__token__";

// event
export const CHECK_LOGIN_EVENT = "is_login";
export const LOGOFF_EVENT = "log_off";
export const UPDATE_PASSWORD_EVENT = "update_password";
