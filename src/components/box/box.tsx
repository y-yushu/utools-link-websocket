import {useState, useRef} from 'react';
import {message} from 'antd';
import YysInput from '../input/input';
import YysButton from '../button/button';
import './box.css';

const Box = () => {
  const [val1, setVal1] = useState('');
  const inputRef: any = useRef(null);
  const [val2, setVal2] = useState('');
  const func = () => {
    console.log(123);
    message.info('信息提示');
    console.log('val1', val1);
    console.log('val2', val2);
    console.log(inputRef);
  };
  const str =
    '标签 前端后端httpwebsocket 阿里云代金券领取 腾讯云_2核2G4M_72元/年 华为云_1核1G1M_0.9元';
  const list: number[] = new Array(20).fill(0);
  return (
    <div className="box">
      <div className="box-header">
        <YysInput
          placeholder="请输入完整的websock地址"
          getValue={(e: string) => setVal1(e)}
        />
        <YysButton onClick={func}>连接</YysButton>
        <YysButton onClick={func}>断开</YysButton>
        <YysButton onClick={func}>清空</YysButton>
      </div>
      <div className="box-center">
        <div>
          {list.map((_, i: number) => {
            return <ul key={i}>{i + str}</ul>;
          })}
        </div>
      </div>
      <div className="box-bottom">
        <YysInput
          value="你好世界"
          placeholder="请输入要发送的信息"
          getValue={(e: string) => setVal2(e)}
        />
        <YysButton onClick={func}>发送</YysButton>
      </div>
    </div>
  );
};

export default Box;
