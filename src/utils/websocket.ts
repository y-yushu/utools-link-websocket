import {message as Message} from 'antd';
import entity_message from '../entity/message';
import enum_colors from '../enum/colors';

// 消息种类
enum titles {
  success = '连接成功',
  break = '连接断开',
  error = '数据异常',
  linkerror = '连接失败',
  sendmsg = '发送消息',
  onmsg = '接收消息',
  nolink = '长连接未连接',
}

export default class websocket {
  // 开启状态
  isopen: boolean = false;
  // 长连接
  ws: any = null;
  // 输出语句
  output: Function = () => {};
  // 连接
  link(url: string) {
    if (!/^(wss?:\/\/)[^]*/.test(url)) {
      Message.error('请输入完整的websocket地址');
      return;
    }
    this.ws = new WebSocket(url);
    // 打开
    this.ws.onopen = () => {
      this.isopen = true;
      const message: entity_message = {
        time: new Date(),
        title: titles.success,
        color: enum_colors.info,
      };
      this.output(message);
    };
    // 接受消息
    this.ws.onmessage = (e: {data: string}) => {
      const message: entity_message = {
        time: new Date(),
        title: titles.onmsg,
        msg: e.data,
        color: enum_colors.info,
      };
      this.output(message);
    };
    // 关闭
    this.ws.onclose = () => {
      if (this.isopen) {
        this.isopen = false;
        const message: entity_message = {
          time: new Date(),
          title: titles.break,
          color: enum_colors.error,
        };
        this.output(message);
      }
    };
    // 错误
    this.ws.onerror = () => {
      const message: entity_message = {
        time: new Date(),
        title: titles.linkerror,
        color: enum_colors.error,
      };
      this.output(message);
    };
  }
  // 发送
  send(msg: string) {
    if (!this.isopen) {
      Message.error(titles.nolink);
      return;
    }
    const message: entity_message = {
      time: new Date(),
      title: titles.sendmsg,
      msg: msg,
      color: enum_colors.info,
    };
    this.output(message);
    this.ws.send(msg);
  }
  // 关闭
  close() {
    if (!this.isopen) {
      Message.error(titles.nolink);
      return;
    }
    this.ws.close();
  }
  setOutput(output: Function) {
    this.output = output;
  }
}
