import {useState} from 'react';
import moment from 'moment';
// 组件
import YysInput from '../input/input';
import YysButton from '../button/button';
// 工具
import WebSocket from '../../utils/websocket';
import Event from '../../utils/event';
// 实体类
import entity_message from '../../entity/message';
// 样式
import './box.css';

// 长连接
const ws: WebSocket = new WebSocket();
// 事件总线
const event = new Event();

// 顶部
const Header = () => {
  const [url, setUrl] = useState('');
  // 按钮 - 连接
  const linkKeepAlive = () => ws.link(url);
  // 按钮 - 断开
  const breakKeepAlive = () => ws.close();
  // 按钮 - 清空
  const clear = () => event.emit('list-clear');
  return (
    <div className="box-header">
      <YysInput
        value="wss://wisdom-pen.3xmt.com/wisdom-pen/ws/pad/lecture/4566"
        placeholder="请输入完整的websocket地址"
        getValue={(e: string) => setUrl(e)}
      />
      <YysButton onClick={linkKeepAlive}>连接</YysButton>
      <YysButton onClick={breakKeepAlive}>断开</YysButton>
      <YysButton onClick={clear}>清空</YysButton>
    </div>
  );
};
// 中部
const Center = () => {
  // 消息列表
  const [lists, setLists] = useState<entity_message[]>([]);
  // 接收消息
  ws.setOutput((msg: entity_message) => {
    setLists(list => [...list, msg]);
  });
  // 清空数组
  event.on('list-clear', () => setLists([]));
  // 时间格式化
  const getTime = (time: Date): string => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  };
  return (
    <div className="box-center">
      <div>
        {lists.map((item: entity_message, i: number) => {
          return (
            <div key={i} style={{marginLeft: 10}}>
              <li style={{color: item.color}}>
                {item.title + ' ' + getTime(item.time)}
              </li>
              {item.msg ? (
                <li style={{listStyle: 'none'}}>{item.msg}</li>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
// 底部
const Bottom = () => {
  // 发送信息
  const [msg, setMsg] = useState<string>('');
  // 按钮 - 发送
  const _send = () => {
    ws.send(msg);
    setMsg('');
  };
  return (
    <div className="box-bottom">
      <YysInput
        value="你好世界"
        placeholder="请输入要发送的信息"
        getValue={(e: string) => setMsg(e)}
      />
      <YysButton onClick={_send}>发送</YysButton>
    </div>
  );
};
// 盒子
const Box = () => {
  return (
    <div className="box">
      <Header />
      <Center />
      <Bottom />
    </div>
  );
};

export default Box;
